import { useCallback, useMemo, useState } from 'react';
import * as mockApi from '../services/mockApi';
import { AuthContext } from './auth-context';

const STORAGE_KEY = 'demo_auth_session';

function readInitialSession() {
  const rawSession = localStorage.getItem(STORAGE_KEY);
  if (!rawSession) {
    return { user: null, token: '' };
  }

  try {
    const parsed = JSON.parse(rawSession);
    return {
      user: parsed.user || null,
      token: parsed.token || '',
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { user: null, token: '' };
  }
}

export function AuthProvider({ children }) {
  const initialSession = useMemo(() => readInitialSession(), []);
  const [user, setUser] = useState(initialSession.user);
  const [token, setToken] = useState(initialSession.token);
  const [isAuthLoading] = useState(false);

  function persistSession(nextUser, nextToken) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: nextUser,
        token: nextToken,
      })
    );
  }

  const login = useCallback(async (credentials) => {
    const response = await mockApi.login(credentials);
    setUser(response.user);
    setToken(response.token);
    persistSession(response.user, response.token);
    return response.user;
  }, []);

  const signup = useCallback(async (payload) => {
    const response = await mockApi.signup(payload);
    setUser(response.user);
    setToken(response.token);
    persistSession(response.user, response.token);
    return response.user;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken('');
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthLoading,
      isAuthenticated: Boolean(user && token),
      login,
      signup,
      logout,
    }),
    [user, token, isAuthLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
