import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import useGroups from '@/hooks/useGroups';
import Landing from '@/pages/landingPage';

// Mock useGroups hook
jest.mock('@/hooks/useGroups');
jest.mock('@/config', () => ({
    BACKEND_URL: 'http://localhost:4000',
    ADMIN_API_TOKEN: 'mock_token',
}));

const mockedUseGroups = useGroups as jest.MockedFunction<typeof useGroups>;

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Landing Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows loading spinner when loading groups', () => {
        mockedUseGroups.mockReturnValue({
            groups: [], isLoading: true,
            isError: false
        });

        renderWithRouter(<Landing />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('shows no groups message when groups are empty', () => {
        mockedUseGroups.mockReturnValue({
            groups: [], isLoading: false,
            isError: false
        });

        renderWithRouter(<Landing />);
        expect(screen.getByText(/there are no supporrt groups available now/i)).toBeInTheDocument();
    });

    it('renders groups when available', () => {
        const fakeGroups = [
            {
                name: 'Group 1',
                members: 10,
                description: 'Desc 1',
                district: 'District 1',
                id: 1,
                email: 'group1@example.com',
                isVerified: true,
                website: 'https://group1.com',
                assistantContact: '1234567890',
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-02T00:00:00Z',
                owner: 'owner1',
                image: 'group1.jpg',
                groupstatus: 'active',
                coverImage: 'cover1.jpg',
                documentId: 'doc1'
            },
            {
                name: 'Group 2',
                members: 20,
                description: 'Desc 2',
                district: 'District 2',
                id: 2,
                email: 'group2@example.com',
                isVerified: false,
                website: 'https://group2.com',
                assistantContact: '0987654321',
                createdAt: '2024-02-01T00:00:00Z',
                updatedAt: '2024-02-02T00:00:00Z',
                owner: 'owner2',
                image: 'group2.jpg',
                groupstatus: 'inactive',
                coverImage: 'cover2.jpg',
                documentId: 'doc2'
            },
        ];
        mockedUseGroups.mockReturnValue({
            groups: fakeGroups, isLoading: false,
            isError: false
        });

        renderWithRouter(<Landing />);
        expect(screen.getByText('Group 1')).toBeInTheDocument();
        expect(screen.getByText('Group 2')).toBeInTheDocument();
    });
});