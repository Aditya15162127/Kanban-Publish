import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const getColorMode = () => localStorage.getItem('themeMode') || 'Light';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [colorMode, setColorMode] = useState(getColorMode());
  const navigate = useNavigate();

  useEffect(() => {
    setColorMode(getColorMode());
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === email)) {
      setError('Email already registered.');
      return;
    }
    const newUser = { name, email, password, profileImage: '' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setError('');
    navigate('/login');
  };

  const bg = colorMode === 'Dark'
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
    : 'bg-gradient-to-br from-blue-100 via-white to-blue-200';

  const cardBg = colorMode === 'Dark'
    ? 'dark:bg-[#32373e] bg-[#32373e] text-white'
    : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bg} px-2 py-8`}>
      <form className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${cardBg}`} onSubmit={handleSignup}>
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 underline">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;