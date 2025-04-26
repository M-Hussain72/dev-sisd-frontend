import { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

interface token {
  access: {
    token: string;
  };
  refresh: {
    token: string;
  };
}

export function getAuthToken(): token | null {
  const tokenStr = localStorage.getItem('token');
  if (tokenStr) {
    const token = JSON.parse(tokenStr);
    return token;
  }
  if (tokenStr === undefined) localStorage.removeItem('token');

  return null;
}

export function setAuthToken(tokens: AxiosResponse) {
  localStorage.removeItem('token');
  localStorage.setItem('token', JSON.stringify(tokens));
}

export function getUserId() {
  const token = getAuthToken();
  if (!token) {
    console.log('from get user token not found');
    return '';
  }
  console.log(token);
  const decoded = jwtDecode(token.refresh.token);
  console.log(decoded);
  return decoded.sub;
}
