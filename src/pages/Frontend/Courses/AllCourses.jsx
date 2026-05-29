import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button, Spin, Tag, Typography } from 'antd';
import { BookOpen, Search, RefreshCw, AlertCircle, Video, Tag as TagIcon, GraduationCap, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    const fetchCourses = () => {
        setLoading(true);
        setError(null);
        axios.get('/api/course/public/all')
            .then((res) => {
                if (res.data && Array.isArray(res.data.courses)) {
                    setCourses(res.data.courses);
                } else {
                    setError('Unexpected data format received from the server.');
                }
            })
            .catch((err) => {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to retrieve courses.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Get list of unique categories
    const categories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))];

    // Filter courses by search text and category
    const filteredCourses = courses.filter(c => {
        const matchesSearch = (c.title?.toLowerCase().includes(searchText.toLowerCase())) ||
                             (c.description?.toLowerCase().includes(searchText.toLowerCase())) ||
                             (c.instructor?.name?.toLowerCase().includes(searchText.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-32 animate-fade-in">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading our world-class courses...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 gap-5 p-8 text-center bg-red-50/30 rounded-2xl border border-red-100 max-w-2xl mx-auto my-12 animate-fade-in">
                <div className="p-3 bg-red-100 rounded-full text-red-600">
                    <AlertCircle className="size-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Failed to retrieve course catalog</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">{error}</p>
                </div>
                <Button 
                    type="primary" 
                    icon={<RefreshCw className="size-4" />} 
                    onClick={fetchCourses}
                    className="mt-2 bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md active:scale-95 transition-transform"
                    size="large"
                >
                    Retry Connection
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
            {/* Premium Hero Header */}
            <div className="text-center py-10 md:py-16 rounded-3xl bg-radial from-gray-900 to-gray-950 text-white shadow-2xl relative overflow-hidden select-none border border-gray-850">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-4 max-w-3xl mx-auto px-6">
                    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold text-indigo-400 ring-1 ring-indigo-400/20 tracking-wider uppercase">
                        <GraduationCap className="size-4" />
                        <span>Explore Our Curriculum</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                        Expand Your Horizons
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
                        Join millions of learners worldwide exploring new technologies, creative arts, business methodologies, and personal growth paths.
                    </p>
                </div>
            </div>

            {/* Filter & Search Bar Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                {/* Categories Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="flex items-center gap-2 max-w-md w-full shrink-0">
                    <Input
                        prefix={<Search className="size-4 text-gray-400 mr-2" />}
                        placeholder="Search courses, descriptions, instructors..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                        className="rounded-xl border-gray-200 shadow-xs h-11 hover:border-gray-300 focus:border-gray-950"
                    />
                    <Button 
                        icon={<RefreshCw className="size-4" />} 
                        onClick={fetchCourses}
                        className="h-11 w-11 flex items-center justify-center rounded-xl hover:border-gray-300 active:scale-95 transition-all text-gray-600 shrink-0 bg-white"
                        title="Refresh Courses"
                    />
                </div>
            </div>

            {/* Course Grid */}
            {filteredCourses.length === 0 ? (
                <div className="text-center py-20 space-y-4 max-w-md mx-auto">
                    <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto border border-dashed border-gray-200">
                        <BookOpen className="size-10 text-gray-350" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-bold text-gray-800">No courses match your criteria</h4>
                        <p className="text-sm text-gray-400 font-medium">Try broadening your search term or select another category filter tab.</p>
                    </div>
                    <Button 
                        type="default" 
                        onClick={() => { setSearchText(''); setSelectedCategory('All'); }}
                        className="rounded-xl"
                    >
                        Clear Filters
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => {
                        const isFree = course.price === 0;
                        return (
                            <Card
                                key={course._id}
                                hoverable
                                onClick={() => navigate(`/courses/${course._id}`)}
                                className="flex flex-col h-full rounded-2xl overflow-hidden border border-gray-150/80 bg-white/80 shadow-xs hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group/card [&_.ant-card-body]:p-5 [&_.ant-card-body]:flex-1 [&_.ant-card-body]:flex [&_.ant-card-body]:flex-col"
                                cover={
                                    <div className="relative aspect-video overflow-hidden bg-gray-50 select-none border-b border-gray-100">
                                        <img
                                            src={course.thumbnailURL}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60';
                                            }}
                                        />
                                        {/* Price overlay */}
                                        <span className={`absolute top-4 right-4 inline-flex items-center text-xs font-extrabold px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm ring-1 ring-white/10 ${
                                            isFree 
                                                ? 'bg-emerald-500/90 text-white' 
                                                : 'bg-gray-900/90 text-white'
                                        }`}>
                                            {isFree ? 'Free' : `$${Number(course.price).toFixed(2)}`}
                                        </span>
                                    </div>
                                }
                            >
                                <div className="space-y-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        {/* Category Badge */}
                                        <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full select-none w-fit">
                                            <TagIcon className="size-2.5" />
                                            <span>{course.category}</span>
                                        </span>

                                        {/* Title */}
                                        <h3 className="font-bold text-gray-800 text-base leading-snug group-hover/card:text-indigo-600 transition-colors line-clamp-2 select-text" title={course.title}>
                                            {course.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-xs font-medium line-clamp-3 select-text leading-relaxed">
                                            {course.description}
                                        </p>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 text-xs select-none">
                                        {/* Instructor */}
                                        <div className="flex items-center gap-2 max-w-40 shrink">
                                            <div className="size-7.5 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-2xs shrink-0 ring-2 ring-gray-100">
                                                {course.instructor?.name?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                            <span className="font-semibold text-gray-600 truncate text-[11px] md:text-xs">
                                                {course.instructor?.name || 'Instructor'}
                                            </span>
                                        </div>

                                        {/* Lessons count */}
                                        <span className="inline-flex items-center gap-1 font-bold text-gray-500 shrink-0">
                                            <Video className="size-3.5 text-gray-400" />
                                            <span>{course.lessonsCount || 0} Lectures</span>
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AllCourses;