
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useJoinGroup from '@/hooks/useJoinGroup';
import { useState } from 'react';
import CustomButton from './customButton';
import { Dialog, DialogHeader, DialogTitle, DialogContent } from './dialog';


interface RequestToJoinFormProps {
    groupId: string;
}

const formSchema = z.object({
    notes: z.string().max(500).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export function RequestToJoinForm({ groupId }: RequestToJoinFormProps) {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    const onClose = () => {
        setShowRegistrationForm(false);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const { createRegistrationMutation, isPending } = useJoinGroup({ groupId, onClose });

    const onSubmit = (data: FormValues) => {
        if (!errors.notes) {
            createRegistrationMutation(data);
        }
    };

    return (
        <div>
            <CustomButton onClick={() => setShowRegistrationForm(true)}>
                Join This Group
            </CustomButton>
            <div>
                <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
                    <DialogContent className='bg-secondary-50'>
                        <DialogHeader>
                            <DialogTitle>Request to Join Group</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
                                />
                                {errors.notes && <p className="text-red-500 text-xs italic">{errors.notes.message}</p>}
                            </div>
                            <div className="flex justify-end gap-3">
                                <CustomButton
                                    variant={'destructive'}
                                    onClick={onClose}
                                >
                                    Cancel
                                </CustomButton>
                                <CustomButton
                                    variant={'secondary'}
                                    disabled={isSubmitting || isPending}
                                >
                                    {isSubmitting || isPending ? 'Submitting...' : 'Submit Request'}
                                </CustomButton>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}