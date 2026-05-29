import SectionTitle from '@/components/section-title';
import { UserPlus, BookOpen, GraduationCap } from 'lucide-react';

export default function HowItWorksSection() {
    const data = [
        {
            title: 'Create Your Account',
            description: 'Sign up in seconds to access your personalized learning dashboard and start exploring courses.',
            icon: UserPlus,
        },
        {
            title: 'Choose Your Course',
            description: 'Browse our wide variety of industry-relevant courses and enroll in the ones that match your goals.',
            icon: BookOpen,
        },
        {
            title: 'Learn & Get Certified',
            description: 'Watch video lectures, complete practical assignments, and earn verified certificates to boost your career.',
            icon: GraduationCap,
        },
    ];
    return (
        <section className='flex flex-col items-center justify-center'>
            <SectionTitle title='How It Works' description='Our Learning Management System is designed to make education seamless, interactive, and highly effective for learners and educators alike.' />

            <div className='mt-20 flex flex-wrap items-center justify-center gap-10'>
                {data.map((item, index) => (
                    <div key={index} className='rounded-[14px] bg-gray-200/80 p-0.5 pt-4 transition-all duration-300 hover:-translate-y-1'>
                        <div className='relative flex max-w-80 flex-col items-center rounded-xl bg-white p-6 pb-10'>
                            <div className='absolute -top-6 rounded-full bg-gray-800 p-3'>
                                <item.icon className='size-6 text-white' />
                            </div>
                            <h3 className='mt-10 text-center text-base font-medium'>{item.title}</h3>
                            <p className='mt-6 text-center text-gray-500'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
