import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

function cn(...args) {
  return args.filter(Boolean).join(' ');
}
// Core Select context (optional for state sharing if needed later)
const SelectContext = React.createContext();

 const Select = ({ children, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onChange, triggerRef }}>
      <div className="relative inline-block w-[30%]">{children}</div>
    </SelectContext.Provider>
  );
};

 const SelectTrigger = ({ placeholder = "Select...", className }) => {
  const { open, setOpen, value, triggerRef } = React.useContext(SelectContext);

  return (
    <button
      ref={triggerRef}
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50",
        className
      )}
    >
      <span className="truncate">{value || placeholder}</span>
      {open ? (
        <ChevronUp className="h-4 w-4 opacity-50" />
      ) : (
        <ChevronDown className="h-4 w-4 opacity-50" />
      )}
    </button>
  );
};

 const SelectContent = ({ children, className }) => {
  const { open } = React.useContext(SelectContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white text-popover-foreground shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

 const SelectItem = ({ value: itemValue, children, className }) => {
  const { value, onChange, setOpen } = React.useContext(SelectContext);

  const handleSelect = () => {
    onChange(itemValue);
    setOpen(false);
  };

  return (
    <button
      onClick={handleSelect}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent focus:outline-none",
        value === itemValue && "bg-accent text-accent-foreground",
        className
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {value === itemValue && <Check className="h-4 w-4" />}
      </span>
      {children}
    </button>
  );
};

 const SelectSeparator = ({ className }) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
);

 const SelectLabel = ({ children, className }) => (
  <div className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}>
    {children}
  </div>
);

 const SelectValue = ({ children }) => {
  const { value } = React.useContext(SelectContext);
  return <>{value || children}</>;
};


export {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectLabel,
    SelectValue,
    SelectContext
}