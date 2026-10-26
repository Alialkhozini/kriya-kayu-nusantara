import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, User, LogOut, Plus, Edit, Trash2, ExternalLink, 
  Eye, CheckCircle2, AlertCircle, RotateCcw, Image as ImageIcon,
  FileText, Tag, Calendar, Layers, ShieldCheck, ArrowRight,
  Package, Search, Filter, Upload, X, RefreshCw
} from 'lucide-react';
import { 
  apiLogin, apiLogout, getCachedUser,
  apiGetProducts, apiCreateProduct, apiUpdateProduct, apiDeleteProduct,
  apiGetBlogs, apiSaveBlog, apiDeleteBlog, apiUploadImage 
} from '../services/api';
import { categories as defaultCategories } from '../data/products';
import './Admin.css';

const PRESET_BLOG_IMAGES = [
  { label: 'FBC Expo (Curtain Wall)', url: '/blog/fbc-expo.jpg' },
  { label: 'Curtain Wall Trends (Night)', url: '/blog/curtain-wall-trends.jpg' },
  { label: 'Large-Span Glass Pavilion', url: '/blog/large-span-curtain.jpg' },
  { label: 'Teak Joinery Craft', url: '/img/joinery-detail.jpg' },
  { label: 'Hospitality Restaurant', url: '/img/restaurant-interior.jpg' },
  { label: 'Workshop Sanding', url: '/img/workshop-sanding.jpg' },
  { label: 'Workshop Daybed', url: '/img/workshop-daybed.jpg' },
  { label: 'Living Room Teak', url: '/img/living-room-teak.jpg' },
];

const PRESET_PRODUCT_IMAGES = [
  { label: 'Kursi Jati Restoran 1', url: '/catalog/rst-01.jpg' },
  { label: 'Kursi Jati Restoran 2', url: '/catalog/rst-02.jpg' },
  { label: 'Kursi Rotan Jati 1', url: '/catalog/rst-04.jpg' },
  { label: 'Meja Makan Jati', url: '/catalog/rst-17.jpg' },
  { label: 'Kursi Kolam Renang', url: '/catalog/out-01.jpg' },
  { label: 'Lampu Gantung Jati', url: '/catalog/lmp-01.jpg' },
  { label: 'Nampan In-Room Jati', url: '/catalog/roo-01.jpg' },
  { label: 'Interior Restoran', url: '/img/restaurant-interior.jpg' },
];

const Admin = () => {
  const navigate = useNavigate();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Main Admin Tab: 'products' (Kelola Produk) | 'blogs' (Kelola Blog)
  const [mainSection, setMainSection] = useState('products');

  // Notification State
  const [notification, setNotification] = useState(null);

  // ================= PRODUK STATE =================
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productSearch, setProductSearch] = useState('');
  
  // Product Modal / Form
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);
  const [productFormData, setProductFormData] = useState({
    ref: '',
    category: 'Restoran',
    subCategory: 'Kursi',
    title: '',
    material: 'Kayu Jati',
    image: '/catalog/rst-01.jpg',
    note: 'Ukuran umum & custom'
  });

  // ================= BLOG STATE =================
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [blogActiveTab, setBlogActiveTab] = useState('list'); // 'list' | 'editor'
  const [blogSearch, setBlogSearch] = useState('');
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [isUploadingBlogImg, setIsUploadingBlogImg] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Architecture & Tech',
    tags: 'Curtain Wall, Wood Craft',
    image: '/blog/fbc-expo.jpg',
    summary: '',
    content: '',
    author: 'Admin'
  });

  // Check auth on load
  useEffect(() => {
    const isAuth = localStorage.getItem('kriya_admin_auth') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      setCurrentUser(getCachedUser());
      loadProductsData();
      loadBlogsData();
    }
  }, []);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // ================= AUTH HANDLERS =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingAuth(true);
    setLoginError('');

    try {
      const res = await apiLogin(username.trim(), password);
      setIsAuthenticated(true);
      setCurrentUser(res.user || { username: username.trim(), name: 'Administrator' });
      showNotification('Berhasil masuk sebagai Administrator!');
      loadProductsData();
      loadBlogsData();
    } catch (err) {
      setLoginError(err.message || 'Gagal login. Periksa username dan password Anda.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setLoginError('');
  };

  const handleLogout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
  };

  // ================= PRODUK LOGIC =================
  const loadProductsData = async () => {
    setIsLoadingProducts(true);
    try {
      const data = await apiGetProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    // suggest next ref
    const catPrefix = productCategoryFilter === 'KolamRenang' ? 'OUT' :
                      productCategoryFilter === 'Lampu' ? 'LMP' :
                      productCategoryFilter === 'InRoom' ? 'ROO' : 'RST';
    const nextNum = products.length + 1;
    setProductFormData({
      ref: `${catPrefix}-${String(nextNum).padStart(2, '0')}`,
      category: productCategoryFilter === 'All' ? 'Restoran' : productCategoryFilter,
      subCategory: 'Kursi',
      title: '',
      material: 'Kayu Jati',
      image: '/catalog/rst-01.jpg',
      note: 'Ukuran umum & custom'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id || prod.ref);
    setProductFormData({
      ref: prod.ref,
      category: prod.category || 'Restoran',
      subCategory: prod.subCategory || 'Kursi',
      title: prod.title || '',
      material: prod.material || 'Kayu Jati',
      image: prod.image || '/catalog/rst-01.jpg',
      note: prod.note || 'Ukuran umum & custom'
    });
    setIsProductModalOpen(true);
  };

  const handleProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProductImg(true);
    try {
      const url = await apiUploadImage(file);
      setProductFormData(prev => ({ ...prev, image: url }));
      showNotification('Foto produk berhasil diunggah!');
    } catch (err) {
      alert('Gagal mengunggah foto: ' + err.message);
    } finally {
      setIsUploadingProductImg(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productFormData.title.trim() || !productFormData.ref.trim()) {
      alert('Kode Referensi dan Judul Produk wajib diisi!');
      return;
    }

    try {
      if (editingProductId) {
        await apiUpdateProduct(editingProductId, productFormData);
        showNotification(`Produk "${productFormData.title}" berhasil diperbarui!`);
      } else {
        await apiCreateProduct(productFormData);
        showNotification(`Produk baru "${productFormData.title}" berhasil ditambahkan ke katalog!`);
      }
      setIsProductModalOpen(false);
      loadProductsData();
    } catch (err) {
      alert('Gagal menyimpan produk: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id, ref, title) => {
    if (window.confirm(`Hapus produk "${title}" (${ref}) dari katalog?`)) {
      try {
        await apiDeleteProduct(id, ref);
        showNotification(`Produk "${title}" berhasil dihapus.`);
        loadProductsData();
      } catch (err) {
        alert('Gagal menghapus produk: ' + err.message);
      }
    }
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    const matchSearch = !productSearch || 
      (p.title && p.title.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.ref && p.ref.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.material && p.material.toLowerCase().includes(productSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

  // ================= BLOG LOGIC =================
  const loadBlogsData = async () => {
    setIsLoadingBlogs(true);
    try {
      const data = await apiGetBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const handleNewPost = () => {
    setEditingBlogId(null);
    setBlogFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Architecture & Tech',
      tags: 'Curtain Wall, Wood Craft',
      image: '/blog/fbc-expo.jpg',
      summary: '',
      content: '',
      author: currentUser?.name || 'Admin'
    });
    setBlogActiveTab('editor');
  };

  const handleEditBlog = (post) => {
    setEditingBlogId(post.id || post.slug);
    setBlogFormData({
      title: post.title,
      date: post.date,
      category: post.category || 'Architecture & Tech',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      image: post.image || '/blog/fbc-expo.jpg',
      summary: post.summary || '',
      content: post.content || '',
      author: post.author || 'Admin'
    });
    setBlogActiveTab('editor');
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (idOrSlug, title) => {
    if (window.confirm(`Hapus artikel "${title}"?`)) {
      try {
        await apiDeleteBlog(idOrSlug);
        showNotification(`Artikel "${title}" berhasil dihapus.`);
        loadBlogsData();
      } catch (err) {
        alert('Gagal menghapus artikel: ' + err.message);
      }
    }
  };

  const handleBlogImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBlogImg(true);
    try {
      const url = await apiUploadImage(file);
      setBlogFormData(prev => ({ ...prev, image: url }));
      showNotification('Gambar artikel berhasil diunggah!');
    } catch (err) {
      alert('Gagal mengunggah gambar: ' + err.message);
    } finally {
      setIsUploadingBlogImg(false);
    }
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    if (!blogFormData.title.trim() || !blogFormData.summary.trim()) {
      alert('Judul dan Ringkasan wajib diisi!');
      return;
    }

    try {
      const payload = {
        id: editingBlogId || undefined,
        ...blogFormData,
        title: blogFormData.title.trim(),
        summary: blogFormData.summary.trim(),
        content: blogFormData.content.trim() || blogFormData.summary.trim()
      };
      await apiSaveBlog(payload);
      showNotification(editingBlogId ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil diterbitkan!');
      setBlogActiveTab('list');
      loadBlogsData();
    } catch (err) {
      alert('Gagal menyimpan artikel: ' + err.message);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    (b.category && b.category.toLowerCase().includes(blogSearch.toLowerCase()))
  );

  // If not logged in, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-brand-icon">
              <ShieldCheck size={36} />
            </div>
            <h2>Portal Admin</h2>
            <p>Kriya Kayu Nusantara - Hostinger MySQL Database</p>
          </div>

          {loginError && (
            <div className="login-alert error">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Masukkan username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full login-btn"
              disabled={isLoadingAuth}
            >
              {isLoadingAuth ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <div className="demo-credentials-box">
            <div className="demo-info">
              <span className="demo-badge">Akun Default MySQL</span>
              <p>Username: <strong>admin</strong> | Password: <strong>admin123</strong></p>
            </div>
            <button type="button" className="demo-autofill-btn" onClick={handleFillDemo}>
              Isi Otomatis
            </button>
          </div>

          <div className="login-footer">
            <Link to="/" className="back-to-site">
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Kembali ke Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= DASHBOARD UI =================
  return (
    <div className="admin-dashboard">
      {/* Top Navigation Bar */}
      <header className="admin-topbar">
        <div className="admin-container topbar-content">
          <div className="topbar-left">
            <Link to="/" className="admin-logo-link" title="Kunjungi Website Publik">
              <img src="/brand-logo.png" alt="Kriya Kayu" className="admin-logo-img" />
              <span className="admin-badge">Admin Panel</span>
            </Link>
          </div>

          <div className="topbar-right">
            <div className="admin-user-info">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <div className="user-details">
                <span className="user-name">{currentUser?.name || 'Administrator'}</span>
                <span className="user-role">Hostinger MySQL</span>
              </div>
            </div>

            <Link to="/products" target="_blank" className="btn-icon-subtle" title="Buka Katalog Produk">
              <ExternalLink size={18} />
            </Link>

            <button onClick={handleLogout} className="btn-logout" title="Keluar">
              <LogOut size={18} />
              <span className="logout-text">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Section Navigation (Kelola Produk vs Kelola Blog) */}
      <div className="admin-main-nav">
        <div className="admin-container main-nav-container">
          <button
            className={`main-nav-btn ${mainSection === 'products' ? 'active' : ''}`}
            onClick={() => setMainSection('products')}
          >
            <Package size={20} />
            <span>Kelola Produk</span>
            <span className="count-pill">{products.length}</span>
          </button>
          <button
            className={`main-nav-btn ${mainSection === 'blogs' ? 'active' : ''}`}
            onClick={() => setMainSection('blogs')}
          >
            <FileText size={20} />
            <span>Kelola Blog</span>
            <span className="count-pill">{blogs.length}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <main className="admin-content admin-container">
        {notification && (
          <div className={`admin-toast ${notification.type}`}>
            <CheckCircle2 size={18} />
            <span>{notification.msg}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 1: KELOLA PRODUK KATALOG                          */}
        {/* ========================================================= */}
        {mainSection === 'products' && (
          <div className="products-manager">
            {/* Header Action Bar */}
            <div className="section-head-bar">
              <div>
                <h1 className="admin-page-title">Katalog Produk</h1>
                <p className="admin-page-subtitle">Kelola daftar furnitur, kode referensi, material, dan foto produk</p>
              </div>
              <div className="section-head-actions">
                <button 
                  onClick={loadProductsData} 
                  className="btn btn-secondary btn-icon-only" 
                  title="Segarkan Data"
                >
                  <RefreshCw size={16} className={isLoadingProducts ? 'spin' : ''} />
                </button>
                <button 
                  onClick={handleOpenAddProduct} 
                  className="btn btn-primary"
                >
                  <Plus size={18} /> Tambah Produk Baru
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="filter-search-card">
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Cari kode ref (RST-01), judul produk, atau material..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
                {productSearch && (
                  <button className="clear-btn" onClick={() => setProductSearch('')}>
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="category-chips">
                {defaultCategories.map(cat => (
                  <button
                    key={cat.id}
                    className={`category-chip ${productCategoryFilter === cat.id ? 'active' : ''}`}
                    onClick={() => setProductCategoryFilter(cat.id)}
                  >
                    {cat.labelId || cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table Card */}
            <div className="admin-table-card">
              <div className="table-header-info">
                <h3>Daftar Produk ({filteredProducts.length})</h3>
                <span className="text-muted">Database: u419950057_kriyakayu</span>
              </div>

              {isLoadingProducts ? (
                <div className="loading-state">
                  <RefreshCw size={24} className="spin" />
                  <p>Memuat data produk dari database MySQL...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="empty-state">
                  <Package size={48} className="empty-icon" />
                  <h4>Tidak ada produk ditemukan</h4>
                  <p>Coba sesuaikan kata kunci pencarian atau kategori filter.</p>
                  <button className="btn btn-secondary mt-sm" onClick={handleOpenAddProduct}>
                    <Plus size={16} /> Tambah Produk Pertama
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Foto</th>
                        <th style={{ width: '100px' }}>Kode Ref</th>
                        <th>Judul Produk</th>
                        <th>Kategori</th>
                        <th>Sub-Kategori</th>
                        <th>Material</th>
                        <th>Ukuran / Note</th>
                        <th style={{ width: '120px', textAlign: 'right' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((prod, idx) => (
                        <tr key={prod.id || prod.ref || idx}>
                          <td>
                            <div className="product-table-thumb">
                              <img src={prod.image} alt={prod.title} loading="lazy" />
                            </div>
                          </td>
                          <td>
                            <span className="ref-badge">{prod.ref}</span>
                          </td>
                          <td>
                            <div className="product-table-title">{prod.title}</div>
                          </td>
                          <td>
                            <span className={`cat-tag cat-${prod.category}`}>
                              {prod.category}
                            </span>
                          </td>
                          <td>
                            <span className="subcat-text">{prod.subCategory}</span>
                          </td>
                          <td>
                            <span className="material-text">{prod.material}</span>
                          </td>
                          <td>
                            <span className="note-text">{prod.note || 'Ukuran umum & custom'}</span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions">
                              <button
                                className="action-btn edit"
                                onClick={() => handleOpenEditProduct(prod)}
                                title="Edit Produk"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDeleteProduct(prod.id, prod.ref, prod.title)}
                                title="Hapus Produk"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: KELOLA BLOG                                    */}
        {/* ========================================================= */}
        {mainSection === 'blogs' && (
          <div className="blogs-manager">
            {/* Sub-Tabs: List vs Editor */}
            <div className="admin-tabs-nav">
              <button
                className={`tab-btn ${blogActiveTab === 'list' ? 'active' : ''}`}
                onClick={() => setBlogActiveTab('list')}
              >
                <Layers size={18} />
                <span>Daftar Artikel ({blogs.length})</span>
              </button>
              <button
                className={`tab-btn ${blogActiveTab === 'editor' ? 'active' : ''}`}
                onClick={handleNewPost}
              >
                <Plus size={18} />
                <span>{editingBlogId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</span>
              </button>
            </div>

            {/* TAB: LIST ARTIKEL */}
            {blogActiveTab === 'list' && (
              <div className="admin-table-card">
                <div className="table-search-bar">
                  <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Cari judul artikel atau kategori..."
                      value={blogSearch}
                      onChange={(e) => setBlogSearch(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleNewPost}>
                    <Plus size={18} /> Buat Artikel
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Cover</th>
                        <th>Judul & Ringkasan</th>
                        <th>Kategori</th>
                        <th>Tanggal</th>
                        <th>Pembaca</th>
                        <th style={{ width: '130px', textAlign: 'right' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.map((b) => (
                        <tr key={b.id || b.slug}>
                          <td>
                            <div className="table-thumb">
                              <img src={b.image} alt={b.title} loading="lazy" />
                            </div>
                          </td>
                          <td>
                            <div className="table-title">{b.title}</div>
                            <div className="table-summary">{b.summary}</div>
                          </td>
                          <td>
                            <span className="table-badge">{b.category}</span>
                          </td>
                          <td>
                            <span className="table-date">{b.date}</span>
                          </td>
                          <td>
                            <span className="table-views"><Eye size={14} /> {b.views || 0}</span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions">
                              <Link
                                to={`/blog/${b.slug || b.id}`}
                                target="_blank"
                                className="action-btn preview"
                                title="Lihat di Web"
                              >
                                <ExternalLink size={16} />
                              </Link>
                              <button
                                className="action-btn edit"
                                onClick={() => handleEditBlog(b)}
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDeleteBlog(b.slug || b.id, b.title)}
                                title="Hapus"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: EDITOR ARTIKEL */}
            {blogActiveTab === 'editor' && (
              <div className="admin-editor-card">
                <div className="editor-card-header">
                  <h2>{editingBlogId ? 'Perbarui Artikel' : 'Publikasikan Artikel Baru'}</h2>
                  <p>Isi form di bawah untuk menambahkan artikel ke MySQL database</p>
                </div>

                <form onSubmit={handleSubmitBlog} className="editor-form">
                  <div className="form-group">
                    <label>Judul Artikel *</label>
                    <input
                      type="text"
                      placeholder="Contoh: Seni Pertukangan Kayu Jati Solid"
                      value={blogFormData.title}
                      onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row grid-2">
                    <div className="form-group">
                      <label>Kategori *</label>
                      <select
                        value={blogFormData.category}
                        onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                      >
                        <option value="Architecture & Tech">Architecture & Tech</option>
                        <option value="Craftsmanship">Craftsmanship</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Sustainability">Sustainability</option>
                        <option value="Material & Finishes">Material & Finishes</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Tanggal Publikasi</label>
                      <input
                        type="date"
                        value={blogFormData.date}
                        onChange={(e) => setBlogFormData({ ...blogFormData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Cover / Foto Artikel</label>
                    <div className="image-input-group">
                      <input
                        type="text"
                        placeholder="/blog/nama-foto.jpg atau https://..."
                        value={blogFormData.image}
                        onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                      />
                      <label className="btn-upload">
                        <Upload size={16} /> Unggah File
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleBlogImageUpload}
                        />
                      </label>
                    </div>
                    {isUploadingBlogImg && <span className="uploading-hint">Mengunggah ke server...</span>}
                  </div>

                  <div className="form-group">
                    <label>Ringkasan Singkat (Lead Paragraph) *</label>
                    <textarea
                      rows={3}
                      placeholder="Tulis ringkasan 1-2 kalimat untuk kartu depan..."
                      value={blogFormData.summary}
                      onChange={(e) => setBlogFormData({ ...blogFormData, summary: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Konten Lengkap Artikel *</label>
                    <textarea
                      rows={10}
                      placeholder="Tulis artikel lengkap di sini..."
                      value={blogFormData.content}
                      onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                      required
                    />
                  </div>

                  <div className="editor-actions">
                    <button type="submit" className="btn btn-primary">
                      {editingBlogId ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setBlogActiveTab('list')}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL FORM: TAMBAH / EDIT PRODUK KATALOG                  */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsProductModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProductId ? 'Edit Produk Katalog' : 'Tambah Produk Baru'}</h3>
              <button className="modal-close-btn" onClick={() => setIsProductModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="modal-form">
              <div className="modal-form-grid">
                <div className="form-group">
                  <label>Kode Referensi *</label>
                  <input
                    type="text"
                    placeholder="Contoh: RST-46, OUT-10, LMP-11"
                    value={productFormData.ref}
                    onChange={(e) => setProductFormData({ ...productFormData, ref: e.target.value.toUpperCase() })}
                    required
                  />
                  <small className="form-hint">Kode identitas katalog (misal RST-01 untuk restoran)</small>
                </div>

                <div className="form-group">
                  <label>Kategori Katalog *</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                  >
                    <option value="Restoran">Restoran (Restaurant)</option>
                    <option value="KolamRenang">Kolam Renang & Taman (Poolside & Garden)</option>
                    <option value="Lampu">Lampu & Dekoratif (Lighting & Decorative)</option>
                    <option value="InRoom">In-Room Essentials</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label>Judul Produk *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Wood Chair, Teak Dining Table"
                    value={productFormData.title}
                    onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Sub-Kategori</label>
                  <input
                    type="text"
                    placeholder="Contoh: Kursi, Meja, Daybed, Tray"
                    value={productFormData.subCategory}
                    onChange={(e) => setProductFormData({ ...productFormData, subCategory: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label>Material Bahan *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Kayu Jati, Rotan Alami + Kayu Jati"
                    value={productFormData.material}
                    onChange={(e) => setProductFormData({ ...productFormData, material: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Keterangan / Ukuran</label>
                  <input
                    type="text"
                    placeholder="Contoh: Ukuran umum & custom"
                    value={productFormData.note}
                    onChange={(e) => setProductFormData({ ...productFormData, note: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Foto Produk (Path atau URL) *</label>
                <div className="image-input-group">
                  <input
                    type="text"
                    placeholder="/catalog/rst-01.jpg atau https://..."
                    value={productFormData.image}
                    onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                    required
                  />
                  <label className="btn-upload">
                    <Upload size={16} /> Unggah Foto
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleProductImageUpload}
                    />
                  </label>
                </div>
                {isUploadingProductImg && <span className="uploading-hint">Mengunggah foto ke server...</span>}

                {/* Preview Box */}
                {productFormData.image && (
                  <div className="product-form-preview">
                    <img src={productFormData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                    <span>Preview Foto Produk</span>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsProductModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProductId ? 'Simpan Perubahan' : 'Tambah ke Katalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
