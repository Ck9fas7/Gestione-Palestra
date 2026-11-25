import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ArrowUpAZ,  ArrowDownAZ, ArrowDownUp } from 'lucide-react';

type SortOrder = "asc" | "desc" | "defult"

const options = [
    { value: "defult", label: "Ordine default", icon: ArrowDownUp},
    { value: "asc", label: "Ordine crescente", icon: ArrowDownAZ},
    { value: "desc", label: "Ordine decrescente", icon: ArrowUpAZ },
] as const

interface SortSelectProps {
  value: SortOrder
  onChange: (value: SortOrder) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as SortOrder)}
    >
      <SelectTrigger
        aria-label="Ordina"
        className="filter_div [&>svg]:hidden"
      >
        <SelectValue>
          {(current: SortOrder) => {
            const Icon =
              options.find((o) => o.value === current)?.icon ?? options[0].icon
            return <Icon className="size-5" />
          }}
        </SelectValue>
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false} className="w-10 min-w-0 p-2">
        {options.map(({ value, label, icon: Icon }) => (
          <SelectItem
            key={value}
            value={value}
            aria-label={label}
            title={label}
            className="justify-center p-0 h-8 data-[selected]:bg-accent [&>span:last-child]:hidden"
          >
            <Icon className="size-5" />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortSelect