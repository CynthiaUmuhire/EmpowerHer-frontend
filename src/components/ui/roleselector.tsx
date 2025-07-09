import React from 'react';
import CustomButton from './customButton';

interface RoleSelectorProps {
    setRole: React.Dispatch<React.SetStateAction<string | null>>;
    onContinue: () => void;
}

function RoleSelector({ setRole, onContinue }: RoleSelectorProps) {
    const handleRoleSelection = (role: string) => {
        setRole(role);
        onContinue();
    };
    return (
        <div className='flex flex-col w-full gap-6 items-center p-4 border rounded-lg shadow-md'>
            <h2 className="text-xl font-semibold text-secondary-500">Login as a:</h2>
            <CustomButton
                variant={'outline'}
                onClick={() => handleRoleSelection('mother')}
                className="mt-4"
            >
                Mother
            </CustomButton>
            <CustomButton
                variant={'outline'}
                onClick={() => handleRoleSelection('facilitator')}
                className="mt-4"
            >
                Facilitator
            </CustomButton>
        </div>
    );
}

export default RoleSelector;