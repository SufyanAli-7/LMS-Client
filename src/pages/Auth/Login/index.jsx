import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, ConfigProvider } from 'antd';
import { Mail, Lock, GraduationCap, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const { dispatch , readProfile } = useAuth();  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    axios.post('/api/auth/student/login', {
      email: values.email,
      password: values.password
    })
      .then((response) => {
        window.toastify(response.data?.message || 'Login successful!', 'success');
        dispatch({ type: "SET_LOGIN", payload: response.data.user });
        readProfile();
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || 'Invalid email or password.';
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
      <div className='relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gray-50 px-4 sm:px-6 lg:px-8'>
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
                <span>Student Login Portal</span>
              </div>

              <Title level={3} className='mt-1! mb-1! text-gray-900 font-bold'>
                Welcome Back
              </Title>
              <Text className='text-gray-500 text-sm'>
                Sign in to your student account to continue learning.
              </Text>
            </div>

            {/* Ant Design Form */}
            <Form
              name='login_form'
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
                  <span>Sign In</span>
                  <ArrowRight className='size-4 transition duration-200 group-hover/btn:translate-x-0.5' />
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-4">
              <Button
                type="default"
                onClick={() => navigate('/auth/instructor/login')}
                className="w-full rounded-xl border-gray-200 font-bold text-gray-600 hover:border-gray-800 hover:text-gray-950 active:scale-[0.98] transition duration-200 cursor-pointer"
                style={{ height: '44px' }}
              >
                Login as Instructor
              </Button>
            </div>

            {/* Bottom Nav Links */}
            <div className='mt-6 text-center text-sm'>
              <span className='text-gray-500'>Don't have an account? </span>
              <Link to='/auth/register' className='font-semibold text-gray-900 hover:text-gray-700 transition underline decoration-gray-900/30 underline-offset-4 hover:decoration-gray-700'>
                Sign Up
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;