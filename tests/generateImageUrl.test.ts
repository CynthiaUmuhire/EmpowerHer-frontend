jest.mock('../src/config', () => ({
    BACKEND_URL: 'http://localhost:1337',
}));

import generateImageUrl from '../src/utils/generateImageUrl';

describe('generateImageUrl', () => {
    it('returns null if imagePath is null', () => {
        expect(generateImageUrl(null)).toBeNull();
    });

    it('returns the same URL if imagePath is already absolute', () => {
        expect(generateImageUrl('https://example.com/image.png')).toBe('https://example.com/image.png');
        expect(generateImageUrl('http://example.com/image.png')).toBe('http://example.com/image.png');
    });

    it('prepends BACKEND_URL for relative paths', () => {
        const path = '/uploads/image.png';
        expect(generateImageUrl(path)).toBe('http://localhost:1337/uploads/image.png');
    });
}); 