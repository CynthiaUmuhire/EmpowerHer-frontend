// tests/profile.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '@/pages/profile';
import useUserInfo from '@/hooks/useUserInfo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock useUserInfo hook
jest.mock('@/hooks/useUserInfo');
jest.mock('@/config', () => ({
    BACKEND_URL: 'http://localhost:4000',
    ADMIN_API_TOKEN: 'mock_token',
}));

const mockedUseUserInfo = useUserInfo as jest.MockedFunction<typeof useUserInfo>;

const fakeUser = {
    id: 1,
    username: 'Jane Doe',
    firstName: 'Jane',
    lastName: 'Doe',
    shotBio: 'Bio here',
    email: 'jane@example.com',
    phoneNumber: '1234567890',
    age: '30',
    profilePicture: undefined,
    registrations: [],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    role: 'user',
    documentId: 'doc123'
};

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

function renderWithQueryClient(ui: React.ReactElement) {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
}

describe('Profile Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('renders loading spinner when loading', () => {
        mockedUseUserInfo.mockReturnValue({
            user: {
                id: 0,
                username: '',
                email: '',
                phoneNumber: '',
                createdAt: '',
                updatedAt: '',
                role: '',
                documentId: '',
                firstName: '',
                lastName: ''
            }, isLoading: true
        });
        renderWithQueryClient(<Profile />);
        expect(screen.getByRole('status')).toBeInTheDocument(); // Assuming Spinner has role="status"
    });

    it('renders user info when loaded', () => {

        mockedUseUserInfo.mockReturnValue({ user: fakeUser, isLoading: false });

        renderWithQueryClient(<Profile />);
        expect(screen.getByText(/Names: Jane Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Bio here/i)).toBeInTheDocument();
        expect(screen.getByText(/Email: jane@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/Phone number: 1234567890/i)).toBeInTheDocument();
        expect(screen.getByText(/age: 30/i)).toBeInTheDocument();
    });

    it('shows "no current registrations" message if none', () => {
        const fakeUser = {
            id: 2,
            username: 'Jane Doe',
            firstName: 'Jane',
            lastName: 'Doe',
            shotBio: '',
            email: '',
            phoneNumber: '',
            age: '12',
            profilePicture: '',
            registrations: [],
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-02T00:00:00.000Z',
            role: 'user',
            documentId: 'doc456'
        };
        mockedUseUserInfo.mockReturnValue({ user: fakeUser, isLoading: false });

        renderWithQueryClient(<Profile />);
        expect(screen.getByText(/you have no current registrations/i)).toBeInTheDocument();
    });

    it('clears localStorage and navigates to login on logout button click', () => {
        mockedUseUserInfo.mockReturnValue({
            user: {
                id: 0,
                username: '',
                email: '',
                phoneNumber: '',
                createdAt: '',
                updatedAt: '',
                role: '',
                documentId: '',
                firstName: '',
                lastName: ''
            },
            isLoading: false
        });
        localStorage.setItem('token', 'abc');
        localStorage.setItem('userRole', 'role');
        localStorage.setItem('userId', '123');

        renderWithQueryClient(<Profile />);
        const logoutButton = screen.getByRole('button', { name: /log out/i });
        fireEvent.click(logoutButton);

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('userRole')).toBeNull();
        expect(localStorage.getItem('userId')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/auth/login', { replace: true });
    });
});
