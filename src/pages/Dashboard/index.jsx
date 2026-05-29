import { useState } from 'react';
import { Avatar, Dropdown, Layout, Menu, theme, ConfigProvider } from 'antd';
import { items } from './Sidebaritems';
import { useAuth } from '@/context/AuthContext';
import Routes from './Routes';
import { Shield, BookOpen, GraduationCap, LogOut, Home, Grid, Users, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();

    const currentYear = new Date().getFullYear();

    const menuItems = items
        .filter(item => !item.allowedRoles || item.allowedRoles.includes(user?.role))
        .map(({ key, label, icon, children }) => ({
            key,
            label,
            icon,
            ...(children && {
                children: children
                    .filter(child => !child.allowedRoles || child.allowedRoles.includes(user?.role))
                    .map(({ key, label, icon }) => ({ key, label, icon }))
            })
        }));

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

    const dropdownItems = [
        {
            key: '1',
            label: 'Home',
            icon: <Home className="size-4 mr-1 text-gray-600" />,
            onClick: () => {
                navigate('/');
            }
        },
        {
            key: '2',
            label: 'Logout',
            icon: <LogOut className="size-4 mr-1" />,
            danger: true,
            onClick: () => {
                handleLogout();
            }
        }
    ];

    const location = useLocation();
    const currentPath = location.pathname;

    const getBottomNavItems = () => {
        const baseItems = [
            {
                key: 'home',
                label: 'Home',
                icon: <Home className="size-5" />,
                onClick: () => navigate('/')
            },
            {
                key: 'dashboard',
                label: 'Dashboard',
                icon: <Grid className="size-5" />,
                onClick: () => navigate('/dashboard')
            }
        ];

        if (user?.role === 'student' || !user?.role) {
            baseItems.push({
                key: 'my-courses',
                label: 'My Courses',
                icon: <BookOpen className="size-5" />,
                onClick: () => navigate('/dashboard/my-courses')
            });
        } else if (user?.role === 'instructor') {
            baseItems.push({
                key: 'courses',
                label: 'Courses',
                icon: <BookOpen className="size-5" />,
                onClick: () => navigate('/dashboard/courses')
            });
        } else if (user?.role === 'admin') {
            baseItems.push(
                {
                    key: 'users',
                    label: 'Users',
                    icon: <Users className="size-5" />,
                    onClick: () => navigate('/dashboard/users')
                },
                {
                    key: 'courses',
                    label: 'Courses',
                    icon: <BookOpen className="size-5" />,
                    onClick: () => navigate('/dashboard/courses')
                }
            );
        }

        baseItems.push({
            key: 'profile',
            label: 'Profile',
            icon: <User className="size-5" />,
            onClick: () => navigate('/dashboard/profile')
        });

        return baseItems;
    };

    const isTabActive = (item) => {
        if (item.key === 'home') return currentPath === '/';
        if (item.key === 'dashboard') return currentPath === '/dashboard' || currentPath === '/dashboard/';
        if (item.key === 'my-courses') return currentPath.startsWith('/dashboard/my-courses');
        if (item.key === 'courses') return currentPath.startsWith('/dashboard/courses') || currentPath.startsWith('/dashboard/lessons');
        if (item.key === 'users') return currentPath.startsWith('/dashboard/users');
        if (item.key === 'profile') return currentPath.startsWith('/dashboard/profile');
        return false;
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#111827',
                    borderRadius: 12,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    controlItemBgActive: '#f3f4f6',
                    controlItemBgActiveHover: '#e5e7eb',
                    controlItemBgHover: '#f9fafb',
                },
                components: {
                    Layout: {
                        siderBg: '#111827',
                        triggerBg: '#1f2937',
                    },
                    Menu: {
                        darkItemBg: '#111827',
                        darkItemSelectedBg: '#1f2937',
                    }
                }
            }}
        >
            <Layout style={{ height: '100vh', overflow: 'hidden' }}>
                <Sider
                    breakpoint='lg'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={value => setCollapsed(value)}
                    className="hidden md:block"
                    style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'auto', alignSelf: 'flex-start' }}
                >
                    <div className='py-4 text-center'>
                        <div className="demo-logo-vertical">
                            <img src='/assets/logo.svg' alt='logo' className='h-8 w-auto m-auto px-2 filter brightness-0 invert cursor-pointer hover:scale-105 transition-all' onClick={() => navigate('/')} />
                        </div>
                    </div>
                    <Menu theme='dark' defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
                </Sider>
                <Layout className="bg-gray-50/50" style={{ height: '100vh', overflowY: 'auto' }}>
                    <Header className='flex items-center justify-end px-6 md:px-8' style={{ background: colorBgContainer, borderBottom: '1px solid #f3f4f6', paddingRight: '24px' }}>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-700 select-none">{user?.name}</span>
                            <Dropdown
                                menu={{ items: dropdownItems }}
                                placement="bottomRight"
                                trigger={['hover']}
                                popupRender={(menu) => (
                                    <div className="rounded-2xl bg-white/95 shadow-2xl border border-gray-100/80 p-1 min-w-55 backdrop-blur-md">
                                        {/* Premium user detail header */}
                                        <div className="px-4 py-3.5 border-b border-gray-100 flex flex-col gap-1 select-none text-left">
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
                    </Header>
                    <Content className='p-2 pb-24 md:pb-2'>
                        <div className="min-h-[calc(100vh-121px)] bg-white/65 p-6 pb-28 md:pb-6 rounded-2xl border border-gray-100 shadow-sm backdrop-blur-md">
                            <Routes />
                        </div>
                    </Content>
                </Layout>
            </Layout>

            {/* Premium Mobile Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center justify-around px-2 py-1.5 h-16 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] pb-safe">
                {getBottomNavItems().map((item) => {
                    const active = isTabActive(item);
                    return (
                        <button
                            key={item.key}
                            onClick={item.onClick}
                            className={`flex flex-col items-center justify-center flex-1 py-0.5 transition-all duration-300 active:scale-90 ${
                                active ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium hover:text-gray-600'
                            }`}
                        >
                            <div className={`p-1.5 rounded-full transition-all duration-300 ${
                                active 
                                    ? 'bg-gray-950 text-white scale-105 shadow-md shadow-gray-950/20' 
                                    : 'text-gray-500 hover:scale-105'
                            }`}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] mt-0.5 tracking-wide leading-none">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </ConfigProvider>
    );
};
export default Dashboard;