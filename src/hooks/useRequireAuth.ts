import { useAuth } from "../context/AuthContext";

/**
 * Custom hook to guard user actions behind authentication.
 * If the user is authenticated, the action is executed.
 * Otherwise, the authentication modal is opened automatically.
 */
export function useRequireAuth() {
  const { user, setIsAuthModalOpen } = useAuth();

  const requireAuth = (action: () => void) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    action();
  };

  return requireAuth;
}

export default useRequireAuth;
