import React, { useRef } from 'react';
import { Filter, Calendar, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EHInput from './EHInput';

interface FilteringCardProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    searchPlaceholder?: string;

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

    timeframes?: { value: string; label: string }[];
    selectedTimeframe?: string;
    onTimeframeChange?: (timeframe: string) => void;
    timeframeLabel?: string;

    additionalContent?: React.ReactNode;
}

const FilteringCard: React.FC<FilteringCardProps> = ({
    searchTerm,
    onSearchChange,
    searchPlaceholder = "Search...",

    categories,
    selectedCategory,
    onCategoryChange,
    categoryLabel = "Category",
    categoryIcon = <Filter className="w-4 h-4 mr-2" />,

    options,
    selectedOption,
    onOptionChange,
    optionLabel = "Options",
    optionIcon = <MapPin className="w-4 h-4 mr-2" />,

    additionalContent
}) => {
    const searchRef = useRef<HTMLInputElement>(null)

    return (
        <div className="bg-secondary-50 p-6 rounded-2xl shadow-sm border border-secondary-200 my-8">
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-center`}>
                {/* Search */}
                <div className="md:col-span-2">
                    <div>
                        <EHInput
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10 focus:ring-0"
                            label='Search by title'
                            ref={searchRef}
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div>
                    <label className=" text-sm font-medium text-primary mb-2">{categoryLabel}</label>
                    <Select value={selectedCategory} onValueChange={onCategoryChange}>
                        <SelectTrigger>
                            {categoryIcon}
                            <SelectValue placeholder={`All ${categoryLabel}s`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All {categoryLabel}s</SelectItem>
                            {categories.map((category, index) => (
                                <SelectItem key={index} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Options Filter */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">{optionLabel}</label>
                    <Select value={selectedOption} onValueChange={onOptionChange}>
                        <SelectTrigger>
                            {optionIcon}
                            <SelectValue placeholder={`All ${optionLabel}s`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All {optionLabel}s</SelectItem>
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

                {/* Additional Content */}
                {additionalContent && (
                    <div className="flex items-end">
                        {additionalContent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilteringCard;