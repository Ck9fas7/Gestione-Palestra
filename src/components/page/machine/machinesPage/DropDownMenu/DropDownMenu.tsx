"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { QMultiple } from "./QMultiple"
import { ListFilterPlus } from 'lucide-react';

interface ContextPopoverProps {
  getData: (data: FormDataEntryValue[]) => void,
  list:{value:string}[]
}

export function FilterPopover({ getData, list}: ContextPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected]=React.useState<FormDataEntryValue[]>([])


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button className={"filter_div"}><ListFilterPlus/></Button>}>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="p-2"
      >
        <QMultiple
            brandList={list}
            getData={(data) => {
                setSelected(data)
                getData(data)
                setOpen(false) // chiude il popover dopo l'invio
            }}
            selected={selected}
        />
      </PopoverContent>
    </Popover>
  )
}
