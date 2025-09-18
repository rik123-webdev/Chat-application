import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext.jsx';

const LoginPage = () => {
  const [currState, setCurrentState] = useState('Sign up');
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === 'Sign up') {
      if (!isDataSubmitted) {
        setIsDataSubmitted(true);
        return;
      }

      login('signup', { fullName, email, password, bio });
    } else {
      login('login', { email, password });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      
      {/* Left Side */}
      <img src={assets.logo_big} alt="Logo" className="w-[min(30vw,250px)]" />

      {/* Right Side */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          <img
            src={assets.arrow_icon}
            alt="Arrow"
            className="w-5 cursor-pointer"
            onClick={() => {
              setCurrentState(currState === 'Sign up' ? 'Login' : 'Sign up');
              setIsDataSubmitted(false);
            }}
          />
        </h2>

        {/* Full Name - Only for Sign Up before submission */}
        {currState === 'Sign up' && !isDataSubmitted && (
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {/* Email & Password */}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {/* Bio - Only after clicking Create Account in Sign up */}
        {currState === 'Sign up' && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="py-3 rounded-md cursor-pointer bg-gradient-to-r from-purple-400 to-violet-600 text-white"
        >
          {currState === 'Sign up'
            ? isDataSubmitted
              ? 'Save Bio'
              : 'Create Account'
            : 'Login Now'}
        </button>

        {/* Switch Between Login / Sign Up */}
        <div className="flex flex-col gap-2">
          {currState === 'Sign up' ? (
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <span
                onClick={() => {
                  setCurrentState('Login');
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{' '}
              <span
                onClick={() => {
                  setCurrentState('Sign up');
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
