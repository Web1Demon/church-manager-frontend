import * as React from "react"
function cn(...args) {
  return args.filter(Boolean).join(' ');
}
// Main tabs container component
const Tabs = ({ defaultValue, value, onValueChange, children, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "")
  
  const currentValue = value !== undefined ? value : activeTab
  
  const handleTabChange = (newValue) => {
    if (value === undefined) {
      setActiveTab(newValue)
    }
    if (onValueChange) {
      onValueChange(newValue)
    }
  }
  
  return (
    <div data-orientation="horizontal" {...props}>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { 
              activeTab: currentValue, 
              onTabChange: handleTabChange 
            })
          : child
      )}
    </div>
  )
}

// Tabs list container - holds all the tab triggers
const TabsList = React.forwardRef(({ className, children, activeTab, onTabChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-theme-primary  p-1 text-theme-muted",
        className
      )}
      {...props}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { 
              activeTab, 
              onTabChange 
            })
          : child
      )}
    </div>
  )
})
TabsList.displayName = "TabsList"

// Individual tab trigger button
const TabsTrigger = React.forwardRef(({ className, value, children, activeTab, onTabChange, disabled, ...props }, ref) => {
  const isActive = activeTab === value
  
  const handleClick = () => {
    if (!disabled && onTabChange) {
      onTabChange(value)
    }
  }
  
  const handleKeyDown = (e) => {
    if (!disabled && onTabChange && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onTabChange(value)
    }
  }
  
  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`content-${value}`}
      data-state={isActive ? "active" : "inactive"}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(

        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ",
        // Ring and focus styles
        "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Disabled state
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
TabsTrigger.displayName = "TabsTrigger"

// Tab content panel - shows when corresponding tab is active
const TabsContent = React.forwardRef(({ className, value, children, activeTab, ...props }, ref) => {
  const isActive = activeTab === value
  
  if (!isActive) return null
  
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`content-${value}`}
      aria-labelledby={`trigger-${value}`}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        // Base styling and spacing
        "mt-2 ring-offset-background",
        // Focus styles for accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }