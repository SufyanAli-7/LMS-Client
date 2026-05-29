import { ProductOutlined, TeamOutlined, UserAddOutlined, BookOutlined, PlusCircleOutlined, VideoCameraAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const items = [
    { key : '1', label: <Link to='/dashboard'>Dashboard</Link>, icon: <ProductOutlined /> },
    { 
        key : '2', 
        label: 'Manage Users', 
        icon: <TeamOutlined />, 
        allowedRoles: ['admin'],
        children: [
            { key: '2-1', label: <Link to='/dashboard/users'>All Users</Link>, icon: <TeamOutlined /> },
            { key: '2-2', label: <Link to='/dashboard/users/add-instructor'>Add Instructor</Link>, icon: <UserAddOutlined /> }
        ]
    },
    { 
        key : '3', 
        label: 'Manage Courses', 
        icon: <BookOutlined />, 
        allowedRoles: ['admin', 'instructor'],
        children: [
            { key: '3-1', label: <Link to='/dashboard/courses'>All Courses</Link>, icon: <BookOutlined />, allowedRoles: ['admin', 'instructor'] },
            { key: '3-2', label: <Link to='/dashboard/courses/create'>Create Course</Link>, icon: <PlusCircleOutlined />, allowedRoles: ['instructor'] },
            { key: '3-3', label: <Link to='/dashboard/lessons/upload'>Upload Lessons</Link>, icon: <VideoCameraAddOutlined />, allowedRoles: ['instructor'] }
        ]
    },
    {
        key : '4',
        label: <Link to='/dashboard/my-courses'>My Courses</Link>,
        icon: <BookOutlined />,
        allowedRoles: ['student']
    },
    {
        key : '5',
        label: <Link to='/dashboard/profile'>Profile</Link>,
        icon: <UserOutlined />
    }
]

export { items }
