
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useJoinGroup from '@/hooks/useJoinGroup';
import { useState } from 'react';
import CustomButton from './customButton';

interface RequestToJoinFormProps {
    groupId: string;
}

const formSchema = z.object({
    notes: z.string().max(500).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export function RequestToJoinForm({ groupId }: RequestToJoinFormProps) {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const handleJoin = () => {
        setShowRegistrationForm(true);

    };
    const onClose = () => {
        setShowRegistrationForm(false);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const { createRegistrationMutation, isPending } = useJoinGroup({ groupId, onClose });

    const onSubmit = (data: FormValues) => {
        createRegistrationMutation(data);
    };

    return (
        <>
            <CustomButton onClick={handleJoin} className="w-full">
                Join This Group
            </CustomButton>

            {showRegistrationForm && (

                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Request to Join Group</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">
                                    Notes (optional):
                                </label>
                                <textarea
                                    id="notes"
                                    {...register('notes')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows={4}
                                    placeholder="Tell us why you want to join this group..."
                                ></textarea>
                                {errors.notes && <p className="text-red-500 text-xs italic">{errors.notes.message}</p>}
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isPending}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {isSubmitting || isPending ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}