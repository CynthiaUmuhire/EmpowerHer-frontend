import { strapiUrlQueryBuilder } from '../src/utils/strapiUrlQueryBuilder';

describe('strapiUrlQueryBuilder', () => {
    it('returns single populate param for one field', () => {
        expect(strapiUrlQueryBuilder('coverImage')).toBe('populate=coverImage');
    });

    it('returns multiple populate params for multiple fields', () => {
        expect(strapiUrlQueryBuilder('coverImage', 'members')).toBe('populate[0]=coverImage&populate[1]=members');
    });
}); 