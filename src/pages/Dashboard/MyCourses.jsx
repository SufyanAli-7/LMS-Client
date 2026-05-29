import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Spin, Typography } from 'antd';
import { BookOpen, RefreshCw, AlertCircle, Play, Tag as TagIcon, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchMyCourses = () => {
        setLoading(true);
        setError(null);
        axios.get('/api/enrollment/my-courses', { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data.enrollments)) {
                    setEnrollments(res.data.enrollments);
                } else {
                    setError('Unexpected data format received from the server.');
                }
            })
            .catch((err) => {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to retrieve enrolled courses.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMyCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-16 animate-fade-in">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading your enrolled curriculum...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 gap-5 p-8 text-center bg-red-50/30 rounded-2xl border border-red-100 max-w-2xl mx-auto my-8 animate-fade-in">
                <div className="p-3 bg-red-100 rounded-full text-red-600">
                    <AlertCircle className="size-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Failed to load courses</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">{error}</p>
                </div>
                <Button 
                    type="primary" 
                    icon={<RefreshCw className="size-4" />} 
                    onClick={fetchMyCourses}
                    className="mt-2 bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md active:scale-95 transition-transform"
                    size="large"
                >
                    Retry Connection
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2 select-none">
                        <GraduationCap className="size-6 text-gray-800" />
                        <span>My Enrolled Courses</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View your active courses, access learning curriculum, and watch class lectures.
                    </p>
                </div>
                <Button 
                    icon={<RefreshCw className="size-4" />} 
                    onClick={fetchMyCourses}
                    className="h-10 px-4 flex items-center justify-center gap-1.5 rounded-xl border-gray-200/80 text-gray-600 bg-white active:scale-95 transition-all select-none font-bold"
                >
                    Refresh List
                </Button>
            </div>

            {/* Courses Cards Grid */}
            {enrollments.length === 0 ? (
                <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                    <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto border border-dashed border-gray-200">
                        <BookOpen className="size-10 text-gray-350" />
                    </div>
                    <div className="space-y-1 select-none">
                        <h4 className="text-lg font-bold text-gray-800">You are not enrolled in any courses</h4>
                        <p className="text-xs text-gray-400 font-medium">Browse our public course directory and select a learning journey to begin.</p>
                    </div>
                    <Button 
                        type="primary" 
                        onClick={() => navigate('/courses')}
                        className="bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md rounded-xl"
                    >
                        Browse Courses
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map(({ _id: enrollmentId, course }) => {
                        if (!course) return null;
                        return (
                            <Card
                                key={enrollmentId}
                                hoverable
                                onClick={() => navigate(`/courses/${course._id}`)}
                                className="flex flex-col h-full rounded-2xl overflow-hidden border border-gray-150/80 bg-white shadow-3xs hover:shadow-lg transition-all duration-300 group/card [&_.ant-card-body]:p-5 [&_.ant-card-body]:flex-1 [&_.ant-card-body]:flex [&_.ant-card-body]:flex-col"
                                cover={
                                    <div className="relative aspect-video overflow-hidden bg-gray-50 select-none border-b border-gray-100">
                                        <img
                                            src={course.thumbnailURL}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover/card:scale-102 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60';
                                            }}
                                        />
                                        {/* Status Badge overlay */}
                                        <span className="absolute top-4 right-4 inline-flex items-center text-[10px] font-extrabold tracking-wider uppercase bg-emerald-500 text-white px-2.5 py-1 rounded-full shadow-sm ring-1 ring-white/10">
                                            Enrolled
                                        </span>
                                    </div>
                                }
                            >
                                <div className="space-y-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-2 text-left">
                                        {/* Category Badge */}
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-full select-none w-fit">
                                            <TagIcon className="size-2.5" />
                                            <span>{course.category}</span>
                                        </span>

                                        {/* Title */}
                                        <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-snug truncate line-clamp-1 select-text" title={course.title}>
                                            {course.title}
                                        </h3>

                                        {/* Instructor */}
                                        <p className="text-gray-400 text-xs font-semibold select-text leading-none mt-1">
                                            Instructor: <span className="text-gray-600 font-bold">{course.instructor?.name || 'Authorized Instructor'}</span>
                                        </p>
                                    </div>

                                    {/* Action button */}
                                    <Button
                                        type="primary"
                                        icon={<Play className="size-3.5 fill-current" />}
                                        className="w-full h-10 flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border-none font-bold text-white shadow-xs active:scale-[0.98] transition-all select-none cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Avoid card click duplicate route
                                            navigate(`/courses/${course._id}`);
                                        }}
                                    >
                                        <span>Start Learning</span>
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
