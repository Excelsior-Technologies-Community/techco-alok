import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getStatsData, toAssetUrl, getServicesDetails, getWorksData, getTestimonials } from "../api/authApi";
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
import employee from '../assets/images/aboutemployee.webp'
import iconHead from '../assets/images/icon_head.svg'
import iconCheck from '../assets/images/icon_check.svg'
import iconLike from '../assets/images/icon_like.svg'
import iconDart from '../assets/images/icon_dart_board.svg'
import { useInView } from 'react-intersection-observer';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import homestar from '../assets/images/icon_stars_trustpilot.svg'
import TopExperts from "../components/TopExperts";
import "../styles/all.css";
import CountUp from 'react-countup';

const ActualCountUp = (CountUp && typeof CountUp === 'object' && 'default' in CountUp) ? CountUp.default : CountUp;

export default function Home() {
  const [heroData, setHeroData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [worksData, setWorksData] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const earthImgRef = useRef(null);
  const sndImgRef = useRef(null);
  const canvasRef = useRef(null);

  const heading = heroData?.heading;
  const description = heroData?.description;
  const ratingValue = heroData?.ratingValue;
  const ratingText = heroData?.ratingText;
  const rightImage = heroData?.rightImage ? toAssetUrl(heroData.rightImage) : "https://via.placeholder.com/480x560";
  const statsList = Array.isArray(heroData?.stats) ? heroData.stats : [];
  const stat1 = statsList[0] || {
    number: "150",
    suffix: "+",
    text: ""
  };

  const stat2 = statsList[1] || {
    number: "88",
    suffix: "%",
    text: "get 88% of the best services and growth business"
  };

  const cardsToShow = servicesData?.cards ? servicesData.cards.slice(0, -2) : [];

  useEffect(() => {
    getServicesDetails()
      .then((res) => {
        setServicesData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to load services data for Home:", err);
      });
  }, []);

  useEffect(() => {
    getWorksData()
      .then((res) => {
        setWorksData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to load works data for Home:", err);
      });
  }, []);

  useEffect(() => {
    getTestimonials()
      .then((res) => {
        setTestimonials(res?.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to load testimonials:", err);
      });
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      if (earthImgRef.current) {
        const rect = earthImgRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
          const viewportCenter = viewportHeight / 2;
          const elementCenter = rect.top + rect.height / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          const maxTranslateY = 80;
          const translateY = -(distanceFromCenter / viewportHeight) * maxTranslateY;

          earthImgRef.current.style.transform = `translate3d(0px, ${translateY}px, 0px)`;
        }
      }

      if (sndImgRef.current) {
        const rect = sndImgRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
          const viewportCenter = viewportHeight / 2;
          const elementCenter = rect.top + rect.height / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          const maxTranslateY = 80;
          const translateY = (distanceFromCenter / viewportHeight) * maxTranslateY;

          sndImgRef.current.style.transform = `translate3d(0px, ${translateY}px, 0px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getStatsData()
      .then((res) => {
        setHeroData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to load hero statistics data:", err);
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const targetPercentage = parseInt(stat2.number, 10) || 88;
    const duration = 3000;
    let startTimestamp = null;
    let animationFrameId;

    const draw = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeProgress = progressRatio * (2 - progressRatio);
      const currentPercentage = targetPercentage * easeProgress;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const strokeWidth = 22;
      const radius = x - strokeWidth / 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = strokeWidth;
      ctx.stroke();

      const startAngle = -Math.PI * 0.7;
      const endAngle = startAngle + (2 * Math.PI * (currentPercentage / 100));

      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle, false);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.stroke();

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stat2.number]);

  const AnimatedNumber = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const endValue = parseInt(end);
        const totalFrames = 60;
        const increment = endValue / totalFrames;
        const intervalTime = duration / totalFrames;

        const timer = setInterval(() => {
          start += increment;
          if (start >= endValue) {
            setCount(endValue);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, intervalTime);

        return () => clearInterval(timer);
      }
    }, [inView, end, duration]);

    return <span ref={ref}>{count}</span>;
  };

  return (
    <main className="Home-page-wrapper">
      <section className="home-hero-section">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-7">
              <div className="home-background-imge">
                <div className="home-hero-badge-wrapper">
                  <div class="featured-services-pill" style={{ marginBottom: '15px' }}>
                    👋 Hi We <span>Are Techco</span>
                  </div>
                </div>
                <h1 className="home-hero-title">
                  {heading}
                </h1>
                <p className="home-hero-desc">
                  {description}
                </p>
                <div className="home-hero-actions">
                  <div className="free-button">
                    <Link to="/pricing" className="free-btn">
                      <span className="btn-label get">GET STARTED</span>
                      <span className="btn-icon">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                  <div className="home-hero-rating">
                    <div className="home-hero-stars">
                      <div className="home-hero-star-box">
                        <img src={homestar} alt="" />
                        <span className="home-hero-rating-val">{ratingValue}</span>
                      </div>
                    </div>
                    <div className="home-hero-rating-text">
                      {ratingText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col-lg-6 mobileimage">
                  <img src={rightImage} alt="Techco Solution Hero" className="home-hero-main-img" />
                </div>
                <div className="col-lg-6" style={{ paddingLeft: '0' }}>
                  <div className="home-hero-right-container">
                    <div className="home-hero-orange-card">
                      <div className="home-hero-orange-number">
                        <ActualCountUp start={0} end={parseInt(stat1.number, 10) || 0} duration={3} enableScrollSpy scrollSpyOnce />
                      </div>
                      <div className="home-hero-orange-suffix">
                        {stat1.suffix}
                      </div>
                      <div className="home-hero-orange-text">
                        {stat1.text}
                      </div>
                      <div className="home-hero-profiles-group">
                        <div className="home-hero-profile-avatar">
                          <img src="https://techco.windstripedesign.ro/images/avatar/avatar_1.webp" alt="Client 1" />
                        </div>
                        <div className="home-hero-profile-avatar">
                          <img src="https://techco.windstripedesign.ro/images/avatar/avatar_2.webp" alt="Client 2" />
                        </div>
                        <div className="home-hero-profile-avatar">
                          <img src="https://techco.windstripedesign.ro/images/avatar/avatar_3.webp" alt="Client 3" />
                        </div>
                      </div>
                      <div className="home-hero-profile-more">
                        5k+
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6" style={{ paddingRight: '0' }}>
                  <div className="home-hero-right-container">
                    <div className="home-hero-pink-card">
                      <a href="">
                        <div className="pink-card-text">
                          <span>Data Security</span>
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </a>
                      <a href="">
                        <div className="pink-card-text">
                          <i className="fa-solid fa-plus"></i>
                          <span>Web Development</span>
                        </div>
                      </a>
                      <a href="">
                        <div className="pink-card-text">
                          <span>Analytics & Optimization</span>
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6" style={{ paddingLeft: '0' }}>
                  <div className="circle-background-image">
                    <div className="home-hero-circle-card">
                      <div className="home-hero-circle-num">
                        <ActualCountUp
                          start={0}
                          end={parseInt(stat2.number, 10) || 0}
                          suffix={stat2.suffix}
                          duration={3}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </div>
                      <canvas ref={canvasRef} height={252} width={252}></canvas>
                      <div className="home-hero-circle-text">
                        {stat2.text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-sectwo">
        <div className="brand-we" style={{ padding: '0 0 120px 0' }}>
          <div className="container">
            <div className="brand-heading">
              <div className="brand-title">
                <span className='brand-badge'>Brand We</span>
                Work With
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
        <div className="emplpoyee-stories">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="empolyee-card">
                      <div className="employee-card-inner">
                        <div className="card_inner-image">
                          <div className="card-image-contain">
                            <img src={iconHead} alt="Employee" />
                          </div>
                        </div>
                        <div className="animated-number">
                          <div className="number-content">
                            <div className="animated-number-area">
                              <AnimatedNumber end={25} />
                            </div>
                            <div className="animated-number-title">
                              Years of Experience
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="empolyee-card">
                      <div className="employee-card-inner">
                        <div className="card_inner-image">
                          <div className="card-image-contain">
                            <img src={iconCheck} alt="Employee" />
                          </div>
                        </div>
                        <div className="animated-number">
                          <div className="number-content">
                            <div className="animated-number-area">
                              <AnimatedNumber end={280} />
                            </div>
                            <div className="animated-number-title">
                              Success Stories
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="empolyee-card">
                      <div className="employee-card-inner">
                        <div className="card_inner-image">
                          <div className="card-image-contain">
                            <img src={iconLike} alt="Employee" />
                          </div>
                        </div>
                        <div className="animated-number">
                          <div className="number-content">
                            <div className="animated-number-area-k">
                              <AnimatedNumber end={56} />
                            </div>
                            <div className="animated-number-title">
                              Companies Trust Us
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="empolyee-card">
                      <div className="employee-card-inner">
                        <div className="card_inner-image">
                          <div className="card-image-contain">
                            <img src={iconDart} alt="Employee" />
                          </div>
                        </div>
                        <div className="animated-number">
                          <div className="number-content">
                            <div className="animated-number-area-per">
                              <AnimatedNumber end={100} />
                            </div>
                            <div className="animated-number-title">
                              Results Guaranteed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="employee-image">
                  <div className="employee-image_container">
                    <div className="employee-image-area">
                      <div className="europe-image">
                        <img src={employee} alt="Employee" />
                        <div className="europe-image-overlay"></div>
                      </div>
                    </div>
                  </div>
                  <div className="employee-img-text">
                    <h3 className='emp-img-title'>
                      <b className=''>12000+</b><br />
                      employees in 30 countries in Europe
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Our-Commitment">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="commitment-img-area">
                <div className="commit-img-container">
                  <img src="https://techco.windstripedesign.ro/images/about/about_image_9.webp" alt="" />
                </div>
                <div className="earth-img-area">
                  <div className="earth-cont">
                    <div className="commit-img-container">
                      <img
                        ref={earthImgRef}
                        src="https://techco.windstripedesign.ro/images/about/about_image_11.webp"
                        className="earth-img"
                        alt=""
                        data-paralax="{'y':'80', 'smoothness':'6'}"
                        style={{ transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="snd-image-area">
                  <div className="snd-cont">
                    <div className="commit-img-container">
                      <img
                        ref={sndImgRef}
                        src="https://techco.windstripedesign.ro/images/about/about_image_10.webp"
                        className="snd-image"
                        alt=""
                        style={{ transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <div class="brand-title">
                We are 😃
                <span class="brand-badge">
                  Techo
                </span>
              </div>
              <div className="commitment-content">
                <h2 className="commitment-title">Our Commitment to Client Satisfaction </h2>
                <div className="commitment-para">
                  <p>At Techco, our commitment to client satisfaction is at the core of everything we do. We understand clients' success.</p>
                </div>
              </div>
              <div className="commitment-list">
                <ul className="commitment-unorder-li">
                  <li>
                    <span className="icon_list_icon">
                      <i className="fa-solid fa-circle fa-fw"></i>
                    </span>
                    <span className="commitment-li-text">Grow your business the right way.</span>
                  </li>
                  <li>
                    <span className="icon_list_icon">
                      <i className="fa-solid fa-circle fa-fw"></i>
                    </span>
                    <span className="commitment-li-text">Let business growth help your business grow.</span>
                  </li>
                  <li>
                    <span className="icon_list_icon">
                      <i className="fa-solid fa-circle fa-fw"></i>
                    </span>
                    <span className="commitment-li-text">Helping you to get better.</span>
                  </li>
                </ul>
              </div>
              <div className="free-button commitment-butn" style={{ marginTop: '30px' }}>
                <Link to="/pricing" className="free-btn">
                  <span className="btn-label get">GET STARTED</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
                <Link className="how-works">
                  <span className="commitment-play-icon">
                    <i className="fas fa-play"></i>
                  </span>
                  <span className="commit-vdo-text">How We Works</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Exp-fast-reas">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="Expert-team">
                <div className="expert-img-container">
                  <img src="https://techco.windstripedesign.ro/images/icons/icon_user_check.svg" alt="" />
                </div>
                <div className="text-contain-area">
                  <h3>Expert Team Memebers</h3>
                  <p>We take pride in assembling a <br />diverse and highly skilled.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="Expert-team">
                <div className="expert-img-container" style={{ backgroundColor: "#f3a3381a" }}>
                  <img src="https://techco.windstripedesign.ro/images/icons/icon_headphone.svg" alt="" />
                </div>
                <div className="text-contain-area">
                  <h3>Fastest Customer Service</h3>
                  <p>We take pride in assembling a <br />diverse and highly skilled.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="Expert-team">
                <div className="expert-img-container" style={{ backgroundColor: '#f4438024' }}>
                  <img src="https://techco.windstripedesign.ro/images/icons/icon_dollar.svg" alt="" />
                </div>
                <div className="text-contain-area">
                  <h3>Reasonable Pricing</h3>
                  <p>We take pride in assembling a <br />diverse and highly skilled.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {cardsToShow.length > 0 && (
        <section className="featured-services-sec" id="featured-services" style={{ padding: '80px 0 120px 0' }}>
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
              {groupCardsIntoRows(cardsToShow).map((row, rowIdx) => (
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
            <div className="more-service-butn">
              <div className="free-button">
                <Link to="/servicespage" className="free-btn more-serv_butn">
                  <span className="btn-label more-service">MORE SERVICES</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {worksData && worksData.cards && worksData.cards.length > 0 && (
        <section className="recent-works-section" id="recent-works">
          <div className="container">
            <div className="row align-items-end" style={{ marginBottom: '60px' }}>
              <div className="col-lg-7">
                <div className="recent-works-header" style={{ marginBottom: 0 }}>
                  <div className="recent-works-pill">
                    <span>Crafting</span> Success With 😍 Project
                  </div>
                  <h2 className="recent-works-title">
                    {worksData.heading}
                  </h2>
                  <p className="recent-works-desc">
                    {worksData.description}
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="all-works" style={{ textAlign: 'right' }}>
                  <div className="free-button">
                    <Link to="/contactus" className="free-btn" style={{ backgroundColor: '#0044EB' }}>
                      <span className="btn-label All-work">All Works</span>
                      <span className="btn-icon">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="works-swiper-container">
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              freeMode={true}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper works-swiper"
            >
              {worksData.cards.map((card, idx) => (
                <SwiperSlide key={card._id || idx} className="work-card-slide">
                  <div className="work-card">
                    <div className={`work-card-img-wrapper card-theme-${idx % 4}`}>
                      <img
                        src={toAssetUrl(card.image)}
                        alt={card.title}
                        className="work-card-image"
                      />
                    </div>
                    <div className="work-card-content">
                      <h3 className="work-card-title">{card.title}</h3>
                      <span className="work-card-tag">{card.tag}</span>
                      <div className="work-card-footer">
                        <span className="work-card-explore">
                          <div className="free-button">
                            <Link to="/contactus" className="free-btn more-serv_butn">
                              <span className="btn-label footer-explore_butn">Explore</span>
                              <span className="btn-icon">
                                <i className="fa-solid fa-arrow-right"></i>
                              </span>
                            </Link>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
      {testimonials.length > 0 && (
        <section className="testimonials-section" id="testimonials">
          <div className="container">
            <div className="testimonials-header text-center" style={{ marginBottom: '40px' }}>
              <div className="featured-services-pill" style={{ display: 'inline-flex', marginBottom: '15px' }}>
                <span>Client</span>Testimonial 🙂
              </div>
              <h2 className="recent-works-title" style={{ fontSize: '40px', fontWeight: 700 }}>
                What clients say
              </h2>
            </div>
            <div className="row testimonials-row">
              <div className="col-lg-6 col-md-6">
                {testimonials.filter((_, idx) => idx % 2 === 0).map((item, idx) => (
                  <div key={item._id || idx} className="testimonial-card" style={{ marginBottom: '30px' }}>
                    <div className="testimonial-card-body">
                      <h3 className="testimonial-quote">“{item.quote}”</h3>
                      <p className="testimonial-desc">{item.description}</p>
                    </div>
                    <div className="testimonial-client-info">
                      <div className="testimonial-client-avatar">
                        <img
                          src={toAssetUrl(item.image)}
                          alt={item.name}
                          className="client-avatar-img"
                        />
                      </div>
                      <div className="for-combine">
                        <h4 className="testimonial-client-name">{item.name}</h4>
                        <span className="testimonial-client-role">{item.designation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-6 col-md-6">
                {testimonials.filter((_, idx) => idx % 2 !== 0).map((item, idx) => (
                  <div key={item._id || idx} className="testimonial-card" style={{ marginBottom: '30px' }}>
                    <div className="testimonial-card-body">
                      <h3 className="testimonial-quote">“{item.quote}”</h3>
                      <p className="testimonial-desc">{item.description}</p>
                    </div>
                    <div className="testimonial-client-info">
                      <div className="testimonial-client-avatar">
                        <img
                          src={toAssetUrl(item.image)}
                          alt={item.name}
                          className="client-avatar-img"
                        />
                      </div>
                      <div className="for-combine">
                        <h4 className="testimonial-client-name">{item.name}</h4>
                        <span className="testimonial-client-role">{item.designation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <TopExperts />
      <section className="Blog-Updates">
        <div className="container">
          <div className="testimonials-header text-center" style={{ marginBottom: '40px' }}>
            <div className="featured-services-pill" style={{ display: 'inline-flex', marginBottom: '15px' }}>
              <span>Blog</span>Updates
            </div>
            <h2 className="recent-works-title" style={{ fontSize: '40px', fontWeight: 700, marginBottom: '40px' }}>
              Latest Articles Posts
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="article_latest-card">
                <a href="" className="article-img-wrap">
                  <img src="https://techco.windstripedesign.ro/images/blog/blog_post_image_1.webp" alt="" />
                </a>
                <div className="art_latest-content">
                  <div className="date-categ">
                    <span className="latest_categ">
                      <a href="">IT Infrastructure</a>
                    </span>
                    <time datetime="" className="calendar-art">
                      <i className="far fa-calendar-alt"></i>
                      30/09/24
                    </time>
                  </div>
                  <h3 className="article_latest-title">
                    <a href="">Leveraging Analytics for Business Growth Modernizing...</a>
                  </h3>
                  <a href="" className="latest_art-read-more">
                    <span class="btn-icon for-hver"><i class="fa-solid fa-arrow-right"></i></span>
                    <span>Read More</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="article_latest-card">
                <a href="" className="article-img-wrap">
                  <img src="https://techco.windstripedesign.ro/images/blog/blog_post_image_2.webp" alt="" />
                </a>
                <div className="art_latest-content">
                  <div className="date-categ">
                    <span className="latest_categ">
                      <a href="">IT Infrastructure</a>
                    </span>
                    <time datetime="" className="calendar-art">
                      <i className="far fa-calendar-alt"></i>
                      30/09/24
                    </time>
                  </div>
                  <h3 className="article_latest-title">
                    <a href="">How Emerging <br /> Technologies are Shaping the Future...</a>
                  </h3>
                  <a href="" className="latest_art-read-more">
                    <span class="btn-icon for-hver"><i class="fa-solid fa-arrow-right"></i></span>
                    <span>Read More</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="article_latest-card">
                <a href="" className="article-img-wrap">
                  <img src="https://techco.windstripedesign.ro/images/blog/blog_post_image_3.webp" alt="" />
                </a>
                <div className="art_latest-content">
                  <div className="date-categ">
                    <span className="latest_categ">
                      <a href="">IT Infrastructure</a>
                    </span>
                    <time datetime="" className="calendar-art">
                      <i className="far fa-calendar-alt"></i>
                      30/09/24
                    </time>
                  </div>
                  <h3 className="article_latest-title">
                    <a href="">Creating Engaging Digital <br /> for Your Audience <br /> Software...</a>
                  </h3>
                  <a href="" className="latest_art-read-more">
                    <span class="btn-icon for-hver"><i class="fa-solid fa-arrow-right"></i></span>
                    <span>Read More</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
