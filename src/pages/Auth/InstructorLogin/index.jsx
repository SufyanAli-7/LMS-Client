import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, ConfigProvider } from 'antd';
import { Mail, Lock, BookOpen, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;

const InstructorLogin = () => {
  const { dispatch , readProfile } = useAuth();  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    axios.post('/api/auth/instructor/login', { 
      email: values.email,
      password: values.password
    })
      .then((response) => {
        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
        }
        window.toastify?.(response.data?.message || 'Login successful!', 'success');
        dispatch({ type: "SET_LOGIN", payload: response.data.user });
        readProfile();
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error(error);
        const errorMsg = error.response?.data?.message || 'Invalid email or password.';
        window.toastify?.(errorMsg, 'error');
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
      <div className='relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gray-50 px-4 sm:px-6 lg:px-8'>
        {/* Premium Background Decorative Blobs clipped safely to prevent scrollbars */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none -z-10'>
          <div className='absolute top-1/4 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl' />
          <div className='absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl' />
        </div>

        <div className='w-full max-w-md py-8 sm:py-12 my-auto animate-fade-in'>
          <Card
            className='w-full border-0 bg-white/75 shadow-2xl backdrop-blur-xl transition duration-300 hover:shadow-gray-200/50'
            classNames={{ body: '!p-6 sm:!p-10' }}
          >
            {/* Header Logo & Titles */}
            <div className='mb-8 text-center select-none'>
              <div className='flex justify-center mb-6'>
                <Link to='/'>
                  <img src='/assets/logo.svg' alt='logo' className='h-8 w-auto' />
                </Link>
              </div>

              {/* Instructor Badge */}
              <div className='mx-auto mb-3 flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-600/10 uppercase tracking-wide shadow-3xs'>
                <BookOpen className='size-3.5 text-indigo-600' />
                <span>Instructor Login Portal</span>
              </div>

              <Title level={3} className='mt-2! mb-1.5! text-gray-900 font-extrabold tracking-tight'>
                Welcome Back, Educator
              </Title>
              <Text className='text-gray-500 text-sm font-medium'>
                Sign in to your teacher account to manage lectures and courses.
              </Text>
            </div>

            {/* Ant Design Form */}
            <Form
              name='instructor_login_form'
              layout='vertical'
              onFinish={onFinish}
              requiredMark={false}
              autoComplete='off'
            >
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
                  className='rounded-xl border-gray-200/80 hover:border-gray-300 focus:border-gray-950'
                />
              </Form.Item>

              {/* Password field */}
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please enter your password!' }
                ]}
              >
                <Input.Password
                  prefix={<Lock className='mr-2 size-4.5 text-gray-400' />}
                  placeholder='Password'
                  className='rounded-xl border-gray-200/80 hover:border-gray-300 focus:border-gray-950'
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item className='mt-6! mb-2!'>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={loading}
                  className='group/btn flex w-full items-center justify-center gap-1.5 rounded-xl bg-gray-900 text-sm font-bold text-white hover:bg-gray-800 border-none active:scale-[0.98] transition duration-200 cursor-pointer shadow-md'
                  style={{ height: '44px' }}
                >
                  <span>Sign In</span>
                  <ArrowRight className='size-4 transition duration-200 group-hover/btn:translate-x-0.5' />
                </Button>
              </Form.Item>
            </Form>

            {/* Bottom Nav Links */}
            <div className='mt-6 text-center text-sm border-t border-gray-100 pt-5 select-none'>
              <span className='text-gray-500'>Are you a student? </span>
              <Link to='/auth/login' className='font-bold text-gray-900 hover:text-gray-700 transition underline decoration-gray-900/30 underline-offset-4 hover:decoration-gray-700'>
                Login as Student
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default InstructorLogin;