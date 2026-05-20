import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ourswiper1 from '../assets/images/our-blog-swiper1.jpg'
import ourswiper2 from '../assets/images/our-blog-swiper2.jpg'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getBlogs, toAssetUrl } from '../api/authApi';

const popularTags = [
    "Consultants", "App Dev", "Solution", "IT", "TechSolutions",
    "Data", "Optimization", "UX Design", "Cybersecurity", "Startup"
];

const OurBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeSlide, setActiveSlide] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await getBlogs();
            if (res.data.success) {
                setBlogs(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }

    const categoriesWithCount = blogs.reduce((acc, blog) => {
        acc[blog.category] = (acc[blog.category] || 0) + 1;
        return acc;
    }, {});

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const latestPosts = blogs.slice(0, 3);
    const totalSlides = Math.ceil(filteredBlogs.length / 6);

    return (
        <main className='OurBlog'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area">
                            <h3 className='page-sub-heading'>
                                <span>Our Blogs 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Our Latest Blog
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
            <section className='Blog-main-section'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="article-list">
                                {filteredBlogs.length > 0 ? (
                                    <div className="blog-list-swiper-container">
                                        <Swiper
                                            spaceBetween={0}
                                            autoHeight={true}
                                            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                                            onSwiper={(swiper) => setSwiperInstance(swiper)}
                                            modules={[Navigation]}
                                            className="blog-list-swiper"
                                        >
                                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                                <SwiperSlide key={slideIndex}>
                                                    <div className="blog-slide-content">
                                                        {filteredBlogs.slice(slideIndex * 6, (slideIndex * 6) + 6).map((blog) => (
                                                            <div className={`article-card ${!blog.image ? 'no-image' : ''}`} key={blog._id}>
                                                                {blog.image && (
                                                                    <div className="article-image">
                                                                        <Link to={`/blog/${blog.slug}`}>
                                                                            <img src={toAssetUrl(blog.image)} alt={blog.title} />
                                                                        </Link>
                                                                    </div>
                                                                )}
                                                                <div className="article-details">
                                                                    <div className="article-meta-top">
                                                                        <span className="category-tag">{blog.category}</span>
                                                                        <span className='author-name'>
                                                                            <i className="far fa-user"></i> {blog.author}
                                                                        </span>
                                                                        <span className='post-date'>
                                                                            <i className="far fa-calendar-alt"></i> {blog.date}
                                                                        </span>
                                                                    </div>
                                                                    <h2 className="article-title">
                                                                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                                                                    </h2>
                                                                    {blog.description && (
                                                                        <p className="article-excerpt">
                                                                            {blog.description.length > 150 ? blog.description.substring(0, 150) + "..." : blog.description}
                                                                        </p>
                                                                    )}
                                                                    <div className="read-more-btn">
                                                                        <Link to={`/blog/${blog.slug}`} className='blog-read-more-btn'>
                                                                            <span className='btn-label'>READ MORE</span>
                                                                            <span className='btn-icon'>
                                                                                <i className="fa-solid fa-up-right-from-square"></i>
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <div className="custom-blog-pagination">
                                            <div className="pagination-controls">
                                                <button
                                                    className="pag-btn"
                                                    onClick={() => swiperInstance?.slideTo(0)}
                                                    disabled={activeSlide === 0}
                                                >
                                                    <i className="fa-solid fa-angles-left"></i>
                                                </button>
                                                <button
                                                    className="pag-btn"
                                                    onClick={() => swiperInstance?.slidePrev()}
                                                    disabled={activeSlide === 0}
                                                >
                                                    <i className="fa-solid fa-angle-left"></i>
                                                </button>
                                                {Array.from({ length: totalSlides }).map((_, i) => (
                                                    <button
                                                        key={i}
                                                        className={`pag-btn ${activeSlide === i ? 'active' : ''}`}
                                                        onClick={() => swiperInstance?.slideTo(i)}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    className="pag-btn"
                                                    onClick={() => swiperInstance?.slideNext()}
                                                    disabled={activeSlide === totalSlides - 1}
                                                >
                                                    <i className="fa-solid fa-angle-right"></i>
                                                </button>
                                                <button
                                                    className="pag-btn"
                                                    onClick={() => swiperInstance?.slideTo(totalSlides - 1)}
                                                    disabled={activeSlide === totalSlides - 1}
                                                >
                                                    <i className="fa-solid fa-angles-right"></i>
                                                </button>
                                            </div>
                                            <div className="pagination-status">
                                                Page {activeSlide + 1} of {totalSlides}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="no-blogs-found">
                                        <p>No blogs found matching your criteria.</p>
                                    </div>
                                )}
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
                                        <li
                                            className={selectedCategory === 'All' ? 'active' : ''}
                                            onClick={() => setSelectedCategory('All')}
                                        >
                                            <span className="cat-name">
                                                <i className="fa-solid fa-arrow-right" style={{ transform: 'rotate(-45deg)' }}></i> All Posts
                                            </span>
                                            <span className="cat-count">({blogs.length})</span>
                                        </li>
                                        {Object.entries(categoriesWithCount).map(([category, count]) => (
                                            <li
                                                key={category}
                                                className={selectedCategory === category ? 'active' : ''}
                                                onClick={() => setSelectedCategory(category)}
                                            >
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

export default OurBlog
