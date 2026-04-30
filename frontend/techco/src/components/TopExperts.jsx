import React, { useState, useEffect } from 'react'
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMembers, toAssetUrl } from '../api/authApi';

const TopExperts = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        getMembers()
            .then((res) => {
                if (res.data.success) {
                    setMembers(res.data.data);
                }
            })
            .catch((err) => console.error("Failed to fetch members:", err));
    }, []);

    return (
        <main className='TopExperts-Components'>
            <section className="experts-section">
                <div className="container">
                    <div className="row">
                        <div className="top-skilled-experts">
                            <div className="expert-heading">
                                <div className="expert-title">
                                    <span className='brand-badge'>
                                        Our Expert
                                    </span>
                                    Team Members 😍
                                </div>

                            </div>
                            <div className="skilled-heading">
                                <h2 className='skilled-title'>Top Skilled Experts</h2>
                            </div>
                        </div>
                        <div className="experts-swiper">
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                slidesPerView={3}
                                loop={true}
                                speed={2500}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
                                className="mySwiper skilled-swiper"
                            >
                                {[...members, ...members, ...members, ...members].map((member, index) => (
                                    <SwiperSlide key={`${member._id}-${index}`}>
                                        <div className="team-member" style={{ width: '370px' }}>
                                            <a className="team-img-box">
                                                <img src={toAssetUrl(member.image)} alt={member.name} />
                                            </a>
                                            <div className="swiper-inner-content">
                                                <div className="skilled-content">
                                                    <div className="expert-name">
                                                        <a href="#">{member.name}</a>
                                                    </div>
                                                    <div className="expert-designation">
                                                        <span>{member.position}</span>
                                                    </div>
                                                    <ul className='team-social-icon'>
                                                        <li>
                                                            <a href="#">
                                                                <i className='fab fa-facebook-f'></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className='fa-brands fa-x-twitter'></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className='fab fa-linkedin-in'></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className='fab fa-instagram'></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="our-experts-btn free-button" style={{ textAlign: "center", marginTop: "40px" }}>
                            <a href="" className='free-btn started' style={{ backgroundColor: "white" }}>
                                <span className='btn-label all-experts' style={{ color: "#020842", padding: "19px 0 16px" }}>Our All Experts</span>
                                <span className='btn-icon' style={{ color: "#020842" }}>
                                    <i className="fa-solid fa-up-right-from-square"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default TopExperts