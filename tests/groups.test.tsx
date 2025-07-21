import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import useGroups from '@/hooks/useGroups';
import useUserInfo from '@/hooks/useUserInfo';
import Groups from '@/pages/groups';

jest.mock('@/hooks/useGroups');
jest.mock('@/hooks/useUserInfo');

jest.mock('@/config', () => ({
    BACKEND_URL: 'http://localhost:4000',
    ADMIN_API_TOKEN: 'mock_token',
}));
jest.mock('@/components/ui/filteringCard');

const mockGroups = [
    {
        id: '1',
        name: 'Support Group A',
        description: 'Description A',
        members: ['m1', 'm2'],
        coverImage: 'coverA.jpg',
        district: 'Kigali',
        documentId: 'doc1'
    },
    {
        id: '2',
        name: 'Support Group B',
        description: 'Description B',
        members: ['m3'],
        coverImage: 'coverB.jpg',
        district: 'Musanze',
        documentId: 'doc2'
    }
];

const mockUser = {
    approvedRegistrations: [
        {
            group: {
                documentId: 'doc1'
            }
        }
    ]
};

describe('Groups Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useGroups as jest.Mock).mockReturnValue({
            groups: mockGroups,
            isLoading: false,
            isError: false,
        });

        (useUserInfo as jest.Mock).mockReturnValue({
            user: mockUser,
            isLoading: false,
        });
    });

    test('renders groups and header', () => {
        render(
            <MemoryRouter>
                <Groups />
            </MemoryRouter>
        );
        expect(screen.getByText(/Support groups/i)).toBeInTheDocument();
        expect(screen.getByText('Support Group A')).toBeInTheDocument();
        expect(screen.getByText('Support Group B')).toBeInTheDocument();
    });

    test('renders loading spinner', () => {
        (useGroups as jest.Mock).mockReturnValue({
            groups: [],
            isLoading: true,
            isError: false,
        });
        (useUserInfo as jest.Mock).mockReturnValue({
            user: null,
            isLoading: true,
        });

        render(<MemoryRouter>
            <Groups />
        </MemoryRouter>);
        expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
    });

    test('shows "No groups found" when empty', () => {
        (useGroups as jest.Mock).mockReturnValue({
            groups: [],
            isLoading: false,
            isError: false,
        });

        render(<MemoryRouter>
            <Groups />
        </MemoryRouter>);
        expect(screen.getByText(/No groups found/i)).toBeInTheDocument();
    });
});
