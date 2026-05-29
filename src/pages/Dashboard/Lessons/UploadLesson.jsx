import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, Select, Typography, Spin } from 'antd';
import { Video, PlusCircle, ArrowLeft, Play, Layers, FileText, UploadCloud, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const UploadLesson = () => {
    const [courses, setCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryCourseId = searchParams.get('courseId');

    const fetchInstructorCourses = () => {
        setCoursesLoading(true);
        setError(null);
        axios.get('/api/course', { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data.courses)) {
                    setCourses(res.data.courses);
                    // If a courseId was passed in the URL query, pre-select it
                    if (queryCourseId && res.data.courses.some(c => c._id === queryCourseId)) {
                        form.setFieldsValue({ courseId: queryCourseId });
                    }
                } else {
                    setError('Unexpected data format received from the server.');
                }
            })
            .catch((err) => {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to load courses.');
            })
            .finally(() => {
                setCoursesLoading(false);
            });
    };

    useEffect(() => {
        fetchInstructorCourses();
    }, [queryCourseId]);

    const onFinish = (values) => {
        setSubmitLoading(true);

        axios.post('/api/lesson', {
            title: values.title,
            videoUrl: values.videoUrl,
            content: values.content,
            order: values.order,
            courseId: values.courseId
        }, { withCredentials: true })
            .then((res) => {
                window.toastify?.(res.data?.message || 'Lesson added successfully!', 'success');
                
                // Reset inputs, but keep the selected course so they can easily upload another lesson to it
                form.resetFields(['title', 'videoUrl', 'content', 'order']);
                // Auto-increment the order for convenience
                const prevOrder = values.order || 1;
                form.setFieldsValue({ order: prevOrder + 1 });
            })
            .catch((error) => {
                console.error(error);
                const errMsg = error.response?.data?.message || 'Failed to upload lesson.';
                window.toastify?.(errMsg, 'error');
            })
            .finally(() => {
                setSubmitLoading(false);
            });
    };

    if (coursesLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-16">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading your course catalog...
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
                    onClick={fetchInstructorCourses}
                    className="mt-2 bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md active:scale-95 transition-transform"
                    size="large"
                >
                    Retry Connection
                </Button>
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
                        <UploadCloud className="size-3.5 text-indigo-600" />
                        <span>Curriculum Manager</span>
                    </div>

                    <Title level={3} className="mt-2! mb-1.5! text-gray-900 font-extrabold tracking-tight">
                        Upload Video Lessons
                    </Title>
                    <Text className="text-gray-500 text-sm font-medium">
                        Select a course, specify lesson hierarchy, and paste your video streaming source URL.
                    </Text>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    name="upload_lesson_form"
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    autoComplete="off"
                    initialValues={{ order: 1 }}
                >
                    {/* Course Selection */}
                    <Form.Item
                        label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Select Destination Course</span>}
                        name="courseId"
                        rules={[{ required: true, message: 'Please select a course!' }]}
                    >
                        <Select
                            placeholder="Choose a course to add lessons to..."
                            className="rounded-xl h-11 border-gray-200"
                            popupClassName="rounded-xl shadow-lg border border-gray-100"
                            disabled={courses.length === 0}
                        >
                            {courses.map((c) => (
                                <Select.Option key={c._id} value={c._id}>
                                    {c.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {courses.length === 0 ? (
                        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                            <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="space-y-1 text-left">
                                <h4 className="text-sm font-bold text-amber-800">No courses available</h4>
                                <p className="text-xs text-amber-700 font-medium">You must create at least one course before you can upload lessons. <span onClick={() => navigate('/dashboard/courses/create')} className="font-bold underline hover:text-amber-900 cursor-pointer">Create a course now.</span></p>
                            </div>
                        </div>
                    ) : null}

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
                            label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Lesson Sequence Order</span>}
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
                        label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Lesson Content Details</span>}
                        name="content"
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Provide details of topics covered, code examples, resource links, or learning goals for this lecture..."
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
                            loading={submitLoading}
                            disabled={courses.length === 0}
                            icon={<UploadCloud className="size-4.5" />}
                            className="flex-1 group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border-none font-bold text-white shadow-md active:scale-[0.98] transition-transform select-none cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                            style={{ height: '44px' }}
                        >
                            <span>Upload Lesson</span>
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default UploadLesson;
