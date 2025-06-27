import * as React from "react"
import { cva } from "class-variance-authority"
function cn(...args) {
  return args.filter(Boolean).join(' ');
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = ({ className, ...props }) => (
  <label className={cn(labelVariants(), className)} {...props} />
)

export { Label }
