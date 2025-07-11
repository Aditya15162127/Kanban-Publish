import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const UserProfile = () => {
  const { currentColor, user, setUser, setIsClicked, initialState } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kanbanUser');
    setIsClicked(initialState);
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsClicked(initialState);
  };

  const displayName = user?.name || (user?.email ? user.email.split('@')[0] : 'User');
  const displayAvatar = user?.profileImage || avatar;

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          onClick={() => setIsClicked(initialState)}
        />
      </div>
      <div className="flex flex-col items-center mt-4">
        <img
          className="rounded-full w-24 h-24 mb-2"
          src={displayAvatar}
          alt="user-profile"
        />
        <p className="text-lg font-semibold">{displayName}</p>
        <p className="text-gray-500">{user?.email}</p>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <button
          className="w-full py-2 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700"
          onClick={handleProfile}
        >
          My Profile
        </button>
        <button
          className="w-full py-2 rounded text-white font-semibold bg-red-600 hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;