"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import districtsGeo from '../../rwandaDistrict.json'


export default function CustomComboBox({ defaultDistrict, setDistrict }: { defaultDistrict?: string, setDistrict: (district: string) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultDistrict)
    const districts = districtsGeo.features.map(data => data.properties.NAME_2)

    const handleClose = (district: string) => {
        setDistrict(district)
        setOpen(false)
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between  bg-secondary-50 hover:bg-secondary-100/50 cursor-pointer"
                >
                    {value
                        ? districts.find((district) => district === value)
                        : "Select your district..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-secondary-50">
                <Command>
                    <CommandInput placeholder="Search district" className="h-9" />
                    <CommandList>
                        <CommandEmpty>No such district found.</CommandEmpty>
                        <CommandGroup className="overflow-y-scroll">
                            {districts.map((district) => (
                                <CommandItem
                                    key={district}
                                    value={district}
                                    className="cursor-pointer"
                                    onSelect={(currentValue) => {
                                        setValue(currentValue)
                                        handleClose(currentValue)
                                    }}
                                >
                                    {district}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === district ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
