import React, { useState } from 'react';
import { 
  Mail, Send, MapPin, Phone, Github, Linkedin, Code2, 
  Terminal, BarChart2, Award, Brain, Twitter, Youtube, Instagram 
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { submitContactForm } from '../api/apiService';

export const Contact = ({ profile, onMessageSent }) => {
  const email = profile?.email || 'baraiyavishalbhai32@gmail.com';
  const phone = profile?.phone || '+91 7383359679';
  const location = profile?.location || 'Botad, Gujarat, India - 364710 (Open to Remote)';
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;

  const socialLinks = [
    { name: 'GitHub', url: profile?.githubUrl || 'https://github.com/mr-baraiya', icon: Github },
    { name: 'LinkedIn', url: profile?.linkedinUrl || 'https://www.linkedin.com/in/baraiya-vishalbhai/', icon: Linkedin },
    { name: 'LeetCode', url: profile?.leetcodeUrl || 'https://leetcode.com/u/mr_baraiya/', icon: Code2 },
    { name: 'YouTube', url: profile?.youtubeUrl || 'https://www.youtube.com/@Vi.685_junior', icon: Youtube },
    { name: 'Twitter', url: profile?.twitterUrl || 'https://x.com/baraiya1014', icon: Twitter }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: null, responseMsg: '' });

  const validateField = (name, value) => {
    let err = '';
    if (name === 'name') {
      if (!value.trim()) err = 'Name is required';
      else if (value.trim().length < 2) err = 'Name must be at least 2 characters';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) err = 'Email is required';
      else if (!emailRegex.test(value.trim())) err = 'Please enter a valid email address';
    } else if (name === 'inquiryType') {
      if (!value.trim()) err = 'Please select an inquiry type';
    } else if (name === 'subject') {
      if (!value.trim()) err = 'Subject is required';
      else if (value.trim().length < 3) err = 'Subject must be at least 3 characters';
    } else if (name === 'message') {
      if (!value.trim()) err = 'Message is required';
      else if (value.trim().length < 10) err = 'Message must be at least 10 characters';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error on change if valid
    const err = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: err }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) errors[key] = err;
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({ loading: false, success: false, error: 'Please correct the highlighted errors in the form.', responseMsg: '' });
      return;
    }

    setStatus({ loading: true, success: false, error: null, responseMsg: '' });

    try {
      const data = await submitContactForm(formData);
      setStatus({
        loading: false,
        success: true,
        error: null,
        responseMsg: data.message || 'Thank you! Your message has been sent successfully and notified to admin.'
      });
      setFormData({ name: '', email: '', inquiryType: '', subject: '', message: '' });
      setFormErrors({});
      if (onMessageSent) onMessageSent();
    } catch (err) {
      console.error('Submit contact form error:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.error || err.message || 'Failed to send message. Please try again.',
        responseMsg: ''
      });
    }
  };

  return (
    <section id="contact" className="pt-4 sm:pt-6 pb-16 sm:pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
              <Mail className="w-3.5 h-3.5 text-[#15D8B3]" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Let's Connect & Build Together
            </h2>
          </div>
        </div>

        {/* 50-50 Split Equal Size Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Contact Information */}
          <div className="bg-[#050508] border border-[#49A4BB]/30 rounded-xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 h-full">
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#F8FAFC]">Contact Information</h3>
                <p className="text-xs text-[#F8FAFC]/75 font-light leading-relaxed">
                  Feel free to reach out for project collaborations, software engineering opportunities, or technical inquiries.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#050814] border border-[#49A4BB]/30 hover:border-[#15D8B3] transition-colors no-underline group"
                >
                  <Mail className="w-5 h-5 text-[#15D8B3] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[#F8FAFC]/60 font-mono uppercase block">Email</span>
                    <p className="text-xs font-mono font-semibold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors break-all">{email}</p>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#050814] border border-[#49A4BB]/30 hover:border-[#15D8B3] transition-colors no-underline group"
                >
                  <SiWhatsapp className="w-5 h-5 text-[#15D8B3] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] text-[#F8FAFC]/60 font-mono uppercase block">WhatsApp Direct Chat</span>
                    <p className="text-xs font-mono font-semibold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors">Start Instant Chat ↗</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#050814] border border-[#49A4BB]/30">
                  <MapPin className="w-5 h-5 text-[#15D8B3] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[#F8FAFC]/60 font-mono uppercase block">Location</span>
                    <p className="text-xs font-mono font-semibold text-[#F8FAFC]">{location}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Developer & Social Links Grid */}
            <div className="pt-4 space-y-3">
              <span className="text-[10px] font-mono text-[#15D8B3] font-bold uppercase tracking-wider block">
                Developer & Social Profiles
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-lg bg-[#050814] border border-[#49A4BB]/30 text-[#F8FAFC]/80 hover:text-[#15D8B3] hover:border-[#15D8B3] hover:-translate-y-0.5 transition-all"
                      title={link.name}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Send a Message Form with Validation */}
          <div className="bg-[#050508] border border-[#49A4BB]/30 rounded-xl p-6 sm:p-8 shadow-xl h-full flex flex-col justify-between">
            <form onSubmit={handleSubmit} noValidate className="space-y-6 flex-grow flex flex-col justify-between">
              
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-[#F8FAFC]">Send a Message</h3>

                {status.success && (
                  <div className="p-4 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/50 text-[#15D8B3] text-xs font-mono font-semibold animate-fadeIn">
                    ✓ {status.responseMsg}
                  </div>
                )}

                {status.error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono animate-fadeIn">
                    ⚠️ {status.error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#050814] text-xs font-mono text-[#F8FAFC] transition-colors focus:outline-none ${
                        formErrors.name
                          ? 'border border-red-500 focus:border-red-400'
                          : 'border border-[#49A4BB]/30 focus:border-[#15D8B3]'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[11px] font-mono text-red-400 block pt-0.5">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#050814] text-xs font-mono text-[#F8FAFC] transition-colors focus:outline-none ${
                        formErrors.email
                          ? 'border border-red-500 focus:border-red-400'
                          : 'border border-[#49A4BB]/30 focus:border-[#15D8B3]'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[11px] font-mono text-red-400 block pt-0.5">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                {/* Inquiry Type Select Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block">Inquiry Type *</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg bg-[#050814] text-xs font-mono text-[#F8FAFC] cursor-pointer transition-colors focus:outline-none ${
                      formErrors.inquiryType
                        ? 'border border-red-500 focus:border-red-400'
                        : 'border border-[#49A4BB]/30 focus:border-[#15D8B3]'
                    }`}
                  >
                    <option value="" disabled className="bg-[#050508] text-gray-400">Select an inquiry type</option>
                    <option value="Job Opportunity" className="bg-[#050508] text-[#F8FAFC]">Job Opportunity</option>
                    <option value="Freelance Project" className="bg-[#050508] text-[#F8FAFC]">Freelance Project</option>
                    <option value="Collaboration" className="bg-[#050508] text-[#F8FAFC]">Collaboration</option>
                    <option value="AI/ML Project" className="bg-[#050508] text-[#F8FAFC]">AI/ML Project</option>
                    <option value="Web Development" className="bg-[#050508] text-[#F8FAFC]">Web Development</option>
                    <option value="DevOps / Cloud" className="bg-[#050508] text-[#F8FAFC]">DevOps / Cloud</option>
                    <option value="Teaching / Mentorship" className="bg-[#050508] text-[#F8FAFC]">Teaching / Mentorship</option>
                    <option value="Other" className="bg-[#050508] text-[#F8FAFC]">Other</option>
                  </select>
                  {formErrors.inquiryType && (
                    <span className="text-[11px] font-mono text-red-400 block pt-0.5">{formErrors.inquiryType}</span>
                  )}
                </div>

                {/* Subject Input */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry / Opportunity"
                    className={`w-full px-4 py-2.5 rounded-lg bg-[#050814] text-xs font-mono text-[#F8FAFC] transition-colors focus:outline-none ${
                      formErrors.subject
                        ? 'border border-red-500 focus:border-red-400'
                        : 'border border-[#49A4BB]/30 focus:border-[#15D8B3]'
                    }`}
                  />
                  {formErrors.subject && (
                    <span className="text-[11px] font-mono text-red-400 block pt-0.5">{formErrors.subject}</span>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-2.5 rounded-lg bg-[#050814] text-xs font-mono text-[#F8FAFC] transition-colors focus:outline-none resize-none ${
                      formErrors.message
                        ? 'border border-red-500 focus:border-red-400'
                        : 'border border-[#49A4BB]/30 focus:border-[#15D8B3]'
                    }`}
                  ></textarea>
                  {formErrors.message && (
                    <span className="text-[11px] font-mono text-red-400 block pt-0.5">{formErrors.message}</span>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-3 px-6 rounded-lg bg-[#15D8B3] text-[#050508] text-xs font-bold font-mono tracking-wide hover:bg-[#15D8B3]/90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#15D8B3]/20 disabled:opacity-50"
                >
                  {status.loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
