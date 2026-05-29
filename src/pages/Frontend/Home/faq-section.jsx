import { useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import SectionTitle from '@/components/section-title';

export default function FaqSection() {
    const [isOpen, setIsOpen] = useState(false);
    const data = [
        {
            question: 'Do I need prior programming experience to start learning?',
            answer: 'No prior experience is required! We offer foundational courses for absolute beginners as well as advanced courses for experienced developers looking to upgrade their skills.',
        },
        {
            question: 'What is included in each course curriculum?',
            answer: 'Each course includes high-definition video lectures, downloadable resources, interactive coding assignments, hands-on projects, and access to a student support community.',
        },
        {
            question: 'Are the courses self-paced, and for how long do I have access?',
            answer: 'Yes! All our courses are 100% self-paced, allowing you to learn on your own schedule. Once enrolled, you get lifetime access to all the course content and future updates.',
        },
        {
            question: 'Will I get a certificate after completing a course?',
            answer: 'Yes, you will receive a verified certificate of completion once you finish all the course modules, projects, and pass the final assessment.',
        },
        {
            question: 'How can I get help if I get stuck on a coding assignment?',
            answer: 'You can post your queries in our active student discussion forums, where dedicated teaching assistants and fellow peers are ready to help you resolve errors.',
        },
        {
            question: 'Are there any free courses available on this platform?',
            answer: 'Absolutely! We offer several free foundational courses to help you get started and experience our learning environment before committing to premium paths.',
        },
    ];

    return (
        <section className='flex flex-col items-center justify-center'>
            <SectionTitle title="FAQ's" description="Got questions about our courses, certifications, or learning platform? We've got you covered with answers below." />
            <div className='mx-auto mt-12 w-full max-w-xl p-6'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col border-b border-gray-200 bg-white'>
                        <h3 className='flex cursor-pointer items-start justify-between gap-4 py-4 font-medium' onClick={() => setIsOpen(isOpen === index ? null : index)}>
                            {item.question}
                            {isOpen === index ? <MinusIcon className='size-5 text-gray-500' /> : <PlusIcon className='size-5 text-gray-500' />}
                        </h3>
                        <p className={`pb-4 text-sm/6 text-gray-500 ${isOpen === index ? 'block' : 'hidden'}`}>{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
