import { useAuth } from '@/context/AuthContext';
import { Avatar, Dropdown, ConfigProvider } from 'antd';
import { MenuIcon, XIcon, LayoutDashboard, LogOut, GraduationCap, Shield, BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { isAuth, user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const getRoleIcon = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return <Shield className="size-3 text-gray-600" />;
            case 'instructor':
                return <BookOpen className="size-3 text-gray-600" />;
            case 'student':
            default:
                return <GraduationCap className="size-3 text-gray-600" />;
        }
    };

    const items = [
        {
            key: '1',
            label: 'Dashboard',
            icon: <LayoutDashboard className="size-4 mr-1 text-gray-600" />,
            onClick: () => {
                navigate('/dashboard')
            }
        },
        {
            key: '2',
            label: 'Logout',
            icon: <LogOut className="size-4 mr-1" />,
            danger: true,
            onClick: () => {
                handleLogout()
            }
        }
    ];

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#111827',
                    borderRadius: 12,
                    fontFamily: 'Inter, system-ui, sans-serif',
                },
            }}
        >
            <nav className='sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200/70 bg-white/50 px-4 py-3.5 backdrop-blur-md md:px-16 lg:px-24'>
                <Link to='/'>
                    <img src='/assets/logo.svg' alt='logo' className='h-7.5 w-auto' width={205} height={48} />
                </Link>

                <div className='hidden items-center space-x-6 text-gray-700 md:flex'>
                    {links.map((link) => (
                        <Link key={link.name} to={link.href} className='transition hover:text-black'>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className='hidden md:flex items-center gap-3'>
                    {isAuth
                        ? <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-700 select-none">{user?.name}</span>
                            <Dropdown 
                                menu={{ items }} 
                                placement="bottomRight"
                                trigger={['hover']}
                                popupRender={(menu) => (
                                    <div className="rounded-2xl bg-white/95 shadow-2xl border border-gray-100/80 p-1 min-w-55 backdrop-blur-md">
                                        {/* Premium user detail header */}
                                        <div className="px-4 py-3.5 border-b border-gray-100 flex flex-col gap-1 select-none">
                                            <p className="font-bold text-gray-900 text-sm leading-none">{user?.name}</p>
                                            <p className="text-xs text-gray-400 font-medium truncate mt-1">{user?.email}</p>
                                            
                                            {/* Role badge */}
                                            <span className="mt-2.5 w-fit rounded-full bg-gray-900/5 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider text-gray-700 uppercase ring-1 ring-gray-900/10 flex items-center gap-1">
                                                {getRoleIcon(user?.role)}
                                                <span>{user?.role || 'student'}</span>
                                            </span>
                                        </div>
                                        {menu}
                                    </div>
                                )}
                            >
                                <Avatar 
                                    size={38} 
                                    className="cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all ring-2 ring-gray-900/5" 
                                    style={{ backgroundColor: '#111827', color: '#ffffff', fontWeight: '600' }}
                                >
                                    {user?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            </Dropdown>
                        </div>
                        : <>
                            <Link to='/auth/login' className='rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black'>
                                Login
                            </Link>
                            <Link to='/auth/register' className='rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 hover:shadow-sm'>
                                Register
                            </Link>
                        </>
                    }
                </div>

                <button onClick={() => setIsOpen(true)} className='transition active:scale-90 md:hidden'>
                    <MenuIcon className='size-6.5' />
                </button>
            </nav>

            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/20 text-lg font-medium backdrop-blur-2xl transition duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {links.map((link) => (
                    <Link key={link.name} to={link.href} className='block text-gray-800 transition hover:text-black' onClick={() => setIsOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {isAuth ? (
                    <div className='flex flex-col items-center gap-4 w-full max-w-55 mt-6 border-t border-gray-200/50 pt-6'>
                        <Avatar 
                            size={56} 
                            className="shadow-md ring-2 ring-gray-900/5" 
                            style={{ backgroundColor: '#111827', color: '#ffffff', fontWeight: '600' }}
                        >
                            {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className="text-center">
                            <p className="font-bold text-gray-900 text-base leading-tight">{user?.name}</p>
                            <p className="text-xs text-gray-400 font-medium truncate mt-0.5 max-w-45">{user?.email}</p>
                            
                            {/* Role badge */}
                            <span className="mt-2 mx-auto w-fit rounded-full bg-gray-900/5 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider text-gray-700 uppercase ring-1 ring-gray-900/10 flex items-center justify-center gap-1">
                                {getRoleIcon(user?.role)}
                                <span>{user?.role || 'student'}</span>
                            </span>
                        </div>
                        
                        <div className="flex flex-col gap-2.5 w-full mt-2">
                            <Link to='/dashboard' className='w-full text-center rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800' onClick={() => setIsOpen(false)}>
                                Dashboard
                            </Link>
                            <button 
                                className='w-full text-center rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-200 transition' 
                                onClick={() => { setIsOpen(false); handleLogout(); }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-3 w-full max-w-55 mt-4'>
                        <Link to='/auth/login' className='w-full text-center rounded-full border border-gray-300 px-8 py-2.5 text-base font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black' onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                        <Link to='/auth/register' className='w-full text-center rounded-full bg-gray-900 px-8 py-2.5 text-base font-medium text-white transition hover:opacity-90' onClick={() => setIsOpen(false)}>
                            Register
                        </Link>
                    </div>
                )}

                <button onClick={() => setIsOpen(false)} className='rounded-md bg-gray-900 p-2 text-white ring-white active:ring-2'>
                    <XIcon />
                </button>
            </div>
        </ConfigProvider>
    );
}
