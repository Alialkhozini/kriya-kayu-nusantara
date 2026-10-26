// API Client for Kriya Kayu Nusantara
// Connects to Hostinger MySQL backend with graceful offline fallback

import { products as fallbackProducts } from '../data/products';
import { getStoredBlogs, saveBlog as fallbackSaveBlog, deleteBlog as fallbackDeleteBlog } from '../data/blogs';

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('kriya_auth_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// ================= AUTH =================
export async function apiLogin(username, password) {
  try {
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
  } catch (err) {
    // Local offline demo fallback
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('kriya_admin_auth', 'true');
      return { success: true, message: 'Login demo berhasil (mode offline)', user: { username: 'admin', name: 'Administrator' } };
    }
    throw err;
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
      // update cache
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(json.data));
      return json.data;
    }
  } catch (err) {
    console.warn('API Products unavailable, using fallback/cached data:', err);
  }

  // Fallback to cache or initial products
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
  try {
    const res = await fetch(`${API_BASE}/products.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(productData)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Gagal menambahkan produk');
    return json.data;
  } catch (err) {
    // Offline fallback: save to localStorage cache
    console.warn('API offline, saving product locally:', err);
    const cached = localStorage.getItem(PRODUCT_STORAGE_KEY);
    const list = cached ? JSON.parse(cached) : [...fallbackProducts];
    const newProd = {
      ...productData,
      id: Date.now(),
      ref: productData.ref || `PROD-${Date.now()}`
    };
    list.unshift(newProd);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(list));
    return newProd;
  }
}

export async function apiUpdateProduct(id, productData) {
  try {
    const res = await fetch(`${API_BASE}/products.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ id, ...productData })
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Gagal memperbarui produk');
    return json.data;
  } catch (err) {
    console.warn('API offline, updating product locally:', err);
    const cached = localStorage.getItem(PRODUCT_STORAGE_KEY);
    const list = cached ? JSON.parse(cached) : [...fallbackProducts];
    const idx = list.findIndex(p => p.id === id || p.ref === productData.ref);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...productData };
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(list));
      return list[idx];
    }
    throw err;
  }
}

export async function apiDeleteProduct(id, ref) {
  try {
    const res = await fetch(`${API_BASE}/products.php?id=${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Gagal menghapus produk');
    return json;
  } catch (err) {
    console.warn('API offline, deleting product locally:', err);
    const cached = localStorage.getItem(PRODUCT_STORAGE_KEY);
    const list = cached ? JSON.parse(cached) : [...fallbackProducts];
    const filtered = list.filter(p => p.id !== id && p.ref !== ref);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  }
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
      return json.data;
    }
  } catch (err) {
    console.warn('API Blogs unavailable, using local blogs:', err);
  }
  return getStoredBlogs();
}

export async function apiGetBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/blogs.php?slug=${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch (err) {
    console.warn('API get blog by slug error:', err);
  }
  const blogs = getStoredBlogs();
  return blogs.find(b => b.slug === slug || b.id === slug) || null;
}

export async function apiSaveBlog(blogData) {
  try {
    const method = blogData.id ? 'PUT' : 'POST';
    const res = await fetch(`${API_BASE}/blogs.php`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(blogData)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Gagal menyimpan artikel');
    return json.data;
  } catch (err) {
    console.warn('API save blog failed, using local storage:', err);
    return fallbackSaveBlog(blogData);
  }
}

export async function apiDeleteBlog(idOrSlug) {
  try {
    const res = await fetch(`${API_BASE}/blogs.php?slug=${encodeURIComponent(idOrSlug)}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Gagal menghapus artikel');
    return json;
  } catch (err) {
    console.warn('API delete blog failed, using local storage:', err);
    return fallbackDeleteBlog(idOrSlug);
  }
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

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Gagal mengunggah gambar.');
  }
  return json.url;
}
