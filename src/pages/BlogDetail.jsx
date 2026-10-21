import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Eye, Share2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { getStoredBlogs, getBlogByIdOrSlug } from '../data/blogs';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [post, setPost] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const blogs = getStoredBlogs();
    setAllBlogs(blogs);
    const found = getBlogByIdOrSlug(id);
    if (found) {
      setPost(found);
    } else {
      // If not found by direct id or slug, fallback to first post
      if (blogs.length > 0) {
        setPost(blogs[0]);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!post) {
    return (
      <div className="container text-center py-xl">
        <h2>Memuat artikel...</h2>
        <Link to="/blog" className="btn btn-primary mt-md">Kembali ke Blog</Link>
      </div>
    );
  }

  // Calculate Previous and Next posts
  const currentIndex = allBlogs.findIndex(b => b.id === post.id || b.slug === post.slug);
  const prevPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  // Related posts (excluding current post)
  const relatedPosts = allBlogs.filter(b => b.id !== post.id && b.slug !== post.slug);
  const featuredRelated = relatedPosts[0] || null;
  const otherRelated = relatedPosts.slice(1, 4);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform) => {
    const url = encodeURIComponent(currentUrl);
    const text = encodeURIComponent(post.title);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'tumblr':
        shareUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${text}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${encodeURIComponent(window.location.origin + post.image)}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=500');
    }
  };

  return (
    <div className="blog-detail-page">
      <div className="container blog-detail-container">
        {/* Breadcrumb / Back button */}
        <div className="blog-detail-breadcrumb">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={16} />
            <span>Kembali ke Semua Artikel</span>
          </Link>
        </div>

        {/* 2-Column Layout matching Gambar 2 */}
        <div className="blog-detail-layout">
          {/* Main Article Column */}
          <main className="blog-main-column">
            <article className="blog-article-card">
              <h1 className="article-title">{post.title}</h1>

              {/* Date and Social Share Icons */}
              <div className="article-meta-bar">
                <span className="article-date">{post.date}</span>

                <div className="article-social-shares">
                  {/* Facebook */}
                  <button
                    className="share-btn share-fb"
                    onClick={() => handleShare('facebook')}
                    title="Share to Facebook"
                    aria-label="Share to Facebook"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button
                    className="share-btn share-li"
                    onClick={() => handleShare('linkedin')}
                    title="Share to LinkedIn"
                    aria-label="Share to LinkedIn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>

                  {/* Twitter / X */}
                  <button
                    className="share-btn share-x"
                    onClick={() => handleShare('twitter')}
                    title="Share to X"
                    aria-label="Share to X"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>

                  {/* Tumblr */}
                  <button
                    className="share-btn share-tb"
                    onClick={() => handleShare('tumblr')}
                    title="Share to Tumblr"
                    aria-label="Share to Tumblr"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.563 24c-5.111 0-6.702-3.376-6.702-6.171v-7.399H5.212V7.129c3.167-.936 4.398-3.411 4.606-5.834h3.693v5.185h4.159v3.95h-4.159v6.792c0 1.558.497 2.721 2.378 2.721h1.993V24h-3.319z"/>
                    </svg>
                  </button>

                  {/* Pinterest */}
                  <button
                    className="share-btn share-pin"
                    onClick={() => handleShare('pinterest')}
                    title="Share to Pinterest"
                    aria-label="Share to Pinterest"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.057.24-.19.291-.439.175-1.644-.766-2.673-3.171-2.673-5.105 0-4.156 3.02-7.973 8.71-7.973 4.573 0 8.127 3.259 8.127 7.614 0 4.544-2.865 8.202-6.841 8.202-1.336 0-2.593-.695-3.022-1.514l-.824 3.139c-.298 1.144-1.107 2.578-1.649 3.46 1.253.387 2.585.597 3.967.597 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Gray Highlight Callout Box matching Gambar 2 */}
              <div className="article-callout-box">
                <p>{post.summary}</p>
              </div>

              {/* Main Body Content */}
              <div className="article-body-content">
                {post.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Featured In-Article Image if present */}
              {post.image && (
                <div className="article-featured-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}

              {/* TAG Section matching Gambar 2 */}
              <div className="article-tags-row">
                <span className="tags-label">TAG:</span>
                <div className="tags-list">
                  {(post.tags && post.tags.length > 0 ? post.tags : ['Architecture', 'Wood Craft', 'Modern Design']).map((tag) => (
                    <span key={tag} className="article-tag-item">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Previous / Next Navigation matching Gambar 2 */}
              <div className="article-bottom-nav">
                <div className="nav-prev">
                  <span className="nav-dir-label">Previous</span>
                  {prevPost ? (
                    <Link to={`/blog/${prevPost.slug || prevPost.id}`} className="nav-post-title">
                      {prevPost.title}
                    </Link>
                  ) : (
                    <span className="nav-none">None</span>
                  )}
                </div>

                <div className="nav-next">
                  {nextPost ? (
                    <Link to={`/blog/${nextPost.slug || nextPost.id}`} className="nav-post-title">
                      {nextPost.title}
                    </Link>
                  ) : (
                    <span className="nav-none">None</span>
                  )}
                  <span className="nav-dir-label">Next</span>
                </div>
              </div>
            </article>
          </main>

          {/* Right Sidebar: Related Posts with red underline matching Gambar 2 */}
          <aside className="blog-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-header">
                <h3>Related Posts</h3>
                <div className="sidebar-red-line"></div>
              </div>

              <div className="sidebar-body">
                {/* Top Featured Related Post (Medium Large card) */}
                {featuredRelated && (
                  <div className="featured-related-item">
                    <Link to={`/blog/${featuredRelated.slug || featuredRelated.id}`} className="featured-related-media">
                      <img src={featuredRelated.image} alt={featuredRelated.title} />
                    </Link>
                    <h4 className="featured-related-title">
                      <Link to={`/blog/${featuredRelated.slug || featuredRelated.id}`}>
                        {featuredRelated.title}
                      </Link>
                    </h4>
                    <p className="featured-related-desc">{featuredRelated.summary}</p>
                  </div>
                )}

                {/* Smaller Thumbnail List Items */}
                <div className="small-related-list">
                  {otherRelated.map((item) => (
                    <div key={item.id || item.slug} className="small-related-item">
                      <Link to={`/blog/${item.slug || item.id}`} className="small-related-thumb">
                        <img src={item.image} alt={item.title} />
                      </Link>
                      <div className="small-related-info">
                        <h5>
                          <Link to={`/blog/${item.slug || item.id}`}>{item.title}</Link>
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;