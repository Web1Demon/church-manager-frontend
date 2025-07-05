import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Filter, Send } from "lucide-react";

const MemberFilters = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterWorkerCategory,
  onFilterWorkerCategoryChange,
  filteredMembers,
  selectedMembers,
  onSelectAll,
  onBulkEmail,
  workerCategories
}) => {
  return (
    <>
      {/* Search Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl shadow-sm text-lg"
            />
          </div>
        </div>
      </div>

      {/* Filter Section with Bulk Selection */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="select-all"
            checked={filteredMembers.length > 0 && selectedMembers.length === filteredMembers.length}
            onCheckedChange={onSelectAll}
          />
          <Label htmlFor="select-all" className="text-sm font-medium text-slate-700">
            Select All ({filteredMembers.length})
          </Label>
        </div>
        
        <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Select value={filterStatus} onValueChange={onFilterStatusChange}>
          <SelectTrigger className="w-48 bg-white border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterWorkerCategory} onValueChange={onFilterWorkerCategoryChange}>
          <SelectTrigger className="w-56 bg-white border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(workerCategories).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedMembers.length > 0 && (
          <Button 
            onClick={onBulkEmail}
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Bulk Email
          </Button>
        )}
      </div>
    </>
  );
};

export default MemberFilters;