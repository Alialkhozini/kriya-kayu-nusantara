<?php
require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET /api/blogs.php
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? '';
    $id = $_GET['id'] ?? '';

    if (!empty($slug)) {
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ? LIMIT 1");
        $stmt->execute([$slug]);
        $post = $stmt->fetch();
        if ($post) {
            // increment views
            $pdo->prepare("UPDATE blogs SET views = views + 1 WHERE id = ?")->execute([$post['id']]);
            $post['views'] += 1;
            sendResponse(['success' => true, 'data' => $post]);
        } else {
            sendError('Artikel tidak ditemukan.', 404);
        }
    }

    if (!empty($id)) {
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $post = $stmt->fetch();
        if ($post) {
            sendResponse(['success' => true, 'data' => $post]);
        } else {
            sendError('Artikel tidak ditemukan.', 404);
        }
    }

    $search = $_GET['search'] ?? '';
    $sql = "SELECT * FROM blogs WHERE 1=1";
    $params = [];

    if (!empty($search)) {
        $sql .= " AND (title LIKE ? OR summary LIKE ? OR category LIKE ?)";
        $sTerm = "%$search%";
        $params[] = $sTerm;
        $params[] = $sTerm;
        $params[] = $sTerm;
    }

    $sql .= " ORDER BY date DESC, id DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $blogs = $stmt->fetchAll();

    sendResponse([
        'success' => true,
        'count' => count($blogs),
        'data' => $blogs
    ]);
}

// POST /api/blogs.php (Create)
if ($method === 'POST') {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Akses ditolak. Sesi login telah berakhir, silakan login kembali.', 401);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $title = trim($input['title'] ?? '');
    $date = $input['date'] ?? date('Y-m-d');
    $category = trim($input['category'] ?? 'Architecture & Tech');
    $tags = is_array($input['tags'] ?? '') ? implode(', ', $input['tags']) : trim($input['tags'] ?? '');
    $image = trim($input['image'] ?? '/img/restaurant-interior.jpg');
    $summary = trim($input['summary'] ?? '');
    $content = trim($input['content'] ?? $summary);
    $author = trim($input['author'] ?? 'Admin');

    if (empty($title) || empty($summary)) {
        sendError('Judul dan ringkasan artikel wajib diisi!', 400);
    }

    // Generate unique slug
    $baseSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
    if (empty($baseSlug)) {
        $baseSlug = 'artikel-' . time();
    }
    $slug = $baseSlug;
    $count = 1;
    while (true) {
        $chk = $pdo->prepare("SELECT id FROM blogs WHERE slug = ?");
        $chk->execute([$slug]);
        if (!$chk->fetch()) break;
        $slug = $baseSlug . '-' . (++$count);
    }

    $views = rand(120, 450);

    try {
        $stmt = $pdo->prepare("INSERT INTO blogs (slug, title, date, image, category, tags, author, views, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$slug, $title, $date, $image, $category, $tags, $author, $views, $summary, $content]);

        $newId = (int)$pdo->lastInsertId();
        $newBlog = $pdo->query("SELECT * FROM blogs WHERE id = $newId")->fetch();

        sendResponse([
            'success' => true,
            'message' => 'Artikel baru berhasil diterbitkan!',
            'data' => $newBlog
        ], 201);
    } catch (PDOException $e) {
        // Self-heal if image column is too short (VARCHAR instead of LONGTEXT)
        if ($e->getCode() == '22001' || stripos($e->getMessage(), 'too long') !== false) {
            @$pdo->exec("ALTER TABLE blogs MODIFY image LONGTEXT NOT NULL;");
            $stmt = $pdo->prepare("INSERT INTO blogs (slug, title, date, image, category, tags, author, views, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$slug, $title, $date, $image, $category, $tags, $author, $views, $summary, $content]);

            $newId = (int)$pdo->lastInsertId();
            $newBlog = $pdo->query("SELECT * FROM blogs WHERE id = $newId")->fetch();

            sendResponse([
                'success' => true,
                'message' => 'Artikel baru berhasil diterbitkan!',
                'data' => $newBlog
            ], 201);
        }
        sendError('Gagal menyimpan artikel ke database: ' . $e->getMessage(), 500);
    }
}

// PUT /api/blogs.php (Update)
if ($method === 'PUT') {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Akses ditolak. Sesi login telah berakhir, silakan login kembali.', 401);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
    $slug = trim($input['slug'] ?? $_GET['slug'] ?? '');

    if ($id <= 0 && empty($slug)) {
        sendError('ID atau slug artikel tidak valid.', 400);
    }

    $title = trim($input['title'] ?? '');
    $date = $input['date'] ?? date('Y-m-d');
    $category = trim($input['category'] ?? 'Architecture & Tech');
    $tags = is_array($input['tags'] ?? '') ? implode(', ', $input['tags']) : trim($input['tags'] ?? '');
    $image = trim($input['image'] ?? '/img/restaurant-interior.jpg');
    $summary = trim($input['summary'] ?? '');
    $content = trim($input['content'] ?? $summary);
    $author = trim($input['author'] ?? 'Admin');

    try {
        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE blogs SET title = ?, date = ?, category = ?, tags = ?, image = ?, summary = ?, content = ?, author = ? WHERE id = ?");
            $stmt->execute([$title, $date, $category, $tags, $image, $summary, $content, $author, $id]);
            $updated = $pdo->query("SELECT * FROM blogs WHERE id = $id")->fetch();
        } else {
            $stmt = $pdo->prepare("UPDATE blogs SET title = ?, date = ?, category = ?, tags = ?, image = ?, summary = ?, content = ?, author = ? WHERE slug = ?");
            $stmt->execute([$title, $date, $category, $tags, $image, $summary, $content, $author, $slug]);
            $updated = $pdo->prepare("SELECT * FROM blogs WHERE slug = ?");
            $updated->execute([$slug]);
            $updated = $updated->fetch();
        }

        sendResponse([
            'success' => true,
            'message' => 'Artikel berhasil diperbarui!',
            'data' => $updated
        ]);
    } catch (PDOException $e) {
        if ($e->getCode() == '22001' || stripos($e->getMessage(), 'too long') !== false) {
            @$pdo->exec("ALTER TABLE blogs MODIFY image LONGTEXT NOT NULL;");
            if ($id > 0) {
                $stmt = $pdo->prepare("UPDATE blogs SET title = ?, date = ?, category = ?, tags = ?, image = ?, summary = ?, content = ?, author = ? WHERE id = ?");
                $stmt->execute([$title, $date, $category, $tags, $image, $summary, $content, $author, $id]);
                $updated = $pdo->query("SELECT * FROM blogs WHERE id = $id")->fetch();
            } else {
                $stmt = $pdo->prepare("UPDATE blogs SET title = ?, date = ?, category = ?, tags = ?, image = ?, summary = ?, content = ?, author = ? WHERE slug = ?");
                $stmt->execute([$title, $date, $category, $tags, $image, $summary, $content, $author, $slug]);
                $updated = $pdo->prepare("SELECT * FROM blogs WHERE slug = ?");
                $updated->execute([$slug]);
                $updated = $updated->fetch();
            }

            sendResponse([
                'success' => true,
                'message' => 'Artikel berhasil diperbarui!',
                'data' => $updated
            ]);
        }
        sendError('Gagal memperbarui artikel: ' . $e->getMessage(), 500);
    }
}

// DELETE /api/blogs.php?id=X
if ($method === 'DELETE') {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Akses ditolak. Sesi login telah berakhir, silakan login kembali.', 401);
    }

    $id = (int)($_GET['id'] ?? 0);
    $slug = trim($_GET['slug'] ?? '');

    if ($id > 0) {
        $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
    } else if (!empty($slug)) {
        $stmt = $pdo->prepare("DELETE FROM blogs WHERE slug = ?");
        $stmt->execute([$slug]);
    } else {
        sendError('ID atau slug artikel wajib dicantumkan.', 400);
    }

    sendResponse([
        'success' => true,
        'message' => 'Artikel berhasil dihapus!'
    ]);
}

sendError('Metode HTTP tidak didukung.', 405);
