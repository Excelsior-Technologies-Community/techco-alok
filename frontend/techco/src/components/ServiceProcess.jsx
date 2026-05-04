import React, { useEffect, useState } from 'react'
import { getServicePro } from '../api/authApi'

const ServiceProcess = () => {
    const [sections, setSections] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        getServicePro()
            .then(res => {
                if (res.data && res.data.success) {
                    setSections(res.data.data)
                }
            })
            .catch(err => console.error("Error fetching service process:", err))
    }, [])

    if (!sections || sections.length === 0) return null;


    return (
        <section className='ServiceProcess-Component'>
            <div className="container">
                <div className="servicepro-header">
                    <h3>Service Process</h3>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="process-accordion">
                            {sections.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`process-item ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="process-header">
                                        <h3 className="process-title">
                                            <span className="process-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}.</span> {item.heading}
                                        </h3>
                                        <span className="process-icon">
                                            {activeIndex === index ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
                                        </span>
                                    </div>
                                    {activeIndex === index && (
                                        <div className="process-content">
                                            <p>{item.paragraph}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5">
                        <div className="oval-stack">
                            {sections.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`oval-item ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <span>{item.heading}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceProcess