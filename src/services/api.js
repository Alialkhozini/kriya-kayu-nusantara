// API Client for Kriya Kayu Nusantara
// Connects to Hostinger MySQL backend with graceful offline fallback

import { products as fallbackProducts } from '../data/products';
import { getStoredBlogs, saveBlog as fallbackSaveBlog, deleteBlog as fallbackDeleteBlog } from '../data/blogs';

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('kriya_auth_token') || '';
  if (!token) return {};
  return {
    'Authorization': `Bearer ${token}`,
    'X-Auth-Token': token
  };
}

// Normalize blog tags into an array
export function normalizeBlog(blog) {
  if (!blog) return blog;
  let tags = blog.tags;
  if (typeof tags === 'string') {
    tags = tags.split(',').map(t => t.trim()).filter(Boolean);
  } else if (!Array.isArray(tags)) {
    tags = [];
  }
  return {
    ...blog,
    tags
  };
}

// ================= AUTH =================
export async function apiLogin(username, password) {
  const res = await fetch(`${API_BASE}/auth.php?action=login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Login gagal.');
  }
  localStorage.setItem('kriya_auth_token', data.token);
  localStorage.setItem('kriya_admin_auth', 'true');
  localStorage.setItem('kriya_admin_user', JSON.stringify(data.user));
  return data;
}

export async function apiCheckAuth() {
  const token = localStorage.getItem('kriya_auth_token');
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/auth.php?action=check`, {
      headers: getAuthHeader()
    });
    const data = await res.json();
    return res.ok && data.success;
  } catch {
    return false;
  }
}

export function apiLogout() {
  localStorage.removeItem('kriya_auth_token');
  localStorage.removeItem('kriya_admin_auth');
  localStorage.removeItem('kriya_admin_user');
}

export function getCachedUser() {
  try {
    return JSON.parse(localStorage.getItem('kriya_admin_user') || 'null');
  } catch {
    return null;
  }
}

// ================= PRODUCTS CRUD =================
const PRODUCT_STORAGE_KEY = 'kriya_products_cache';

export async function apiGetProducts(category = '', search = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/products.php?${params.toString()}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(json.data));
      return json.data;
    }
  } catch (err) {
    console.warn('API Products unavailable, using fallback/cached data:', err);
  }

  const cached = localStorage.getItem(PRODUCT_STORAGE_KEY);
  let list = cached ? JSON.parse(cached) : fallbackProducts;

  if (category && category !== 'All') {
    list = list.filter(p => p.category === category);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => 
      (p.title && p.title.toLowerCase().includes(s)) ||
      (p.ref && p.ref.toLowerCase().includes(s)) ||
      (p.material && p.material.toLowerCase().includes(s)) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(s))
    );
  }
  return list;
}

export async function apiCreateProduct(productData) {
  const res = await fetch(`${API_BASE}/products.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(productData)
  });
  const json = await res.json().catch(() => ({ success: false, message: 'Server tidak mengembalikan respons JSON yang valid.' }));
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Gagal menambahkan produk (HTTP ${res.status})`);
  }
  return json.data;
}

export async function apiUpdateProduct(id, productData) {
  const res = await fetch(`${API_BASE}/products.php`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ id, ...productData })
  });
  const json = await res.json().catch(() => ({ success: false, message: 'Server tidak mengembalikan respons JSON yang valid.' }));
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Gagal memperbarui produk (HTTP ${res.status})`);
  }
  return json.data;
}

export async function apiDeleteProduct(id, ref) {
  const res = await fetch(`${API_BASE}/products.php?id=${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  const json = await res.json().catch(() => ({ success: false, message: 'Server tidak mengembalikan respons JSON yang valid.' }));
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Gagal menghapus produk (HTTP ${res.status})`);
  }
  return json;
}

// ================= BLOGS CRUD =================
export async function apiGetBlogs(search = '') {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/blogs.php?${params.toString()}`);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      const normalized = json.data.map(normalizeBlog);
      localStorage.setItem('kriya_blogs_v2', JSON.stringify(normalized));
      return normalized;
    }
  } catch (err) {
    console.warn('API Blogs unavailable, using local blogs:', err);
  }
  return getStoredBlogs().map(normalizeBlog);
}

export async function apiGetBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/blogs.php?slug=${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return normalizeBlog(json.data);
      }
    }
  } catch (err) {
    console.warn('API get blog by slug error:', err);
  }
  const blogs = getStoredBlogs().map(normalizeBlog);
  return blogs.find(b => b.slug === slug || String(b.id) === String(slug)) || null;
}

export async function apiSaveBlog(blogData) {
  const method = blogData.id ? 'PUT' : 'POST';
  const res = await fetch(`${API_BASE}/blogs.php`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(blogData)
  });
  const json = await res.json().catch(() => ({ success: false, message: 'Server tidak mengembalikan respons JSON yang valid.' }));
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Gagal menyimpan artikel (HTTP ${res.status})`);
  }
  return normalizeBlog(json.data);
}

export async function apiDeleteBlog(idOrSlug) {
  const res = await fetch(`${API_BASE}/blogs.php?slug=${encodeURIComponent(idOrSlug)}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  const json = await res.json().catch(() => ({ success: false, message: 'Server tidak mengembalikan respons JSON yang valid.' }));
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Gagal menghapus artikel (HTTP ${res.status})`);
  }
  return json;
}

// ================= IMAGE UPLOAD =================
export async function apiUploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/upload.php`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData
  });

  const json = await res.json().catch(() => ({ success: false, message: 'Gagal mengunggah foto ke server.' }));
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Gagal mengunggah gambar.');
  }
  return json.url;
}
