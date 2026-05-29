import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { User, Mail, Lock, BookOpen, UserPlus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const AddInstructor = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        setLoading(true);

        axios.post('/api/auth/admin-add-instructor', {
            name: values.name,
            email: values.email,
            password: values.password,
            role: 'instructor'
        }, { withCredentials: true })
            .then((response) => {
                window.toastify?.(response.data?.message || 'Instructor added successfully!', 'success');
                form.resetFields();
                // Navigate back to the user list so they can see their newly added instructor
                navigate('/dashboard/users');
            })
            .catch((error) => {
                console.error(error);
                const errorMsg = error.response?.data?.message || 'Failed to add instructor account.';
                window.toastify?.(errorMsg, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto py-4 animate-fade-in">
            {/* Back Button */}
            <div className="flex justify-start">
                <Button 
                    type="text" 
                    icon={<ArrowLeft className="size-4 mr-1.5" />} 
                    onClick={() => navigate('/dashboard/users')}
                    className="flex items-center text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 font-semibold cursor-pointer select-none"
                >
                    Back to Users
                </Button>
            </div>

            <Card 
                className="w-full border border-gray-100 bg-white/75 shadow-xl backdrop-blur-md rounded-2xl overflow-hidden"
                classNames={{ body: '!p-6 sm:!p-10' }}
            >
                {/* Header Logo & Titles */}
                <div className="mb-8 text-center select-none">
                    {/* Badge */}
                    <div className="mx-auto mb-4 flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-600/10 tracking-wide uppercase shadow-3xs">
                        <BookOpen className="size-3.5 text-indigo-600" />
                        <span>Instructor Registration</span>
                    </div>

                    <Title level={3} className="mt-2! mb-1.5! text-gray-900 font-extrabold tracking-tight">
                        Register New Instructor
                    </Title>
                    <Text className="text-gray-500 text-sm font-medium">
                        Create a verified teacher account with platform listing and course creation privileges.
                    </Text>
                </div>

                {/* Ant Design Form */}
                <Form
                    form={form}
                    name="add_instructor_form"
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    autoComplete="off"
                >
                    {/* Full Name field */}
                    <Form.Item
                        label={<span className="text-gray-700 font-semibold text-xs md:text-sm select-none">Full Name</span>}
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter the instructor\'s full name!' },
                            { min: 2, message: 'Name must be at least 2 characters long!' }
                        ]}
                    >
                        <Input
                            prefix={<User className="mr-2 size-4.5 text-gray-400" />}
                            placeholder="e.g. Professor John Doe"
                            className="rounded-xl h-11 border-gray-200/80 hover:border-gray-300 focus:border-gray-900"
                        />
                    </Form.Item>

                    {/* Email field */}
                    <Form.Item
                        label={<span className="text-gray-700 font-semibold text-xs md:text-sm select-none">Email Address</span>}
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter the email address!' },
                            { type: 'email', message: 'Please enter a valid email address!' }
                        ]}
                    >
                        <Input
                            prefix={<Mail className="mr-2 size-4.5 text-gray-400" />}
                            placeholder="e.g. instructor@slidex.com"
                            className="rounded-xl h-11 border-gray-200/80 hover:border-gray-300 focus:border-gray-900"
                        />
                    </Form.Item>

                    {/* Password field */}
                    <Form.Item
                        label={<span className="text-gray-700 font-semibold text-xs md:text-sm select-none">Password</span>}
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter a password!' },
                            { min: 6, message: 'Password must be at least 6 characters long!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<Lock className="mr-2 size-4.5 text-gray-400" />}
                            placeholder="Min. 6 characters"
                            className="rounded-xl h-11 border-gray-200/80 hover:border-gray-300 focus:border-gray-950"
                        />
                    </Form.Item>

                    {/* Confirm Password field */}
                    <Form.Item
                        label={<span className="text-gray-700 font-semibold text-xs md:text-sm select-none">Confirm Password</span>}
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm the password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The passwords you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<Lock className="mr-2 size-4.5 text-gray-400" />}
                            placeholder="Verify password"
                            className="rounded-xl h-11 border-gray-200/80 hover:border-gray-300 focus:border-gray-950"
                        />
                    </Form.Item>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-8">
                        <Button
                            type="default"            
                            style={{ height: '44px' }}                
                            onClick={() => navigate('/dashboard/users')}
                            className="flex-1 rounded-xl border-gray-200 font-bold text-gray-600 hover:border-gray-300 hover:text-gray-800 active:scale-[0.98] transition-transform select-none cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            icon={<UserPlus className="size-4.5" />}
                            className="flex-1 group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border-none font-bold text-white shadow-md active:scale-[0.98] transition-transform select-none cursor-pointer"
                            style={{ height: '44px' }}
                        >
                            <span>Add Instructor</span>
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default AddInstructor;