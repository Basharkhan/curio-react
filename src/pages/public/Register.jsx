// src/pages/public/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({mode: 'onBlur'});
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border-t-2">
          <h2 className="text-xl font-bold text-text mb-5">
            Register you account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-2 font-medium text-text">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                className={`px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                }`}
                {...register('fullName', {
                  required: 'Name is required',
                })}
                autoComplete="new-name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-medium text-text">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className={`px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                autoComplete="new-email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 font-medium text-text">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className={`px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

             {/* Register Button */}
            <button
              type="submit"
              className="w-full px-4 py-1 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
   
  );
};

export default Register;