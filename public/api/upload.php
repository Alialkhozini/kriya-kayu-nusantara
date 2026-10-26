<?php
require_once __DIR__ . '/db.php';

$user = verifyAuthToken();
if (!$user) {
    sendError('Akses ditolak. Silakan login terlebih dahulu.', 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['image'])) {
    sendError('Tidak ada file gambar yang diunggah.', 400);
}

$file = $_FILES['image'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    sendError('Gagal mengunggah file. Error code: ' . $file['error'], 400);
}

// Max 8MB
if ($file['size'] > 8 * 1024 * 1024) {
    sendError('Ukuran file terlalu besar. Maksimal 8MB.', 400);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
if (!in_array($ext, $allowed)) {
    sendError('Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau SVG.', 400);
}

// Target directory in public/uploads/ or ../uploads/
$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$newFileName = 'img_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$targetPath = $uploadDir . $newFileName;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    sendError('Gagal memindahkan file ke direktori server.', 500);
}

$fileUrl = '/uploads/' . $newFileName;

sendResponse([
    'success' => true,
    'message' => 'Gambar berhasil diunggah!',
    'url' => $fileUrl
]);
