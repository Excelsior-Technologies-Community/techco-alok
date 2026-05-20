import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlogBySlug, getBlogs, toAssetUrl } from '../api/authApi';
import ourswiper1 from '../assets/images/our-blog-swiper1.jpg'
import ourswiper2 from '../assets/images/our-blog-swiper2.jpg'
import authorinfo from '../assets/images/author-info.png'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const popularTags = [
    "Consultants", "App Dev", "Solution", "IT", "TechSolutions",
    "Data", "Optimization", "UX Design", "Cybersecurity", "Startup"
];

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogDetail();
        fetchAllBlogs();
        window.scrollTo(0, 0);
    }, [slug]);

    const fetchBlogDetail = async () => {
        try {
            setLoading(true);
            const res = await getBlogBySlug(slug);
            if (res.data.success) {
                setBlog(res.data.data);
            } else {
                navigate('/ourblog');
            }
        } catch (error) {
            console.error("Error fetching blog detail:", error);
            navigate('/ourblog');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllBlogs = async () => {
        try {
            const res = await getBlogs();
            if (res.data.success) {
                setAllBlogs(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching all blogs:", error);
        }
    };

    if (loading || !blog) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const categoriesWithCount = allBlogs.reduce((acc, b) => {
        acc[b.category] = (acc[b.category] || 0) + 1;
        return acc;
    }, {});

    const latestPosts = allBlogs.slice(0, 3);

    return (
        <main className='Blog-Detail OurBlog'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area">
                            <h3 className='page-sub-heading'>
                                <span>Our Blogs 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Blog Details
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='exploring-swiper-sec'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog-swiper">
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    loop={true}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={{
                                        prevEl: '.left-navigation',
                                        nextEl: '.right-navigation',
                                    }}
                                    modules={[Autoplay, Navigation]}
                                    className="mySwiper our-Blog-swiper"
                                >
                                    <SwiperSlide>
                                        <div className="ourBlog-image">
                                            <img src={ourswiper1} alt="Blog Slide 1" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="ourBlog-image">
                                            <img src={ourswiper2} alt="Blog Slide 2" />
                                        </div>
                                    </SwiperSlide>
                                    <div className="navigation-buttons">
                                        <div className="left-swiper-butn navigation-butn">
                                            <button className='left-navigation'>
                                                <i className='fa fa-angle-left'></i>
                                            </button>
                                        </div>
                                        <div className="right-swiper-butn navigation-butn">
                                            <button className='right-navigation'>
                                                <i className='fa fa-angle-right'></i>
                                            </button>
                                        </div>
                                    </div>
                                </Swiper>
                                <div className="swiper-article-overlay">
                                    <div className="cat-auth-time">
                                        <span className="category-badge">
                                            Tech Trends
                                        </span>
                                        <span className='author-info'>
                                            <i className="far fa-user"></i> Windstripe
                                        </span>
                                        <span className='time-info'>
                                            <i className="far fa-calendar-alt"></i> 30/09/24
                                        </span>
                                    </div>
                                    <h2 className="overlay-title">
                                        Exploring IT Solutions – Unravel the Latest Technological Advancements.
                                    </h2>
                                    <p className="overlay-description">
                                        Embark on an enlightening journey through the realm of IT solutions as we delve into the latest technological advancements shaping the digital landscape. ...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='blog-detail-main-sec pb-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-article-detail">
                                {blog.image && (
                                    <div className="blog-article-img mb-5">
                                        <div className="blog-detial-fullimg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                            <img src={toAssetUrl(blog.image)} alt={blog.title} className="img-fluid w-100" style={{ objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                )}
                                <div className="article-meta-top mb-4 d-flex flex-wrap align-items-center gap-3">
                                    <span className="category-badge py-1 px-3" style={{ background: '#eef2ff', color: '#0d6efd', borderRadius: '50px', fontWeight: '600' }}>
                                        {blog.category}
                                    </span>
                                    <span className='author-info text-muted'>
                                        <i className="far fa-user me-2"></i> {blog.author}
                                    </span>
                                    <span className='time-info text-muted'>
                                        <i className="far fa-calendar-alt me-2"></i> {blog.date}
                                    </span>
                                </div>
                                <h1 className="blog-title">
                                    {blog.title}
                                </h1>
                                <div className="blog-content-sections">
                                    {blog.sections && blog.sections.reduce((acc, section, index, array) => {
                                        if (section.type === 'image' && array[index + 1] && array[index + 1].type === 'list') {
                                            acc.push({ ...section, text: array[index + 1].text, isMerged: true });
                                            return acc;
                                        }
                                        if (section.type === 'list' && array[index - 1] && array[index - 1].type === 'image') {
                                            return acc;
                                        }
                                        acc.push(section);
                                        return acc;
                                    }, []).map((section, index) => {
                                        switch (section.type) {
                                            case 'heading':
                                                return <h3 key={index} className="mt-5 mb-3" style={{ color: '#020842', fontWeight: '700' }}>{section.text}</h3>;
                                            case 'paragraph':
                                                return <p key={index} className="text-muted">{section.text}</p>;
                                            case 'list':
                                                return (
                                                    <ul key={index} className="mb-4 text-muted custom-blue-bullet-list" style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                                        {section.text && section.text.split('\n').map((item, i) => item.trim() && (
                                                            <li key={i} className="mb-2">{item}</li>
                                                        ))}
                                                    </ul>
                                                );
                                            case 'numbered-list':
                                                return (
                                                    <ol key={index} className="mb-4 text-muted custom-number-list" style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                                        {section.text && section.text.split('\n').map((item, i) => item.trim() && (
                                                            <li key={i} className="mb-2">{item}</li>
                                                        ))}
                                                    </ol>
                                                );
                                            case 'image':
                                                return section.url ? (
                                                    <div key={index} className="row align-items-center">
                                                        <div className={section.text ? "col-6" : "col-12"}>
                                                            <div className="my-5 rounded bord overflow-hidden shadow-sm">
                                                                <img src={toAssetUrl(section.url)} alt={`Section ${index}`} className="img-fluid w-100" style={{ borderRadius: '15px' }} />
                                                            </div>
                                                        </div>
                                                        {section.text && (
                                                            <div className="col-6">
                                                                <ul className="mb-0 text-muted custom-blue-bullet-list" style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                                                    {section.text.split('\n').map((item, i) => {
                                                                        const content = item.trim();
                                                                        return content ? <li key={i} className="mb-2">{content}</li> : null;
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : null;
                                            case 'image-grid':
                                                return (
                                                    <div key={index} className="row my-5 g-4">
                                                        {section.url && (
                                                            <div className="col-6">
                                                                <img src={toAssetUrl(section.url)} alt={`Grid ${index} A`} className="img-fluid rounded w-100 shadow-sm" style={{ objectFit: 'cover', borderRadius: '15px' }} />
                                                            </div>
                                                        )}
                                                        {section.url2 && (
                                                            <div className="col-6">
                                                                <img src={toAssetUrl(section.url2)} alt={`Grid ${index} B`} className="img-fluid rounded w-100 shadow-sm" style={{ objectFit: 'cover', borderRadius: '15px' }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </div>
                                <div className="bottom-tags">
                                    <ul className='tags-list anothr-tags mb-4'>
                                        <li className='tag-item tag-list'>
                                            Solution
                                        </li>
                                        <li className='tag-item tag-list'>
                                            Consultants
                                        </li>
                                        <li className='tag-item tag-list'>
                                            IT
                                        </li>
                                    </ul>
                                    <div className="social-share-block">
                                        <div className="article-social-share">
                                            <div className="social-share-icon">
                                                <ul>
                                                    <li>
                                                        <a href="" className='social-icons'>
                                                            <span className='fab fa-facebook'></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="" className='social-icons'>
                                                            <span className='fab fa-twitter'></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="" className='social-icons'>
                                                            <span className='fab fa-linkedin'></span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="article-author-info">
                                    <div className="d-flex author-info-inner">
                                        <div className="flex-shrink-0 author-img">
                                            <img src={authorinfo} alt="" />
                                        </div>
                                        <div className='flex-grow-1 author-desc ms-3'>
                                            <h5 className='mt-0'>Windstripe</h5>
                                            <div className="author-bio">
                                                A content editor plays a pivotal role in shaping and refining the narrative and quality of digital content. This role involves overseeing the creation.
                                                <div className="author-website">
                                                    <strong>Website: </strong>
                                                    <a href="">https://windstripethemes.com</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pagenavigation">
                                    <span>
                                        <a href="" className='previous-btn prev'>
                                            <span className='fa-solid fa-chevron-left'></span>
                                            <span>Prev</span>
                                        </a>
                                        <a href="" className='next-btn next'>
                                            <span>Next</span>
                                            <span className='fa-solid fa-chevron-right'></span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="blog-sidebar">
                                <div className="sidebar-widget search-widget">
                                    <h3 className="widget-title">SEARCH</h3>
                                    <div className="search-form">
                                        <input
                                            type="text"
                                            placeholder="Search ..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="sidebar-widget latest-posts-widget">
                                    <h3 className="widget-title">LATEST POSTS</h3>
                                    <ul className="latest-posts-list">
                                        {latestPosts.map((post) => (
                                            <li key={post._id} className="latest-post-item">
                                                <div className="post-info">
                                                    <h4 className="post-title">
                                                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                                    </h4>
                                                    <span className="post-date">
                                                        <i className="far fa-calendar-alt"></i> {post.date}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="sidebar-widget categories-widget">
                                    <h3 className="widget-title">CATEGORIES</h3>
                                    <ul className="categories-list">
                                        {Object.entries(categoriesWithCount).map(([category, count]) => (
                                            <li key={category}>
                                                <span className="cat-name">
                                                    <i className="fa-solid fa-arrow-right" style={{ transform: 'rotate(-45deg)' }}></i> {category}
                                                </span>
                                                <span className="cat-count">({count})</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="sidebar-widget tags-widget">
                                    <h3 className="widget-title">POPULAR TAGS</h3>
                                    <div className="tags-list">
                                        {popularTags.map((tag, index) => (
                                            <span key={index} className="tag-item">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default BlogDetail;