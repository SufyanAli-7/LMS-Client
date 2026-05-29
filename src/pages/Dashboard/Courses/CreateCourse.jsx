import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, Select, Typography } from 'antd';
import { BookOpen, PlusCircle, ArrowLeft, Image, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const CreateCourse = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        setLoading(true);

        axios.post('/api/course', {
            title: values.title,
            description: values.description,
            price: values.price,
            category: values.category,
            thumbnailURL: values.thumbnailURL
        }, { withCredentials: true })
            .then((res) => {
                window.toastify?.(res.data?.message || 'Course created successfully!', 'success');
                form.resetFields();
                navigate('/dashboard/courses');
            })
            .catch((error) => {
                console.error(error);
                const errMsg = error.response?.data?.message || 'Failed to create course.';
                window.toastify?.(errMsg, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const categories = [
        "Web Development",
        "App Development",
        "Graphic Design",
        "Marketing",
        "Business & Finance",
        "Data Science",
        "Artificial Intelligence",
        "Personal Development",
        "Other"
    ];

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
                {/* Header Section */}
                <div className="mb-8 text-center select-none">
                    <div className="mx-auto mb-4 flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-600/10 tracking-wide uppercase shadow-3xs">
                        <PlusCircle className="size-3.5 text-indigo-600" />
                        <span>Course Creation Hub</span>
                    </div>

                    <Title level={3} className="mt-2! mb-1.5! text-gray-900 font-extrabold tracking-tight">
                        Launch a New Course
                    </Title>
                    <Text className="text-gray-500 text-sm font-medium">
                        Fill in the curriculum, price, and category details to publish a new learning journey.
                    </Text>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    name="create_course_form"
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    autoComplete="off"
                >
                    {/* Title */}
                    <Form.Item
                        label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Course Title</span>}
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter the course title!' },
                            { min: 5, message: 'Title must be at least 5 characters long!' }
                        ]}
                    >
                        <Input
                            prefix={<BookOpen className="mr-2 size-4.5 text-gray-400" />}
                            placeholder="e.g. Master React & Node.js from Scratch"
                            className="rounded-xl h-11 border-gray-200 hover:border-gray-300 focus:border-gray-950"
                        />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category */}
                        <Form.Item
                            label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Category</span>}
                            name="category"
                            rules={[{ required: true, message: 'Please select a course category!' }]}
                        >
                            <Select
                                placeholder="Select category"
                                className="rounded-xl h-11 border-gray-200"
                                popupClassName="rounded-xl shadow-lg border border-gray-100"
                            >
                                {categories.map((cat) => (
                                    <Select.Option key={cat} value={cat}>
                                        {cat}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {/* Price */}
                        <Form.Item
                            label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Course Price (USD)</span>}
                            name="price"
                            rules={[{ required: true, message: 'Please enter the price!' }]}
                        >
                            <InputNumber
                                min={0}
                                placeholder="Price in USD"
                                prefix={<DollarSign className="size-4 text-gray-400 mr-1" />}
                                className="w-full rounded-xl border-gray-200 hover:border-gray-300 focus:border-gray-950 flex items-center"
                                style={{ height: '44px' , width:'100%'}}                            
                            />
                        </Form.Item>
                    </div>

                    {/* Thumbnail URL */}
                    <Form.Item
                        label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Thumbnail Image URL</span>}
                        name="thumbnailURL"
                        rules={[{ required: true, message: 'Please provide a thumbnail image URL!' }]}
                    >
                        <Input
                            prefix={<Image className="mr-2 size-4.5 text-gray-400" />}
                            placeholder="e.g. https://domain.com/images/course-thumb.jpg"
                            className="rounded-xl h-11 border-gray-200 hover:border-gray-300 focus:border-gray-950"
                        />
                    </Form.Item>

                    {/* Description */}
                    <Form.Item
                        label={<span className="text-gray-700 font-bold text-xs md:text-sm select-none">Course Description</span>}
                        name="description"
                        rules={[
                            { required: true, message: 'Please write a course description!' },
                            { min: 20, message: 'Description must be at least 20 characters long!' }
                        ]}
                    >
                        <Input.TextArea
                            rows={5}
                            placeholder="Write a compelling overview describing what students will learn, target audience, and course requirements..."
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
                            loading={loading}
                            icon={<PlusCircle className="size-4.5" />}
                            className="flex-1 group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border-none font-bold text-white shadow-md active:scale-[0.98] transition-transform select-none cursor-pointer"
                            style={{ height: '44px' }}
                        >
                            <span>Create Course</span>
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CreateCourse;
