import { StarIcon } from 'lucide-react';
import SectionTitle from '@/components/section-title';

export default function OurTestimonialSection() {
    const data = [
        {
            review: 'The MERN stack course completely changed my career path! The lessons are extremely easy to follow, and the hands-on projects helped me build a solid portfolio.',
            name: 'Richard Nelson',
            date: '12 Jan 2026',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        },
        {
            review: 'I loved the self-paced learning model. The mentors are incredibly supportive, and the community forums helped me get unstuck whenever I faced coding errors.',
            name: 'Sophia Martinez',
            date: '15 Mar 2026',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        },
        {
            review: 'This LMS is incredibly smooth and easy to navigate. Tracking my progress and accessing course materials is a breeze. Highly recommended for busy professionals!',
            name: 'Ethan Roberts',
            date: '20 Feb 2026',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        },
        {
            review: 'The web development curriculum is modern and highly relevant. The practical assignments forced me to apply what I learned, which was key to landing my first job.',
            name: 'Isabella Kim',
            date: '20 Sep 2026',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
        },
        {
            review: 'Outstanding quality of education! The structured learning paths took me from an absolute beginner to building full-stack applications in just a few months.',
            name: 'Liam Johnson',
            date: '04 Oct 2026',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop',
        },
        {
            review: 'Getting certified was the highlight of my learning journey. It gave me the confidence to apply for developer roles and successfully clear technical interviews.',
            name: 'Ava Patel',
            date: '01 Nov 2026',
            rating: 5,
            image: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png',
        },
    ];

    return (
        <section className='flex flex-col items-center justify-center'>
            <SectionTitle title='Our Testimonials' description='Discover how our students transformed their careers and achieved their learning goals through our platform.' />

            <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {data.map((item, index) => (
                    <div key={index} className='w-full max-w-88 space-y-4 rounded-md border border-gray-200 bg-white p-3 text-gray-500 transition-all duration-300 hover:-translate-y-1'>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-1'>
                                {Array(item.rating)
                                    .fill('')
                                    .map((_, index) => <StarIcon key={index} className='size-4 fill-gray-800 text-gray-800' />)}
                            </div>
                            <p>{item.date}</p>
                        </div>
                        <p>“{item.review}”</p>
                        <div className='flex items-center gap-2 pt-3'>
                            <img className='h-8 w-8 rounded-full' src={item.image} alt={item.name} />
                            <p className='font-medium text-gray-800'>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
