import SectionTitle from '@/components/section-title';
import { ArrowRightIcon } from 'lucide-react';

export default function CallToActionSection() {
    return (
        <section className='flex flex-col items-center justify-center py-20'>
            <SectionTitle title='Ready to Start Your Learning Journey?' description='Join thousands of successful students worldwide. Gain new skills, earn certifications, and open doors to new career opportunities today.' />
            <a href='/courses' className='mt-4 flex items-center gap-2 rounded-full bg-gray-900 px-8 py-2.5 font-medium text-white transition hover:opacity-90'>
                Start Learning
                <ArrowRightIcon className='size-5' />
            </a>
        </section>
    );
}
