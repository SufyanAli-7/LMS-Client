import { Link } from "react-router-dom";
import { AlertCircle, Home, LifeBuoy } from "lucide-react";

const Page404 = () => {
  return (
    <main className='relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gray-50 px-4 sm:px-6 lg:px-8'>
      {/* Premium Background Decorative Blobs clipped safely to prevent scrollbars */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none -z-10'>
        <div className='absolute top-1/4 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl' />
      </div>

      <div className='flex flex-col items-center justify-center text-center max-w-lg mx-auto py-12'>
        {/* Warning Icon Badge */}
        <div className='mb-6 flex items-center gap-1.5 rounded-full bg-gray-900/5 px-4 py-1.5 text-xs font-semibold text-gray-800 ring-1 ring-gray-900/10'>
          <AlertCircle className='size-3.5 text-gray-700' />
          <span>Error Code 404</span>
        </div>

        <h1 className='text-8xl md:text-9xl font-black tracking-tight text-gray-900 leading-none select-none'>
          404
        </h1>
        
        <div className='h-1.5 w-16 rounded-full bg-gray-900 my-6 md:my-8' />
        
        <h2 className='text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
          Page Not Found
        </h2>
        
        <p className='text-sm md:text-base mt-4 text-gray-500 leading-relaxed max-w-md'>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Cohesive premium action buttons */}
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto'>
          <Link 
            to='/' 
            className='group/btn flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-3 px-8 text-sm font-semibold transition active:scale-[0.98] duration-200 hover:shadow-sm'
          >
            <Home className='size-4 text-gray-300 group-hover/btn:text-white transition duration-200' />
            <span>Return Home</span>
          </Link>
          
          <Link 
            to='/contact' 
            className='group/btn flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl py-3 px-8 text-sm font-semibold transition active:scale-[0.98] duration-200'
          >
            <LifeBuoy className='size-4 text-gray-400 group-hover/btn:text-gray-600 transition duration-200' />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page404;