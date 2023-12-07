// hooks/useAuth.js
import { useContext } from 'react';
import { AppContext } from '../context';

const useAuth = () => {
  const { state } = useContext(AppContext);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    // Add other auth-related properties or methods as needed
  };
};

export default useAuth;
