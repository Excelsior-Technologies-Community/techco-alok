import React, { useEffect, useState } from 'react'
import { getServicesDetails, toAssetUrl } from '../api/authApi'
import Better from '../components/Better'
import { Link } from 'react-router-dom'

const Services = () => {
    const [servicesData, setServicesData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getServicesDetails()
            .then((res) => {
                setServicesData(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.error('Failed to load services content:', err)
                setLoading(false)
            })
    }, [])

    const groupCardsIntoRows = (cards) => {
        const rows = [];
        let i = 0;
        let patternIndex = 0;
        const pattern = [2, 3];
        while (i < cards.length) {
            const size = pattern[patternIndex % 2];
            const row = cards.slice(i, i + size);
            rows.push({ size, items: row, startIdx: i });
            i += size;
            patternIndex++;
        }
        return rows;
    };

    return (
        <main className='Services-Page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area text-center">
                            <h3 className='page-sub-heading'>Our Main
                                <span>Services 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Our Services
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {servicesData && servicesData.heading && (
                        <section className='services-banner-sec'>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="services-banner-content">
                                            <div className="services-banner-sub">
                                                We Are <span>IT Guidance 🙂</span>
                                            </div>
                                            <h2 className="services-banner-title">
                                                {servicesData.heading}
                                            </h2>
                                            <p className="services-banner-desc">
                                                {servicesData.description}
                                            </p>
                                            <div className="free-button">
                                                <Link to="/contact" className="free-btn">
                                                    <span className="btn-label talk-expert-today">TALK TO AN EXPERT</span>
                                                    <span className="btn-icon">
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-6">
                                        {servicesData.image && (
                                            <div className="services-banner-image-wrapper">
                                                <img
                                                    src={toAssetUrl(servicesData.image)}
                                                    alt={servicesData.heading}
                                                    className="services-banner-image"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {servicesData && servicesData.cards && servicesData.cards.length > 0 && (
                        <section className='featured-services-sec' id="featured-services">
                            <div className="container">
                                <div className="featured-services-header">
                                    <div className="featured-services-pill">
                                        Our <span>Specialize</span>
                                    </div>
                                    <h2 className="featured-services-title">
                                        Featured Services
                                    </h2>
                                </div>
                                <div className="services-rows-container">
                                    {groupCardsIntoRows(servicesData.cards).map((row, rowIdx) => (
                                        <div className={`services-row services-row-${row.size}`} key={rowIdx}>
                                            {row.items.map((card, itemIdx) => {
                                                const globalIdx = row.startIdx + itemIdx;
                                                return (
                                                    <div className={`service-card card-color-${globalIdx % 6}`} key={card._id}>
                                                        <div className="service-card-image-wrapper">
                                                            <img
                                                                src={toAssetUrl(card.image)}
                                                                alt={card.title}
                                                                className="service-card-image"
                                                            />
                                                        </div>
                                                        <div className="service-card-content">
                                                            <h3 className="service-card-title"><span>{card.title}</span></h3>
                                                            <div className="service-card-footer">
                                                                <div className="service-card-btn">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </div>
                                                                {card.tags && card.tags.length > 0 && (
                                                                    <div className="service-card-tags">
                                                                        {card.tags.map((tag, tagIdx) => (
                                                                            <span className="service-tag" key={tagIdx}>
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
            <Better />
        </main>
    )
}

export default Services