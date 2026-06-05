import React from 'react'
import vdoimg from '../assets/images/service_details_image_1.webp'
import ServiceProcess from '../components/ServiceProcess'
import img1 from '../assets/images/service_details_image_2.webp'
import img2 from '../assets/images/service_details_image_3.webp'
import img3 from '../assets/images/service_details_image_4.webp'
import listicon from '../assets/images/list-tick.png'

const SeviceDetail = () => {
    return (
        <main className='Service-Detail-Page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area text-center">
                            <h3 className='page-sub-heading'>Services
                                <span>Details 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Service Details
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='Service-detail-vd'>
                <div className="container">
                    <div className="row">
                        <div className="vdo-img">
                            <div className="vdo-img-container">
                                <img src={vdoimg} alt="" />
                                <div className="play-overlay service-play-btn">
                                    <a className="play-icon">
                                        <span className='play-triangle'>
                                            <i className='fas fa-play'></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="service-detail-content">
                            <h2 className='service-detail-heading'>
                                Network Infrastructure and Design
                            </h2>
                            <p style={{ marginBottom: '24px' }}>
                                Network infrastructure and design are the backbone of modern businesses, serving as the foundation upon which all digital operations rely. At our IT solution agency, we specialize in crafting robust and reliable network architectures tailored to meet the unique needs of our clients. From small businesses to large enterprises, we understand the critical importance of a well-designed network infrastructure in driving efficiency, security, and scalability. Our team of experienced professionals works closely with clients.
                            </p>
                            <p>We take a holistic approach to network design, considering factors such as bandwidth requirements, security protocols, scalability, and future growth potential. By leveraging industry best practices and cutting-edge technologies,</p>
                        </div>
                        <ServiceProcess />
                        <div className="service-outcome">
                            <h3>Service Outcome</h3>
                            <p>
                                Here are six key points that can be associated with a digital Transformation gallery case global Digital Systems Engineer Services leader helping Fortune 500 companies on their innovation agenda:
                            </p>
                            <div className="list-area">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <ul className='ser-det-list'>
                                            <li>
                                                <span className='ser-list-text'>
                                                    <img src={listicon} alt="" />
                                                </span>
                                                <span className='ser-list-text'>Scalability and Flexibility</span>
                                            </li>
                                            <li>
                                                <span className='ser-list-text'>
                                                    <img src={listicon} alt="" />
                                                </span>
                                                <span className='ser-list-text'>Security and Compliance</span>
                                            </li>
                                            <li>
                                                <span className='ser-list-text'>
                                                    <img src={listicon} alt="" />
                                                </span>
                                                <span className='ser-list-text'>Performance Optimization</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6">
                                        <ul className='ser-det-list'>
                                            <li>
                                                <span className='ser-list-text'>
                                                    <img src={listicon} alt="" />
                                                </span>
                                                <span className='ser-list-text'>User Experience</span>
                                            </li>
                                            <li>
                                                <span className='ser-list-text'>
                                                    <img src={listicon} alt="" />
                                                </span>
                                                <span className='ser-list-text'>Security and Compliance</span>
                                            </li>
                                            <li>
                                                <span className='ser-list-text'>
                                                    <img src={listicon} alt="" />
                                                </span>
                                                <span className='ser-list-text'>Training and Education</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="service-image-area">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img src={img1} alt="" />
                                    </div>
                                    <div className="col-lg-4">
                                        <img src={img2} alt="" />
                                    </div>
                                    <div className="col-lg-4">
                                        <img src={img3} alt="" />
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

export default SeviceDetail