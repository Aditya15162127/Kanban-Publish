import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const getColorMode = () => localStorage.getItem('themeMode') || 'Light';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [colorMode, setColorMode] = useState(getColorMode());
  const navigate = useNavigate();
  const { setUser } = useStateContext();

  useEffect(() => {
    setColorMode(getColorMode());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid email or password.');
      return;
    }
    const { name, email: userEmail, profileImage } = user;
    setUser({ name, email: userEmail, profileImage: profileImage || '' });
    setError('');
    navigate('/kanban');
  };

  const bg = colorMode === 'Dark'
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
    : 'bg-gradient-to-br from-blue-100 via-white to-blue-200';

  const cardBg = colorMode === 'Dark'
    ? 'dark:bg-[#32373e] bg-[#32373e] text-white'
    : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bg} px-2 py-8`}>
      <form className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${cardBg}`} onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
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
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 underline">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;