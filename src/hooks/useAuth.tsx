import { useAuth0 } from "@auth0/auth0-react";

// Custom hook to encapsulate Auth0 authentication logic
export const useAuth = () => {
  // Destructure authentication methods and states from useAuth0 hook
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  // Return the authentication states and methods for use in other components
  return {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    isLoading,
  };
};
