import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolios, toAssetUrl } from '../api/authApi';
import '../styles/all.css';

const Portfolio = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState('ALL');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const res = await getPortfolios();
                const data = res.data.data;
                setPortfolios(data);

                const uniqueCategories = [...new Set(data.map(item => item.category.toUpperCase()))];
                setCategories(['ALL', ...uniqueCategories]);
            } catch (error) {
                console.error("Error fetching portfolios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, []);

    const filteredPortfolios = activeTab === 'ALL'
        ? portfolios
        : portfolios.filter(p => p.category.toUpperCase() === activeTab);

    return (
        <main className='Portfolio-page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area text-center">
                            <h3 className='page-sub-heading'>Our
                                <span>Portfolio 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Our Portfolio
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='portfolio-content section-padding'>
                <div className="container">
                    <div className="portfolio-area">
                        <div className="portfolio-tabs">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`btn rounded ${activeTab === category ? 'btn-primary' : 'border-0'}`}
                                    onClick={() => setActiveTab(category)}
                                >
                                    {category === 'ALL' ? 'SEE ALL' : category}
                                </button>
                            ))}
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredPortfolios.length > 0 ? (
                                filteredPortfolios.map((portfolio) => (
                                    <div key={portfolio._id} className="col-lg-6 col-md-6">
                                        <Link to={`/portfolio/${portfolio.slug}`} className="portfolio-card d-block text-decoration-none">
                                            <div className="portfolio-img-wrapper">
                                                <img
                                                    src={toAssetUrl(portfolio.thumbnail)}
                                                    alt={portfolio.title}
                                                    className="w-100 h-100 object-fit-cover"
                                                    style={{ transition: 'transform 0.3s ease' }}
                                                />
                                            </div>
                                            <div className="portfolio-overlay">
                                                <div className="d-flex align-items-center gap-4 mb-2 flex-wrap">
                                                    {portfolio.service && (
                                                        <span className="d-flex align-items-center text-muted">
                                                            <i className="fa-solid fa-tags"></i>
                                                            {portfolio.service}
                                                        </span>
                                                    )}
                                                    {portfolio.industry && (
                                                        <span className="d-flex align-items-center text-muted">
                                                            <i className="fa-solid fa-building"></i>
                                                            {portfolio.industry}
                                                        </span>
                                                    )}
                                                </div>
                                                <Link to={`/portfolio/${portfolio.slug}`}>
                                                    <h3 className="mb-0 mt-2" style={{ marginTop: '12px' }}>{portfolio.title}</h3>
                                                </Link>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <p className="text-muted fs-5">No portfolios found for this category.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Portfolio