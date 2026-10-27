<?php
require_once __DIR__ . '/db.php';

$user = verifyAuthToken();
if (!$user) {
    sendError('Akses ditolak. Sesi login telah berakhir, silakan login kembali.', 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Metode tidak diizinkan. Gunakan POST.', 405);
}

$fileData = null;
$ext = 'jpg';
$mime = 'image/jpeg';

// 1. Check if multipart/form-data upload from phone or laptop
if (!empty($_FILES['image'])) {
    $file = $_FILES['image'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        sendError('Gagal mengunggah file. Kode error: ' . $file['error'], 400);
    }

    if ($file['size'] > 15 * 1024 * 1024) {
        sendError('Ukuran file terlalu besar. Maksimal 15MB.', 400);
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'];
    if (!in_array($ext, $allowed)) {
        sendError('Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau SVG.', 400);
    }

    $mime = ($ext === 'png') ? 'image/png' : (($ext === 'webp') ? 'image/webp' : (($ext === 'svg') ? 'image/svg+xml' : 'image/jpeg'));
    $fileData = file_get_contents($file['tmp_name']);
} else {
    // 2. Check if JSON payload with base64 data
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    if (!empty($input['image'])) {
        $raw = $input['image'];
        if (preg_match('/^data:image\/(\w+);base64,/', $raw, $matches)) {
            $ext = strtolower($matches[1]);
            $mime = 'image/' . $ext;
            $fileData = base64_decode(substr($raw, strpos($raw, ',') + 1));
        } else {
            sendError('Format data base64 tidak valid.', 400);
        }
    }
}

if (!$fileData) {
    sendError('Tidak ada file gambar yang diunggah.', 400);
}

// Target directory in public/uploads/
$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

$newFileName = 'img_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$targetPath = $uploadDir . $newFileName;

// If writing to disk succeeds, return public URL path
if (@file_put_contents($targetPath, $fileData)) {
    sendResponse([
        'success' => true,
        'message' => 'Gambar berhasil diunggah ke server!',
        'url' => '/uploads/' . $newFileName
    ]);
} else {
    // If disk write is restricted on Hostinger, return base64 Data URL so it is stored directly in MySQL!
    $base64Url = 'data:' . $mime . ';base64,' . base64_encode($fileData);
    sendResponse([
        'success' => true,
        'message' => 'Gambar berhasil diproses dan siap disimpan ke database!',
        'url' => $base64Url
    ]);
}
