<?php
require_once __DIR__ . '/config.php';

header("Content-Type: text/html; charset=UTF-8");

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
$msg = "";
$status = "info";

if (isset($_POST['run_install'])) {
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]);

        $sqlFile = __DIR__ . '/../../database.sql';
        if (!file_exists($sqlFile)) {
            $sqlFile = __DIR__ . '/database.sql';
        }

        if (!file_exists($sqlFile)) {
            throw new Exception("File database.sql tidak ditemukan!");
        }

        $sql = file_get_contents($sqlFile);
        
        // Execute queries
        $pdo->exec($sql);
        
        $prodCount = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
        $blogCount = $pdo->query("SELECT COUNT(*) FROM blogs")->fetchColumn();

        $msg = "<b>Sukses Besar!</b> Database MySQL berhasil diperbarui secara otomatis.<br>" .
               "• Tabel `products`: <b>$prodCount produk</b> tersimpan dengan foto resolusi tinggi langsung di database.<br>" .
               "• Tabel `blogs`: <b>$blogCount artikel</b> siap tayang.<br>" .
               "• Kolom `image` berformat <b>LONGTEXT</b> sehingga admin bebas mengunggah foto dari HP atau laptop kapan pun.<br>" .
               "Akun admin: <b>admin</b> / <b>admin123</b>";
        $status = "success";
    } catch (Exception $e) {
        $msg = "Gagal menginisialisasi database: " . $e->getMessage();
        $status = "error";
    }
}

if (isset($_POST['run_alter_only'])) {
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        $pdo->exec("ALTER TABLE products MODIFY image LONGTEXT NOT NULL;");
        $pdo->exec("ALTER TABLE blogs MODIFY image LONGTEXT NOT NULL;");
        $msg = "Berhasil mengubah kolom `image` pada tabel `products` dan `blogs` menjadi <b>LONGTEXT</b> tanpa menghapus data yang sudah ada!";
        $status = "success";
    } catch (Exception $e) {
        $msg = "Gagal memperbarui kolom: " . $e->getMessage();
        $status = "error";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Setup Database MySQL - Kriya Kayu Nusantara</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f7f4ef; padding: 40px 20px; color: #3b2a1b; line-height: 1.6; }
    .box { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 14px; padding: 36px; box-shadow: 0 4px 25px rgba(64,49,29,0.08); border: 1px solid rgba(64,49,29,0.12); }
    h1 { margin-top: 0; color: #40311d; font-size: 24px; font-family: serif; }
    .meta { background: #faf8f5; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 14px; border: 1px solid #e8e1d6; }
    .btn { display: inline-block; background: #40311d; color: #ffffff; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; font-size: 15px; transition: background 0.2s; }
    .btn:hover { background: #2a2013; }
    .btn-secondary { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; margin-left: 10px; }
    .btn-secondary:hover { background: #e5e7eb; }
    .alert { padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; }
    .alert.success { background: #e6f4ea; color: #137333; border: 1px solid #ceead6; }
    .alert.error { background: #fce8e6; color: #c5221f; border: 1px solid #fad2cf; }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Database & Media Storage Setup</h1>
    <p>Halaman ini menyiapkan database Hostinger MySQL dengan seluruh 90 foto katalog dan sampul artikel langsung tersimpan di database (tanpa ketergantungan folder static catalog/blog).</p>
    
    <div class="meta">
      <strong>Koneksi Database Hostinger:</strong><br>
      Host: <code><?php echo DB_HOST; ?></code><br>
      Database: <code><?php echo DB_NAME; ?></code><br>
      User: <code><?php echo DB_USER; ?></code>
    </div>

    <?php if ($msg): ?>
      <div class="alert <?php echo $status; ?>"><?php echo $msg; ?></div>
    <?php endif; ?>

    <form method="POST" class="actions">
      <button type="submit" name="run_install" class="btn">Impor Database & Semua Foto (1-Klik)</button>
      <button type="submit" name="run_alter_only" class="btn btn-secondary">Upgrade Kolom LONGTEXT Saja</button>
    </form>
    
    <p style="margin-top: 28px; font-size: 13px; color: #6e6154;">
      Setelah inisialisasi selesai, Anda dapat login ke halaman <a href="/admin" target="_blank" style="color: #40311d; font-weight: 700;">Admin Panel</a>: <br>
      Username: <strong>admin</strong> | Password: <strong>admin123</strong>
    </p>
  </div>
</body>
</html>
