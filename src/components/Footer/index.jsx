import { Link } from "react-router-dom";

const DribbbleIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-5.23-1.5-11.64-1.42-15.65 3.8" />
        <path d="M6.16 3.52c3.2 4.1 6.58 8.8 8 16.9" />
    </svg>
);

const InstagramIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const LinkedinIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const TwitterIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className='px-4 pt-30 text-gray-600 md:px-16 lg:px-24'>
            <div className='flex flex-col items-start justify-between gap-8 md:flex-row md:gap-16'>
                <div className='flex-1'>
                    <a href="https://prebuiltui.com?utm_source=slidex">
                        <img src='/assets/logo.svg' alt='logo' className='h-7.5 w-auto' width={205} height={48} />
                    </a>
                    <p className='mt-6 max-w-sm text-sm/6'>Welcome to our premier online learning platform where knowledge meets flexibility. Discover a wide range of courses, master new skills, and achieve your educational goals at your own pace.</p>
                    <div className='mt-2 flex items-center gap-3 text-gray-400'>
                        <a href='#' aria-label='YouTube' title='YouTube'>
                            <DribbbleIcon className='size-5 transition duration-200 hover:-translate-y-0.5' />
                        </a>
                        <a href='#' aria-label='Instagram' title='Instagram'>
                            <InstagramIcon className='size-5 transition duration-200 hover:-translate-y-0.5' />
                        </a>
                        <a href='#' aria-label='Twitter' title='Twitter'>
                            <TwitterIcon className='size-5 transition duration-200 hover:-translate-y-0.5' />
                        </a>
                        <a href='#' aria-label='LinkedIn' title='LinkedIn'>
                            <LinkedinIcon className='size-5 transition duration-200 hover:-translate-y-0.5' />
                        </a>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-around gap-8 md:flex-1 md:flex-row md:gap-20'>
                    <div className='flex flex-col'>
                        <h2 className='mb-5 font-semibold text-gray-800'>Company</h2>
                        <Link to='/' className='py-1.5 transition duration-200 hover:text-black' aria-label='Home' title='Home'>
                            Home
                        </Link>
                        <Link to='/courses' className='py-1.5 transition duration-200 hover:text-black' aria-label='About' title='About'>
                            Courses
                        </Link>
                        <Link to='/about' className='py-1.5 transition duration-200 hover:text-black' aria-label='Careers' title='Careers'>
                            About
                        </Link>
                        <Link to='/contact' className='py-1.5 transition duration-200 hover:text-black' aria-label='Partners' title='Partners'>
                            Contact
                        </Link>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='mb-5 font-semibold text-gray-800'>Admin</h2>
                        <Link to='/auth/admin/login' className='py-1.5 transition duration-200 hover:text-black' aria-label='Home' title='Home'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className='mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-4 md:flex-row'>
                <p className='text-center'>
                    Copyright {new Date().getFullYear()} © SlideX All Right Reserved.
                </p>
                <div className='flex items-center gap-6'>
                    <a href='#' className='transition duration-200 hover:text-black' aria-label='Privacy Policy' title='Privacy Policy'>
                        Privacy Policy
                    </a>
                    <a href='#' className='transition duration-200 hover:text-black' aria-label='Terms of Service' title='Terms of Service'>
                        Terms of Service
                    </a>
                    <a href='#' className='transition duration-200 hover:text-black' aria-label='Cookie Policy' title='Cookie Policy'>
                        Cookie Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}
