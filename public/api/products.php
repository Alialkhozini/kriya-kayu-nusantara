<?php
require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET /api/products.php
if ($method === 'GET') {
    $category = $_GET['category'] ?? '';
    $search = $_GET['search'] ?? '';

    $sql = "SELECT * FROM products WHERE 1=1";
    $params = [];

    if (!empty($category) && $category !== 'All') {
        $sql .= " AND category = ?";
        $params[] = $category;
    }

    if (!empty($search)) {
        $sql .= " AND (title LIKE ? OR subCategory LIKE ? OR material LIKE ? OR ref LIKE ?)";
        $sTerm = "%$search%";
        $params[] = $sTerm;
        $params[] = $sTerm;
        $params[] = $sTerm;
        $params[] = $sTerm;
    }

    $sql .= " ORDER BY sort_order ASC, id ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll();

    sendResponse([
        'success' => true,
        'count' => count($products),
        'data' => $products
    ]);
}

// POST /api/products.php (Create)
if ($method === 'POST') {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Akses ditolak. Silakan login terlebih dahulu.', 401);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $ref = trim($input['ref'] ?? '');
    $category = trim($input['category'] ?? 'Restoran');
    $subCategory = trim($input['subCategory'] ?? 'Kursi');
    $title = trim($input['title'] ?? '');
    $material = trim($input['material'] ?? 'Kayu Jati');
    $image = trim($input['image'] ?? '/img/restaurant-interior.jpg');
    $note = trim($input['note'] ?? 'Ukuran umum & custom');

    if (empty($title) || empty($ref)) {
        sendError('Kode Ref dan Judul Produk wajib diisi!', 400);
    }

    // Determine sort_order
    $maxSort = $pdo->query("SELECT COALESCE(MAX(sort_order), 0) + 1 FROM products")->fetchColumn();

    $stmt = $pdo->prepare("INSERT INTO products (ref, category, subCategory, title, material, image, note, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$ref, $category, $subCategory, $title, $material, $image, $note, $maxSort]);

    $newId = $pdo->lastInsertId();
    $newProduct = $pdo->query("SELECT * FROM products WHERE id = " . (int)$newId)->fetch();

    sendResponse([
        'success' => true,
        'message' => 'Produk berhasil ditambahkan ke katalog!',
        'data' => $newProduct
    ], 201);
}

// PUT /api/products.php (Update)
if ($method === 'PUT') {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Akses ditolak. Silakan login terlebih dahulu.', 401);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $id = (int)($input['id'] ?? $_GET['id'] ?? 0);

    if ($id <= 0) {
        sendError('ID Produk tidak valid.', 400);
    }

    $fields = [];
    $params = [];
    $allowedFields = ['ref', 'category', 'subCategory', 'title', 'material', 'image', 'note', 'sort_order'];

    foreach ($allowedFields as $field) {
        if (isset($input[$field])) {
            $fields[] = "$field = ?";
            $params[] = trim($input[$field]);
        }
    }

    if (empty($fields)) {
        sendError('Tidak ada data yang diperbarui.', 400);
    }

    $params[] = $id;
    $sql = "UPDATE products SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $updatedProduct = $pdo->query("SELECT * FROM products WHERE id = $id")->fetch();

    sendResponse([
        'success' => true,
        'message' => 'Produk katalog berhasil diperbarui!',
        'data' => $updatedProduct
    ]);
}

// DELETE /api/products.php?id=X
if ($method === 'DELETE') {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Akses ditolak. Silakan login terlebih dahulu.', 401);
    }

    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        sendError('ID Produk tidak valid.', 400);
    }

    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);

    sendResponse([
        'success' => true,
        'message' => 'Produk berhasil dihapus dari katalog!'
    ]);
}

sendError('Metode HTTP tidak didukung.', 405);
