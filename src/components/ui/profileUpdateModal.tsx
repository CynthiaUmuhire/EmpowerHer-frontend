import { User } from "@/types";
import { useState } from "react"
import CustomButton from "./customButton";
import { DialogHeader, DialogTitle, Dialog, DialogContent } from "./dialog";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EHInput from "./EHInput";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import { toast } from "sonner";
import Spinner from "./spinner";
export type ProfileUpdateModalProps = {
    userPrefilledData: User
}

const formSchema = z.object({
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    profilePicture: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    shotBio: z.string().optional(),
    district: z.string().optional(),
    age: z.string().optional()

})
type FormValues = z.infer<typeof formSchema>;
export default function ProfileUpdateModal({ userPrefilledData }: ProfileUpdateModalProps) {
    const [showForm, setShowForm] = useState<boolean>();
    const userData: User = userPrefilledData;
    const onClose = () => {
        setShowForm(false);
    };
    const { updateUserInfo, isPending, isUpdateSuccess, isError, resetUpdate } = useUpdateUserInfo()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })

    const handleUpdate = (data: FormValues) => {
        updateUserInfo({ ...data, id: userPrefilledData.id })

        if (isError) {
            toast.error("Registration failed. Please check your details and try again.");
            resetUpdate()
        }
        if (isUpdateSuccess) {
            toast.success('You have successfully updated your information')
            onClose()
        }
    }
    return (
        <div className="overflow-y-scroll">
            <CustomButton onClick={() => setShowForm(true)}>
                Edit profile
            </CustomButton>
            {showForm && (
                <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogContent className='bg-secondary-50 overflow-y-scroll'>
                        <DialogHeader>
                            <DialogTitle>
                                Edit profile
                            </DialogTitle>
                        </DialogHeader>
                        <form className="flex flex-col gap-4 " >
                            <EHInput placeholder={userData.firstName} value={userData.firstName} label={'First Name'} type='text' {...register('firstName')} />
                            {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
                            <EHInput placeholder={userData.lastName} value={userData.lastName} label={'Last Name'} type='text' {...register('lastName')} />
                            {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
                            <EHInput placeholder={userData.email} value={userData.email} label={'Email'} type='text' {...register('email')} />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                            <EHInput placeholder={userData.district} value={userData.district} label={'district'} type='text' {...register('district')} />
                            {errors.district && <p className="text-red-500 text-xs italic">{errors.district.message}</p>}
                            <EHInput placeholder={userData.age} value={userData.age} label={'Your age'} type='text' {...register('age')} />
                            {errors.age && <p className="text-red-500 text-xs italic">{errors.age.message}</p>}
                            <label className="flex flex-col ">
                                Bio
                                <textarea placeholder={userData.shotBio} value={userData.shotBio} {...register('shotBio')} className="border border-primary-100 rounded-md p-2 w-full focus:outline-secondary-200" />
                                {errors.shotBio && <p className="text-red-500 text-xs italic">{errors.shotBio.message}</p>}

                            </label>
                        </form>
                        <div>
                            <CustomButton onClick={handleSubmit(handleUpdate)}>
                                Save
                                {isPending || isSubmitting && <Spinner />}
                            </CustomButton>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}