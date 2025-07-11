import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  // Theme state
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);

  // Sidebar/menu state
  const [activeMenu, setActiveMenu] = useState(true);

  // User state
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('kanbanUser')) || null);

  // Other UI state
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);

  // Keep user state in sync with localStorage
  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem('kanbanUser')) || null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Update localStorage when user changes
  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('kanbanUser', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('kanbanUser');
    }
  };

  // Theme setters
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
    setThemeSettings(false);
  };

  // UI helpers
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
  <StateContext.Provider
    value={{
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode,
        activeMenu,
        setActiveMenu,
        themeSettings,
        setThemeSettings,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
       user,
       setUser: updateUser,
        setMode,
       setColor,
       initialState,
      }}
  >
     {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);