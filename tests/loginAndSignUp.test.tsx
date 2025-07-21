import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginAndSignUp from '@/pages/loginAndSignUp';
import Links from '@/routes/Links';

jest.mock('@/components/ui/login', () => () => <div>Mocked Login</div>);
jest.mock('@/components/ui/signup', () => () => <div>Mocked Signup</div>);
jest.mock('lottie-react', () => () => <div>Lottie Animation</div>);

describe('LoginAndSignUp Component', () => {
    const renderWithRoute = (initialRoute = Links.auth.Login) => {
        render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <Routes>
                    <Route path={Links.auth.Login} element={<LoginAndSignUp />} />
                    <Route path={Links.auth.Register} element={<LoginAndSignUp />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('renders the Login component when on the login route', () => {
        renderWithRoute(Links.auth.Login);
        const loginLink = screen.getByRole('link', { name: /login/i });
        expect(loginLink).toHaveClass('text-secondary-400');
        expect(screen.getByText(/mocked login/i)).toBeInTheDocument();
    });

    it('renders the Signup component when on the register route', () => {
        renderWithRoute(Links.auth.Register);
        expect(screen.getByText(/mocked signup/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toHaveClass('text-secondary-400');
    });

    it('renders both nav links', () => {
        renderWithRoute(Links.auth.Login);
        const loginLink = screen.getByRole('link', { name: /login/i });
        const registerLink = screen.getByRole('link', { name: /register/i })
        expect(loginLink).toBeInTheDocument();
        expect(registerLink).toBeInTheDocument();
    });

    it('renders the Lottie animation', () => {
        renderWithRoute(Links.auth.Login);
        expect(screen.getByText(/lottie animation/i)).toBeInTheDocument();
    });
});
