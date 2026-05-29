import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, ConfigProvider } from 'antd';
import { User, Mail, Lock, GraduationCap, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    axios.post('/api/auth/register', {
      name: values.name,
      email: values.email,
      password: values.password,
      role: 'student'
    })
      .then((response) => {
        window.toastify(response.data?.message || 'Student account created successfully!', 'success');
        navigate('/auth/login');       
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || 'Registration failed. Please check your credentials.';
        window.toastify(errorMsg, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#111827', // premium deep slate/black color
          borderRadius: 12,
          controlHeight: 42,
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        components: {
          Input: {
            activeBorderColor: '#111827',
            hoverBorderColor: '#374151',
          },
        },
      }}
    >
      <div className='relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gray-50 px-4 sm:px-6 lg:px-8 lg:pt-12'>
        {/* Premium Background Decorative Blobs clipped safely to prevent scrollbars */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none -z-10'>
          <div className='absolute top-1/4 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl' />
          <div className='absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl' />
        </div>

        <div className='w-full max-w-md py-8 sm:py-12 my-auto'>
          <Card
            className='w-full border-0 bg-white/70 shadow-2xl backdrop-blur-xl transition duration-300 hover:shadow-gray-200/50'
            classNames={{ body: '!p-6 sm:!p-10' }}
          >
          {/* Header Logo & Titles */}
          <div className='mb-8 text-center'>
            <div className='flex justify-center mb-6'>
              <Link to='/'>
                <img src='/assets/logo.svg' alt='logo' className='h-8 w-auto' />
              </Link>
            </div>

            {/* Student Badge */}
            <div className='mx-auto mb-3 flex w-fit items-center gap-1.5 rounded-full bg-gray-900/5 px-3 py-1 text-xs font-semibold text-gray-800 ring-1 ring-gray-900/10'>
              <GraduationCap className='size-3.5 text-gray-700' />
              <span>Student Registration Portal</span>
            </div>

            <Title level={3} className='mt-1! mb-1! text-gray-900 font-bold'>
              Create your Account
            </Title>
            <Text className='text-gray-500 text-sm'>
              Get access to top courses and learning resources.
            </Text>
          </div>

          {/* Ant Design Form */}
          <Form
            name='register_form'
            layout='vertical'
            onFinish={onFinish}
            requiredMark={false}
            autoComplete='off'
          >
            {/* Full Name field */}
            <Form.Item
              name='name'
              rules={[
                { required: true, message: 'Please enter your full name!' },
                { min: 2, message: 'Name must be at least 2 characters long!' }
              ]}
            >
              <Input
                prefix={<User className='mr-2 size-4.5 text-gray-400' />}
                placeholder='Full Name'
              />
            </Form.Item>

            {/* Email field */}
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Please enter your email address!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <Input
                prefix={<Mail className='mr-2 size-4.5 text-gray-400' />}
                placeholder='Email Address'
              />
            </Form.Item>

            {/* Password field */}
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters long!' }
              ]}
            >
              <Input.Password
                prefix={<Lock className='mr-2 size-4.5 text-gray-400' />}
                placeholder='Password'
              />
            </Form.Item>

            {/* Confirm Password field */}
            <Form.Item
              name='confirmPassword'
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
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
                prefix={<Lock className='mr-2 size-4.5 text-gray-400' />}
                placeholder='Confirm Password'
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className='mt-6! mb-2!'>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='group/btn flex w-full items-center justify-center gap-1.5 rounded-xl bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 active:scale-[0.98] transition duration-200'
                style={{ height: '44px' }}
              >
                <span>Sign Up</span>
                <ArrowRight className='size-4 transition duration-200 group-hover/btn:translate-x-0.5' />
              </Button>
            </Form.Item>
          </Form>

          {/* Bottom Nav Links */}
          <div className='mt-6 text-center text-sm'>
            <span className='text-gray-500'>Already have an account? </span>
            <Link to='/auth/login' className='font-semibold text-gray-900 hover:text-gray-700 transition underline decoration-gray-900/30 underline-offset-4 hover:decoration-gray-700'>
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
    </ConfigProvider>
  );
};

export default Register;