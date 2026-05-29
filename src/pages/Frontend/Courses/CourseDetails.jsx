import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Spin, Tag, Typography, Steps, Divider, Modal } from 'antd';
import { BookOpen, Play, Calendar, Video, Tag as TagIcon, ArrowLeft, GraduationCap, CheckCircle2, Lock, Sparkles, User, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const { Title, Paragraph, Text } = Typography;

const CourseDetails = () => {
    const { id: courseId } = useParams();
    const { user, isAuth } = useAuth();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [checkingEnrollment, setCheckingEnrollment] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [error, setError] = useState(null);

    // Inline theater video state
    const [activeLesson, setActiveLesson] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Highly reliable logged in check avoiding empty object `{}` truthiness bugs
    const isLoggedIn = !!user?._id;

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return '';
        
        // Regular expressions to check and parse YouTube URLs
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
        }
        
        return null;
    };

    const fetchCourseDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Fetch course details
            const courseRes = await axios.get(`/api/course/${courseId}`);
            if (courseRes.data && courseRes.data.course) {
                setCourse(courseRes.data.course);
            } else {
                throw new Error('Course not found.');
            }

            // 2. Fetch course curriculum lessons
            const lessonsRes = await axios.get(`/api/lesson/course/${courseId}`);
            if (lessonsRes.data && Array.isArray(lessonsRes.data.lessons)) {
                setLessons(lessonsRes.data.lessons);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to fetch course details.');
        } finally {
            setLoading(false);
        }
    };

    const checkEnrollmentStatus = async () => {
        if (!isLoggedIn || user.role !== 'student') return;
        setCheckingEnrollment(true);
        try {
            const res = await axios.get(`/api/enrollment/check/${courseId}`, { withCredentials: true });
            if (res.data && res.data.enrolled !== undefined) {
                setEnrolled(res.data.enrolled);
            }
        } catch (err) {
            console.error('Failed to verify enrollment status', err);
        } finally {
            setCheckingEnrollment(false);
        }
    };

    useEffect(() => {
        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId]);

    useEffect(() => {
        if (courseId && isLoggedIn) {
            checkEnrollmentStatus();
        } else {
            setEnrolled(false);
        }
    }, [courseId, user, isLoggedIn]);

    const handleEnroll = () => {
        if (!isLoggedIn) {
            window.toastify?.('Please log in as a student to enroll in this course.', 'info');
            navigate('/auth/login');
            return;
        }

        if (user.role !== 'student') {
            window.toastify?.('Enrollment is restricted to students only.', 'warning');
            return;
        }

        setEnrolling(true);
        axios.post('/api/enrollment/enroll', { courseId }, { withCredentials: true })
            .then((res) => {
                window.toastify?.(res.data?.message || 'Enrolled successfully!', 'success');
                setEnrolled(true);
            })
            .catch((err) => {
                console.error(err);
                window.toastify?.(err.response?.data?.message || 'Failed to enroll.', 'error');
            })
            .finally(() => {
                setEnrolling(false);
            });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-32 animate-fade-in">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading curriculum & course details...
                </p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 gap-5 p-8 text-center bg-white/80 rounded-2xl border border-gray-150 shadow-xl max-w-2xl mx-auto my-12 animate-fade-in">
                <div className="p-3 bg-gray-100 rounded-full text-gray-800">
                    <AlertCircle className="size-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Failed to load course details</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">{error || 'Course not found.'}</p>
                </div>
                <Button 
                    type="primary" 
                    onClick={() => navigate('/courses')}
                    className="mt-2 bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md active:scale-95 transition-transform"
                    size="large"
                >
                    Back to Catalog
                </Button>
            </div>
        );
    }

    const isFree = course.price === 0;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
            {/* Back to Catalog Link */}
            <div className="flex justify-start">
                <Button 
                    type="text" 
                    icon={<ArrowLeft className="size-4 mr-1.5" />} 
                    onClick={() => navigate('/courses')}
                    className="flex items-center text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-105 font-bold cursor-pointer"
                >
                    Back to Courses
                </Button>
            </div>

            {/* Course Overview Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Banner / Main details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full select-none w-fit">
                            <TagIcon className="size-3 text-indigo-500" />
                            <span>{course.category}</span>
                        </span>

                        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight select-text">
                            {course.title}
                        </h1>

                        <Paragraph className="text-gray-500 text-sm sm:text-base font-medium select-text leading-relaxed">
                            {course.description}
                        </Paragraph>
                    </div>

                    <Divider className="my-2! border-gray-100" />

                    {/* Instructor profile summary card */}
                    <div className="p-5 rounded-2xl border border-gray-150 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="size-12 rounded-full bg-gray-900 text-white font-extrabold flex items-center justify-center text-base shadow-sm ring-4 ring-gray-100 select-none">
                            {course.instructor?.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="text-left space-y-0.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Authored by</span>
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-none">
                                {course.instructor?.name || 'Authorized Instructor'}
                            </h4>
                            <p className="text-xs text-gray-500 font-medium truncate max-w-sm">
                                Contact: {course.instructor?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Card (Thumbnail, Price, Enrollment Button) */}
                <div className="lg:col-span-1">
                    <Card
                        className="w-full border border-gray-150 shadow-xl rounded-2xl overflow-hidden bg-white sticky top-6"
                        cover={
                            <div className="aspect-video w-full relative bg-gray-50 select-none border-b border-gray-100">
                                <img
                                    src={course.thumbnailURL}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60';
                                    }}
                                />
                            </div>
                        }
                    >
                        <div className="space-y-6 text-left">
                            {/* Price */}
                            <div className="flex items-baseline justify-between select-none">
                                <span className="text-xs font-bold text-gray-400">Total Price:</span>
                                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center">
                                    {isFree ? (
                                        <span className="text-emerald-600">Free</span>
                                    ) : (
                                        <>
                                            <span className="text-sm font-bold text-gray-400 mr-0.5">$</span>
                                            <span>{Number(course.price).toFixed(2)}</span>
                                        </>
                                    )}
                                </span>
                            </div>

                            {/* Info badges */}
                            <div className="grid grid-cols-2 gap-3 text-center text-xs select-none">
                                <div className="p-3 bg-gray-55/40 border border-gray-100 rounded-xl space-y-1">
                                    <Video className="size-4.5 text-gray-400 mx-auto" />
                                    <span className="block font-bold text-gray-700">{lessons.length} Lectures</span>
                                </div>
                                <div className="p-3 bg-gray-55/40 border border-gray-100 rounded-xl space-y-1">
                                    <Calendar className="size-4.5 text-gray-400 mx-auto" />
                                    <span className="block font-bold text-gray-700">Self-Paced</span>
                                </div>
                            </div>

                            {/* Interactive Enroll Button */}
                            {enrolled ? (
                                <Button
                                    type="primary"
                                    disabled
                                    icon={<CheckCircle2 className="size-4.5" />}
                                    className="w-full h-12 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold select-none cursor-not-allowed opacity-100 shadow-none"
                                >
                                    <span>Already Enrolled</span>
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    loading={enrolling}
                                    onClick={handleEnroll}
                                    icon={isLoggedIn && user?.role !== 'student' ? null : <Sparkles className="size-4.5" />}
                                    disabled={isLoggedIn && user?.role !== 'student'}
                                    className="w-full h-12 flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border-none font-bold text-white shadow-md active:scale-[0.98] transition-transform select-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    <span>
                                        {isLoggedIn 
                                            ? (user?.role !== 'student' ? 'Students Only' : 'Enroll in Course')
                                            : 'Log In to Enroll'
                                        }
                                    </span>
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Course Curriculum list */}
            <div className="space-y-6 text-left">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between select-none">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <BookOpen className="size-6 text-indigo-655" />
                        <span>Course Curriculum</span>
                    </h2>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{lessons.length} Lectures</span>
                </div>

                {!user && (
                    <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl select-none">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
                                <Sparkles className="size-5" />
                            </div>
                            <div className="text-left space-y-0.5">
                                <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-none">Unlock Complete Learning Experience</h4>
                                <p className="text-xs text-gray-500 font-medium">Please sign in as a student to enroll, unlock curriculum video lectures, and track your progress.</p>
                            </div>
                        </div>
                        <Button
                            type="primary"
                            onClick={() => navigate('/auth/login')}
                            className="bg-indigo-600 hover:bg-indigo-500 border-none font-bold rounded-xl text-xs flex items-center justify-center shrink-0 w-full sm:w-auto h-9"
                        >
                            Log In & Enroll
                        </Button>
                    </div>
                )}

                {lessons.length === 0 ? (
                    <div className="py-16 text-center space-y-2 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                        <Video className="size-10 text-gray-300 mx-auto" />
                        <h4 className="text-base font-bold text-gray-700">Curriculum is empty</h4>
                        <p className="text-xs text-gray-400 max-w-xs mx-auto">This course doesn't have any uploaded video lectures yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="bg-white/60 border border-gray-100 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xs max-w-4xl">
                        <Steps
                            direction="vertical"
                            size="small"
                            current={lessons.length + 1}
                            className="custom-timeline-steps"
                            items={lessons.map((lesson) => {
                                const hasAccess = enrolled || user?.role === 'admin' || user?.role === 'instructor';
                                return {
                                    title: (
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                            <span className="font-bold text-gray-800 text-sm select-text">
                                                {lesson.title}
                                            </span>
                                            {hasAccess ? (
                                                <Button
                                                    type="text"
                                                    icon={<Play className="size-3 text-indigo-600 fill-indigo-600" />}
                                                    onClick={() => {
                                                        setActiveLesson(lesson);
                                                        setModalOpen(true);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 select-none bg-indigo-50 hover:bg-indigo-100/70 px-2.5 py-1.5 h-fit rounded-lg w-fit transition-colors shrink-0 cursor-pointer border-none shadow-none"
                                                >
                                                    <span>Watch Lecture</span>
                                                </Button>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg w-fit select-none shrink-0 border border-gray-200/50 cursor-pointer" onClick={handleEnroll}>
                                                    <Lock className="size-3 text-gray-400" />
                                                    <span>Enroll to Watch</span>
                                                </span>
                                            )}
                                        </div>
                                    ),
                                    description: (
                                        <div className="mt-1 pb-6 pr-2 select-text">
                                            <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                                {lesson.content || 'No lecture description provided.'}
                                            </p>
                                        </div>
                                    ),
                                    icon: (
                                        <div className={`size-6 rounded-full flex items-center justify-center text-[10px] font-extrabold select-none shrink-0 ${
                                            hasAccess 
                                                ? 'bg-indigo-600 text-white ring-4 ring-indigo-50' 
                                                : 'bg-gray-200 text-gray-500 border border-gray-300'
                                        }`}>
                                            {lesson.order || 1}
                                        </div>
                                    )
                                };
                            })}
                        />
                    </div>
                )}
            </div>

            {/* Premium Theater Mode Video Modal */}
            <Modal
                title={
                    <div className="flex flex-col text-left pr-6 select-none">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-650">Now Playing</span>
                        <h3 className="font-extrabold text-gray-905 text-base leading-snug mt-1">
                            {activeLesson ? `Lecture ${activeLesson.order}: ${activeLesson.title}` : 'Watch Lecture'}
                        </h3>
                    </div>
                }
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    setActiveLesson(null);
                }}
                footer={null}
                width={800}
                centered
                destroyOnClose
                className="premium-video-modal"
                styles={{
                    body: { padding: '16px 0 0 0' }
                }}
            >
                {activeLesson && (
                    <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-xl bg-black aspect-video shadow-2xl border border-gray-800">
                            {getYoutubeEmbedUrl(activeLesson.videoUrl) ? (
                                <iframe
                                    className="absolute inset-0 w-full h-full border-0"
                                    src={getYoutubeEmbedUrl(activeLesson.videoUrl)}
                                    title={activeLesson.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video
                                    src={activeLesson.videoUrl}
                                    controls
                                    autoPlay
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            )}
                        </div>
                        {activeLesson.content && (
                            <div className="px-5 pb-5 pt-2 text-left space-y-2 select-text max-h-60 overflow-y-auto">
                                <h4 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider">Lecture Details & Notes</h4>
                                <Paragraph className="text-sm text-gray-600 leading-relaxed font-medium select-text">
                                    {activeLesson.content}
                                </Paragraph>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CourseDetails;
