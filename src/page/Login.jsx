import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../components/Auth/AuthContext';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Login = () => {
  const navigate = useNavigate();
  const { login, setJWTToken, logout, setCurrentUser } = useAuth();
  const [typePass, setTypePass] = useState(false);

  const {
    register: registerSignIn,
    handleSubmit: handleSignIn,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sign In with Email and Password
  const onSubmit = (data) => {
    const loading = toast.loading('Please wait a moment...');
    const { email, password } = data;

    // For Login
    if (email && password) {
      login(email.toLowerCase(), password)
        .then(async (res) => {
          console.log('res', res?.userType);
          if (res?.userType === 'admin') {
            // set admin jwt token
            console.log('set admin jwt token');
            setJWTToken();
            navigate('/dashboard');
            toast.success('Sign in Successful');
          } else {
            console.log('se not an admin');
            // logout for non admin users
            // setCurrentUser(null);
            logout();
            navigate('/');
            toast.error('You are not an admin');
          }
          toast.dismiss(loading);
        })
        .catch((err) => {
          toast.dismiss(loading);
          let message = err.code.split('auth/')[1].replace(/-/g, ' ');
          toast.error(message.charAt(0).toUpperCase() + message.slice(1));
        });
    }
  };

  return (
    <>
      <div className='bg-white'>
        <div className='relative isolate px-6 pt-4 lg:px-8'>
          <div
            className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          {/* Main content */}
          <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md mt-12'>
              <Link to='/'>
                <img
                  className='mx-auto h-12 w-auto'
                  src='https://i.ibb.co/YytpcVr/logo-image-removebg-preview.png'
                  alt='Your Company'
                />
              </Link>
              <h2 className='mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900'>
                D-Book Shop Admin Panel
              </h2>
            </div>

            <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
              <div className='bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSignIn(onSubmit)}>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email
                    </label>
                    <div className='mt-1'>
                      <input
                        {...registerSignIn('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm  focus:outline-none sm:text-sm ${
                          errors?.email
                            ? 'focus:border-red-500 focus:ring-red-500'
                            : 'focus:border-indigo-500 focus:ring-indigo-500'
                        }`}
                        type='email'
                        placeholder='Ex. james15-1234@diu.edu.bd'
                        name='email'
                      />
                    </div>
                    <span className='flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1'>
                      {errors?.email?.message}
                    </span>
                  </div>

                  <div className='relative'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Password
                    </label>
                    <div className='mt-1'>
                      <input
                        {...registerSignIn('password', {
                          required: 'Password is required',
                          pattern: {
                            value:
                              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&;:`"'%<,>./?~^-_=+])[A-Za-z\d@$!%*#?&;:`"'%<,>./?~^-_=+]{8,}$/i,
                            message:
                              'Minimum eight characters, at least one letter, one number and one special character',
                          },
                        })}
                        className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm  focus:outline-none sm:text-sm ${
                          errors?.password
                            ? 'focus:border-red-500 focus:ring-red-500'
                            : 'focus:border-indigo-500 focus:ring-indigo-500'
                        }`}
                        type={typePass ? 'text' : 'password'}
                        placeholder='••••••••'
                        name='password'
                      />
                    </div>
                    <span className='absolute right-0 pr-4 top-8 flex items-center text-base leading-5 cursor-pointer'>
                      {typePass ? (
                        <EyeIcon
                          className='w-5 h-5 text-gray-500'
                          onClick={() => setTypePass(!typePass)}
                        />
                      ) : (
                        <EyeSlashIcon
                          className='w-5 h-5 text-gray-500'
                          onClick={() => setTypePass(!typePass)}
                        />
                      )}
                    </span>
                    <span className='flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1'>
                      {errors?.password?.message}
                    </span>
                  </div>

                  <div>
                    <input
                      type='submit'
                      className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer'
                      value='Sign in'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
