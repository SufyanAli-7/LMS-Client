import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Avatar, Input, Button, Spin, Popconfirm } from 'antd';
import { Shield, BookOpen, GraduationCap, Mail, Users, RefreshCw, AlertCircle, Search, Trash2 } from 'lucide-react';

const All = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchUsers = () => {
        setLoading(true);
        setError(null);
        axios.get('/api/user/admin-all-users', { withCredentials: true })
            .then((res) => {
                // The server response structure is { message: 'User data', users: [...] }
                if (res.data && Array.isArray(res.data.users)) {
                    setUsers(res.data.users);
                } else {
                    setError('Unexpected data format received from the server.');
                    window.toastify?.('Invalid response format', 'error');
                }
            })
            .catch((err) => {
                console.error(err);
                const errMsg = err.response?.data?.message || err.message || 'Failed to fetch users.';
                setError(errMsg);
                window.toastify?.(errMsg, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (userId) => {
        axios.delete(`/api/user/admin-delete-users/${userId}`, { withCredentials: true })
            .then((res) => {
                window.toastify?.('User deleted successfully', 'success');
                setUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
            })
            .catch((err) => {
                console.error(err);
                const errMsg = err.response?.data?.message || err.message || 'Failed to delete user.';
                window.toastify?.(errMsg, 'error');
            });
    };

    // Filter users based on search query (name or email)
    const filteredUsers = users.filter(user => 
        (user.name?.toLowerCase().includes(searchText.toLowerCase())) ||
        (user.email?.toLowerCase().includes(searchText.toLowerCase()))
    );

    // Columns config for Ant Design Table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
            render: (name) => (
                <div className="flex items-center gap-3">
                    <Avatar 
                        size={38} 
                        className="bg-gray-900 text-white font-semibold text-sm shadow-sm ring-2 ring-gray-900/5 hover:scale-105 transition-all select-none"
                    >
                        {name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="font-semibold text-gray-800 text-sm md:text-base">{name}</span>
                </div>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
            render: (email) => (
                <a 
                    href={`mailto:${email}`} 
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 hover:underline transition-all select-all font-medium"
                >
                    <Mail className="size-4 text-gray-400 shrink-0" />
                    <span>{email}</span>
                </a>
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'Admin', value: 'admin' },
                { text: 'Instructor', value: 'instructor' },
                { text: 'Student', value: 'student' }
            ],
            onFilter: (value, record) => (record.role || 'student') === value,
            render: (role) => {
                const getRoleConfig = (r) => {
                    switch (r?.toLowerCase()) {
                        case 'admin':
                            return {
                                bg: 'bg-gray-950/5 ring-gray-950/15 text-gray-900',
                                icon: <Shield className="size-3 text-gray-800" />,
                                label: 'Admin'
                            };
                        case 'instructor':
                            return {
                                bg: 'bg-indigo-50 text-indigo-700 ring-indigo-600/10',
                                icon: <BookOpen className="size-3 text-indigo-600" />,
                                label: 'Instructor'
                            };
                        case 'student':
                        default:
                            return {
                                bg: 'bg-teal-50 text-teal-700 ring-teal-600/10',
                                icon: <GraduationCap className="size-3 text-teal-600" />,
                                label: 'Student'
                            };
                    }
                };

                const config = getRoleConfig(role);

                return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase ring-1 shadow-xs transition-transform hover:scale-[1.02] ${config.bg}`}>
                        {config.icon}
                        <span>{config.label}</span>
                    </span>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Popconfirm
                    title="Delete User"
                    description={`Are you sure you want to delete ${record.name}?`}
                    onConfirm={() => handleDeleteUser(record._id)}
                    okText="Yes, Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true, className: "bg-red-600 hover:bg-red-500 border-none font-semibold" }}
                    cancelButtonProps={{ className: "border-gray-200" }}
                >
                    <Button 
                        type="text" 
                        danger 
                        icon={<Trash2 className="size-4.5" />} 
                        className="hover:bg-red-50/50 p-2 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
                    />
                </Popconfirm>
            )
        }
    ];

    // Premium stats calculation
    const totalUsers = users.length;
    const totalAdmins = users.filter(u => u.role === 'admin').length;
    const totalInstructors = users.filter(u => u.role === 'instructor').length;
    const totalStudents = users.filter(u => u.role === 'student' || !u.role).length;

    const stats = [
        { title: 'Total Users', value: totalUsers, icon: <Users className="size-5 text-gray-600" />, bg: 'bg-gray-50/70 border-gray-100' },
        { title: 'Admins', value: totalAdmins, icon: <Shield className="size-5 text-gray-800" />, bg: 'bg-gray-900/[0.02] border-gray-900/10' },
        { title: 'Instructors', value: totalInstructors, icon: <BookOpen className="size-5 text-indigo-600" />, bg: 'bg-indigo-50/40 border-indigo-100/60' },
        { title: 'Students', value: totalStudents, icon: <GraduationCap className="size-5 text-teal-600" />, bg: 'bg-teal-50/40 border-teal-100/60' }
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-112.5 gap-4 py-16">
                <Spin size="large" />
                <p className="text-gray-400 text-sm font-semibold animate-pulse select-none tracking-wide">
                    Loading registered users...
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
                    <h3 className="text-xl font-bold text-gray-900">Failed to load users</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">{error}</p>
                </div>
                <Button 
                    type="primary" 
                    icon={<RefreshCw className="size-4" />} 
                    onClick={fetchUsers}
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
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Directory</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage, search, and monitor all platform accounts and privileges.</p>
                </div>
                
                {/* Search Bar & Refresh Button */}
                <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
                    <Input
                        prefix={<Search className="size-4 text-gray-400 mr-1.5" />}
                        placeholder="Search by name or email..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                        className="rounded-xl border-gray-200/80 shadow-xs h-10 hover:border-gray-300 focus:border-gray-900"
                    />
                    <Button 
                        icon={<RefreshCw className="size-4" />} 
                        onClick={fetchUsers}
                        className="h-10 w-10 flex items-center justify-center rounded-xl hover:border-gray-300 active:scale-95 transition-all text-gray-600"
                        title="Reload users"
                    />
                </div>
            </div>

            {/* Stats widgets overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div 
                        key={i} 
                        className={`p-4.5 rounded-2xl border backdrop-blur-xs flex items-center justify-between shadow-xs select-none hover:scale-[1.01] hover:shadow-sm transition-all duration-300 ${stat.bg}`}
                    >
                        <div className="space-y-1.5 text-left">
                            <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">{stat.title}</span>
                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-none">{stat.value}</p>
                        </div>
                        <div className="p-3 bg-white/80 rounded-xl shadow-xs ring-1 ring-black/3">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Antd Table Container */}
            <div className="overflow-hidden border border-gray-100/80 rounded-2xl shadow-xs bg-white/40">
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={filteredUsers}
                    scroll={{ x: 'max-content' }}
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
                                <Users className="size-10 text-gray-300 mx-auto" />
                                <h4 className="text-base font-bold text-gray-700">No users found</h4>
                                <p className="text-xs text-gray-400 max-w-xs mx-auto">Try adjusting your search criteria or register new users to populate the directory.</p>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default All;