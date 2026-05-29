import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';

const Hero = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        }, 1500);
    };

    const contactChannels = [
        {
            title: 'Email Us',
            detail: 'support@mernlms.com',
            subtext: 'We typically reply within 24 hours',
            icon: Mail,
            action: 'mailto:support@mernlms.com'
        },
        {
            title: 'Call Us',
            detail: '+1 (555) 123-4567',
            subtext: 'Mon-Fri from 9:00 AM to 6:00 PM',
            icon: Phone,
            action: 'tel:+15551234567'
        },
        {
            title: 'Our Office',
            detail: '123 Tech Campus, Suite 400',
            subtext: 'Silicon Valley, CA 94025',
            icon: MapPin,
            action: '#'
        }
    ];

    return (
        <div className='relative overflow-hidden bg-white pb-24'>
            {/* Header SVG Background matching other pages */}
            <div className='absolute top-0 left-0 right-0 flex justify-center -z-10 overflow-hidden pointer-events-none'>
                <svg className='size-full max-md:hidden opacity-75' width='1440' height='720' viewBox='0 0 1440 720' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path stroke='var(--color-gray-200)' strokeOpacity='.5' d='M-15.227 702.342H1439.7' />
                    <circle cx='711.819' cy='372.562' r='308.334' stroke='var(--color-gray-200)' strokeOpacity='.5' />
                    <circle cx='16.942' cy='20.834' r='308.334' stroke='var(--color-gray-200)' strokeOpacity='.5' />
                    <path stroke='var(--color-gray-200)' strokeOpacity='.5' d='M-15.227 573.66H1439.7M-15.227 164.029H1439.7' />
                    <circle cx='782.595' cy='411.166' r='308.334' stroke='var(--color-gray-200)' strokeOpacity='.5' />
                </svg>
            </div>

            {/* Hero Header Section */}
            <section className='flex flex-col items-center justify-center px-4 pt-24 md:px-16 lg:px-24'>
                <div className='mx-auto flex w-fit items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold text-indigo-600 ring-1 ring-indigo-400/20 tracking-wider uppercase mb-6'>
                    <Sparkles className='size-4 text-indigo-600 animate-pulse' />
                    <span>Get In Touch</span>
                </div>
                <h1 className='max-w-4xl bg-linear-to-r from-black to-[#748298] bg-clip-text text-center text-4xl/12 font-extrabold text-transparent md:text-6xl/20'>
                    Connect With Our Learning Team.
                </h1>
                <p className='mt-4 max-w-2xl text-center text-base/7 text-gray-600 md:text-lg/8'>
                    Have questions about specific courses, certifications, customized enterprise solutions, or technical setups? We're here to help you get the answers you need.
                </p>
            </section>

            {/* Main Interactive Grid */}
            <section className='mx-auto mt-20 max-w-5xl px-4 md:px-8'>
                <div className='grid grid-cols-1 gap-12 lg:grid-cols-5'>
                    
                    {/* Left Column: Contact Methods */}
                    <div className='space-y-6 lg:col-span-2'>
                        <div>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Contact Channels</h2>
                            <p className='text-sm text-gray-500'>
                                Choose your preferred support method. Our team stands ready to assist you on your educational pathway.
                            </p>
                        </div>

                        <div className='space-y-4 pt-4'>
                            {contactChannels.map((channel, index) => (
                                <a 
                                    href={channel.action}
                                    key={index} 
                                    className='flex gap-4 rounded-2xl border border-gray-150 bg-white/70 backdrop-blur-md p-5 shadow-2xs hover:border-indigo-100 hover:shadow-md hover:-translate-y-0.5 transition duration-300 group'
                                >
                                    <div className='rounded-xl bg-indigo-50 p-3 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition duration-300 shrink-0 h-fit'>
                                        <channel.icon className='size-6' />
                                    </div>
                                    <div className='space-y-1'>
                                        <h3 className='font-bold text-gray-800 text-sm group-hover:text-indigo-600 transition duration-300'>{channel.title}</h3>
                                        <p className='text-gray-900 font-semibold text-xs leading-none'>{channel.detail}</p>
                                        <p className='text-gray-400 text-2xs font-medium'>{channel.subtext}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className='lg:col-span-3'>
                        <div className='rounded-3xl border border-gray-200/80 bg-white p-8 shadow-xs hover:border-indigo-150 hover:shadow-lg transition-all duration-300 relative'>
                            {isSubmitted ? (
                                <div className='flex flex-col items-center justify-center py-20 text-center animate-fade-in'>
                                    <div className='rounded-full bg-emerald-50 p-4 text-emerald-600 mb-6 border border-emerald-100'>
                                        <CheckCircle className='size-12 animate-bounce' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>Message Sent Successfully!</h3>
                                    <p className='text-sm text-gray-500 max-w-sm'>
                                        Thank you for reaching out. A curriculum advisor or technical support expert will get in touch with you shortly.
                                    </p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className='mt-8 rounded-xl border border-gray-200 bg-gray-50 px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition'
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    <div className='flex items-center gap-2 mb-4 border-b border-gray-100 pb-4'>
                                        <MessageSquare className='size-5 text-indigo-600' />
                                        <h3 className='font-bold text-gray-800 text-lg'>Send Us a Direct Message</h3>
                                    </div>

                                    {/* Name Field */}
                                    <div className='space-y-1.5'>
                                        <label htmlFor='name' className='block text-xs font-bold text-gray-600 uppercase tracking-wider'>Your Name</label>
                                        <input 
                                            type='text' 
                                            id='name' 
                                            name='name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required 
                                            placeholder='John Doe'
                                            className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500'
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className='space-y-1.5'>
                                        <label htmlFor='email' className='block text-xs font-bold text-gray-600 uppercase tracking-wider'>Email Address</label>
                                        <input 
                                            type='email' 
                                            id='email' 
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required 
                                            placeholder='john@example.com'
                                            className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500'
                                        />
                                    </div>

                                    {/* Subject Field */}
                                    <div className='space-y-1.5'>
                                        <label htmlFor='subject' className='block text-xs font-bold text-gray-600 uppercase tracking-wider'>Inquiry Subject</label>
                                        <select 
                                            id='subject' 
                                            name='subject'
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 appearance-none'
                                        >
                                            <option value='Course Inquiry'>Course Inquiry / Syllabus Details</option>
                                            <option value='Technical Support'>Technical Support / Dashboard Issue</option>
                                            <option value='General Inquiry'>General Inquiry</option>
                                            <option value='Mentor Collaboration'>Mentor Collaboration</option>
                                        </select>
                                    </div>

                                    {/* Message Field */}
                                    <div className='space-y-1.5'>
                                        <label htmlFor='message' className='block text-xs font-bold text-gray-600 uppercase tracking-wider'>Your Message</label>
                                        <textarea 
                                            id='message' 
                                            name='message'
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required 
                                            rows='4'
                                            placeholder='Tell us how we can help you...'
                                            className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 resize-none'
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button 
                                        type='submit'
                                        className='w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-98 cursor-pointer'
                                    >
                                        <span>Send Message</span>
                                        <Send className='size-4' />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Hero;