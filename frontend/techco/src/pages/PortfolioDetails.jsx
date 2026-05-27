import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getPortfolioBySlug, getPortfolios, toAssetUrl } from '../api/authApi';
import '../styles/all.css';

const PortfolioDetails = () => {
    const { slug } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [similarPortfolios, setSimilarPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getPortfolioBySlug(slug);
                if (res.data.success) {
                    setPortfolio(res.data.data);

                    const allRes = await getPortfolios();
                    if (allRes.data.success) {
                        const otherPortfolios = allRes.data.data.filter(
                            item => item.slug !== slug && item.category === res.data.data.category
                        ).slice(0, 2);
                        if (otherPortfolios.length < 2) {
                            const fallbackPortfolios = allRes.data.data.filter(
                                item => item.slug !== slug
                            ).slice(0, 2);
                            setSimilarPortfolios(fallbackPortfolios);
                        } else {
                            setSimilarPortfolios(otherPortfolios);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching portfolio detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

    return (
        <main className='Portfolio-Detail-Page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area text-center">
                            <h3 className='page-sub-heading'>Portfolio
                                <span>Details 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Portfolio Details
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <div className="portfolio-detail-content">
                <div className="container">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : portfolio ? (
                        <>
                            {portfolio.thumbnail && (
                                <div className="portfolio-banner-wrapper">
                                    <img
                                        src={toAssetUrl(portfolio.thumbnail)}
                                        alt={portfolio.title}
                                    />
                                </div>
                            )}
                            <h1 className="portfolio-title-main">{portfolio.title}</h1>
                            {portfolio.content && portfolio.content.map((block, index) => {
                                switch (block.type) {
                                    case 'heading':
                                        return (
                                            <h3 className="portfolio-section-subtitle" key={index}>
                                                {block.text}
                                            </h3>
                                        );
                                    case 'paragraph':
                                        return (
                                            <p className="portfolio-section-text" key={index}>
                                                {block.text}
                                            </p>
                                        );
                                    case 'meta':
                                        return (
                                            <div className="portfolio-meta-info-row" key={index}>
                                                {block.meta?.services && (
                                                    <div className="portfolio-meta-item">
                                                        <strong>Services:</strong>
                                                        <span>{block.meta.services}</span>
                                                    </div>
                                                )}
                                                {block.meta?.client && (
                                                    <div className="portfolio-meta-item">
                                                        <strong>Client:</strong>
                                                        <span>{block.meta.client}</span>
                                                    </div>
                                                )}
                                                {block.meta?.location && (
                                                    <div className="portfolio-meta-item">
                                                        <strong>Location:</strong>
                                                        <span>{block.meta.location}</span>
                                                    </div>
                                                )}
                                                {block.meta?.completedDate && (
                                                    <div className="portfolio-meta-item">
                                                        <strong>Completed Date:</strong>
                                                        <span>{block.meta.completedDate}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    case 'features':
                                        return (
                                            <div className="row g-3 my-4" key={index}>
                                                {block.items && block.items.map((item, idx) => (
                                                    <div className="col-md-6" key={idx}>
                                                        <div className="portfolio-feature-item">
                                                            <span className="icon-list-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0044EB">
                                                                    <path d="M24 12C24 13.024 22.742 13.868 22.49 14.812C22.23 15.788 22.888 17.148 22.394 
                                                                18.002C21.892 18.87 20.382 18.974 19.678 19.678C18.974 20.382 18.87 21.892 18.002 22.394C17.148 
                                                                22.888 15.788 22.23 14.812 22.49C13.868 22.742 13.024 24 12 24C10.976 24 10.132 22.742 9.188 
                                                                22.49C8.212 22.23 6.852 22.888 5.998 22.394C5.13 21.892 5.026 20.382 4.322 19.678C3.618 18.974 
                                                                2.108 18.87 1.606 18.002C1.112 17.148 1.77 15.788 1.51 14.812C1.258 13.868 0 13.024 0 12C0 10.976 
                                                                1.258 10.132 1.51 9.188C1.77 8.212 1.112 6.852 1.606 5.998C2.108 5.13 3.618 5.026 4.322 4.322C5.026 
                                                                3.618 5.13 2.108 5.998 1.606C6.852 1.112 8.212 1.77 9.188 1.51C10.132 1.258 10.976 0 12 0C13.024 0 
                                                                13.868 1.258 14.812 1.51C15.788 1.77 17.148 1.112 18.002 1.606C18.87 2.108 18.974 3.618 19.678 4.322C20.382 
                                                                5.026 21.892 5.13 22.394 5.998C22.888 6.852 22.23 8.212 22.49 9.188C22.742 10.132 24 10.976 24 12Z" fill="#fff" />
                                                                    <path d="M15.5559 9.14076L11.3992 13.178L9.24437 11.0869C8.77664 10.6326 8.01773 10.6326 7.55001 11.0869C7.08229 
                                                                11.5412 7.08229 12.2783 7.55001 12.7326L10.5729 15.6686C11.0279 16.1105 11.7668 16.1105 12.2218 15.6686L17.2484 
                                                                10.7864C17.7162 10.3321 17.7162 9.59504 17.2484 9.14076C16.7807 8.68648 16.0236 8.68648 15.5559 9.14076Z" fill="#0044EB" /></svg>
                                                            </span>
                                                            <span>{item}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                            {similarPortfolios.length > 0 && (
                                <div className="similar-projects-sec">
                                    <h3 className="portfolio-section-subtitle mb-4">Our Similar Projects</h3>
                                    <div className="row g-4">
                                        {similarPortfolios.map((item) => (
                                            <div key={item._id} className="col-lg-6 col-md-6">
                                                <Link to={`/portfolio/${item.slug}`} className="portfolio-card d-block text-decoration-none">
                                                    <div className="portfolio-img-wrapper w-100" style={{ height: '260px' }}>
                                                        <img
                                                            src={toAssetUrl(item.thumbnail)}
                                                            alt={item.title}
                                                            className="w-100 h-100 object-fit-cover"
                                                            style={{ transition: 'transform 0.3s ease' }}
                                                        />
                                                    </div>
                                                    <div className="portfolio-overlay">
                                                        <div className="d-flex align-items-center gap-4 mb-2 flex-wrap">
                                                            {item.service && (
                                                                <span className="d-flex align-items-center text-muted">
                                                                    <i className="fa-solid fa-tags"></i>
                                                                    {item.service}
                                                                </span>
                                                            )}
                                                            {item.industry && (
                                                                <span className="d-flex align-items-center text-muted">
                                                                    <i className="fa-solid fa-building"></i>
                                                                    {item.industry}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <Link to={`/portfolio/${item.slug}`}>
                                                            <h3 className="mb-0 mt-2" style={{ marginTop: '12px' }}>{item.title}</h3>
                                                        </Link>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <h3>Portfolio Not Found</h3>
                            <p className="text-muted mt-2">The requested portfolio page could not be located.</p>
                            <Link to="/portfolio" className="btn btn-primary mt-3">Back to Portfolio</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default PortfolioDetails