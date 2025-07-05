import { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Users, Send } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import BulkEmailModal from "./BulkEmailModel";
import MemberCard from "./MemberCard";
import AddMemberDialog from "./AddMemberDialog";
import EditMemberDialog from "./EditMemberDialog";
import MemberFilters from "./MemberFilters";
import MemberStats from "./MemberStats";
import axios from "axios";

const MemberManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterWorkerCategory, setFilterWorkerCategory] = useState("all");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [workerCategories, setWorkerCategories] = useState({});
  const [isBulkEmailOpen, setIsBulkEmailOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


  const fetchMembers = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/members");
        setMembers(response.data);
      } catch (error) {
        toast({
          title: "Failed to fetch members",
          description: "Could not load member list. Please try again later.",
          variant: "destructive",
        });
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }

  };

  const fetchWorkerCategories = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/worker-categories");
    setWorkerCategories({
      all: "All Categories",  // inject the default 'all' option here
      ...response.data
    });
  } catch (error) {
    toast({
      title: "Failed to fetch worker categories",
      description: "Could not load worker categories. Please try again later.",
      variant: "destructive",
    });
    console.error("Error fetching worker categories:", error);
  }
};

useEffect(() => {
  fetchMembers();
  fetchWorkerCategories();
}, []);



const filteredMembers = useMemo(() => {
  return (members || []).filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || member.status.toLowerCase() === filterStatus;
    const matchesWorkerCategory = filterWorkerCategory === "all" || member.workerCategory === filterWorkerCategory;
    return matchesSearch && matchesStatus && matchesWorkerCategory;
  });
}, [members, debouncedSearchTerm, filterStatus, filterWorkerCategory]);

useEffect(() => {
  setCurrentPage(1);
}, [debouncedSearchTerm, filterStatus, filterWorkerCategory]);

if (loading) {
  return <div>Loading...</div>;
}

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);


  const handleSelectMember = (member, checked) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, member]);
    } else {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMembers(filteredMembers);
    } else {
      setSelectedMembers([]);
    }
  };

  const handleBulkEmail = () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No Members Selected",
        description: "Please select at least one member to send bulk email.",
        variant: "destructive",
      });
      return;
    }
    setIsBulkEmailOpen(true);
  };

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
    toast({
      title: "Member Added Successfully",
      description: "New member has been added to your church community.",
    });
    setIsAddMemberOpen(false);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setIsEditMemberOpen(true);
  };

  const handleUpdateMember = () => {
    setMembers(members.map(member => 
      member.id === editingMember.id ? editingMember : member
    ));
    toast({
      title: "Member Updated",
      description: "Member information has been updated successfully.",
    });
    setIsEditMemberOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast({
      title: "Member Removed",
      description: "Member has been removed from the church directory.",
      variant: "destructive",
    });
  };

  const handleContactMember = (member, type) => {
    switch (type) {
      case 'email':
        window.open(`mailto:${member.email}`);
        break;
      case 'phone':
        window.open(`tel:${member.phone}`);
        break;
      case 'message':
        toast({
          title: "Message Feature",
          description: "Messaging feature would open here in a full implementation.",
        });
        break;
    }
  };

  const handleViewDetails = (member) => {
    toast({
      title: "Member Details",
      description: `Viewing detailed profile for ${member.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Member Directory
            </h1>
            <p className="text-slate-600 text-lg">Manage and connect with your church community</p>
          </div>
          
          <div className="flex gap-3">
            {selectedMembers.length > 0 && (
              <Button 
                onClick={handleBulkEmail}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl"
              >
                <Send className="h-5 w-5 mr-2" />
                Bulk Email ({selectedMembers.length})
              </Button>
            )}
            <AddMemberDialog
              isOpen={isAddMemberOpen}
              onOpenChange={setIsAddMemberOpen}
              onAddMember={handleAddMember}
            />
          </div>
        </div>

        {/* Edit Member Dialog */}
        <EditMemberDialog
          isOpen={isEditMemberOpen}
          onOpenChange={setIsEditMemberOpen}
          member={editingMember}
          onUpdateMember={handleUpdateMember}
          onMemberChange={setEditingMember}
        />

        {/* Search and Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <MemberFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              filterWorkerCategory={filterWorkerCategory}
              onFilterWorkerCategoryChange={setFilterWorkerCategory}
              filteredMembers={filteredMembers}
              selectedMembers={selectedMembers}
              onSelectAll={handleSelectAll}
              onBulkEmail={handleBulkEmail}
              workerCategories={workerCategories}
            />
          </div>
          
          <MemberStats
            memberCount={filteredMembers.length}
            filterWorkerCategory={filterWorkerCategory}
          />
        </div>

        {/* Modern Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              isSelected={selectedMembers.some(m => m.id === member.id)}
              onSelect={handleSelectMember}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
              onContact={handleContactMember}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
          <div className={`${currentMembers.length > 0 ? 'flex justify-center space-x-4 mt-8' : 'hidden'}`}>
            <Button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="text-slate-600">Page {currentPage} of {totalPages}</span>
            <Button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>



        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No members found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Bulk Email Modal */}
        <BulkEmailModal
          isOpen={isBulkEmailOpen}
          onClose={() => setIsBulkEmailOpen(false)}
          members={members}
          selectedMembers={selectedMembers}
          workerCategories={workerCategories}
        />
      </div>
    </div>
  );
};

export default MemberManagement;
