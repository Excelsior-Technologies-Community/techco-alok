import React, { useEffect, useState } from 'react'
import video from '../assets/images/video-image.webp'
import { getAboutDetails, toAssetUrl } from '../api/authApi'
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
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useInView } from 'react-intersection-observer';
import TopExperts from '../components/TopExperts';
import Better from '../components/Better';

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

const About = () => {
    const [about, setAbout] = useState(null)

    useEffect(() => {
        getAboutDetails()
            .then((res) => setAbout(res.data.data))
            .catch((err) => {
                console.error('Failed to load About data:', err)
            })
    }, [])

    const aboutImageUrl = about?.image ? toAssetUrl(about.image) : ''

    return (
        <main className='AboutUs-page'>
            <section className='heading-section'>
                <div className="page-title" style={{ paddingBottom: '394px' }}>
                    <div className="container">
                        <div className="heading-area">
                            <h3 className='page-sub-heading'>About More
                                <span>Techco 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                About Us
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='about-main-body'>
                <div className="onlyfor-pad">
                    <div className="container">
                        <div className="row align-items-center up-image">
                            <div className="col-lg-8">
                                <div className="top-image">
                                    {aboutImageUrl ? (
                                        <img src={aboutImageUrl} alt={about?.heading || 'About Techco'} />
                                    ) : (
                                        <div className="image-placeholder">Loading image...</div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="about-video top-image">
                                    <img src={video} alt="Video preview" />
                                    <div className="play-overlay" aria-hidden="true">
                                        <a className="play-icon" >
                                            <span className="play-triangle">
                                                <i className='fas fa-play'></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about-details row">
                            <div className="col-lg-4">
                                <div className="we-provide">
                                    <div className="provide-title">
                                        About
                                        <span className='techo-badge'>Techco 🙂</span>
                                    </div>
                                </div>
                                <div className="provide-text-block">
                                    <h2>
                                        {about?.heading || 'Discover Techco'}
                                    </h2>
                                </div>
                            </div>
                            <div className="col-lg-2"></div>
                            <div className="col-lg-6">
                                <p className='provide-para'>{about?.description || 'Learn more about Techco with our latest backend-driven content.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='about-bottom-section'>
                    <div className="container">
                        <div className="row">
                            {about?.cards && about.cards.length > 0 ? (
                                about.cards.map((card) => (
                                    <div className="col-lg-4 mb-4" key={card._id}>
                                        <div className="iconbox_block our-mission">
                                            <div className="iconbox_content misn-icon">
                                                <span className="iconbox_img mission-img">
                                                    <img
                                                        src={toAssetUrl(card.image)}
                                                        alt={card.title}
                                                    />
                                                </span>
                                                <div className="iconbox_text-area mission-heading">
                                                    <h3 className="iconbox_title">
                                                        {card.title}
                                                    </h3>
                                                    <div className="iconbox_para mission-para">
                                                        <p style={{ whiteSpace: "pre-wrap" }}>{card.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>No features listed yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="brand-we">
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
            <TopExperts />
            <Better />
        </main>
    )
}

export default About