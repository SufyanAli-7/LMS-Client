import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Avatar, Input, Button, Spin, Popconfirm, Tag } from 'antd';
import { BookOpen, PlusCircle, Trash2, Pencil, Calendar, Search, RefreshCw, AlertCircle, Video, Tag as TagIcon, GraduationCap, Layers, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ManageCourses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const fetchCourses = () => {
        setLoading(true);
        setError(null);
        axios.get('/api/course', { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data.courses)) {
                    setCourses(res.data.courses);
                } else {
                    setError('Unexpected data format received from the server.');
                    window.toastify?.('Invalid response format', 'error');
                }
            })
            .catch((err) => {
                console.error(err);
                const errMsg = err.response?.data?.message || err.message || 'Failed to fetch courses.';
                setError(errMsg);
                window.toastify?.(errMsg, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteCourse = (courseId) => {
        axios.delete(`/api/course/${courseId}`, { withCredentials: true })
            .then((res) => {
                window.toastify?.(res.data?.message || 'Course deleted successfully', 'success');
                setCourses(prev => prev.filter(c => c._id !== courseId));
            })
            .catch((err) => {
                console.error(err);
                const errMsg = err.response?.data?.message || 'Failed to delete course.';
                window.toastify?.(errMsg, 'error');
            });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Filter courses by search text
    const filteredCourses = courses.filter(c => 
        (c.title?.toLowerCase().includes(searchText.toLowerCase())) ||
        (c.category?.toLowerCase().includes(searchText.toLowerCase()))
    );

    // Columns config
    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnailURL',
            key: 'thumbnailURL',
            width: 90,
            render: (url, record) => (
                <div className="relative overflow-hidden w-16 h-10.5 rounded-lg border border-gray-100 shadow-3xs flex items-center justify-center bg-gray-50 select-none">
                    {url ? (
                        <img 
                            src={url} 
                            alt={record.title} 
                            className="object-cover w-full h-full hover:scale-105 transition-transform" 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60';
                            }}
                        />
                    ) : (
                        <BookOpen className="size-4.5 text-gray-300" />
                    )}
                </div>
            )
        },
        {
            title: 'Course Details',
            key: 'details',
            sorter: (a, b) => (a.title || '').localeCompare(b.title || ''),
            render: (_, record) => (
                <div className="space-y-1">
                    <span className="font-semibold text-gray-800 text-sm md:text-base leading-tight block truncate max-w-xs sm:max-w-md">
                        {record.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full select-none">
                        <TagIcon className="size-2.5" />
                        <span>{record.category}</span>
                    </span>
                </div>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            sorter: (a, b) => a.price - b.price,
            render: (price) => {
                const isFree = price === 0;
                return (
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1.5 rounded-full select-none ${isFree ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/10' : 'bg-gray-900 text-white shadow-2xs'}`}>
                        {isFree ? 'Free' : `$${Number(price).toFixed(2)}`}
                    </span>
                );
            }
        },
        {
            title: 'Lessons',
            dataIndex: 'lessonsCount',
            key: 'lessons',
            width: 100,
            sorter: (a, b) => (a.lessonsCount || 0) - (b.lessonsCount || 0),
            render: (count) => (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 select-none">
                    <Video className="size-3.5 text-gray-400" />
                    <span>{count || 0}</span>
                </span>
            )
        },
        // Show Instructor only to Administrators
        ...(user?.role === 'admin' ? [{
            title: 'Instructor',
            dataIndex: 'instructor',
            key: 'instructor',
            sorter: (a, b) => (a.instructor?.name || '').localeCompare(b.instructor?.name || ''),
            render: (instructor) => (
                <div className="flex flex-col text-left">
                    <span className="font-semibold text-gray-800 text-xs md:text-sm">{instructor?.name || 'Unknown'}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium truncate max-w-36">{instructor?.email || ''}</span>
                </div>
            )
        }] : []),
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 130,
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => (
                <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 select-none">
                    <Calendar className="size-3.5 text-gray-400" />
                    <span>{date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}</span>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => {
                const isInstructor = user?.role === 'instructor';
                return (
                    <div className="flex items-center gap-2">
                        {isInstructor && (
                            <Button 
                                type="default"
                                icon={<Video className="size-3.5 text-indigo-600" />}
                                onClick={() => navigate(`/dashboard/lessons/upload?courseId=${record._id}`)}
                                className="h-9 px-3 flex items-center justify-center gap-1 rounded-lg hover:border-indigo-300 font-semibold text-indigo-700 text-xs select-none active:scale-95 transition-transform"
                                title="Upload new lesson to this course"
                            >
                                Add Lesson
                            </Button>
                        )}
                        {isInstructor && (
                            <Button 
                                type="text" 
                                icon={<Pencil className="size-4 text-indigo-600" />} 
                                onClick={() => navigate(`/dashboard/courses/edit/${record._id}`)}
                                className="hover:bg-indigo-50/50 p-2 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
                                title="Edit Course"
                            />
                        )}
                        <Popconfirm
                            title="Delete Course"
                            description="All lessons associated with this course will be deleted. Are you sure?"
                            onConfirm={() => handleDeleteCourse(record._id)}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true, className: "bg-red-600 hover:bg-red-500 border-none font-semibold" }}
                            cancelButtonProps={{ className: "border-gray-200" }}
                        >
                            <Button 
                                type="text" 
                                danger 
                                icon={<Trash2 className="size-4 text-red-500" />} 
                                className="hover:bg-red-50/50 p-2 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
                                title="Delete Course"
                            />
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-16">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading course library...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 gap-5 p-8 text-center bg-red-50/30 rounded-2xl border border-red-100 max-w-2xl mx-auto my-8">
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
                    onClick={fetchCourses}
                    className="mt-2 bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md active:scale-95 transition-transform"
                    size="large"
                >
                    Retry Connection
                </Button>
            </div>
        );
    }

    const isInstructor = user?.role === 'instructor';

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Course Library</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isInstructor 
                            ? "Manage your authored courses, upload curriculum lessons, and review statistics." 
                            : "Platform Administration: Monitor, moderate, and manage all published courses."
                        }
                    </p>
                </div>
                
                {/* Search Bar & Actions */}
                <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
                    <Input
                        prefix={<Search className="size-4 text-gray-400 mr-1.5" />}
                        placeholder="Search by title or category..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                        className="rounded-xl border-gray-200/80 shadow-xs h-10 hover:border-gray-300 focus:border-gray-950"
                    />
                    <Button 
                        icon={<RefreshCw className="size-4" />} 
                        onClick={fetchCourses}
                        className="h-10 w-10 flex items-center justify-center rounded-xl hover:border-gray-300 active:scale-95 transition-all text-gray-600"
                        title="Reload courses"
                    />
                    {isInstructor && (
                        <Button
                            type="primary"
                            icon={<PlusCircle className="size-4 mr-1" />}
                            onClick={() => navigate('/dashboard/courses/create')}
                            className="bg-gray-900 hover:bg-gray-800 border-none rounded-xl h-10 px-4 font-bold flex items-center justify-center active:scale-95 transition-all text-sm select-none cursor-pointer"
                        >
                            Create Course
                        </Button>
                    )}
                </div>
            </div>

            {/* Courses Table */}
            <div className="overflow-hidden border border-gray-100/80 rounded-2xl shadow-xs bg-white/40">
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={filteredCourses}
                    scroll={{ x: 'max-content' }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <CourseLessonsList 
                                courseId={record._id} 
                                canDelete={user?.role === 'instructor' || user?.role === 'admin'} 
                                onLessonDeleted={() => {
                                    setCourses(prev => prev.map(c => 
                                        c._id === record._id 
                                            ? { ...c, lessonsCount: Math.max(0, (c.lessonsCount || 0) - 1) } 
                                            : c
                                    ));
                                }}
                            />
                        ),
                        rowExpandable: (record) => true,
                    }}
                    pagination={{ 
                        pageSize: 10, 
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '25', '50'],
                        position: ['bottomCenter'],
                        className: "py-3 px-4"
                    }}
                    bordered={false}
                    className="custom-premium-table [&_.ant-table]:bg-transparent [&_.ant-table-thead_tr_th]:bg-gray-50/65 [&_.ant-table-thead_tr_th]:text-gray-500 [&_.ant-table-thead_tr_th]:font-bold [&_.ant-table-thead_tr_th]:text-xs [&_.ant-table-thead_tr_th]:uppercase [&_.ant-table-thead_tr_th]:tracking-wider [&_.ant-table-thead_tr_th]:border-b [&_.ant-table-thead_tr_th]:border-gray-100 [&_.ant-table-row]:hover:bg-gray-50/40 [&_.ant-table-row_td]:border-b [&_.ant-table-row_td]:border-gray-50/60 [&_.ant-table-placeholder_td]:bg-transparent"
                    locale={{
                        emptyText: (
                            <div className="py-12 text-center space-y-2">
                                <BookOpen className="size-10 text-gray-300 mx-auto" />
                                <h4 className="text-base font-bold text-gray-700">No courses found</h4>
                                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                                    {isInstructor 
                                        ? "Create your very first learning course to begin publishing lessons." 
                                        : "There are currently no courses uploaded to the platform directory."
                                    }
                                </p>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
};

// Sub-component to fetch and render lessons for an expanded course row
const CourseLessonsList = ({ courseId, canDelete, onLessonDeleted }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLessons = () => {
        setLoading(true);
        setError(null);
        axios.get(`/api/lesson/course/${courseId}`, { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data.lessons)) {
                    setLessons(res.data.lessons);
                } else {
                    setError('Failed to parse lessons.');
                }
            })
            .catch((err) => {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to fetch lessons.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteLesson = (lessonId) => {
        axios.delete(`/api/lesson/${lessonId}`, { withCredentials: true })
            .then((res) => {
                window.toastify?.(res.data?.message || 'Lesson deleted successfully', 'success');
                setLessons(prev => prev.filter(l => l._id !== lessonId));
                onLessonDeleted();
            })
            .catch((err) => {
                console.error(err);
                window.toastify?.(err.response?.data?.message || 'Failed to delete lesson.', 'error');
            });
    };

    useEffect(() => {
        fetchLessons();
    }, [courseId]);

    if (loading) {
        return (
            <div className="py-6 flex items-center justify-center gap-2.5 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <Spin size="small" />
                <span className="text-xs font-semibold text-gray-400 select-none">Loading curriculum lessons...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 flex items-center justify-between gap-3 bg-red-50/30 rounded-xl border border-red-100">
                <div className="flex items-center gap-2 text-red-600 text-xs font-semibold">
                    <AlertCircle className="size-4" />
                    <span>{error}</span>
                </div>
                <Button size="small" onClick={fetchLessons} icon={<RefreshCw className="size-3" />}>Retry</Button>
            </div>
        );
    }

    if (lessons.length === 0) {
        return (
            <div className="py-8 text-center space-y-1.5 bg-gray-50/55 rounded-xl border border-dashed border-gray-150">
                <Video className="size-8 text-gray-300 mx-auto" />
                <h5 className="text-xs font-bold text-gray-500">No lessons uploaded yet</h5>
                <p className="text-[10px] text-gray-400 max-w-xs mx-auto select-none">This course doesn't have any lessons. Upload lessons to populate the course curriculum.</p>
            </div>
        );
    }

    const subColumns = [
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            width: 70,
            render: (order) => <span className="font-bold text-gray-500 text-xs">#{order}</span>
        },
        {
            title: 'Lesson Title',
            dataIndex: 'title',
            key: 'title',
            render: (title) => <span className="font-semibold text-gray-800 text-xs">{title}</span>
        },
        {
            title: 'Video Stream URL',
            dataIndex: 'videoUrl',
            key: 'videoUrl',
            render: (url) => (
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 hover:underline select-all truncate max-w-xs font-medium"
                >
                    <Play className="size-3 text-indigo-500 fill-indigo-500" />
                    <span>{url}</span>
                </a>
            )
        },
        ...(canDelete ? [{
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <div className="flex items-center gap-1.5">
                    {user?.role === 'instructor' && (
                        <Button 
                            type="text" 
                            icon={<Pencil className="size-3.5 text-indigo-600" />} 
                            onClick={() => navigate(`/dashboard/lessons/edit/${record._id}`)}
                            className="hover:bg-indigo-50/50 p-1.5 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
                            title="Edit Lesson"
                        />
                    )}
                    <Popconfirm
                        title="Delete Lesson"
                        description="Are you sure you want to delete this lesson?"
                        onConfirm={() => handleDeleteLesson(record._id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true, className: "bg-red-600 hover:bg-red-500 border-none font-semibold text-xs" }}
                        cancelButtonProps={{ className: "border-gray-200 text-xs" }}
                    >
                        <Button 
                            type="text" 
                            danger 
                            icon={<Trash2 className="size-3.5 text-red-500" />} 
                            className="hover:bg-red-50/50 p-1.5 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
                            title="Delete Lesson"
                        />
                    </Popconfirm>
                </div>
            )
        }] : [])
    ];

    return (
        <div className="bg-gray-50/70 p-4.5 rounded-xl border border-gray-150/80 shadow-xs max-w-4xl mx-auto my-1">
            <h4 className="text-xs font-extrabold text-gray-800 tracking-wider uppercase mb-3 flex items-center gap-1.5 select-none">
                <Layers className="size-3.5 text-indigo-600" />
                <span>Course Curriculum ({lessons.length} Lectures)</span>
            </h4>
            <Table
                rowKey="_id"
                columns={subColumns}
                dataSource={lessons}
                scroll={{ x: 'max-content' }}
                pagination={false}
                bordered={false}
                size="small"
                className="nested-sub-table [&_.ant-table]:bg-white [&_.ant-table-thead_tr_th]:bg-gray-100/70 [&_.ant-table-thead_tr_th]:text-gray-500 [&_.ant-table-thead_tr_th]:font-bold [&_.ant-table-thead_tr_th]:text-[10px] [&_.ant-table-thead_tr_th]:uppercase [&_.ant-table-thead_tr_th]:tracking-wider [&_.ant-table-thead_tr_th]:border-b [&_.ant-table-thead_tr_th]:border-gray-150/40 [&_.ant-table-row]:hover:bg-gray-50/20 [&_.ant-table-row_td]:border-b [&_.ant-table-row_td]:border-gray-150/40"
            />
        </div>
    );
};

export default ManageCourses;
