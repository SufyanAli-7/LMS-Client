import SectionTitle from '@/components/section-title';

export default function MeetOurTeamSection() {
    const data = [
        {
            name: 'Donald Jackman',
            title: 'Founder & Lead Instructor',
            image: '/assets/team-user-1.png',
        },
        {
            name: 'Michael Brown',
            title: 'Senior Web Development Mentor',
            image: '/assets/team-user-2.png',
        },
        {
            name: 'David Thompson',
            title: 'MERN Stack Specialist',
            image: '/assets/team-user-3.png',
        },
        {
            name: 'Eliana Jade',
            title: 'UI/UX Design Mentor',
            image: '/assets/team-user-4.png',
        },
    ];
    return (
        <section className='flex flex-col items-center justify-center'>
            <SectionTitle title='Meet Our Team' description='Meet our world-class educators and mentors who are committed to your academic and professional success.' />
            <div className='mt-12 flex flex-wrap items-center justify-center gap-8'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col transition-all duration-300 hover:-translate-y-1'>
                        <img src={item.image} alt='User Image' className='h-64 w-52 object-cover' />
                        <h3 className='mt-2 text-base font-medium'>{item.name}</h3>
                        <p className='text-sm text-gray-500'>{item.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
