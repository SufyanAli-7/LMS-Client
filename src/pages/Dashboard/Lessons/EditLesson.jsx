import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, Typography, Spin } from 'antd';
import { Video, Pencil, ArrowLeft, Play, Layers, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const EditLesson = () => {
    const { lessonId } = useParams();
    const [fetching, setFetching] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [courseTitle, setCourseTitle] = useState('');
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const fetchLessonAndCourse = async () => {
        setFetching(true);
        setError(null);
        try {
            const lessonRes = await axios.get(`/api/lesson/${lessonId}`, { withCredentials: true });
            if (lessonRes.data && lessonRes.data.lesson) {
                const lesson = lessonRes.data.lesson;
                form.setFieldsValue({
                    title: lesson.title,
                    videoUrl: lesson.videoUrl,
                    order: lesson.order,
                    content: lesson.content
                });

                // Fetch parent course title to display beautifully
                try {
                    const courseRes = await axios.get(`/api/course/${lesson.course}`, { withCredentials: true });
                    if (courseRes.data && courseRes.data.course) {
                        setCourseTitle(courseRes.data.course.title);
                    }
                } catch (courseErr) {
                    console.error('Failed to load parent course details', courseErr);
                    setCourseTitle('Parent Course');
                }
            } else {
                setError('Unexpected data format received from the server.');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to load lesson details.');
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (lessonId) {
            fetchLessonAndCourse();
        }
    }, [lessonId]);

    const onFinish = (values) => {
        setSubmitting(true);

        axios.put(`/api/lesson/${lessonId}`, {
            title: values.title,
            videoUrl: values.videoUrl,
            content: values.content,
            order: values.order
        }, { withCredentials: true })
            .then((res) => {
                window.toastify?.(res.data?.message || 'Lesson updated successfully!', 'success');
                navigate('/dashboard/courses');
            })
            .catch((error) => {
                console.error(error);
                const errMsg = error.response?.data?.message || 'Failed to update lesson.';
                window.toastify?.(errMsg, 'error');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-16 animate-fade-in">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading lesson data...
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
                    <h3 className="text-xl font-bold text-gray-900">Failed to load lesson</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">{error}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        type="default" 
                        onClick={() => navigate('/dashboard/courses')}
                        className="rounded-xl font-semibold text-gray-600 hover:text-gray-800"
                        size="large"
                    >
                        Back to Courses
                    </Button>
                    <Button 
                        type="primary" 
                        icon={<RefreshCw className="size-4 mr-1" />}
                        onClick={fetchLessonAndCourse}
                        className="bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md active:scale-95 transition-transform"
                        size="large"
                    >
                        Retry Connection
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto py-4 animate-fade-in">
            {/* Back Button */}
            <div className="flex justify-start">
                <Button 
                    type="text" 
                    icon={<ArrowLeft className="size-4 mr-1.5" />} 
                    onClick={() => navigate('/dashboard/courses')}
                    className="flex items-center text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-105 font-bold cursor-pointer"
                >
                    Back to Courses
                </Button>
            </div>

            <Card 
                className="w-full border border-gray-100 bg-white/75 shadow-xl backdrop-blur-md rounded-2xl"
                classNames={{ body: '!p-6 sm:!p-10' }}
            >
                {/* Header */}
                <div className="mb-8 text-center select-none">
                    <div className="mx-auto mb-4 flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-600/10 tracking-wide uppercase shadow-3xs">
                        <Pencil className="size-3.5 text-indigo-600" />
                        <span>Curriculum Editor</span>
                    </div>

                    <Title level={3} className="mt-2! mb-1.5! text-gray-900 font-extrabold tracking-tight">
                        Edit Lesson Details
                    </Title>
                    <Text className="text-gray-500 text-sm font-medium">
                        Update lesson sequencing, video references, or detailed lecture description text.
                    </Text>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    name="edit_lesson_form"
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    autoComplete="off"
                >
                    {/* Read-Only Course Display */}
                    <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col gap-1 text-left">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">Destination Course</span>
                        <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                            <Layers className="size-4 text-indigo-600" />
                            {courseTitle || 'Loading parent course...'}
                        </span>
                    </div>

                    {/* Lesson Title */}
                    <Form.Item
                        label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Lesson Title</span>}
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter the lesson title!' },
                            { min: 3, message: 'Title must be at least 3 characters long!' }
                        ]}
                    >
                        <Input
                            prefix={<Play className="mr-2 size-4.5 text-gray-400" />}
                            placeholder="e.g. Chapter 1: Introduction to Redux Toolkit"
                            className="rounded-xl h-11 border-gray-200 hover:border-gray-300 focus:border-gray-950"
                        />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Video Streaming URL */}
                        <Form.Item
                            label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Video URL</span>}
                            name="videoUrl"
                            className="md:col-span-2"
                            rules={[
                                { required: true, message: 'Please provide a video stream URL!' }
                            ]}
                        >
                            <Input
                                prefix={<Video className="mr-2 size-4.5 text-gray-400" />}
                                placeholder="e.g. https://www.youtube.com/watch?v=..."
                                className="rounded-xl h-11 border-gray-200 hover:border-gray-300 focus:border-gray-950"
                            />
                        </Form.Item>

                        {/* Order */}
                        <Form.Item
                            label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Sequence Order</span>}
                            name="order"
                            rules={[{ required: true, message: 'Sequence number is required!' }]}
                        >
                            <InputNumber
                                min={1}
                                placeholder="e.g. 1"
                                prefix={<Layers className="size-4 text-gray-400 mr-1" />}
                                className="w-full rounded-xl border-gray-200 hover:border-gray-300 focus:border-gray-950 flex items-center"
                                style={{ height: '44px' }}
                            />
                        </Form.Item>
                    </div>

                    {/* Lesson Content Overview */}
                    <Form.Item
                        label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Content Details</span>}
                        name="content"
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Provide details of topics covered, code examples, resource links, or learning goals..."
                            className="rounded-xl border-gray-200 hover:border-gray-300 focus:border-gray-950 p-3"
                        />
                    </Form.Item>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-8">
                        <Button
                            type="default"
                            onClick={() => navigate('/dashboard/courses')}
                            className="flex-1 rounded-xl font-bold text-gray-600 hover:border-gray-300 hover:text-gray-800 active:scale-[0.98] transition-transform select-none cursor-pointer"
                            style={{ height: '44px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={submitting}
                            icon={<Pencil className="size-4" />}
                            className="flex-1 group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border-none font-bold text-white shadow-md active:scale-[0.98] transition-transform select-none cursor-pointer"
                            style={{ height: '44px' }}
                        >
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default EditLesson;
