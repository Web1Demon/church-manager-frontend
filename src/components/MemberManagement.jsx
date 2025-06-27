import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent,  DialogDescription, DialogHeader, DialogProvider, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Search, Plus, Mail, Phone, MapPin, Users, Filter, MoreHorizontal, Edit, Trash2, UserPlus, Eye, MessageCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const MemberManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
   // const [isOpen, setIsOpen] = useState(false);

  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, ST 12345",
      joinDate: "Jan 2023",
      groups: ["Choir", "Bible Study"],
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Anytown, ST 12345",
      joinDate: "Mar 2023",
      groups: ["Youth Group", "Volunteer Team"],
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Davis",
      email: "m.davis@email.com",
      phone: "(555) 456-7890",
      address: "789 Pine St, Anytown, ST 12345",
      joinDate: "Dec 2022",
      groups: ["Men's Ministry"],
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      phone: "(555) 321-0987",
      address: "321 Elm St, Anytown, ST 12345",
      joinDate: "Jun 2023",
      groups: ["Women's Ministry", "Prayer Team"],
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || member.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddMember = () => {
    // toast({
    //   title: "Member Added Successfully",
    //   description: "New member has been added to your church community.",
    // });
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Member Directory
            </h1>
            <p className="text-slate-600 text-lg">Manage and connect with your church community</p>
          </div>
          
            <DialogTrigger onClick={() => setIsAddMemberOpen(true)} className="bg-gradient-to-r  from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl">
              <div role="button" tabIndex={0} className="flex items-center cursor-pointer">
                <UserPlus className="h-5 w-5 mr-2" />
                Add New Member
              </div>
            </DialogTrigger>
          <Dialog  open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} >
              <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-bold text-slate-800">Add New Member</DialogTitle>
                <DialogDescription className="text-slate-600">
                  Welcome a new member to your church community. Fill in their details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                  <Input id="email" type="email" placeholder="member@example.com" className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                  <Input id="phone" placeholder="(555) 123-4567" className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group" className="text-slate-700 font-medium">Ministry Group</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20">
                      <SelectValue placeholder="Select a ministry group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="choir">Choir Ministry</SelectItem>
                      <SelectItem value="youth">Youth Group</SelectItem>
                      <SelectItem value="bible-study">Bible Study</SelectItem>
                      <SelectItem value="volunteer">Volunteer Team</SelectItem>
                      <SelectItem value="prayer">Prayer Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)} className="px-6">
                  Cancel
                </Button>
                <Button onClick={handleAddMember} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6">
                  Add Member
                </Button>
              </div>
            </DialogContent>
            </Dialog>
        </div>

        {/* Edit Member Dialog */}
        <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-bold text-slate-800">Edit Member</DialogTitle>
              <DialogDescription className="text-slate-600">
                Update member information below.
              </DialogDescription>
            </DialogHeader>
            {editingMember && (
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-slate-700 font-medium">Full Name</Label>
                  <Input 
                    id="edit-name" 
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email" className="text-slate-700 font-medium">Email Address</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone" className="text-slate-700 font-medium">Phone Number</Label>
                  <Input 
                    id="edit-phone" 
                    value={editingMember.phone}
                    onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address" className="text-slate-700 font-medium">Address</Label>
                  <Input 
                    id="edit-address" 
                    value={editingMember.address}
                    onChange={(e) => setEditingMember({...editingMember, address: e.target.value})}
                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" 
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditMemberOpen(false)} className="px-6">
                Cancel
              </Button>
              <Button onClick={handleUpdateMember} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6">
                Update Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modern Search and Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search members by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl shadow-sm text-lg"
              />
            </div>
          </div>
          
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 text-white shadow-lg">
            <CardContent className="p-">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{members.length}</p>
                  <p className="text-blue-100">Active Members</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-white border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Modern Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="group bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
              <CardHeader className="pb-4 relative">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div role="button" tabIndex={0} variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleViewDetails(member)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleContactMember(member, 'email')}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleContactMember(member, 'phone')}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Member
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleContactMember(member, 'message')}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Member</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {member.name} from the church directory? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteMember(member.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                    <AvatarImage src={member.avatar} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-semibold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl font-bold text-slate-800 truncate">{member.name}</CardTitle>
                    <CardDescription className="text-slate-500 mt-1">
                      Member since {member.joinDate}
                    </CardDescription>
                    <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                      {member.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">{member.phone}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{member.address}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium text-slate-700 mb-3">Ministry Groups</p>
                  <div className="flex flex-wrap gap-2">
                    {member.groups.map((group, index) => (
                      <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
                    onClick={() => handleEditMember(member)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div role="button" tabIndex={0} variant="outline" size="sm" className="hover:bg-slate-50">
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleViewDetails(member)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleContactMember(member, 'email')}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleContactMember(member, 'phone')}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No members found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberManagement;
