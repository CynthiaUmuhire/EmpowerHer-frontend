import React from 'react';
import { Filter, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EHInput from './EHInput';
interface FilteringCardProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    // searchRef: React.Ref<HTMLInputElement>

    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categoryLabel?: string;
    categoryIcon?: React.ReactNode;

    options: string[] | { value: string; label: string }[];
    selectedOption: string;
    onOptionChange: (option: string) => void;
    optionLabel?: string;
    optionIcon?: React.ReactNode;

    handleOnClick: () => any[] | void
}

const FilteringCard: React.FC<FilteringCardProps> = ({
    searchTerm,
    onSearchChange,
    // searchRef,
    categoryLabel = "Categories",
    categories,
    selectedCategory,
    onCategoryChange,
    categoryIcon = <Filter className="w-4 h-4 mr-2" />,
    options,
    selectedOption,
    onOptionChange,
    optionLabel = "Options",
    optionIcon = <MapPin className="w-4 h-4 mr-2" />
}) => {
    const handleSearchInput = (e: { target: { value: string; }; }) => {

        onSearchChange(e.target.value)
    }
    return (
        <div className="bg-secondary-50 p-6 rounded-2xl shadow-sm border border-secondary-200 my-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
                {/* Search */}
                <div className=''>
                    <EHInput
                        placeholder={'Search....'}
                        defaultValue={searchTerm}
                        onChange={handleSearchInput}
                    // ref={searchRef}
                    />
                </div>

                {/* Category Filter */}
                <div className='flex md:justify-center bg-secondary-50'>
                    <Select value={selectedCategory} onValueChange={onCategoryChange}>
                        <SelectTrigger>
                            {categoryIcon}
                            <SelectValue placeholder={categoryLabel} />
                        </SelectTrigger>
                        <SelectContent className='bg-secondary-50'>
                            <SelectItem value="all">{categoryLabel}</SelectItem>
                            {categories.map((category, index) => (
                                <SelectItem key={index} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Options Filter */}
                <div>
                    <Select value={selectedOption} onValueChange={onOptionChange}>
                        <SelectTrigger>
                            {optionIcon}
                            <SelectValue placeholder={optionLabel} />
                        </SelectTrigger>
                        <SelectContent className='bg-secondary-50'>
                            <SelectItem value="all">{optionLabel}</SelectItem>
                            {options.map(option => {
                                const value = typeof option === 'string' ? option : option.value;
                                const label = typeof option === 'string' ? option : option.label;
                                return (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className='flex md:justify-end'>
                    <CustomButton variant={'secondary'} onClick={handleOnClick}>
                        Filter
                    </CustomButton>
                </div> */}
            </div>
        </div>
    );
};

export default FilteringCard;