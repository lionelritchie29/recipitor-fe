import {
  Accessor,
  Component,
  JSXElement,
  createContext,
  createSignal,
  onMount,
  useContext,
} from 'solid-js';
import jwt_decode from 'jwt-decode';
import { AuthUser } from '../models/AuthUser';
import Cookies from 'js-cookie';

const AuthContext = createContext<{
  user: Accessor<AuthUser | null>;
  login: (token: string) => void;
  logout: () => void;
}>();

export const AuthProvider: Component<{ children: JSXElement }> = (props) => {
  const [user, setUser] = createSignal<AuthUser | null>(null);

  onMount(() => {
    const token = Cookies.get('user');

    if (token) {
      const decoded: { email: string; sub: number } = jwt_decode(token);
      const logged: AuthUser = {
        email: decoded.email,
        id: decoded.sub,
      };
      setUser(logged);
    }
  });

  const login = (token: string) => {
    const decoded: { email: string; sub: number } = jwt_decode(token);
    const logged: AuthUser = {
      email: decoded.email,
      id: decoded.sub,
    };
    Cookies.set('user', token, { expires: 1 });
    setUser(logged);
  };

  const logout = () => {
    Cookies.remove('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{props.children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
