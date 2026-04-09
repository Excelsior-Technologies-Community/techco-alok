import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/images/header-logo.svg"
import icon from "../assets/images/icon_quote.svg"
import wifi from "../assets/images/icon-wifi.svg"
import phonix from "../assets/images/phonix.webp";
import clutch from "../assets/images/clutch.webp";
import covid from "../assets/images/covid.webp";
import gartner from "../assets/images/gartner.webp";
import "../styles/header.css";

const Header = () => {
    return (
        <main className='header-component-page'>
            <section className='top-header'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="sp-column">
                                <div className="sp-module">
                                    <div className="for-shadow">
                                        <div className="column-addons">
                                            <div className="clearfix">
                                                <div className="header-top-text">
                                                    <div className="header-content">
                                                        Subscribe us and receive <b>20% bonus</b> discount on checkout.
                                                        <Link to="">Learn More
                                                            <i className='fa-solid fa-angle-right'></i>
                                                        </Link>
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
            </section>
            <section className='main-header'>
                <div className="row" style={{ position: "relative" }}>
                    <div className="col-lg-3">
                        <div className="d-flex header-logo header-drop-btns align-items-center" style={{ marginLeft: "0" }}>
                            <div className="logo">
                                <Link>
                                    <img src={logo} alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6" style={{ position: "static" }}>
                        <div className="align-items-center main-navbar">
                            <ul className='main-dropdowns'>
                                <li className='list-items header-drop-btns' style={{ marginLeft: "0" }}>
                                    <Link>
                                        Home
                                    </Link>
                                </li>
                                <li className='list-items'>
                                    <div className="dropdown mega-dropdown">
                                        <button
                                            className="btn btn-secondary header-drop-btns"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            Company
                                            <i className='fa-solid fa-chevron-down'></i>
                                        </button>

                                        <div className="dropdown-menu mega-menu all-mega for-hover">
                                            <div className="drop-inner">
                                                <div className="row">
                                                    <div className="col-lg-9">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>About Us</Link>
                                                                    </div>
                                                                    <p>Learn more about Techno</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>Our Pricing</Link>
                                                                    </div>
                                                                    <p>Streamlined Pricing</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>Portfolio</Link>
                                                                    </div>
                                                                    <p>Explore our all overview</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>Portfolio Details</Link>
                                                                    </div>
                                                                    <p>Explore our all overview</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>Team</Link>
                                                                    </div>
                                                                    <p>We are friendly join our team</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>Team Details</Link>
                                                                    </div>
                                                                    <p>We are friendly join our team</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>Services</Link>
                                                                    </div>
                                                                    <p>Happy to help you!</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="full-content">
                                                                    <div className="content-link">
                                                                        <div className="pull-left">
                                                                            <span className='img-area'>
                                                                                <Link to="">
                                                                                    <img src={wifi} alt="" />
                                                                                </Link>
                                                                            </span>
                                                                        </div>
                                                                        <Link>Service Details</Link>
                                                                    </div>
                                                                    <p>Happy to help you!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="free-button">
                                                                    <a href="" className='free-btn'>
                                                                        <span className='btn-label'>Free <br />Consultation</span>
                                                                        <span className='btn-icon'>
                                                                            <i className="fa-solid fa-up-right-from-square"></i>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="clutch">
                                                                    <div className="clutch-logo">
                                                                        <img src={clutch} alt="" />
                                                                    </div>
                                                                    <div className="clutch-review">
                                                                        <div className="star-icon">
                                                                            <ul className='group-star'>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <p>
                                                                            From
                                                                            <span>
                                                                                <strong> 200+ </strong>
                                                                            </span>
                                                                            reviews
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="clutch">
                                                                    <div className="clutch-logo">
                                                                        <img src={gartner} alt="" />
                                                                    </div>
                                                                    <div className="clutch-review">
                                                                        <div className="star-icon">
                                                                            <ul className='group-star'>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                                <li className='single-star'>
                                                                                    <i className='fas fa-star '></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <p>
                                                                            From
                                                                            <span>
                                                                                <strong> 200+ </strong>
                                                                            </span>
                                                                            reviews
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="mega-card">
                                                            <div className="main-ceo">
                                                                <div className="ceo-image">
                                                                    <img src={phonix} alt="" />
                                                                </div>
                                                                <div className="ceo-content">
                                                                    <h3>Maverick Phoenix</h3>
                                                                    <p>CEO At Techco</p>
                                                                    <div className="content-image">
                                                                        <img src={icon} alt="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ceo-desc">
                                                                <p>As a CEO at Techco I have been voice crying in the wilderness, trying to make requirements clear, use every minute to deliver the result, and not reinvent the wheel. Here at Techco, I made that possible for the clients.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-items'>
                                    <div className="dropdown mega-dropdown">
                                        <button
                                            className="btn btn-secondary header-drop-btns"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            Portfolio
                                            <i className='fa-solid fa-chevron-down'></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu menu-right for-hover">
                                            <div className="drop-inner">
                                                <ul>
                                                    <li className='drop-menu-item'>
                                                        <Link>
                                                            Portfolio
                                                        </Link>
                                                    </li>
                                                    <li className='drop-menu-item'>
                                                        <Link>
                                                            Portfolio Details
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-items'>
                                    <div className="dropdown mega-dropdown">
                                        <button
                                            className="btn btn-secondary header-drop-btns"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            Services
                                            <i className='fa-solid fa-chevron-down'></i>
                                        </button>

                                        <div className="dropdown-menu mega-menu for-hover" style={{ padding: "0", overflow: "hidden" }} >
                                            <div className="drop-inner">
                                                <div className="row">
                                                    <div className="col-lg-9">
                                                        <div className="row">
                                                            <div className="col-md-4 only-border">
                                                                <div className="for-all-services">
                                                                    <div className="main-service">
                                                                        <div className="field-heading">
                                                                            <h3>Services</h3>
                                                                        </div>
                                                                        <div className="field-content">
                                                                            <ul className='service-inner'>
                                                                                <li className='service-li'>
                                                                                    <Link>IT Management Services</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Data Tracking Security</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Website Development</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>CRM Solutions and Design</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>UI/UX Dedign Services</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Technology Solution</Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 only-border">
                                                                <div className="for-all-services">
                                                                    <div className="main-service">
                                                                        <div className="field-heading">
                                                                            <h3>Our Fields</h3>
                                                                        </div>
                                                                        <div className="field-content">
                                                                            <ul className='service-inner'>
                                                                                <li className='service-li'>
                                                                                    <Link>Healthcare</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Banks</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Logistic</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Supermarkets</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Industries</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Hotels</Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="for-all-services">
                                                                    <div className="main-service">
                                                                        <div className="field-heading">
                                                                            <h3>Products</h3>
                                                                        </div>
                                                                        <div className="field-content">
                                                                            <ul className='service-inner'>
                                                                                <li className='service-li'>
                                                                                    <Link>Case Studies</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Our Pricing</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Features</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Overview</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>New Releases</Link>
                                                                                </li>
                                                                                <li className='service-li'>
                                                                                    <Link>Solutions</Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="medical">
                                                            <div className="for-medical">
                                                                <div className="first-headig">
                                                                    <h3>COMPUTER SOFTWARE</h3>
                                                                </div>
                                                                <div className="second-heading">
                                                                    <h4>Astarte Medical</h4>
                                                                </div>
                                                                <div className="image-area">
                                                                    <img src={covid} alt="" />
                                                                </div>
                                                                <div className="read-case">
                                                                    <div className="free-button">
                                                                        <a href="" className='free-btn' style={{ backgroundColor: "white", borderColor: "white" }}>
                                                                            <span className='btn-label read' style={{ color: "#020842" }}>read <br />case</span>
                                                                            <span className='btn-icon' style={{ color: "#020842" }}>
                                                                                <i className="fa-solid fa-up-right-from-square"></i>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-items'>
                                    <div className="dropdown mega-dropdown">
                                        <button
                                            className="btn btn-secondary header-drop-btns"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            Pages
                                            <i className='fa-solid fa-chevron-down'></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu menu-right for-hover">
                                            <div className="drop-inner">
                                                <ul>
                                                    <li className='drop-menu-item'>
                                                        <Link>
                                                            About Us
                                                        </Link>
                                                    </li>
                                                    <li className='drop-menu-item has-child dropend'>
                                                        <Link className='btn-group'>
                                                            Blogs
                                                            <i className='fa-solid fa-chevron-right'></i>
                                                        </Link>
                                                        <div className="dropdown-menu menu-right">
                                                            <div className="drop-inner">
                                                                <ul>
                                                                    <li className='drop-menu-item'>
                                                                        <Link>Our Blogs</Link>
                                                                    </li>
                                                                    <li className='drop-menu-item'>
                                                                        <Link>Blogs Details</Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className='drop-menu-item'>
                                                        <Link>
                                                            Help Center
                                                        </Link>
                                                    </li>
                                                    <li className='drop-menu-item'>
                                                        <Link>
                                                            Careers
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-items header-drop-btns'>
                                    <Link>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 ">
                        <div className="free-button header-drop-btns" style={{ textAlign: "end" }}>
                            <a href="" className='free-btn started' style={{ backgroundColor: "white" }}>
                                <span className='btn-label get' style={{ color: "#020842", padding: "19px 0 16px" }}>Get Started</span>
                                <span className='btn-icon' style={{ color: "#020842" }}>
                                    <i className="fa-solid fa-up-right-from-square"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    )
}

export default Header