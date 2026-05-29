import React from 'react'

const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-solid border-gray-900 border-t-transparent"></div>
        {/* Inner pulsing circle */}
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-900/80"></div>
      </div>
      {/* Sleek loading text */}
      <span className="mt-8 text-xs font-bold tracking-widest text-gray-500 uppercase animate-pulse select-none">
        Loading...
      </span>
    </div>
  )
}

export default ScreenLoader