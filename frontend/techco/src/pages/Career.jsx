import React, { useEffect, useState } from 'react'
import '../styles/all.css';
import ServiceProcess from '../components/ServiceProcess';
import Better from '../components/Better';
import { getCareerData, toAssetUrl } from '../api/authApi'

const Career = () => {
    const [career, setCareer] = useState(null)

    useEffect(() => {
        getCareerData()
            .then((res) => {
                if (res.data && res.data.success) {
                    setCareer(res.data.data)
                }
            })
            .catch((err) => {
                console.error('Failed to load Career data:', err)
            })
    }, [])

    return (
        <main className="Career-Page">
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area">
                            <h3 className='page-sub-heading'>About More
                                <span>Techco 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Careers
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='Ransform-section'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ransform-image-container">
                                {career?.image ? (
                                    <img src={toAssetUrl(career.image)} alt={career?.heading || 'Career'} />
                                ) : (
                                    <div className="image-placeholder">Loading image...</div>
                                )}
                            </div>
                            <div className="ransform-text-area">
                                <h2 className='ransform-heading'>{career?.heading || 'Join Our Team'}</h2>
                                <div className="ransform-para">
                                    <p style={{ whiteSpace: "pre-wrap" }}>
                                        {career?.paragraph || 'Discover exciting opportunities at Techco.'}
                                    </p>
                                </div>
                            </div>
                            <ServiceProcess />
                        </div>
                    </div>
                </div>
            </section>
            <Better />
        </main>
    )
}

export default Career