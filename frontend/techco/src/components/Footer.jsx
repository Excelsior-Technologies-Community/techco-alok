import React from 'react'
import { Link } from 'react-router-dom'
import mail from "../assets/images/footer-mail.svg"
import call from "../assets/images/footer-calling.svg"
import location from "../assets/images/footer-icon.svg"
import "../styles/footer.css";
import "../styles/header.css";

const Footer = () => {
    return (
        <main className='Footer-component'>
            <section className="footer-section">
                <div className="footer-area">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12" style={{ padding: "0" }}>
                                <div className="footer-back">
                                    <div className="container">
                                        <div className="row">
                                            <div className="image-text">
                                                <div className="text-area">
                                                    <div className="image-text-content">
                                                        <h2 className='ready'>Ready to Work, Let's Chat</h2>
                                                        <div className="image-para">
                                                            <p>Our team of experts is ready to collaborate with you every step of <br />the way, from initial consultation to implementation.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="free-button">
                                                    <a href="" className='free-btn'>
                                                        <span className='btn-label contactus-today'>Contact us today!</span>
                                                        <span className='btn-icon'>
                                                            <i className="fa-solid fa-up-right-from-square"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="backclr"></div>
                                </div>
                                <div className="footer-pattern">
                                    <div className="container">
                                        <div className="write-call-office">
                                            <div className="write">
                                                <span className="mail-image">
                                                    <img src={mail} alt="" />
                                                </span>
                                                <div className="write-text">
                                                    <p>Write to us</p>
                                                    <h3 className="mail-id">Techoco@gmail.com</h3>
                                                </div>
                                            </div>
                                            <div className="write">
                                                <span className="mail-image">
                                                    <img src={call} alt="" />
                                                </span>
                                                <div className="write-text">
                                                    <p>Call Us (USA)</p>
                                                    <h3 className="mail-id">+(1)1230 452 8597</h3>
                                                </div>
                                            </div>
                                            <div className="write">
                                                <span className="mail-image">
                                                    <img src={location} alt="" />
                                                </span>
                                                <div className="write-text">
                                                    <p>Our Office</p>
                                                    <h3 className="mail-id">Waterlo,Park,Australia</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="main-footer">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-3 special-margin">
                                                        <div className="newsletter footer-all">
                                                            <div className="foot-newsletter-content">
                                                                <div className="nwsltr-cont">
                                                                    <h2>Newsletter</h2>
                                                                    <p>Sign up to Techco weekly<br /> newsletter to get the latest <br /> updates.</p>
                                                                </div>
                                                            </div>
                                                            <div className="news-email">
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <form className="email-form">
                                                                            <div className="email-area">
                                                                                <input type="email" name='email' className='form-control' placeholder='Email' />
                                                                            </div>
                                                                            <div className="email-submit" type="submit" >
                                                                                <i className='fas fa-paper-plane'></i>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="social-tags">
                                                                <ul className='social-group'>
                                                                    <li className='social-group-li'>
                                                                        <a href="">
                                                                            <span>
                                                                                facebook
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                    <li className='social-group-li'>
                                                                        <a href="">
                                                                            <span>
                                                                                twitter
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                    <li className='social-group-li'>
                                                                        <a href="">
                                                                            <span>
                                                                                linkdin
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 special-margin">
                                                        <div className="services footer-all">
                                                            <div className="foot-newsletter-content">
                                                                <div className="nwsltr-cont">
                                                                    <h2>Services</h2>
                                                                    <div className="services-footer">
                                                                        <ul className='services-ul'>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        It Consultation
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Cloud Services
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        AI Machine Learning
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Data Security
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Software Development
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Cyber Security
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 special-margin">
                                                        <div className="services footer-all">
                                                            <div className="foot-newsletter-content">
                                                                <div className="nwsltr-cont">
                                                                    <h2>Information</h2>
                                                                    <div className="services-footer">
                                                                        <ul className='services-ul'>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        About Techco
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Investors
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Contact
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Affiliate Program
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Career
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Pricing Plan
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="services footer-all">
                                                            <div className="foot-newsletter-content">
                                                                <div className="nwsltr-cont">
                                                                    <h2>Product</h2>
                                                                    <div className="services-footer">
                                                                        <ul className='services-ul'>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Case Studies
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Our Pricing
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Features
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Overview
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        New Releases
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className='services-li'>
                                                                                <a href="">
                                                                                    <span className='li-list-text'>
                                                                                        Solutions
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top-header sp-module-footer">
                    <div class="sp-column">
                        <div class="sp-footer">
                            <div class="for-shadow">
                                <div class="column-addons">
                                    <div class="clearfix">
                                        <div class="header-top-text">
                                            <div className="container">
                                                <div class="header-content footer-below-content">
                                                    <p>Copyright © 2024 Techco, All rights reserved.</p>
                                                    <p>Joomla by &nbsp;
                                                        <a href="/" data-discover="true">
                                                            Windstripe Theme
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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

export default Footer