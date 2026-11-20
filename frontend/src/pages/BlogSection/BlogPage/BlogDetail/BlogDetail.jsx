import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetail.css";
import { API_URL } from "../../../../config/api";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  return diff === 0 ? "Today" : `${diff} days ago`;
}

function parseSectionContent(content) {
  const lines = content.split("\n").filter((l) => l.trim());
  const listStart = lines.findIndex((l) => l.startsWith("Pre-Sale"));
  if (listStart === -1) return { paras: lines, listTitle: null, listItems: [] };
  return {
    paras: lines.slice(0, listStart),
    listTitle: lines[listStart],
    listItems: lines.slice(listStart + 1),
  };
}

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    name: "",
    email: "",
    body: "",
    save: false,
  });
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [search, setSearch] = useState("");

  const getImg = (f) => `${API_URL}/uploads/${f}`;

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/blog/${id}`)
        .then((r) => {
          if (!r.ok) throw new Error(`Blog fetch failed: ${r.status}`);
          return r.json();
        })
        .then((d) => {
          // handle both { blog, comments } and direct blog object
          if (d.blog) return d;
          return { blog: d, comments: d.comments || [] };
        }),
      fetch(`${API_URL}/blog`)
        .then((r) => r.json())
        .catch(() => []),
    ])
      .then(([detail, posts]) => {
        setData(detail);
        setAllPosts(Array.isArray(posts) ? posts : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("BlogDetail fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleComment = async () => {
    setPostError(null);
    if (!comment.name || !comment.email || !comment.body) {
      setPostError("All fields are required.");
      return;
    }
    setPosting(true);
    try {
      const res = await fetch(`${API_URL}/blog/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blog_id: id,
          name: comment.name,
          email: comment.email,
          comment: comment.body, // backend expects "comment" not "body"
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setPostSuccess(true);
      setComment({ name: "", email: "", body: "", save: false });
      // refresh comments
      fetch(`${API_URL}/blog/${id}`)
        .then((r) => r.json())
        .then(setData);
    } catch {
      setPostError("Failed to post comment.");
    } finally {
      setPosting(false);
    }
  };

  if (loading)
    return (
      <div className="bd-page">
        <p className="bd-state">Loading...</p>
      </div>
    );
  if (!data?.blog)
    return (
      <div className="bd-page">
        <p className="bd-state bd-error">
          Blog not found. Check that <code>GET /blog/{id}</code> returns a valid
          response.
        </p>
      </div>
    );

  const { blog, comments = [] } = data;
  const { paras, listTitle, listItems } = parseSectionContent(
    blog.section_content || "",
  );
  const latestPosts = allPosts.slice(0, 3);
  const categories = [
    { name: "Production", count: "03" },
    { name: "Modern Tech", count: "08" },
    { name: "Video Production", count: "02" },
    { name: "Video Gaming", count: "01" },
    { name: "Solution", count: "04" },
  ];
  const popularTags = [
    "Production",
    "Videos",
    "Servicing",
    "Movie",
    "Digital",
    "Movie Production",
  ];

  return (
    <div className="bd-page">
      <div className="container-fluid px-4 px-md-5 p-5">
        <div className="row g-5">
          {/* ── LEFT SIDEBAR ── */}
          <div className="col-12 col-lg-3">
            {/* Search */}
            <div className="bd-sidebar-block">
              <h4 className="bd-sidebar-title">Search</h4>
              <div className="bd-search-wrap">
                <input
                  className="bd-search-input"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fas fa-search bd-search-icon"></i>
              </div>
            </div>

            {/* Latest Posts */}
            <div className="bd-sidebar-block">
              <h4 className="bd-sidebar-title">Latest Posts</h4>
              <div className="bd-latest-posts">
                {latestPosts.map((p) => (
                  <div
                    key={p.id}
                    className="bd-latest-item"
                    onClick={() => navigate(`/blog/${p.id}`)}
                  >
                    <img
                      src={getImg(p.primary_image)}
                      alt={p.title}
                      className="bd-latest-img"
                    />
                    <div>
                      <p className="bd-latest-date">
                        {formatDate(p.created_at)}
                      </p>
                      <p className="bd-latest-ttl">{p.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bd-sidebar-block">
              <h4 className="bd-sidebar-title">Categories</h4>
              {categories.map((c) => (
                <div key={c.name} className="bd-cat-row">
                  <span>{c.name}</span>
                  <span className="bd-cat-count">({c.count})</span>
                </div>
              ))}
            </div>

            {/* Popular Tags */}
            <div className="bd-sidebar-block">
              <h4 className="bd-sidebar-title">Popular Tags</h4>
              <div className="bd-tags-wrap">
                {popularTags.map((t) => (
                  <span key={t} className="bd-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="col-12 col-lg-9">
            {/* Hero Image */}
            <img
              src={getImg(blog.big_image || blog.primary_image)}
              alt={blog.title}
              className="bd-hero-img"
            />

            {/* Meta */}
            <div className="bd-meta">
              <span>
                <i className="far fa-user"></i>
                {blog.author}
              </span>
              <span>
                <i className="far fa-calendar-alt"></i>
                {formatDate(blog.created_at)}
              </span>
              <span>
                <i className="far fa-bookmark"></i>
                {String(blog.minutes_to_read).padStart(2, "0")} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="bd-title">{blog.title}</h1>

            {/* Description */}
            {(blog.description || "")
              .split("\n")
              .filter(Boolean)
              .map((p, i) => (
                <p key={i} className="bd-para">
                  {p}
                </p>
              ))}

            {/* Quote block */}
            {blog.quote && (
              <div className="bd-quote-block">
                <p className="bd-quote-text">"{blog.quote}"</p>
                <div className="bd-quote-author">
                  <div>
                    <p className="bd-quote-name">{blog.author}</p>
                    <p className="bd-quote-role">Content Writer</p>
                  </div>
                  <i className="fas fa-quote-right bd-quote-icon"></i>
                </div>
              </div>
            )}

            {/* Section */}
            {blog.section_title && (
              <h2 className="bd-section-title">{blog.section_title}</h2>
            )}
            {paras.map((p, i) => (
              <p key={i} className="bd-para">
                {p}
              </p>
            ))}
            {listTitle && <h3 className="bd-list-title">{listTitle}</h3>}
            {listItems.length > 0 && (
              <ol className="bd-list">
                {listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            )}

            {/* Two images */}
            {(blog.image1 || blog.image2) && (
              <div className="bd-two-imgs">
                {blog.image1 && (
                  <img
                    src={getImg(blog.image1)}
                    alt=""
                    className="bd-two-img"
                  />
                )}
                {blog.image2 && (
                  <img
                    src={getImg(blog.image2)}
                    alt=""
                    className="bd-two-img"
                  />
                )}
              </div>
            )}

            {/* Tags + Share */}
            <div className="bd-footer-row">
              <div className="bd-tags-row">
                <span className="bd-tags-label">Tags</span>
                {(blog.tags || []).map((t) => (
                  <span key={t} className="bd-tag bd-tag-sm">
                    {t}
                  </span>
                ))}
              </div>
              <span className="bd-share">Share</span>
            </div>

            {/* ── Comments ── */}
            <h2 className="bd-comments-heading">
              Comments{" "}
              <span className="bd-comments-count">
                {String(comments.length).padStart(2, "0")}
              </span>
            </h2>

            <div className="bd-comments-list">
              {comments.map((c, i) => (
                <div key={i} className="bd-comment-card">
                  <div className="bd-comment-header">
                    <img
                      src={`https://i.pravatar.cc/48?u=${c.name}`}
                      alt={c.name}
                      className="bd-comment-avatar"
                    />
                    <div>
                      <p className="bd-comment-name">{c.name}</p>
                      <p className="bd-comment-time">{timeAgo(c.created_at)}</p>
                    </div>
                    <button className="bd-reply-btn">Reply</button>
                  </div>
                  <p className="bd-comment-body">{c.comment}</p>
                  {c.replies?.map((r, j) => (
                    <div key={j} className="bd-reply-card">
                      <div className="bd-comment-header">
                        <img
                          src={`https://i.pravatar.cc/48?u=${r.name}`}
                          alt={r.name}
                          className="bd-comment-avatar"
                        />
                        <div>
                          <p className="bd-comment-name">{r.name}</p>
                          <p className="bd-comment-time">
                            {timeAgo(r.created_at)}
                          </p>
                        </div>
                        <button className="bd-reply-btn">Reply</button>
                      </div>
                      <p className="bd-comment-body">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ── Leave A Comment ── */}
            <div className="bd-leave-comment">
              <h2 className="bd-lc-title">Leave A Comment</h2>
              <p className="bd-lc-sub">
                Your email address will not be published. Required fields are
                marked.
              </p>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <input
                    className="bd-input"
                    placeholder="Name*"
                    value={comment.name}
                    onChange={(e) =>
                      setComment((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="bd-input"
                    type="email"
                    placeholder="Email Address*"
                    value={comment.email}
                    onChange={(e) =>
                      setComment((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
              </div>
              <textarea
                className="bd-input bd-textarea"
                placeholder="Please Enter Your Comment Here"
                value={comment.body}
                onChange={(e) =>
                  setComment((p) => ({ ...p, body: e.target.value }))
                }
              />
              <label className="bd-save-label">
                <input
                  type="checkbox"
                  checked={comment.save}
                  onChange={() => setComment((p) => ({ ...p, save: !p.save }))}
                />
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>

              {postError && <p className="bd-post-error">{postError}</p>}
              {postSuccess && (
                <p className="bd-post-success">Comment posted!</p>
              )}

              <button
                className="bd-btn-comment"
                onClick={handleComment}
                disabled={posting}
              >
                {posting ? "Posting..." : "Post A Comment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
