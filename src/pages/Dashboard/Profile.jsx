import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Spin, Avatar, Row, Col, Divider } from 'antd';
import { User, Mail, Lock, Shield, GraduationCap, BookOpen, Calendar, AlertCircle, RefreshCw, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;

const Profile = () => {
    const { user, readProfile } = useAuth();
    const [fetching, setFetching] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [stats, setStats] = useState({ coursesCount: 0, loading: true });
    const [error, setError] = useState(null);
    const [form] = Form.useForm();

    const fetchUserProfile = () => {
        setFetching(true);
        setError(null);
        axios.get('/api/user/data', { withCredentials: true })
            .then((res) => {
                if (res.data && res.data.user) {
                    const userData = res.data.user;
                    setFetching(false);
                    setTimeout(() => {
                        form.setFieldsValue({
                            name: userData.name,
                            email: userData.email
                        });
                    }, 0);
                } else {
                    setFetching(false);
                }
            })
            .catch((err) => {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to fetch profile data.');
                setFetching(false);
            });
    };

    const fetchRoleStats = () => {
        if (!user || !user.role) return;
        setStats(prev => ({ ...prev, loading: true }));
        
        if (user.role === 'student') {
            // Fetch enrolled courses count
            axios.get('/api/enrollment/my-courses', { withCredentials: true })
                .then((res) => {
                    if (res.data && Array.isArray(res.data.enrollments)) {
                        setStats({ coursesCount: res.data.enrollments.length, loading: false });
                    }
                })
                .catch(err => {
                    console.error(err);
                    setStats({ coursesCount: 0, loading: false });
                });
        } else if (user.role === 'instructor') {
            // Fetch authored courses count
            axios.get('/api/course', { withCredentials: true })
                .then((res) => {
                    if (res.data && Array.isArray(res.data.courses)) {
                        setStats({ coursesCount: res.data.courses.length, loading: false });
                    }
                })
                .catch(err => {
                    console.error(err);
                    setStats({ coursesCount: 0, loading: false });
                });
        } else {
            setStats({ coursesCount: 0, loading: false });
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (user && user.role) {
            fetchRoleStats();
        }
    }, [user]);

    const onFinish = (values) => {
        setSubmitting(true);

        axios.put('/api/user/profile', {
            name: values.name,
            email: values.email,
            password: values.password || undefined
        }, { withCredentials: true })
            .then((res) => {
                window.toastify?.(res.data?.message || 'Profile updated successfully!', 'success');
                // Clear password input
                form.setFieldsValue({ password: '' });
                // Trigger context refresh to update header
                readProfile();
            })
            .catch((error) => {
                console.error(error);
                const errMsg = error.response?.data?.message || 'Failed to update profile.';
                window.toastify?.(errMsg, 'error');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const getRoleIcon = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return <Shield className="size-4.5 text-gray-800" />;
            case 'instructor':
                return <BookOpen className="size-4.5 text-gray-800" />;
            case 'student':
            default:
                return <GraduationCap className="size-4.5 text-gray-800" />;
        }
    };

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-16 animate-fade-in">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading your profile credentials...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 gap-5 p-8 text-center bg-red-50/30 rounded-2xl border border-red-100 max-w-2xl mx-auto my-8 animate-fade-in">
                <div className="p-3 bg-red-100 rounded-full text-red-650">
                    <AlertCircle className="size-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Failed to load profile</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">{error}</p>
                </div>
                <Button 
                    type="primary" 
                    icon={<RefreshCw className="size-4 mr-1" />}
                    onClick={fetchUserProfile}
                    className="mt-2 bg-gray-900 hover:bg-gray-800 border-none font-semibold shadow-md active:scale-95 transition-transform"
                    size="large"
                >
                    Retry Connection
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-4 space-y-8 animate-fade-in">
            {/* Header Title */}
            <div className="border-b border-gray-100 pb-5 select-none text-left">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Account Profile</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your personal account credentials, verify your role statistics, or update passwords.
                </p>
            </div>

            <Row gutter={[24, 24]}>
                {/* Left Column: Avatar & Summary stats */}
                <Col xs={24} md={9}>
                    <Card className="border border-gray-150 shadow-md rounded-2xl bg-white text-center">
                        <div className="py-6 flex flex-col items-center space-y-4">
                            {/* Avatar */}
                            <Avatar
                                size={96}
                                className="shadow-md ring-4 ring-gray-150 select-none"
                                style={{ backgroundColor: '#111827', color: '#ffffff', fontSize: '32px', fontWeight: 'bold' }}
                            >
                                {user?.name?.charAt(0).toUpperCase()}
                            </Avatar>

                            {/* Name & Role */}
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-gray-900 select-text leading-none">{user?.name}</h3>
                                <span className="inline-flex items-center gap-1 w-fit rounded-full bg-gray-900/5 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider text-gray-700 uppercase ring-1 ring-gray-900/10 mt-1 select-none">
                                    {getRoleIcon(user?.role)}
                                    <span>{user?.role || 'student'}</span>
                                </span>
                            </div>

                            <Divider className="my-2! border-gray-100" />

                            {/* Account metadata stats */}
                            <div className="w-full text-left space-y-3 px-2 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 font-semibold flex items-center gap-1.5 select-none">
                                        <Calendar className="size-4" />
                                        <span>Joined:</span>
                                    </span>
                                    <span className="font-bold text-gray-750 select-text">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                    </span>
                                </div>

                                {user?.role === 'student' ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 font-semibold flex items-center gap-1.5 select-none">
                                            <GraduationCap className="size-4" />
                                            <span>Enrolled Courses:</span>
                                        </span>
                                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg select-text">
                                            {stats.loading ? '...' : `${stats.coursesCount} Courses`}
                                        </span>
                                    </div>
                                ) : user?.role === 'instructor' ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 font-semibold flex items-center gap-1.5 select-none">
                                            <BookOpen className="size-4" />
                                            <span>Authored Courses:</span>
                                        </span>
                                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg select-text">
                                            {stats.loading ? '...' : `${stats.coursesCount} Courses`}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 font-semibold flex items-center gap-1.5 select-none">
                                            <Shield className="size-4" />
                                            <span>Permissions:</span>
                                        </span>
                                        <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg select-none uppercase tracking-wider text-[10px]">
                                            Full Admin
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Right Column: Settings Form */}
                <Col xs={24} md={15}>
                    <Card className="border border-gray-150 shadow-md rounded-2xl bg-white select-none">
                        <Title level={4} className="mt-0! mb-6! text-gray-800 font-extrabold tracking-tight text-left">
                            Profile Settings
                        </Title>

                        <Form
                            form={form}
                            name="profile_settings_form"
                            layout="vertical"
                            onFinish={onFinish}
                            requiredMark={false}
                            autoComplete="off"
                        >
                            {/* Full Name */}
                            <Form.Item
                                label={<span className="text-gray-700 font-bold text-xs select-none">Full Name</span>}
                                name="name"
                                rules={[
                                    { required: true, message: 'Please enter your full name!' },
                                    { min: 3, message: 'Name must be at least 3 characters long!' }
                                ]}
                            >
                                <Input
                                    prefix={<User className="mr-2 size-4 text-gray-400" />}
                                    placeholder="Your full name"
                                    className="rounded-xl h-11 border-gray-200 hover:border-gray-300 focus:border-gray-950"
                                />
                            </Form.Item>

                            {/* Email Address */}
                            <Form.Item
                                label={<span className="text-gray-700 font-bold text-xs select-none">Email Address</span>}
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email address!' },
                                    { type: 'email', message: 'Please enter a valid email address!' }
                                ]}
                            >
                                <Input
                                    prefix={<Mail className="mr-2 size-4 text-gray-400" />}
                                    placeholder="e.g. name@domain.com"
                                    className="rounded-xl h-11 border-gray-200 hover:border-gray-300 focus:border-gray-950"
                                />
                            </Form.Item>

                            {/* Change Password */}
                            <Form.Item
                                label={
                                    <div className="flex items-center gap-1.5 select-none">
                                        <span className="text-gray-700 font-bold text-xs">Update Password</span>
                                        <span className="text-[10px] text-gray-400 font-medium">(Optional - Leave blank to keep current)</span>
                                    </div>
                                }
                                name="password"
                                rules={[
                                    { min: 6, message: 'New password must be at least 6 characters long!' }
                                ]}
                            >
                                <Input.Password
                                    prefix={<Lock className="mr-2 size-4 text-gray-400" />}
                                    placeholder="Enter a new strong password"
                                    className="rounded-xl h-11 border-gray-200 hover:border-gray-300 focus:border-gray-950"
                                />
                            </Form.Item>

                            {/* Submit Button */}
                            <div className="flex justify-end mt-8">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={submitting}
                                    icon={<Save className="size-4" />}
                                    className="w-full sm:w-fit group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border-none font-bold text-white shadow-md active:scale-[0.98] transition-transform select-none cursor-pointer"
                                    style={{ height: '44px' }}
                                >
                                    <span>Save Changes</span>
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
