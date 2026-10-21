import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, User, LogOut, Plus, Edit, Trash2, ExternalLink, 
  Eye, CheckCircle2, AlertCircle, RotateCcw, Image as ImageIcon,
  FileText, Tag, Calendar, Layers, ShieldCheck, ArrowRight
} from 'lucide-react';
import { getStoredBlogs, saveBlog, deleteBlog, resetDefaultBlogs } from '../data/blogs';
import './Admin.css';

const PRESET_IMAGES = [
  { label: 'FBC Expo (Curtain Wall)', url: '/blog/fbc-expo.jpg' },
  { label: 'Curtain Wall Trends (Night)', url: '/blog/curtain-wall-trends.jpg' },
  { label: 'Large-Span Glass Pavilion', url: '/blog/large-span-curtain.jpg' },
  { label: 'Teak Joinery Craft', url: '/img/joinery-detail.jpg' },
  { label: 'Hospitality Restaurant', url: '/img/restaurant-interior.jpg' },
  { label: 'Workshop Sanding', url: '/img/workshop-sanding.jpg' },
  { label: 'Workshop Daybed', url: '/img/workshop-daybed.jpg' },
  { label: 'Living Room Teak', url: '/img/living-room-teak.jpg' },
];

const Admin = () => {
  const navigate = useNavigate();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard State
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'editor'
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  // Form State for Create/Edit
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Architecture & Tech',
    tags: 'Curtain Wall, Modern Design',
    image: '/blog/fbc-expo.jpg',
    summary: '',
    content: '',
    author: 'Admin'
  });

  useEffect(() => {
    const auth = localStorage.getItem('kriya_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadBlogs();
    }
  }, []);

  const loadBlogs = () => {
    setBlogs(getStoredBlogs());
  };

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      localStorage.setItem('kriya_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      loadBlogs();
      showNotification('Berhasil masuk sebagai Administrator!');
    } else {
      setLoginError('Username atau kata sandi salah. Gunakan admin / admin123');
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setLoginError('');
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('kriya_admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Switch to Create Mode
  const handleNewPost = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Architecture & Tech',
      tags: 'Curtain Wall, Wood Craft',
      image: '/blog/fbc-expo.jpg',
      summary: '',
      content: '',
      author: 'Admin'
    });
    setActiveTab('editor');
  };

  // Switch to Edit Mode
  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      date: post.date,
      category: post.category || 'Architecture & Tech',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      image: post.image || '/blog/fbc-expo.jpg',
      summary: post.summary || '',
      content: post.content || '',
      author: post.author || 'Admin'
    });
    setActiveTab('editor');
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Delete Post
  const handleDelete = (id, title) => {
    if (window.confirm(`Hapus artikel "${title}"?`)) {
      deleteBlog(id);
      loadBlogs();
      showNotification(`Artikel "${title}" berhasil dihapus!`);
    }
  };

  // Reset Default
  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan semua artikel ke data default awal?')) {
      resetDefaultBlogs();
      loadBlogs();
      showNotification('Data artikel telah di-reset ke data default awal!');
    }
  };

  // Form Submit (Save / Update)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim()) {
      alert('Judul dan Ringkasan wajib diisi!');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const postPayload = {
      id: editingId || undefined,
      title: formData.title.trim(),
      date: formData.date,
      category: formData.category,
      tags: tagsArray,
      image: formData.image,
      summary: formData.summary.trim(),
      content: formData.content.trim() || formData.summary.trim(),
      author: formData.author || 'Admin'
    };

    saveBlog(postPayload);
    loadBlogs();
    showNotification(editingId ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil diterbitkan!');
    setActiveTab('list');
  };

  // Filtered post list
  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // If NOT Authenticated, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-brand-icon">
              <ShieldCheck size={36} />
            </div>
            <h2>Portal Admin</h2>
            <p>Kriya Kayu Nusantara - Content Management System</p>
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
                  placeholder="Masukkan username"
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

            <button type="submit" className="btn btn-primary w-full login-btn">
              Masuk ke Dashboard
            </button>
          </form>

          {/* Demo Helper Box */}
          <div className="demo-credentials-box">
            <div className="demo-info">
              <span className="demo-badge">Akun Demo</span>
              <p>Username: <strong>admin</strong> | Password: <strong>admin123</strong></p>
            </div>
            <button type="button" className="demo-autofill-btn" onClick={handleFillDemo}>
              Isi Otomatis
            </button>
          </div>

          <div className="admin-login-footer">
            <Link to="/" className="back-to-web">
              &larr; Kembali ke Beranda Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="admin-dashboard-page">
      {/* Top Notification Toast */}
      {notification && (
        <div className={`admin-toast ${notification.type}`}>
          <CheckCircle2 size={18} />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="admin-topbar">
        <div className="container admin-topbar-container">
          <div className="admin-topbar-brand">
            <div className="admin-badge">ADMIN DASHBOARD</div>
            <h1>Manajemen Blog & Artikel</h1>
          </div>

          <div className="admin-topbar-actions">
            <Link to="/blog" target="_blank" className="btn-topbar-web">
              <ExternalLink size={16} />
              <span>Lihat di Website</span>
            </Link>
            <button onClick={handleLogout} className="btn-topbar-logout">
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="container admin-main-content">
        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ backgroundColor: 'rgba(107, 68, 35, 0.12)', color: 'var(--c-primary, #6b4423)' }}>
              <FileText size={22} />
            </div>
            <div>
              <span className="stat-label">Total Artikel Blog</span>
              <h3 className="stat-value">{blogs.length}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ backgroundColor: 'rgba(37, 99, 235, 0.12)', color: '#2563eb' }}>
              <Eye size={22} />
            </div>
            <div>
              <span className="stat-label">Total Pembaca (Estimasi)</span>
              <h3 className="stat-value">{blogs.reduce((acc, b) => acc + (b.views || 0), 0).toLocaleString()}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
              <Layers size={22} />
            </div>
            <div>
              <span className="stat-label">Status Database</span>
              <h3 className="stat-value text-success">Aktif (Local Persist)</h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <FileText size={18} />
            <span>Daftar Artikel ({blogs.length})</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={handleNewPost}
          >
            <Plus size={18} />
            <span>{editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</span>
          </button>
        </div>

        {/* TAB 1: LIST VIEW */}
        {activeTab === 'list' && (
          <div className="admin-list-panel">
            <div className="admin-list-toolbar">
              <div className="list-search-box">
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="list-actions-bar">
                <button className="btn btn-secondary btn-sm" onClick={handleResetDefaults}>
                  <RotateCcw size={15} />
                  <span>Reset Default</span>
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleNewPost}>
                  <Plus size={16} />
                  <span>Buat Artikel Baru</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Foto</th>
                    <th>Judul & Ringkasan</th>
                    <th>Kategori & Tags</th>
                    <th>Tanggal</th>
                    <th style={{ textAlign: 'right', width: '160px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((post) => (
                      <tr key={post.id || post.slug}>
                        <td>
                          <div className="table-thumb">
                            <img src={post.image} alt={post.title} />
                          </div>
                        </td>
                        <td>
                          <div className="table-title">{post.title}</div>
                          <div className="table-summary">{post.summary}</div>
                        </td>
                        <td>
                          <span className="badge-category">{post.category || 'Article'}</span>
                          <div className="table-tags">
                            {post.tags && post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="table-tag-pill">#{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className="table-date">{post.date}</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="table-actions">
                            <Link
                              to={`/blog/${post.slug || post.id}`}
                              target="_blank"
                              className="btn-icon-action"
                              title="Lihat di Web"
                            >
                              <ExternalLink size={16} />
                            </Link>
                            <button
                              className="btn-icon-action edit"
                              onClick={() => handleEdit(post)}
                              title="Edit Artikel"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn-icon-action delete"
                              onClick={() => handleDelete(post.id, post.title)}
                              title="Hapus Artikel"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-lg">
                        Tidak ada artikel yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: EDITOR (CREATE / EDIT) */}
        {activeTab === 'editor' && (
          <div className="admin-editor-panel">
            <div className="editor-card">
              <div className="editor-card-header">
                <h2>{editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h2>
                <p>Isi formulir di bawah ini untuk menerbitkan artikel langsung ke halaman Blog.</p>
              </div>

              <form onSubmit={handleSubmitForm} className="editor-form">
                <div className="form-row">
                  <div className="form-group flex-2">
                    <label>Judul Artikel *</label>
                    <input
                      type="text"
                      placeholder="Contoh: 2025 FBC Expo: Cutting edge Technology..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label>Tanggal Publikasi *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label>Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Architecture & Tech">Architecture & Tech</option>
                      <option value="Industry Trends">Industry Trends</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Craftsmanship">Craftsmanship</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Sustainability">Sustainability</option>
                    </select>
                  </div>

                  <div className="form-group flex-2">
                    <label>Tags (Pisahkan dengan koma)</label>
                    <input
                      type="text"
                      placeholder="Curtain Wall, Expo 2025, Modern Architecture"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>
                </div>

                {/* Cover Image URL + Presets */}
                <div className="form-group">
                  <label>URL Gambar Sampul (Cover Image) *</label>
                  <input
                    type="text"
                    placeholder="/blog/fbc-expo.jpg atau URL gambar eksternal"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />

                  {/* Preset Selector */}
                  <div className="preset-selector-box mt-xs">
                    <span className="preset-label">Pilih Gambar Cepat:</span>
                    <div className="preset-chips">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          type="button"
                          key={preset.url}
                          className={`preset-chip ${formData.image === preset.url ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, image: preset.url })}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary / Lead paragraph for highlight box */}
                <div className="form-group">
                  <label>Ringkasan / Paragraf Sorotan (Summary) *</label>
                  <span className="input-hint">Paragraf ini akan muncul di kartu daftar blog dan di kotak abu-abu sorotan atas artikel.</span>
                  <textarea
                    rows="3"
                    placeholder="Tulis ringkasan singkat artikel..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* Full Article Content */}
                <div className="form-group">
                  <label>Isi Artikel Lengkap</label>
                  <span className="input-hint">Gunakan baris ganda (Enter dua kali) untuk memisahkan paragraf.</span>
                  <textarea
                    rows="8"
                    placeholder="Tulis isi paragraf artikel lengkap di sini..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="editor-form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('list')}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <CheckCircle2 size={18} />
                    <span>{editingId ? 'Simpan Perubahan' : 'Terbitkan Artikel Sekarang'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;