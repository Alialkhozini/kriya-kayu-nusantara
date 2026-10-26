<?php
require_once __DIR__ . '/config.php';

header("Content-Type: text/html; charset=UTF-8");

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
$msg = "";
$status = "info";

if (isset($_POST['run_install'])) {
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        $sqlFile = __DIR__ . '/../../database.sql';
        if (!file_exists($sqlFile)) {
            $sqlFile = __DIR__ . '/database.sql';
        }

        if (!file_exists($sqlFile)) {
            throw new Exception("File database.sql tidak ditemukan!");
        }

        $sql = file_get_contents($sqlFile);
        
        // Execute multi queries
        $pdo->exec($sql);
        
        $msg = "Selamat! Database MySQL berhasil diinisialisasi secara otomatis.<br>Tabel `users`, `products` (90 produk), dan `blogs` sudah siap digunakan.<br>Akun admin default: <b>admin</b> / <b>admin123</b>";
        $status = "success";
    } catch (Exception $e) {
        $msg = "Gagal menginisialisasi database: " . $e->getMessage();
        $status = "error";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Setup Database MySQL - Kriya Kayu Nusantara</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f7f4ef; padding: 40px 20px; color: #3b2a1b; }
    .box { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 20px rgba(64,49,29,0.08); border: 1px solid rgba(64,49,29,0.12); }
    h1 { margin-top: 0; color: #40311d; font-size: 24px; }
    .meta { background: #faf8f5; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 14px; line-height: 1.6; }
    .btn { display: inline-block; background: #40311d; color: #ffffff; padding: 12px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; font-size: 15px; }
    .btn:hover { background: #2a2013; }
    .alert { padding: 16px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; }
    .alert.success { background: #e6f4ea; color: #137333; border: 1px solid #ceead6; }
    .alert.error { background: #fce8e6; color: #c5221f; border: 1px solid #fad2cf; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Inisialisasi Database MySQL</h1>
    <p>Halaman ini akan membuat tabel <code>users</code>, <code>products</code>, dan <code>blogs</code> serta mengisi 90 data produk katalog awal dan artikel blog ke database Hostinger Anda.</p>
    
    <div class="meta">
      <strong>Koneksi Database Saat Ini:</strong><br>
      Host: <code><?php echo DB_HOST; ?></code><br>
      Database: <code><?php echo DB_NAME; ?></code><br>
      User: <code><?php echo DB_USER; ?></code>
    </div>

    <?php if ($msg): ?>
      <div class="alert <?php echo $status; ?>"><?php echo $msg; ?></div>
    <?php endif; ?>

    <form method="POST">
      <button type="submit" name="run_install" class="btn">Mulai Buat Tabel & Impor Data (1-Klik)</button>
    </form>
    
    <p style="margin-top: 24px; font-size: 13px; color: #6e6154;">
      Setelah instalasi selesai, Anda dapat login ke halaman <a href="/admin" target="_blank">Admin Panel</a> dengan kredensial: <br>
      Username: <strong>admin</strong> | Password: <strong>admin123</strong>
    </p>
  </div>
</body>
</html>
