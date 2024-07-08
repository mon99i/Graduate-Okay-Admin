import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from './pages/Login/Login';
import { Cookies } from 'react-cookie';

describe('Login Component', () => {
  let mock: MockAdapter;
  let cookies: Cookies;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    cookies = new Cookies();
  });

  afterEach(() => {
    mock.reset();
  });

  it('로그인 성공 테스트', async () => {
    mock.onPost('http://localhost:3000/admin/login').reply(200, {
      data: {
        loginId: 'testid',
        password: 'testpw',
        tokenInfo: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token'
        }
      }
    });

    render(<Login />);

    const loginInput = screen.getByPlaceholderText('아이디');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByText('로그인');

    fireEvent.change(loginInput, { target: { value: "testid" } });
    fireEvent.change(passwordInput, { target: { value: "testpw" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(localStorage.getItem('loginId')).toBe('test');
    });

    await waitFor(() => {
      expect(localStorage.getItem('password')).toBe('test');
    });

    await waitFor(() => {
      expect(localStorage.getItem('refreshToken')).toBe('mock-refresh-token');
    });

    await waitFor(() => {
      expect(localStorage.getItem('accessToken')).toBe('mock-access-token');
    });
  });

  it('로그인 실패 테스트', async () => {
    mock.onPost('http://localhost:3000/admin/login').reply(401, {
      error: 'Unauthorized',
      message: 'Invalid credentials'
    });

    render(<Login />);

    const loginInput = screen.getByPlaceholderText('아이디');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByText('로그인');

    fireEvent.change(loginInput, { target: { value: 'testf' } });
    fireEvent.change(passwordInput, { target: { value: 'testf' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage.textContent).toBe('올바른 아이디/비밀번호를 입력해주세요.');
      console.log("실패");
    });
  });
});
