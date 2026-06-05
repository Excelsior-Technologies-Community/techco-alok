import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getMemberById, toAssetUrl } from '../api/authApi';
import CountUp from 'react-countup';
const ActualCountUp = (CountUp && typeof CountUp === 'object' && 'default' in CountUp) ? CountUp.default : CountUp;
const easeInOutCubic = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
};
import '../styles/all.css';

const TeamDetails = () => {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                setLoading(true);
                const res = await getMemberById(id);
                if (res.data.success) {
                    setMember(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching member details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMember();
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <main className='Team-Detail-Page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area text-center">
                            <h3 className='page-sub-heading'>Team
                                <span>Details 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Team Details
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <div className="team-detail-content-wrapper">
                <div className="container">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : member ? (
                        <div className="row">
                            <div className="member-profile-sidebar-card">
                                <div className="member-profile-img-container">
                                    <div className="mbr-img-bg">
                                        <img
                                            src={toAssetUrl(member.image)}
                                            alt={member.name}
                                            className="member-profile-img"
                                        />
                                    </div>
                                </div>
                                <div className="member-profile-info-body">
                                    <h2 className="member-profile-name">{member.name}</h2>
                                    <div className="member-profile-contact-details">
                                        {member.experience && (
                                            <div className="contact-item">
                                                <strong className="contact-label">Responsibility:</strong>
                                                <span className="contact-value text-capitalize">{member.position}</span>
                                            </div>
                                        )}
                                        {member.experience && (
                                            <div className="contact-item">
                                                <span className="contact-label">Experience:</span>
                                                <span className="contact-value">{member.experience}</span>
                                            </div>
                                        )}
                                        {member.email && (
                                            <div className="contact-item">
                                                <span className="contact-label">Email:</span>
                                                <span className="contact-value">
                                                    <a href={`mailto:${member.email}`}>{member.email}</a>
                                                </span>
                                            </div>
                                        )}
                                        {member.phone && (
                                            <div className="contact-item">
                                                <span className="contact-label">Phone:</span>
                                                <span className="contact-value">
                                                    <a href={`tel:${member.phone}`}>{member.phone}</a>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="member-social-media">
                                        <h3 className="scl-mdia-title">
                                            Social Media
                                        </h3>
                                        <ul>
                                            <li>
                                                <a href="">
                                                    <i className='fab fa-facebook-f'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <i className='fa-brands fa-x-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <i className='fab fa-linkedin-in'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <i className='fab fa-instagram'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="member-detail-sec-card">
                                <h2 className="member-detail-sec-heading">Professional Skills</h2>
                                <p className="member-detail-sec-text">
                                    {member.skillsDescription}
                                </p>
                                {member.skills && member.skills.length > 0 && (
                                    <div className="member-detail-odometers">
                                        <div className="row">
                                            {(() => {
                                                const colors = ['#0044EB', '#FF5E3A', '#6c757d', '#FFA000'];
                                                return member.skills.map((skill, idx) => {
                                                    const targetVal = parseInt(skill.percentage, 10) || 0;
                                                    return (
                                                        <div className="col-sm-3" key={idx}>
                                                            <div className="mter-card">
                                                                <div className="odometer-skill-card" style={{ '--card-border-color': colors[idx % colors.length] }}>
                                                                    <div className="odometer-percent-num">
                                                                        <ActualCountUp start={0} end={targetVal} duration={5} enableScrollSpy scrollSpyOnce easingFn={easeInOutCubic} />%
                                                                    </div>
                                                                    <div className="odometer-skill-name">{skill.name}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                });
                                            })()}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="member-detail-sec-card">
                                <h2 className="member-detail-sec-heading">Educational Experience</h2>
                                <p className="member-detail-sec-text">
                                    {member.educationDescription}
                                </p>
                                {member.qualifications && member.qualifications.length > 0 && (
                                    <div className="member-qualifications-list-sec mt-4">
                                        <h3 className="qualifications-title">Qualifications:</h3>
                                        <ul className="qualifications-bullets-list">
                                            {member.qualifications.map((qual, idx) => (
                                                <li className="qualification-bullet-item" key={idx}>
                                                    <span className="bullet-dot"></span>
                                                    <span className="qualification-bullet-text">{qual}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <h3>Team Member Not Found</h3>
                            <p className="text-muted mt-2">The requested team member profile could not be loaded.</p>
                            <Link to="/team" className="btn btn-primary mt-3">Back to Team</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TeamDetails;
