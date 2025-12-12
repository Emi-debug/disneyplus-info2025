import React, { createContext, useReducer } from 'react';
import { authReducer, initialState } from '../reducers/authRecucer';
import { mockLogin } from '../utils/mockAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (email, password) => {
    const mockUser = mockLogin(email, password);
    dispatch({ type: 'LOGIN', payload: mockUser });
    return { success: true, user: mockUser };
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};