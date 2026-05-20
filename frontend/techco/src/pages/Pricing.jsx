import React from 'react'
import rdoc from "../assets/images/r-doc.svg"
import ranalysis from "../assets/images/r-analysis.svg"
import Lheadphone from "../assets/images/L-headphone.svg"
import bestOffer from "../assets/images/best_offer.svg"
import client1 from '../assets/images/client_logo_1.webp';
import client2 from '../assets/images/client_logo_2.webp';
import client3 from '../assets/images/client_logo_3.webp';
import client4 from '../assets/images/client_logo_4.webp';
import client5 from '../assets/images/client_logo_5.webp';
import client6 from '../assets/images/client_logo_6.webp';
import client7 from '../assets/images/client_logo_7.webp';
import client8 from '../assets/images/client_logo_8.webp';
import client9 from '../assets/images/client_logo_9.webp';
import client10 from '../assets/images/client_logo_10.webp';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Pricing = () => {
    return (
        <main className='Pricing-page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area">
                            <h3 className='page-sub-heading'>Our
                                <span>Pricing 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Pricing Plan
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='celebrating-features'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="discover">
                                <div className="what-set">
                                    <h2 className='celebrating-title'>Celebrating Features Discover What Sets Us</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-5">
                            <div className="discover-para">
                                <p>We take pride in celebrating the features that set us apart and make us a leader in the IT solutions. What truly distinguishes us is our unwavering commitment to innovation, excellence, and client satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="Rich-fastest-lifetime">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 position-relative">
                                <div className="rich-doc">
                                    <div className="r-docu">
                                        <span className='doc-img'>
                                            <img src={rdoc} alt="" />
                                        </span>
                                        <div className="r-doc-content">
                                            <h3>Rich Documentation</h3>
                                            <div className="doc-para">
                                                <p>Rich Documentation" refers to comprehensive and detailed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="doc-divider"></div>
                            </div>
                            <div className="col-lg-4 position-relative">
                                <div className="rich-doc">
                                    <div className="r-docu">
                                        <span className='doc-img'>
                                            <img src={ranalysis} alt="" />
                                        </span>
                                        <div className="r-doc-content">
                                            <h3>Fastest Delivery</h3>
                                            <div className="doc-para">
                                                <p>Fastest Delivery" typically refers to service or process that emphasizes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="doc-divider"></div>
                            </div>
                            <div className="col-lg-4 position-relative">
                                <div className="rich-doc">
                                    <div className="r-docu">
                                        <span className='doc-img'>
                                            <img src={Lheadphone} alt="" />
                                        </span>
                                        <div className="r-doc-content">
                                            <h3>Lifetime Support</h3>
                                            <div className="doc-para">
                                                <p>Lifetime Support" refers to a by a product or service provider</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className='Best-Plan-business'>
                <div className="container">
                    <div className="row">
                        <div className="pricing-heading">
                            <div className='page-sub-heading'>Our
                                <span>Pricing 😍</span>
                            </div>
                        </div>
                        <div className="pricing-main-heading text-center">
                            <h2>Best Plane for Business</h2>
                        </div>

                        <div className="billing-toggle text-center mt-4">
                            <div className="toggle-wrapper">
                                <button className="toggle-btn active">BILLED MONTHLY <span className="discount">-10%</span></button>
                                <button className="toggle-btn">BILLED YEARLY <span className="discount discount-red">-30%</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 pt-3 justify-content-center">
                        <div className="col-lg-6 mb-4">
                            <div className="pricing-card-horizontal">
                                <div className="card-top">
                                    <div className="price-box">
                                        <div className="price-value">
                                            <span className="old-price">$54</span>
                                            <h2>$48<span>.6</span></h2>
                                        </div>
                                        <p className="save-text">You'll Save <span>$5.4</span> Monthly</p>
                                    </div>
                                    <div className="package-info">
                                        <h3>Pro Package</h3>
                                        <p>Make your work easier with an integrated properly together.</p>
                                    </div>
                                </div>
                                <div className="card-bottom">
                                    <ul className="features-grid">
                                        <li><i className="fa-regular fa-circle-check"></i> Software Development.</li>
                                        <li><i className="fa-regular fa-circle-check"></i> Website Development.</li>
                                        <li><i className="fa-regular fa-circle-check"></i> Digital Product Design</li>
                                        <li className="disable"><i className="fa-regular fa-circle-check"></i> Cybersecurity Services.</li>
                                        <li><i className="fa-regular fa-circle-check"></i> IT Consulting.</li>
                                        <li className="disable"><i className="fa-regular fa-circle-check"></i> Cloud Services.</li>
                                    </ul>
                                    <div className="pricing-footer text-start mt-4">
                                        <a href="#" className="purchase-btn">
                                            <span className='purch-label'>
                                                PURCHASE NOW
                                            </span>
                                            <i className="fa-solid fa-arrow-right" style={{ transform: 'rotate(-45deg)' }}></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="pricing-card-horizontal">
                                <img src={bestOffer} alt="Best Offer" className="best-offer-badge" />
                                <div className="card-top">
                                    <div className="price-box">
                                        <div className="price-value">
                                            <span className="old-price">$60</span>
                                            <h2>$54</h2>
                                        </div>
                                        <p className="save-text">You'll Save <span>$6</span> Monthly</p>
                                    </div>
                                    <div className="package-info">
                                        <h3>Team Package</h3>
                                        <p>Make your work easier with an integrated properly together.</p>
                                    </div>
                                </div>
                                <div className="card-bottom">
                                    <ul className="features-grid">
                                        <li><i className="fa-regular fa-circle-check"></i> Software Development.</li>
                                        <li><i className="fa-regular fa-circle-check"></i> Website Development.</li>
                                        <li><i className="fa-regular fa-circle-check"></i> Digital Product Design</li>
                                        <li><i className="fa-regular fa-circle-check"></i> Cybersecurity Services.</li>
                                        <li><i className="fa-regular fa-circle-check"></i> IT Consulting.</li>
                                        <li><i className="fa-regular fa-circle-check"></i> Cloud Services.</li>
                                    </ul>
                                    <div className="pricing-footer text-start mt-4">
                                        <a href="#" className="purchase-btn">
                                            <span className='purch-label'>
                                                PURCHASE NOW
                                            </span>
                                            <i className="fa-solid fa-arrow-right" style={{ transform: 'rotate(-45deg)' }}></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="brand-we">
                    <div className="container">
                        <div className="brand-heading">
                            <div className="brand-title">
                                <span className='brand-badge'>Brand We</span>
                                Work With 🎉
                            </div>
                        </div>
                        <div className="client-swiper">
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={7}
                                loop={true}
                                speed={2000}
                                freeMode={true}
                                autoplay={{
                                    delay: 0,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay, FreeMode]}
                                className="mySwiper client-marquee"
                            >
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client1} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client2} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client3} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client4} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client5} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client6} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client7} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client8} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client9} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='client-logo-swiper'>
                                    <div className="image-container">
                                        <img src={client10} alt="Client 1" className="client-logo" />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    )
}

export default Pricing