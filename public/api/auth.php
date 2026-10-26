<?php
require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    if ($action === 'login' || empty($action)) {
        $username = trim($input['username'] ?? '');
        $password = $input['password'] ?? '';

        if (empty($username) || empty($password)) {
            sendError('Username dan password wajib diisi!', 400);
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        // Fallback for demo/initial setup if no users in table
        if (!$user) {
            $countStmt = $pdo->query("SELECT COUNT(*) FROM users");
            $totalUsers = (int)$countStmt->fetchColumn();
            if ($totalUsers === 0 && $username === 'admin' && $password === 'admin123') {
                $hash = password_hash('admin123', PASSWORD_BCRYPT);
                $ins = $pdo->prepare("INSERT INTO users (username, password, name, role) VALUES ('admin', ?, 'Administrator', 'admin')");
                $ins->execute([$hash]);
                $user = ['id' => $pdo->lastInsertId(), 'username' => 'admin', 'name' => 'Administrator', 'role' => 'admin', 'password' => $hash];
            }
        }

        if (!$user || !password_verify($password, $user['password'])) {
            sendError('Username atau kata sandi salah.', 401);
        }

        $token = createToken($user);
        sendResponse([
            'success' => true,
            'message' => 'Login berhasil!',
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'name' => $user['name'] ?? 'Admin',
                'role' => $user['role'] ?? 'admin'
            ]
        ]);
    }

    if ($action === 'change_password') {
        $authUser = verifyAuthToken();
        if (!$authUser) {
            sendError('Sesi login telah berakhir, silakan login kembali.', 401);
        }

        $currentPass = $input['currentPassword'] ?? '';
        $newPass = $input['newPassword'] ?? '';

        if (strlen($newPass) < 6) {
            sendError('Password baru minimal 6 karakter.', 400);
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$authUser['id']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($currentPass, $user['password'])) {
            sendError('Password saat ini tidak sesuai.', 400);
        }

        $newHash = password_hash($newPass, PASSWORD_BCRYPT);
        $up = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        $up->execute([$newHash, $authUser['id']]);

        sendResponse(['success' => true, 'message' => 'Password berhasil diperbarui!']);
    }
}

if ($method === 'GET' && $action === 'check') {
    $authUser = verifyAuthToken();
    if ($authUser) {
        sendResponse(['success' => true, 'user' => $authUser]);
    } else {
        sendError('Belum terotentikasi.', 401);
    }
}

sendError('Endpoint tidak valid.', 404);
