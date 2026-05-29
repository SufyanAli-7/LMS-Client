import Hero from './Hero'
import HowItWorksSection from './how-it-works-section'
import MeetOurTeamSection from './meet-our-team-section'
import OurTestimonialSection from './our-testimonials-section'
import FaqSection from './faq-section'
import CallToActionSection from './call-to-action-section'

const Home = () => {
    return (
        <main>
            <Hero />
            <HowItWorksSection />
            <MeetOurTeamSection />
            <OurTestimonialSection />
            <FaqSection />
            <CallToActionSection />
        </main>
    )
}

export default Home