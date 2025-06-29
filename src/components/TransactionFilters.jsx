import { useState, useRef, useEffect } from "react";
import { Filter, X, ChevronDown } from "lucide-react";

const TransactionFilters = ({ 
  onFilterChange, 
  availableMonths, 
  availableYears, 
  availableCategories, 
  currentFilters 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenSelect(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (type, value) => {
    const newFilters = { ...currentFilters };
    if (value === "all") {
      delete newFilters[type];
    } else {
      newFilters[type] = value;
    }
    onFilterChange(newFilters);
    setOpenSelect(null);
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(currentFilters).length > 0;

  const CustomSelect = ({ value, onValueChange, placeholder, options, selectKey }) => {
    const isSelectOpen = openSelect === selectKey;
    
    const handleToggle = (e) => {
      e.stopPropagation();
      setOpenSelect(isSelectOpen ? null : selectKey);
    };

    const handleSelect = (optionValue) => {
      onValueChange(optionValue);
    };

    const getDisplayValue = () => {
      if (value === "all" || !value) {
        const option = options.find(opt => opt.value === "all");
        return option ? option.label : placeholder;
      }
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
    };

    return (
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          <span className="truncate">{getDisplayValue()}</span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isSelectOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="max-h-60 overflow-auto p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-50 focus:text-blue-900 focus:outline-none ${
                    value === option.value ? 'bg-blue-100 text-blue-900 font-medium' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const monthOptions = [
    { value: "all", label: "All Months" },
    ...availableMonths.map(month => ({ value: month, label: month }))
  ];

  const yearOptions = [
    { value: "all", label: "All Years" },
    ...availableYears.map(year => ({ value: year, label: year }))
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...availableCategories.map(category => ({ value: category, label: category }))
  ];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="inline-flex items-center justify-center rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
            {Object.keys(currentFilters).length}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <CustomSelect
                value={currentFilters.month || "all"}
                onValueChange={(value) => handleFilterChange("month", value)}
                placeholder="Select month"
                options={monthOptions}
                selectKey="month"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <CustomSelect
                value={currentFilters.year || "all"}
                onValueChange={(value) => handleFilterChange("year", value)}
                placeholder="Select year"
                options={yearOptions}
                selectKey="year"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <CustomSelect
                value={currentFilters.category || "all"}
                onValueChange={(value) => handleFilterChange("category", value)}
                placeholder="Select category"
                options={categoryOptions}
                selectKey="category"
              />
            </div>

            {hasActiveFilters && (
              <div className="pt-3 border-t border-gray-200">
                <button
                  onClick={clearAllFilters}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;

// Demo component to show the filter in action
