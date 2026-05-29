import React from 'react';
import { BookOpen, Users, GraduationCap, Award, Compass, Heart, Shield, Sparkles } from 'lucide-react';

const Hero = () => {
    const stats = [
        { label: 'Active Students', value: '15,000+', icon: Users },
        { label: 'Expert Mentors', value: '50+', icon: GraduationCap },
        { label: 'Premium Courses', value: '120+', icon: BookOpen },
        { label: 'Success Rate', value: '93%', icon: Award }
    ];

    const values = [
        {
            title: 'Mentor-Led Guidance',
            description: 'Learn directly from industry veterans who bring real-world experience, practical insights, and personalized feedback.',
            icon: Sparkles,
        },
        {
            title: 'Hands-on Learning',
            description: 'We believe in learning by doing. Build real-world applications, solve practical challenges, and create an outstanding portfolio.',
            icon: Compass,
        },
        {
            title: 'Student-First Mentality',
            description: 'Every feature of our LMS, from interactive coding playgrounds to discussion forums, is built keeping student success in mind.',
            icon: Heart,
        },
        {
            title: 'Quality & Trust',
            description: 'We partner with the best in the industry to ensure our curriculum remains modern, relevant, and extremely accurate.',
            icon: Shield,
        }
    ];

    return (
        <div className='relative overflow-hidden bg-white pb-24'>
            {/* Header SVG Background matching homepage */}
            <div className='absolute top-0 left-0 right-0 flex justify-center -z-10 overflow-hidden pointer-events-none'>
                <svg className='size-full max-md:hidden opacity-75' width='1440' height='720' viewBox='0 0 1440 720' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path stroke='var(--color-gray-200)' strokeOpacity='.5' d='M-15.227 702.342H1439.7' />
                    <circle cx='711.819' cy='372.562' r='308.334' stroke='var(--color-gray-200)' strokeOpacity='.5' />
                    <circle cx='16.942' cy='20.834' r='308.334' stroke='var(--color-gray-200)' strokeOpacity='.5' />
                    <path stroke='var(--color-gray-200)' strokeOpacity='.5' d='M-15.227 573.66H1439.7M-15.227 164.029H1439.7' />
                    <circle cx='782.595' cy='411.166' r='308.334' stroke='var(--color-gray-200)' strokeOpacity='.5' />
                </svg>
            </div>

            {/* Hero Main Header Section */}
            <section className='flex flex-col items-center justify-center px-4 pt-24 md:px-16 lg:px-24'>
                <div className='mx-auto flex w-fit items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold text-indigo-600 ring-1 ring-indigo-400/20 tracking-wider uppercase mb-6'>
                    <Sparkles className='size-4 text-indigo-600 animate-pulse' />
                    <span>Who We Are</span>
                </div>
                <h1 className='max-w-4xl bg-linear-to-r from-black to-[#748298] bg-clip-text text-center text-4xl/12 font-extrabold text-transparent md:text-6xl/20'>
                    Transforming Lives Through Modern Education.
                </h1>
                <p className='mt-4 max-w-2xl text-center text-base/7 text-gray-600 md:text-lg/8'>
                    We are dedicated to providing an premium, accessible, and practical learning environment. We empower curious minds to acquire modern skills, learn at their own pace, and shape their desired career.
                </p>
            </section>

            {/* Premium Stats Grid */}
            <section className='mx-auto mt-16 max-w-5xl px-4 md:px-8'>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                    {stats.map((stat, index) => (
                        <div key={index} className='flex flex-col items-center rounded-2xl border border-gray-150 bg-white/70 backdrop-blur-md p-6 text-center shadow-xs transition duration-300 hover:border-indigo-100 hover:shadow-md'>
                            <div className='mb-3 rounded-full bg-indigo-50 p-3 text-indigo-600'>
                                <stat.icon className='size-6' />
                            </div>
                            <span className='text-3xl font-extrabold text-gray-900'>{stat.value}</span>
                            <span className='mt-1 text-xs font-medium text-gray-500 uppercase tracking-wider'>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Philosophy: Mission & Vision */}
            <section className='mx-auto mt-24 max-w-5xl px-4 md:px-8'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                    {/* Mission Card */}
                    <div className='group rounded-3xl bg-linear-to-b from-gray-50 to-white border border-gray-200/80 p-8 shadow-xs hover:border-indigo-100 hover:shadow-lg transition-all duration-300'>
                        <div className='inline-flex items-center justify-center rounded-2xl bg-gray-900 p-4 text-white shadow-md mb-6 group-hover:bg-indigo-600 transition-colors duration-300'>
                            <Compass className='size-6' />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Our Mission</h2>
                        <p className='text-sm/6 text-gray-600 font-medium'>
                            To bridge the gap between academic theory and industry reality by offering structured, premium, and practical curricula. We strive to deliver an exceptional educational environment where every student has the tools, community support, and mentor guidance required to build actual competencies.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className='group rounded-3xl bg-linear-to-b from-gray-50 to-white border border-gray-200/80 p-8 shadow-xs hover:border-indigo-100 hover:shadow-lg transition-all duration-300'>
                        <div className='inline-flex items-center justify-center rounded-2xl bg-gray-900 p-4 text-white shadow-md mb-6 group-hover:bg-indigo-600 transition-colors duration-300'>
                            <BookOpen className='size-6' />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Our Vision</h2>
                        <p className='text-sm/6 text-gray-600 font-medium'>
                            To establish the world's most supportive and engaging online classroom. We envision a future where top-tier education is not restricted by geography or background, nurturing a collaborative ecosystem of lifelong learners, software developers, and creators who actively build the digital landscape of tomorrow.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className='mx-auto mt-28 max-w-5xl px-4 md:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl font-extrabold text-gray-900 md:text-4xl'>Our Core Values</h2>
                    <p className='mt-3 text-sm text-gray-500 max-w-md mx-auto'>
                        The foundational principles that guide our academic system, mentors, and student community every single day.
                    </p>
                </div>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    {values.map((val, index) => (
                        <div key={index} className='flex gap-4 rounded-2xl border border-gray-150 bg-white p-6 shadow-2xs hover:shadow-md transition duration-300'>
                            <div className='h-fit rounded-xl bg-indigo-50 p-3 text-indigo-600 shrink-0'>
                                <val.icon className='size-6' />
                            </div>
                            <div className='space-y-1.5'>
                                <h3 className='font-bold text-gray-800 text-base leading-snug'>{val.title}</h3>
                                <p className='text-gray-500 text-xs font-medium leading-relaxed'>{val.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hero;