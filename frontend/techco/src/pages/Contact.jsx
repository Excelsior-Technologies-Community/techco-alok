import React, { useState, useEffect } from 'react'
import "../styles/all.css"
import { getContactInfo, submitContactMsg } from '../api/authApi'


const Contact = () => {
    const [contactData, setcontactData] = useState(null)

    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            await submitContactMsg(formData);
            setSuccessMsg('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error(error);
            setErrorMsg('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            const res = await getContactInfo();
            console.log("API Response:", res.data);

            setcontactData(res.data.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <main className='ContactUs-Page'>
            <section className='heading-section'>
                <div className="page-title">
                    <div className="container">
                        <div className="heading-area">
                            <h3 className='page-sub-heading'>Contact
                                <span>Us 😍</span>
                            </h3>
                            <h2 className='page-heading'>
                                Contact Us
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className='contact-main-body'>
                <div className="contactinfo-cards">
                    <div className="container">
                        <div className="row">
                            {contactData && contactData.length > 0 ? (
                                contactData.map((data) => (
                                    <div className="col-lg-3 col-md-6 mb-4" key={data._id}>
                                        <div className="iconbox_block">
                                            <div className="iconbox_content">
                                                <span className="iconbox_img">
                                                    <img
                                                        src={`http://localhost:5000/uploads/contact/${data.image}`}
                                                        alt={data.heading}
                                                    />
                                                </span>
                                                <div className="iconbox_text-area">
                                                    <h3 className="iconbox_title">
                                                        {data.heading}
                                                    </h3>
                                                    <div className="iconbox_para">
                                                        <p style={{ whiteSpace: "pre-wrap" }}>{data.para}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <div className="spcl-sticky">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="form-heading">
                                        <div className="send-head">
                                            <h3 className='send-title'>
                                                Send Us A Message
                                            </h3>
                                            <div className="send-para">
                                                <p>Give us chance to serve and bring magic to your brand.</p>
                                            </div>
                                        </div>
                                        <form className="cntc-form" onSubmit={handleSubmit}>
                                            {successMsg && <div className="alert alert-success" style={{ color: 'green', marginBottom: '15px' }}>{successMsg}</div>}
                                            {errorMsg && <div className="alert alert-danger" style={{ color: 'red', marginBottom: '15px' }}>{errorMsg}</div>}
                                            <div className="row">
                                                <div className="col-lg-6 form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input type="text" name='name' value={formData.name} onChange={handleChange} className='form-control' placeholder='Name' required='required' />
                                                </div>
                                                <div className="col-lg-6 form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" name='email' value={formData.email} onChange={handleChange} className='form-control' placeholder='Email' required='required' />
                                                </div>
                                                <div className="col-lg-12 form-group">
                                                    <label htmlFor="subject">Subject</label>
                                                    <input type="text" name='subject' value={formData.subject} onChange={handleChange} className='form-control' placeholder='Subject' required='required' />
                                                </div>
                                                <div className="col-lg-12 form-group">
                                                    <label htmlFor="message">Message</label>
                                                    <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={5} placeholder='Message' required='required' ></textarea>
                                                </div>
                                                <div className="free-button">
                                                    <button type="submit" disabled={loading} className='free-btn' style={{ border: 'none', cursor: 'pointer' }}>
                                                        <span className='btn-label con-frm'>{loading ? 'Sending...' : 'Send Message'}</span>
                                                        <span className='btn-icon'>
                                                            <i className="fa-solid fa-up-right-from-square"></i>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="contact-map">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5694546.225526881!2d19.733990990342335!3d45.820467224104426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff26958976c3%3A0x84ef4f92a804b194!2sRomania!5e0!3m2!1sen!2sin!4v1776762871502!5m2!1sen!2sin" style={{ width: '100%', height: '100%', minHeight: '520px', border: 0, borderRadius: '15px' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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

export default Contact