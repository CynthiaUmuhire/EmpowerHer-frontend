import { useState } from "react";
import CustomButton from "./customButton";
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";
import { Calendar, Clock, MapPin } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import useJoinEvent from "@/hooks/useJoinEvent";
import Spinner from "./spinner";
import { toast } from "sonner";

export default function RsvpModal({ eventTitle, startDate, endDate, startTime, endTime, eventLocation, eventId, rsvpstatus }) {
    const [showModal, setShowModal] = useState(false)
    const [selectedRsvpOption, setSelectedRsvpOption] = useState('')
    const [reservationMessages, setReservationMessages] = useState('')

    const handleModalClosing = () => {
        setShowModal(false)
    }
    const { joinEventMutation, isPending, isSuccess, isError } = useJoinEvent({
        eventId,
        onClose: handleModalClosing
    });
    if (isSuccess) {
        toast.success(`You have successfuly sent a reservation response for event ${eventTitle} `)
    }

    if (isError) {
        toast.error(`An error happened when sending a reservation response for event ${eventTitle} `)
    }
    const rsvpOptions = [
        { label: "Maybe", value: "Maybe" },
        { label: "Reserve a spot", value: "Reserve" },
        { label: "Will not attend", value: "Decline" }
    ]

    const handleSetOption = (value) => {
        setSelectedRsvpOption(value)
    }

    const handleConfirmReservation = () => {
        if (!selectedRsvpOption) {
            setReservationMessages('You need to choose at least one option')
            return
        }
        joinEventMutation({
            status: selectedRsvpOption
        })
    }

    return (
        <div>
            <CustomButton onClick={() => setShowModal(true)} variant={rsvpstatus ? 'outline' : 'default'}>
                {rsvpstatus && 'Change Reservation'
                }
                {!rsvpstatus && 'RSVP'}
            </CustomButton>
            <div>
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent className="bg-secondary-50">
                        <DialogHeader>
                            <DialogTitle>Confirm RSVP</DialogTitle>
                            <DialogDescription>
                                {!rsvpstatus && 'Are you sure you want to RSVP for this event?'}
                                {rsvpstatus && (
                                    <>
                                        Are you sure you want to change your reservation from{" "}
                                        <span className="font-bold text-secondary-800">
                                            {rsvpOptions.find(option => option.value === rsvpstatus)?.value}
                                        </span>
                                        ?
                                    </>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="p-4 bg-secondary-100 rounded-lg">
                                <h4 className="font-semibold text-primary-800 mb-2">{eventTitle}</h4>
                                <div className="space-y-2 text-sm text-primary">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {startDate}{endDate && ` - ${endDate}`}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {startTime}{endTime && ` - ${endTime}`}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {eventLocation}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-base font-medium">Select your response:</label>
                            <RadioGroup value={selectedRsvpOption} onValueChange={handleSetOption} >
                                {rsvpOptions.map((option) => {
                                    if (rsvpstatus !== option.value) {
                                        return <div key={option.value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.value} id={option.value} />
                                            <label htmlFor={option.value} className="cursor-pointer">
                                                {option.label}
                                            </label>
                                        </div>
                                    }
                                }
                                )}
                            </RadioGroup>
                        </div>
                        {reservationMessages && <span className="text-warning-400">{reservationMessages}</span>}
                        <div>
                            <CustomButton onClick={handleConfirmReservation}>
                                {!isPending && 'Confirm Reservation'}
                                {isPending && <Spinner />}
                            </CustomButton>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    )
}