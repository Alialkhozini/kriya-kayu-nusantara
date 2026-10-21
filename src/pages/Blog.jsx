import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { getStoredBlogs } from '../data/blogs';
import './Blog.css';

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setBlogs(getStoredBlogs());
  }, []);

  const categories = useMemo(() => {
    const cats = ['All'];
    blogs.forEach((b) => {
      if (b.category && !cats.includes(b.category)) {
        cats.push(b.category);
      }
    });
    return cats;
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.summary && post.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="blog-page">
      {/* Hero Header */}
      <section className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <AnimatedSection className="container text-center blog-hero-content" yOffset={30}>
          <span className="blog-hero-eyebrow">Kriya Kayu Nusantara Blog</span>
          <h1>Insights, Architecture & Trends</h1>
          <p>
            Explore the latest advancements in architectural design, curtain wall innovations, sustainable wood craftsmanship, and modern interior aesthetics.
          </p>
        </AnimatedSection>
      </section>

      {/* Main Content Area */}
      <section className="blog-content-section">
        <div className="container">
          {/* Search & Filter Toolbar */}
          <div className="blog-toolbar">
            <div className="blog-search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Cari artikel, tren, atau topik..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="blog-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Cards Grid - matching Gambar 1 */}
          {paginatedBlogs.length > 0 ? (
            <div className="blog-grid">
              {paginatedBlogs.map((post, index) => (
                <AnimatedSection key={post.id || post.slug} delay={0.08 * (index % 3)} yOffset={25}>
                  <article className="blog-card">
                    <div className="blog-card-header">
                      <span className="blog-card-date">{post.date}</span>
                    </div>

                    <h2 className="blog-card-title">
                      <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                    </h2>

                    <Link to={`/blog/${post.slug || post.id}`} className="blog-card-media">
                      <img src={post.image} alt={post.title} loading="lazy" />
                    </Link>

                    <p className="blog-card-summary">{post.summary}</p>

                    <div className="blog-card-footer">
                      <Link to={`/blog/${post.slug || post.id}`} className="blog-card-learn-more">
                        <span>Learn More</span>
                        <div className="learn-more-arrow">
                          <span className="arrow-line"></span>
                          <span className="arrow-circle">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="blog-empty text-center">
              <h3>Tidak ada artikel yang cocok</h3>
              <p>Coba kata kunci pencarian lain atau pilih kategori Semua.</p>
              <button
                className="btn btn-secondary mt-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Pagination - matching Gambar 1 red active box */}
          {totalPages >= 1 && (
            <nav className="blog-pagination" aria-label="Blog Pagination">
              <button
                className="page-nav-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="page-nav-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;