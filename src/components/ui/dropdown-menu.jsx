import React, { useState } from "react"
import { Check, ChevronRight, Circle } from "lucide-react"

function cn(...args) {
  return args.filter(Boolean).join(' ');
}
const DropdownMenu = ({ children, className, ...props }) => {
  return (
    <div className={cn("relative inline-block text-left", className)} {...props}>
      {children}
    </div>
  )
}

const DropdownMenuTrigger = ({ children, onClick, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
)

const DropdownMenuContent = ({ children, className, sideOffset = 4, open }) =>
  open ? (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      style={{ top: sideOffset }}
    >
      {children}
    </div>
  ) : null

const DropdownMenuItem = ({ children, onClick, inset, className, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      disabled && "pointer-events-none opacity-50",
      className
    )}
  >
    {children}
  </button>
)

const DropdownMenuCheckboxItem = ({ children, checked, onClick, className }) => (
  <button
    onClick={onClick}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className
    )}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <Check className="h-4 w-4" />}
    </span>
    {children}
  </button>
)

const DropdownMenuRadioItem = ({ children, selected, onClick, className }) => (
  <button
    onClick={onClick}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className
    )}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {selected && <Circle className="h-2 w-2 fill-current" />}
    </span>
    {children}
  </button>
)

const DropdownMenuLabel = ({ children, inset, className }) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}>
    {children}
  </div>
)

const DropdownMenuSeparator = ({ className }) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
)

const DropdownMenuShortcut = ({ children, className }) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)}>
    {children}
  </span>
)

const DropdownMenuGroup = ({ children }) => <div>{children}</div>

const DropdownMenuSub = ({ children, open, setOpen, className }) => (
  <div className={cn("relative", className)}>{children(open, setOpen)}</div>
)

const DropdownMenuSubTrigger = ({ children, onClick, inset, className }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent",
      inset && "pl-8",
      className
    )}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </button>
)

const DropdownMenuSubContent = ({ children, open, className }) =>
  open ? (
    <div
      className={cn(
        "absolute left-full top-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
        className
      )}
    >
      {children}
    </div>
  ) : null

const DropdownMenuRadioGroup = ({ children }) => <div>{children}</div>

// — Export everything
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
