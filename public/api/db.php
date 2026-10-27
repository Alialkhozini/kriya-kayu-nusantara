<?php
require_once __DIR__ . '/config.php';

// Enable CORS & JSON headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Auth-Token");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getDbConnection() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Gagal terkoneksi ke database MySQL: ' . $e->getMessage()
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            exit();
        }
    }
    return $pdo;
}

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit();
}

function sendError($message, $statusCode = 400) {
    sendResponse(['success' => false, 'message' => $message], $statusCode);
}

function verifyAuthToken() {
    $headers = [];
    if (function_exists('getallheaders')) {
        $headers = getallheaders() ?: [];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers() ?: [];
    }

    // Normalize headers to lowercase keys
    $lower = [];
    foreach ($headers as $k => $v) {
        $lower[strtolower($k)] = $v;
    }

    $authHeader = $lower['authorization'] 
        ?? $_SERVER['HTTP_AUTHORIZATION'] 
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] 
        ?? '';

    $token = '';
    if (!empty($authHeader) && preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        $token = trim($matches[1]);
    }

    // Fallback: X-Auth-Token (immune to Apache header stripping on FastCGI)
    if (empty($token)) {
        $token = $lower['x-auth-token'] 
            ?? $_SERVER['HTTP_X_AUTH_TOKEN'] 
            ?? $_GET['token'] 
            ?? $_POST['token'] 
            ?? '';
    }

    if (empty($token)) {
        return false;
    }

    $parts = explode('.', $token);
    if (count($parts) === 2) {
        $payload = json_decode(base64_decode($parts[0]), true);
        $sign = hash_hmac('sha256', $parts[0], JWT_SECRET);
        if ($sign === $parts[1] && isset($payload['username']) && ($payload['exp'] ?? 0) > time()) {
            return $payload;
        }
    }
    return false;
}

function createToken($user) {
    $payload = [
        'id' => (int)($user['id'] ?? 1),
        'username' => $user['username'] ?? 'admin',
        'name' => $user['name'] ?? 'Administrator',
        'role' => $user['role'] ?? 'admin',
        'exp' => time() + (86400 * 30) // 30 days
    ];
    $encoded = base64_encode(json_encode($payload));
    $signature = hash_hmac('sha256', $encoded, JWT_SECRET);
    return $encoded . '.' . $signature;
}
