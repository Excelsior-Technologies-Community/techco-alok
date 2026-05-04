import React, { useEffect, useState } from 'react'
import { getBetterData, toAssetUrl } from '../api/authApi'

const Better = () => {
    const [better, setBetter] = useState(null)

    useEffect(() => {
        getBetterData()
            .then((res) => {
                if (res.data && res.data.success) {
                    setBetter(res.data.data)
                }
            })
            .catch((err) => {
                console.error('Failed to load Better data:', err)
            })
    }, [])

    return (
        <section className="Better-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="better-image-container">
                            {better?.leftImage && (
                                <img src={toAssetUrl(better.leftImage)} alt="Better Section" />
                            )}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="better-padding">
                            <div className="better-heading">
                                <div className="better-title">
                                    <span className='better-badge brand-badge'>{better?.badgeText || ''}</span>
                                    {better?.breadcrumbText || ''}
                                </div>
                                <div className="better-main-heading">
                                    <h2>
                                        {better?.heading || ''}
                                    </h2>
                                </div>
                            </div>
                            <div className="row">
                                {better?.features && better.features.map((feature, index) => (
                                    <div className="col-lg-6" key={feature._id || index}>
                                        <div className="features-box">
                                            <div className="feature-box-inner">
                                                <span className='feature-img-container'>
                                                    {feature.icon && <img src={toAssetUrl(feature.icon)} alt={feature.title} />}
                                                </span>
                                                <div className="feature-text-area">
                                                    <a href="#">{feature.title}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Better