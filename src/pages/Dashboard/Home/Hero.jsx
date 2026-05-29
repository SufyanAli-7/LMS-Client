import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    Shield, BookOpen, GraduationCap, Video, Award, Users, Star, 
    DollarSign, Clock, ArrowRight, PlusCircle, Compass, Play, 
    Activity, Calendar, Settings, UserCheck 
} from 'lucide-react';

const Hero = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const role = user?.role?.toLowerCase() || 'student';

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dynamic stats from backend
    const fetchDashboardStats = () => {
        setLoading(true);
        setError(null);
        axios.get('/api/user/dashboard-stats', { withCredentials: true })
            .then((res) => {
                if (res.data && res.data.stats) {
                    setStats(res.data.stats);
                }
            })
            .catch((err) => {
                console.error('Failed to retrieve dashboard stats:', err);
                setError('Could not connect to live statistics database.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (role) {
            fetchDashboardStats();
        }
    }, [role]);

    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Dynamic stats and configuration based on role
    const getDashboardConfig = () => {
        switch (role) {
            case 'admin':
                return {
                    title: 'Administrator Control Panel',
                    themeGradient: 'from-slate-900 via-slate-850 to-slate-800',
                    themeText: 'text-slate-600',
                    themeBg: 'bg-slate-50',
                    accentColor: 'indigo',
                    badgeIcon: Shield,
                    description: 'Access complete administrative diagnostics, manage courses, oversee platform enrollments, and configure user scopes.',
                    stats: [
                        { label: 'Total Students', value: stats?.totalStudents ?? '...', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Active Courses', value: stats?.totalCourses ?? '...', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Approved Instructors', value: stats?.totalInstructors ?? '...', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Lectures Uploaded', value: stats?.totalLessons ?? '...', icon: Video, color: 'text-violet-600', bg: 'bg-violet-50' }
                    ],
                    actions: [
                        { 
                            label: 'Manage Platform Users', 
                            desc: 'View, edit, and manage student and instructor authentication details.', 
                            icon: UserCheck, 
                            path: '/dashboard/users' 
                        },
                        { 
                            label: 'Manage Course Directory', 
                            desc: 'Approve new curricula, edit listings, and update public categories.', 
                            icon: BookOpen, 
                            path: '/dashboard/courses' 
                        },
                        { 
                            label: 'Configure Settings', 
                            desc: 'Update platform branding, database endpoints, and system alerts.', 
                            icon: Settings, 
                            path: '/dashboard/profile' 
                        }
                    ]
                };

            case 'instructor':
                return {
                    title: 'Instructor Curriculum Workspace',
                    themeGradient: 'from-indigo-900 via-indigo-850 to-indigo-800',
                    themeText: 'text-indigo-600',
                    themeBg: 'bg-indigo-50',
                    accentColor: 'indigo',
                    badgeIcon: BookOpen,
                    description: 'Track student interactions, expand course modules, create new lectures, and audit monthly digital earnings.',
                    stats: [
                        { label: 'Active Enrollees', value: stats?.totalStudents ?? '...', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Lectures Uploaded', value: stats?.totalLessons !== undefined ? `${stats.totalLessons} Videos` : '...', icon: Video, color: 'text-violet-600', bg: 'bg-violet-50' },
                        { label: 'My Courses', value: stats?.totalCourses !== undefined ? `${stats.totalCourses} Published` : '...', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Course Earnings', value: stats?.totalEarnings !== undefined ? `$${Number(stats.totalEarnings).toFixed(2)}` : '...', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                    ],
                    actions: [
                        { 
                            label: 'Publish New Course', 
                            desc: 'Set up course details, pricing structures, and visual thumbnails.', 
                            icon: PlusCircle, 
                            path: '/dashboard/courses' 
                        },
                        { 
                            label: 'Add Course Lectures', 
                            desc: 'Upload instructional videos, quizzes, resources, and descriptors.', 
                            icon: Video, 
                            path: '/dashboard/lessons' 
                        },
                        { 
                            label: 'View Teacher Profile', 
                            desc: 'Update biographical details, skills tags, and teaching experience.', 
                            icon: GraduationCap, 
                            path: '/dashboard/profile' 
                        }
                    ]
                };

            case 'student':
            default:
                return {
                    title: 'Student Learning Workspace',
                    themeGradient: 'from-emerald-905 via-emerald-850 to-emerald-800',
                    themeText: 'text-emerald-600',
                    themeBg: 'bg-emerald-50',
                    accentColor: 'emerald',
                    badgeIcon: GraduationCap,
                    description: 'Track your personalized curriculum journey, resume unfinished lectures, and audit your skill milestones.',
                    stats: [
                        { label: 'Enrolled Courses', value: stats?.enrolledCourses !== undefined ? `${stats.enrolledCourses} Active` : '...', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Completed Courses', value: stats?.completedCourses !== undefined ? `${stats.completedCourses} Courses` : '...', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Learning Progress', value: stats?.totalProgress !== undefined ? `${stats.totalProgress}% Avg` : '...', icon: Video, color: 'text-violet-600', bg: 'bg-violet-50' },
                        { label: 'Time Learning', value: stats?.learningHours !== undefined ? `${stats.learningHours.toFixed(1)} Hours` : '...', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                    ],
                    actions: [
                        { 
                            label: 'Resume Your Lectures', 
                            desc: 'Pick up exactly where you left off in your currently enrolled courses.', 
                            icon: Play, 
                            path: '/dashboard/my-courses' 
                        },
                        { 
                            label: 'Explore Course Catalog', 
                            desc: 'Browse and register for our wide array of industry-relevant courses.', 
                            icon: Compass, 
                            path: '/courses' 
                        },
                        { 
                            label: 'Edit Student Profile', 
                            desc: 'Update contact details, social links, and security passwords.', 
                            icon: Settings, 
                            path: '/dashboard/profile' 
                        }
                    ]
                };
        }
    };

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse p-4">
                {/* Header Skeleton */}
                <div className="h-56 bg-gray-100 rounded-3xl" />
                
                {/* Stats Skeleton */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="h-28 bg-gray-100 rounded-2xl" />
                    <div className="h-28 bg-gray-100 rounded-2xl" />
                    <div className="h-28 bg-gray-100 rounded-2xl" />
                    <div className="h-28 bg-gray-100 rounded-2xl" />
                </div>
                
                {/* Action Columns Skeleton */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-3 space-y-4">
                        <div className="h-8 bg-gray-100 w-1/3 rounded-lg" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="h-32 bg-gray-100 rounded-2xl" />
                            <div className="h-32 bg-gray-100 rounded-2xl" />
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-8 bg-gray-100 w-1/2 rounded-lg" />
                        <div className="h-44 bg-gray-100 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    const config = getDashboardConfig();
    const BadgeIconComponent = config.badgeIcon;

    const generalActivities = [
        { title: 'Scheduled Platform Maintenance', desc: 'System updates will occur on Saturday at 2:00 AM UTC. Estimated downtime is 15 minutes.', date: 'Today', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Global Database Backup Completed', desc: 'Auto-secure backup routine executed successfully. All user states are securely synchronized.', date: '1 day ago', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { title: 'Updated Web Development Curriculum', desc: 'New video and quizzes modules added to HTML5 structures directory.', date: '2 days ago', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' }
    ];

    return (
        <div className="space-y-8 animate-fade-in select-none">
            
            {/* Dynamic Premium Header Block */}
            <div className="p-8 md:p-10 rounded-3xl bg-radial from-gray-900 to-gray-950 text-white shadow-xl relative overflow-hidden border border-gray-850">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-4 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-400 ring-1 ring-indigo-400/20 tracking-wider uppercase">
                            <BadgeIconComponent className="size-4" />
                            <span>{config.title}</span>
                        </span>
                        <span className="text-xs text-gray-400 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                            {currentDate}
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                        Welcome Back, {user?.name || 'User'}! 👋
                    </h1>
                    
                    <p className="text-gray-450 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                        {config.description}
                    </p>
                </div>
            </div>

            {/* Error Fallback Banner if statistics failed */}
            {error && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl flex items-center justify-between text-xs font-semibold">
                    <span>⚠️ {error} Displaying mock offline diagnostics.</span>
                    <button 
                        onClick={fetchDashboardStats}
                        className="bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg px-3 py-1 text-2xs active:scale-95 transition"
                    >
                        Retry Connection
                    </button>
                </div>
            )}

            {/* Metrics Statistics Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {config.stats.map((stat, index) => {
                    const StatIcon = stat.icon;
                    return (
                        <div 
                            key={index} 
                            className="flex items-center justify-between p-6 bg-white border border-gray-150/80 rounded-2xl shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div className="space-y-1.5">
                                <p className="text-xs font-bold text-gray-450 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-extrabold text-gray-900 leading-none">{stat.value}</p>
                            </div>
                            <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} shrink-0`}>
                                <StatIcon className="size-6" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions & Recent Updates Sections */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                
                {/* Quick Actions Panel */}
                <div className="space-y-4 lg:col-span-3">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Play className="size-5 text-gray-800" />
                        <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {config.actions.map((act, index) => {
                            const ActIcon = act.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => navigate(act.path)}
                                    className="flex flex-col text-left p-5 bg-white border border-gray-150/80 rounded-2xl shadow-2xs hover:border-indigo-150 hover:shadow-md transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="p-3 rounded-xl bg-gray-50 text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition duration-300 mb-4 shrink-0 w-fit">
                                        <ActIcon className="size-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors duration-250 flex items-center gap-1.5">
                                        <span>{act.label}</span>
                                        <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-250" />
                                    </h3>
                                    <p className="text-gray-400 text-xs font-semibold mt-1 leading-relaxed">{act.desc}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Platform Updates & Feed */}
                <div className="space-y-4 lg:col-span-2">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Activity className="size-5 text-gray-800" />
                        <h2 className="text-lg font-bold text-gray-800">Platform Updates</h2>
                    </div>

                    <div className="space-y-4">
                        {generalActivities.map((act, index) => {
                            const FeedIcon = act.icon;
                            return (
                                <div 
                                    key={index} 
                                    className="flex gap-4 p-4.5 bg-white border border-gray-150/80 rounded-2xl shadow-3xs"
                                >
                                    <div className={`p-2.5 rounded-xl h-fit shrink-0 ${act.bg} ${act.color}`}>
                                        <FeedIcon className="size-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="font-bold text-gray-800 text-xs leading-none">{act.title}</h4>
                                            <span className="text-[9px] font-extrabold text-gray-400 bg-gray-50 border border-gray-100/80 px-2 py-0.5 rounded-md leading-none">{act.date}</span>
                                        </div>
                                        <p className="text-gray-450 text-2xs font-semibold leading-relaxed">{act.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Hero;