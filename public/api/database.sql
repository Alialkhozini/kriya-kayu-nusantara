-- ==========================================================
-- Database Schema & Seeds for Kriya Kayu Nusantara
-- Database: u419950057_kriyakayu
-- Hostinger MySQL
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Table: users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) DEFAULT 'Administrator',
  `role` VARCHAR(20) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default Admin User:
-- Username: admin
-- Password: admin123 (hashed with bcrypt: $2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRpHGxK9sWbYv18L/v7tPjA1m6G9W)
-- User can change password anytime in Admin Panel
INSERT INTO `users` (`username`, `password`, `name`, `role`) VALUES
('admin', '$2y$10$T87sK3Bqj5VqQ1l9vYvYk.M5cZc0Y0bZ4p1qE1V6J8zH9w1r7fX1u', 'Administrator Kriya Kayu', 'admin')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- 2. Table: products
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ref` VARCHAR(50) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `subCategory` VARCHAR(100) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `material` VARCHAR(150) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `note` VARCHAR(150) DEFAULT 'Ukuran umum & custom',
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table: blogs
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `tags` TEXT NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Admin',
  `views` INT DEFAULT 0,
  `summary` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- SEED DATA: 90 Products
-- ==========================================================
INSERT INTO `products` (`ref`, `category`, `subCategory`, `title`, `material`, `image`, `note`, `sort_order`) VALUES
('RST-01', 'Restoran', 'Kursi', 'Wood Chair', 'Kayu Jati', '/catalog/rst-01.jpg', 'Ukuran umum & custom', 1),
('RST-02', 'Restoran', 'Kursi', 'Wood Chair', 'Kayu Jati', '/catalog/rst-02.jpg', 'Ukuran umum & custom', 2),
('RST-03', 'Restoran', 'Kursi', 'Wood Chair', 'Kayu Jati', '/catalog/rst-03.jpg', 'Ukuran umum & custom', 3),
('RST-04', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-04.jpg', 'Ukuran umum & custom', 4),
('RST-05', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-05.jpg', 'Ukuran umum & custom', 5),
('RST-06', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-06.jpg', 'Ukuran umum & custom', 6),
('RST-07', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-07.jpg', 'Ukuran umum & custom', 7),
('RST-08', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-08.jpg', 'Ukuran umum & custom', 8),
('RST-09', 'Restoran', 'Kursi', 'Wood Chair', 'Kayu Jati', '/catalog/rst-09.jpg', 'Ukuran umum & custom', 9),
('RST-10', 'Restoran', 'Kursi', 'Wood Chair', 'Kayu Jati', '/catalog/rst-10.jpg', 'Ukuran umum & custom', 10),
('RST-11', 'Restoran', 'Kursi', 'Wood Chair', 'Tali Alami + Kayu Jati', '/catalog/rst-11.jpg', 'Ukuran umum & custom', 11),
('RST-12', 'Restoran', 'Kursi', 'Wood Chair', 'Kayu Jati', '/catalog/rst-12.jpg', 'Ukuran umum & custom', 12),
('RST-13', 'Restoran', 'Kursi', 'Wood Chair', 'Tali Alami + Kayu Jati', '/catalog/rst-13.jpg', 'Ukuran umum & custom', 13),
('RST-14', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-14.jpg', 'Ukuran umum & custom', 14),
('RST-15', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-15.jpg', 'Ukuran umum & custom', 15),
('RST-16', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-16.jpg', 'Ukuran umum & custom', 16),
('RST-17', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-17.jpg', 'Ukuran umum & custom', 17),
('RST-18', 'Restoran', 'Kursi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-18.jpg', 'Ukuran umum & custom', 18),
('RST-19', 'Restoran', 'Kursi Tinggi', 'Wood Bar Chair', 'Kayu Jati', '/catalog/rst-19.jpg', 'Ukuran umum & custom', 19),
('RST-20', 'Restoran', 'Kursi Tinggi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-20.jpg', 'Ukuran umum & custom', 20),
('RST-21', 'Restoran', 'Kursi Tinggi', 'Wood & Rattan Chair', 'Rotan Alami + Kayu Jati', '/catalog/rst-21.jpg', 'Ukuran umum & custom', 21),
('RST-22', 'Restoran', 'Sofa', 'Wood Sofa', 'Kayu Jati', '/catalog/rst-22.jpg', 'Ukuran umum & custom', 22),
('RST-23', 'Restoran', 'Sofa', 'Wood Sofa', 'Kayu Jati', '/catalog/rst-23.jpg', 'Ukuran umum & custom', 23),
('RST-24', 'Restoran', 'Sofa', 'Wood Sofa', 'Kayu Jati', '/catalog/rst-24.jpg', 'Ukuran umum & custom', 24),
('RST-25', 'Restoran', 'Sofa', 'Wood Sofa', 'Kayu Jati', '/catalog/rst-25.jpg', 'Ukuran umum & custom', 25),
('RST-26', 'Restoran', 'Sofa', 'Wood & Rattan Sofa', 'Rotan Alami + Kayu Jati', '/catalog/rst-26.jpg', 'Ukuran umum & custom', 26),
('RST-27', 'Restoran', 'Sofa', 'Wood & Rattan Sofa', 'Rotan Alami + Kayu Jati', '/catalog/rst-27.jpg', 'Ukuran umum & custom', 27),
('RST-28', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-28.jpg', 'Ukuran umum & custom', 28),
('RST-29', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-29.jpg', 'Ukuran umum & custom', 29),
('RST-30', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-30.jpg', 'Ukuran umum & custom', 30),
('RST-31', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-31.jpg', 'Ukuran umum & custom', 31),
('RST-32', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-32.jpg', 'Ukuran umum & custom', 32),
('RST-33', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-33.jpg', 'Ukuran umum & custom', 33),
('RST-34', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-34.jpg', 'Ukuran umum & custom', 34),
('RST-35', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-35.jpg', 'Ukuran umum & custom', 35),
('RST-36', 'Restoran', 'Meja', 'Wood Table', 'Kayu Jati', '/catalog/rst-36.jpg', 'Ukuran umum & custom', 36),
('RST-37', 'Restoran', 'Meja', 'Wood & Steel Table', 'Besi + Kayu Jati', '/catalog/rst-37.jpg', 'Ukuran umum & custom', 37),
('RST-38', 'Restoran', 'Meja', 'Wood & Steel Table', 'Besi + Kayu Jati', '/catalog/rst-38.jpg', 'Ukuran umum & custom', 38),
('RST-39', 'Restoran', 'Meja Modular', 'Wood & Steel Table', 'Besi + Kayu Jati', '/catalog/rst-39.jpg', 'Ukuran umum & custom', 39),
('RST-40', 'Restoran', 'Meja Modular', 'Wood & Steel Table', 'Besi + Kayu Jati', '/catalog/rst-40.jpg', 'Ukuran umum & custom', 40),
('RST-41', 'Restoran', 'Meja Modular', 'Wood Table', 'Kayu Jati', '/catalog/rst-41.jpg', 'Ukuran umum & custom', 41),
('RST-42', 'Restoran', 'Meja Modular', 'Wood Table', 'Kayu Jati', '/catalog/rst-42.jpg', 'Ukuran umum & custom', 42),
('RST-43', 'Restoran', 'Meja Kopi', 'Wood & Rattan Table', 'Rotan Alami + Kayu Jati', '/catalog/rst-43.jpg', 'Ukuran umum & custom', 43),
('RST-44', 'Restoran', 'Meja Kopi', 'Wood & Rattan Table', 'Rotan Alami + Kayu Jati', '/catalog/rst-44.jpg', 'Ukuran umum & custom', 44),
('RST-45', 'Restoran', 'Meja Kopi', 'Wood & Rattan Table', 'Kayu Jati', '/catalog/rst-45.jpg', 'Ukuran umum & custom', 45),
('OUT-01', 'KolamRenang', 'Sunbed', 'Wood Lounger', 'Kayu Jati', '/catalog/out-01.jpg', 'Ukuran umum & custom', 46),
('OUT-02', 'KolamRenang', 'Sunbed', 'Wood Lounger', 'Kayu Jati', '/catalog/out-02.jpg', 'Ukuran umum & custom', 47),
('OUT-03', 'KolamRenang', 'Sunbed', 'Wood Lounger', 'Kayu Jati', '/catalog/out-03.jpg', 'Ukuran umum & custom', 48),
('OUT-04', 'KolamRenang', 'Sunbed', 'Wood Lounger', 'Kayu Jati', '/catalog/out-04.jpg', 'Ukuran umum & custom', 49),
('OUT-05', 'KolamRenang', 'Sunbed', 'Wood Lounger', 'Kayu Jati', '/catalog/out-05.jpg', 'Ukuran umum & custom', 50),
('OUT-06', 'KolamRenang', 'Sunbed', 'Wood Lounger', 'Kayu Jati', '/catalog/out-06.jpg', 'Ukuran umum & custom', 51),
('OUT-07', 'KolamRenang', 'Payung', 'Wood Umbrella', 'Kayu Jati', '/catalog/out-07.jpg', 'Ukuran umum & custom', 52),
('OUT-08', 'KolamRenang', 'Payung', 'Wood Umbrella', 'Kayu Jati', '/catalog/out-08.jpg', 'Ukuran umum & custom', 53),
('OUT-09', 'KolamRenang', 'Payung', 'Wood Umbrella', 'Kayu Jati', '/catalog/out-09.jpg', 'Ukuran umum & custom', 54),
('LMP-01', 'Lampu', 'Table Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-01.jpg', 'Ukuran umum & custom', 55),
('LMP-02', 'Lampu', 'Table Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-02.jpg', 'Ukuran umum & custom', 56),
('LMP-03', 'Lampu', 'Table Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-03.jpg', 'Ukuran umum & custom', 57),
('LMP-04', 'Lampu', 'Table Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-04.jpg', 'Ukuran umum & custom', 58),
('LMP-05', 'Lampu', 'Standing Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-05.jpg', 'Ukuran umum & custom', 59),
('LMP-06', 'Lampu', 'Standing Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-06.jpg', 'Ukuran umum & custom', 60),
('LMP-07', 'Lampu', 'Standing Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-07.jpg', 'Ukuran umum & custom', 61),
('LMP-08', 'Lampu', 'Standing Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-08.jpg', 'Ukuran umum & custom', 62),
('LMP-09', 'Lampu', 'Standing Lamp', 'Wood Lamp', 'Kayu Jati', '/catalog/lmp-09.jpg', 'Ukuran umum & custom', 63),
('ROO-01', 'InRoom', 'Dipan', 'Wood Bed Frame', 'Kayu Jati', '/catalog/roo-01.jpg', 'Ukuran umum & custom', 64),
('ROO-02', 'InRoom', 'Dipan', 'Wood Bed Frame', 'Kayu Jati', '/catalog/roo-02.jpg', 'Ukuran umum & custom', 65),
('ROO-03', 'InRoom', 'Dipan', 'Wood Bed Frame', 'Kayu Jati', '/catalog/roo-03.jpg', 'Ukuran umum & custom', 66),
('ROO-04', 'InRoom', 'Dipan', 'Wood & Rattan Bed', 'Rotan Alami + Kayu Jati', '/catalog/roo-04.jpg', 'Ukuran umum & custom', 67),
('ROO-05', 'InRoom', 'Dipan', 'Wood & Rattan Bed', 'Rotan Alami + Kayu Jati', '/catalog/roo-05.jpg', 'Ukuran umum & custom', 68),
('ROO-06', 'InRoom', 'TV Cabinet', 'Wood Cabinet', 'Rotan Alami + Kayu Jati', '/catalog/roo-06.jpg', 'Ukuran umum & custom', 69),
('ROO-07', 'InRoom', 'TV Cabinet', 'Wood Cabinet', 'Rotan Alami + Kayu Jati', '/catalog/roo-07.jpg', 'Ukuran umum & custom', 70),
('ROO-08', 'InRoom', 'TV Cabinet', 'Wood Cabinet', 'Rotan Alami + Kayu Jati', '/catalog/roo-08.jpg', 'Ukuran umum & custom', 71),
('ROO-09', 'InRoom', 'TV Cabinet', 'Wood Cabinet', 'Kayu Jati', '/catalog/roo-09.jpg', 'Ukuran umum & custom', 72),
('ROO-10', 'InRoom', 'Lemari', 'Wood Wardrobe', 'Rotan Alami + Kayu Jati', '/catalog/roo-10.jpg', 'Ukuran umum & custom', 73),
('ROO-11', 'InRoom', 'Lemari', 'Wood Wardrobe', 'Rotan Alami + Kayu Jati', '/catalog/roo-11.jpg', 'Ukuran umum & custom', 74),
('ROO-12', 'InRoom', 'Lemari', 'Wood Wardrobe', 'Rotan Alami + Kayu Jati', '/catalog/roo-12.jpg', 'Ukuran umum & custom', 75),
('ROO-13', 'InRoom', 'Rak Baju', 'Wood Hanger', 'Kayu Jati', '/catalog/roo-13.jpg', 'Ukuran umum & custom', 76),
('ROO-14', 'InRoom', 'Rak Sepatu', 'Wood Organizer', 'Kayu Jati', '/catalog/roo-14.jpg', 'Ukuran umum & custom', 77),
('ROO-15', 'InRoom', 'Rak Sepatu', 'Wood Organizer', 'Kayu Jati', '/catalog/roo-15.jpg', 'Ukuran umum & custom', 78),
('ROO-16', 'InRoom', 'Gantungan', 'Wood Hanger', 'Kayu Jati', '/catalog/roo-16.jpg', 'Ukuran umum & custom', 79),
('ROO-17', 'InRoom', 'Gantungan', 'Wood Hanger', 'Kayu Jati', '/catalog/roo-17.jpg', 'Ukuran umum & custom', 80),
('ROO-18', 'InRoom', 'Gantungan', 'Wood Hanger', 'Kayu Jati', '/catalog/roo-18.jpg', 'Ukuran umum & custom', 81),
('ROO-19', 'InRoom', 'Nakas', 'Wood Side Table', 'Kayu Jati', '/catalog/roo-19.jpg', 'Ukuran umum & custom', 82),
('ROO-20', 'InRoom', 'Nakas', 'Wood Side Table', 'Kayu Jati', '/catalog/roo-20.jpg', 'Ukuran umum & custom', 83),
('ROO-21', 'InRoom', 'Nakas', 'Wood Side Table', 'Rotan Alami + Kayu Jati', '/catalog/roo-21.jpg', 'Ukuran umum & custom', 84),
('ROO-22', 'InRoom', 'Nakas', 'Wood Side Table', 'Rotan Alami + Kayu Jati', '/catalog/roo-22.jpg', 'Ukuran umum & custom', 85),
('ROO-23', 'InRoom', 'Cermin', 'Wood Mirror', 'Kayu Jati', '/catalog/roo-23.jpg', 'Ukuran umum & custom', 86),
('ROO-24', 'InRoom', 'Cermin', 'Wood Mirror', 'Kayu Jati', '/catalog/roo-24.jpg', 'Ukuran umum & custom', 87),
('ROO-25', 'InRoom', 'Cermin', 'Wood Mirror', 'Kayu Jati', '/catalog/roo-25.jpg', 'Ukuran umum & custom', 88),
('ROO-26', 'InRoom', 'Tempat Sampah', 'Wood Bin', 'Kayu Jati', '/catalog/roo-26.jpg', 'Ukuran umum & custom', 89),
('ROO-27', 'InRoom', 'Tempat Sampah', 'Wood & Rattan Bin', 'Rotan Alami + Kayu Jati', '/catalog/roo-27.jpg', 'Ukuran umum & custom', 90);

-- ==========================================================
-- SEED DATA: Initial Blog Posts
-- ==========================================================
INSERT INTO `blogs` (`slug`, `title`, `date`, `image`, `category`, `tags`, `author`, `views`, `summary`, `content`) VALUES
(
  'mastering-teak-joinery-luxury-architectural-interiors',
  'Mastering Teak Joinery in Luxury Architectural Interiors & Villas',
  '2023-04-15',
  '/img/joinery-detail.jpg',
  'Craftsmanship',
  'Teak Wood, Joinery, Luxury Interiors, Villa Architecture',
  'Kriya Master Craftsman',
  860,
  'Traditional mortise-and-tenon craftsmanship meets modern CNC precision, creating heirloom architectural wooden elements for world-class resorts and private residences....',
  'In bespoke architectural woodworking, joinery is where engineering meets soulful artistry. At Kriya Kayu Nusantara, our artisans utilize certified Perhutani Grade-A teak—renowned worldwide for its natural silica resistance, rich essential oils, and dimensional stability in high-humidity climates.\n\nEvery joint is calculated to accommodate natural wood expansion while maintaining flawless hairline tolerances. From concealed dovetail cabinetry to soaring timber ceiling trusses, our joinery withstands decades of coastal elements without warping.\n\nDiscover how our Bali workshop collaborates directly with architects and interior designers to turn bespoke concepts into enduring heirloom reality.'
),
(
  'hospitality-custom-furniture-resort-trends',
  'Hospitality Custom Furniture: Resort & Villa Interior Inspirations',
  '2023-08-20',
  '/img/restaurant-interior.jpg',
  'Hospitality',
  'Hospitality, Resort Design, Custom Furniture, Bali',
  'Design Team',
  1100,
  'Exploring organic silhouettes, natural woven rattan integration, and bespoke teak tables that define iconic hospitality spaces across Bali and beyond....',
  'Hospitality interior design has entered a new era of tactile authenticity. High-end resort guests seek environments that tell a story of place, craft, and grounded relaxation.\n\nWe explore how custom dining tables, bespoke lounge sectionals, and hand-woven natural rattan details create immersive sensory dining and lounging environments that photographs and reviews cannot stop celebrating.\n\nLearn about our contract furniture manufacturing workflow, from 3D shop drawings and mock-up approvals to batch production with kiln-drying moisture control under 12%.'
),
(
  'sustainable-teak-sourcing-environmental-stewardship',
  'Sustainable Teak Sourcing: Balancing Heritage Craft with Environmental Stewardship',
  '2023-11-05',
  '/img/workshop-daybed.jpg',
  'Sustainability',
  'Sustainability, Eco Craft, Legal Wood, Manufacturing',
  'Editorial Team',
  740,
  'How certified legal timber, zero-waste workshop practices, and artisanal community empowerment shape the future of sustainable Indonesian woodwork....',
  'True luxury is inherently responsible. At Kriya Kayu Nusantara, sustainability is embedded into every operational stage. Every cubic meter of teak wood is verified with Indonesian SVLK (Timber Legality Verification System) standards.\n\nMoreover, our workshop employs a circular material model: production offcuts are repurposed into bespoke accessories, mosaic inlays, or donated to local artisan woodcarvers.\n\nPartnering with Kriya Kayu Nusantara means selecting craftsmanship that respects both ancient Indonesian traditions and our collective environmental future.'
),
(
  'acoustic-timber-wall-panelling-modern-spaces',
  'Acoustic Engineering with Natural Wood Wall Paneling for Luxury Residences',
  '2023-12-14',
  '/img/tv-cabinet-room.jpg',
  'Architecture & Tech',
  'Acoustics, Teak Wood, Wall Paneling, Interiors',
  'Editorial Team',
  650,
  'How engineered solid teak fluted panels combine acoustic dampening with rich visual warmth in contemporary home theaters and open-plan living areas....',
  'Sound quality defines the peaceful ambiance of modern luxury homes. Solid teak acoustic slatting disperses high-frequency reverberations while infusing natural warmth into minimalist interiors.\n\nOur custom architectural wall paneling is precision-milled with integrated acoustic fleece backing, meeting international reverberation standards while celebrating organic wood grain.'
),
(
  'weatherproofing-outdoor-teak-furniture-tropical-climates',
  'Weatherproofing Outdoor Teak Furniture: Secrets for Extreme Tropical Climates',
  '2024-02-18',
  '/img/poolside-loungers.jpg',
  'Craftsmanship',
  'Outdoor Furniture, Teak Durability, Hospitality, Bali',
  'Kriya Master Craftsman',
  890,
  'Understanding the natural silica and oil content of Indonesian teak, and how marine-grade joinery resists intense monsoon rain and UV exposure....',
  'Outdoor poolside loungers and open-air dining sets endure some of the harshest environmental stresses: alternating tropical downpours and blazing UV radiation.\n\nThanks to the high natural rubber and silica content of Indonesian Perhutani teak, our outdoor collections develop a silvery-grey patina over time without compromising structural integrity.'
);

SET FOREIGN_KEY_CHECKS = 1;
