import * as React from "react"
import { createPortal } from "react-dom"
import { buttonVariants } from "./Button";
function cn(...args) {
  return args.filter(Boolean).join(' ');
}

// Core Dialog Context
const AlertDialogContext = React.createContext(null)

const useDialog = () => {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error("AlertDialog components must be used within <AlertDialog>")
  return context
}

const AlertDialog = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

const AlertDialogTrigger = ({ children, ...props }) => {
  const { setOpen } = useDialog()
  return (
    <button {...props} onClick={() => setOpen(true)}>
      {children}
    </button>
  )
}

const AlertDialogPortal = ({ children }) => {
  if (typeof window === "undefined") return null
  return createPortal(children, document.body)
}

const AlertDialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { open, setOpen } = useDialog()

    if (!open) return null

    return (
      <AlertDialogPortal>
        <div
          ref={ref}
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 z-50 bg-black/80 animate-fade-in",
            className
          )}
          {...props}
        />
      </AlertDialogPortal>
    )
  }
)
AlertDialogOverlay.displayName = "AlertDialogOverlay"

const AlertDialogContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { open, setOpen } = useDialog()

    React.useEffect(() => {
      const handleKey = (e) => {
        if (e.key === "Escape") setOpen(false)
      }
      document.addEventListener("keydown", handleKey)
      return () => document.removeEventListener("keydown", handleKey)
    }, [setOpen])

    if (!open) return null

    return (
      <AlertDialogPortal>
        <div
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 grid gap-4 border bg-background p-6 shadow-lg animate-zoom-in sm:rounded-lg",
            className
          )}
          {...props}
        />
      </AlertDialogPortal>
    )
  }
)
AlertDialogContent.displayName = "AlertDialogContent"
const AlertDialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
)
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogAction = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { setOpen } = useDialog()
    return (
      <button
        ref={ref}
        className={cn(buttonVariants(), className)}
        onClick={() => setOpen(false)}
        {...props}
      />
    )
  }
)
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { setOpen } = useDialog()
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
        onClick={() => setOpen(false)}
        {...props}
      />
    )
  }
)
AlertDialogCancel.displayName = "AlertDialogCancel"
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
