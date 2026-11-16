"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Link } from "react-router-dom"

type PropsDropdown = {
    onClick:()=>void
}

export function DropdownMenuAvatar({onClick}:PropsDropdown) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-transparent hover:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 aria-expanded:bg-transparent data-[state=open]:bg-transparent data-[popup-open]:bg-transparent hover:opacity-90 transition-opacity"
            >
                <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Button>
            }
        />
        <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem><Link to="/settings">Settings</Link></DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
                onClick();
            }}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

