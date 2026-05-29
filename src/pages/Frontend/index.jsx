import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Page404 from '@/components/Misc/Page404'
import Courses from './Courses'
import Contact from './Contact'


const Frontend = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/courses/*' element={<Courses />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Frontend