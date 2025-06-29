import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Calendar, Filter, X, Search, MapPin, Users } from "lucide-react";

const AdvancedEventFilters = ({ onFilterChange, events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    location: '',
    capacity: '',
    dateRange: ''
  });

  const categories = [...new Set(events.map(event => event.category))];
  const locations = [...new Set(events.map(event => event.location))];
  const statuses = [...new Set(events.map(event => event.status))];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Apply filters
    let filteredEvents = events;
    
    if (newFilters.search) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }
    
    if (newFilters.category) {
      filteredEvents = filteredEvents.filter(event => event.category === newFilters.category);
    }
    
    if (newFilters.status) {
      filteredEvents = filteredEvents.filter(event => event.status === newFilters.status);
    }
    
    if (newFilters.location) {
      filteredEvents = filteredEvents.filter(event => event.location === newFilters.location);
    }
    
    if (newFilters.capacity) {
      const [min, max] = newFilters.capacity.split('-').map(Number);
      filteredEvents = filteredEvents.filter(event => {
        if (max) return event.capacity >= min && event.capacity <= max;
        return event.capacity >= min;
      });
    }

    onFilterChange(filteredEvents, newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      category: '',
      status: '',
      location: '',
      capacity: '',
      dateRange: ''
    };
    setFilters(emptyFilters);
    onFilterChange(events, emptyFilters);
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events by title or description..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Advanced Filters Dropdown */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4 space-y-4" align="end">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Capacity Range</label>
            <Select value={filters.capacity} onValueChange={(value) => handleFilterChange('capacity', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Capacity</SelectItem>
                <SelectItem value="0-50">Small (0-50)</SelectItem>
                <SelectItem value="51-150">Medium (51-150)</SelectItem>
                <SelectItem value="151-300">Large (151-300)</SelectItem>
                <SelectItem value="300">Extra Large (300+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activeFilterCount > 0 && (
            <Button onClick={clearFilters} variant="outline" size="sm" className="w-full">
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.category}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('category', '')}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.status}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('status', '')}
              />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {filters.location}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('location', '')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedEventFilters;
