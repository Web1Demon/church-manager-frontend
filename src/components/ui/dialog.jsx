import React from "react"
import { X } from "lucide-react"
import { createContext, useContext, useState } from "react";

function cn(...args) {
  return args.filter(Boolean).join(' ');
}

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

// Dialog Root
function Dialog({ open, onOpenChange, children, className, ...props }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog Content Container */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl mx-4 p-6">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 opacity-70 hover:opacity-100"
        >
        </button>
        
        {children}
      </div>
    </div>
  );
}

function DialogTrigger({ onClick, children, className }) {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
}

const DialogPortal = ({ children }) => <>{children}</>;

const DialogClose = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const DialogOverlay = ({ className, ...props }) => (
  <div 
    className={cn("fixed inset-0 bg-black/50", className)} 
    {...props} 
  />
);

const DialogContent = ({ className, children, ...props }) => (
  <div 
    className={cn("w-xl", className)} 
    {...props}
  >
    <div className="p-6">
      {children}
      <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100">
        <span className="sr-only">Close</span>
      </DialogClose>
    </div>
  </div>
);

const DialogHeader = ({ className, ...props }) => (
  <div 
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} 
    {...props} 
  />
);

const DialogFooter = ({ className, ...props }) => (
  <div 
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)} 
    {...props} 
  />
);

const DialogTitle = ({ className, ...props }) => (
  <h3 
    className={cn("text-lg font-semibold leading-none tracking-tight text-gray-900", className)} 
    {...props} 
  />
);

const DialogDescription = ({ className, ...props }) => (
  <p 
    className={cn("text-sm text-gray-600", className)} 
    {...props} 
  />
);

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};