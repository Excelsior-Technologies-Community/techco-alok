import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTeam, getMembers, toAssetUrl } from '../api/authApi'
import teamFallback from '../assets/images/team.webp'
import global from '../assets/images/team_map.webp';

const Team = () => {
    const [teamInfo, setTeamInfo] = useState(null)
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamRes, membersRes] = await Promise.all([
                    getTeam(),
                    getMembers()
                ]);

                if (teamRes.data.success) {
                    setTeamInfo(teamRes.data.data)
                }
                if (membersRes.data.success) {
                    setMembers(membersRes.data.data)
                }
            } catch (err) {
                console.error("Error fetching team page data:", err)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    const renderBadgeText = (text) => {
        if (!text) return null;
        const lowercaseText = text.toLowerCase();
        const teamIndex = lowercaseText.indexOf("team");

        if (teamIndex !== -1) {
            const before = text.substring(0, teamIndex).trim();
            const after = text.substring(teamIndex).trim();
            return (
                <div className="team-hero-badge-wrapper">
                    {before && <span className="team-hero-badge-text">{before}</span>}
                    {after && <span className="team-hero-badge">{after}</span>}
                </div>
            );
        }

        const words = text.split(' ');
        if (words.length > 1) {
            const lastWord = words.pop();
            const before = words.join(' ');
            return (
                <div className="team-hero-badge-wrapper">
                    <span className="team-hero-badge-text">{before}</span>
                    <span className="team-hero-badge">{lastWord}</span>
                </div>
            );
        }

        return (
            <div className="team-hero-badge-wrapper">
                <span className="team-hero-badge">{text}</span>
            </div>
        );
    };

    const badgeText = teamInfo?.badgeText || "Our Dedicated Team 🧠";
    const heading = teamInfo?.heading || "Get to Know Our Expert Techco Team";
    const description = teamInfo?.description || "Get acquainted with the powerhouse behind Techco – our expert team of professionals dedicated to revolutionizing the IT landscape. Comprising.";
    const rightImage = teamInfo?.rightImage ? toAssetUrl(teamInfo.rightImage) : teamFallback;

    return (
        <main className='Teams-Page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area text-center">
                            <h3 className='page-sub-heading'>Team
                                <span>Members 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Team Members
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='team-hero-section'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="team-hero-content">
                                Our Dedicated
                                {renderBadgeText(badgeText)}
                                <h1 className="team-hero-title">
                                    {heading}
                                </h1>
                                <p className="team-hero-description">
                                    {description}
                                </p>
                                <div className="free-button">
                                    <Link to="/contactus" className="free-btn">
                                        <span className="btn-label talk-expert">Talk to an Expert</span>
                                        <span className="btn-icon">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-6">
                            <div className="team-hero-image-wrapper">
                                <img
                                    src={rightImage}
                                    alt="Expert Techco Team"
                                    className="team-hero-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="team-members-list-sec">
                <div className="container">
                    <div className="team-section-header">
                        <div className="global-title">
                            <span className='badge'>
                                Our Expert
                            </span>
                            Team Members 😍
                        </div>
                        <h2 className="team-section-title">Top Skilled Experts</h2>
                    </div>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted">No team members found. Check back later!</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {members.map((member) => (
                                <div className="col-lg-4 col-md-6 col-sm-12" key={member._id}>
                                    <div className="team-member h-100">
                                        <Link to={`/team/${member._id}`} className="team-img-box">
                                            <img src={toAssetUrl(member.image)} alt={member.name} />
                                        </Link>
                                        <div className="swiper-inner-content">
                                            <div className="skilled-content">
                                                <div className="expert-name">
                                                    <Link to={`/team/${member._id}`}>{member.name}</Link>
                                                </div>
                                                <div className="expert-designation">
                                                    <span>{member.position}</span>
                                                </div>
                                                <ul className='team-social-icon justify-content-center'>
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
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className='global-company'>
                <div className="container">
                    <div className="glb-head">
                        <div className="global-title">
                            <span className='badge'>
                                Techco
                            </span>
                            Company 😍
                        </div>
                    </div>
                    <div className="global-heading">
                        <h2>
                            Our Global Team is Growing
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <div className="global-image">
                                <img src={global} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Team