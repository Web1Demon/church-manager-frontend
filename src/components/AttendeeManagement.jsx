
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Users, Plus, Search, Mail, Phone, UserCheck, UserX } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const AttendeeManagement = ({ event }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddAttendeeOpen, setIsAddAttendeeOpen] = useState(false);

  // Mock attendee data
  const [attendees, setAttendees] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      avatar: "/placeholder.svg",
      status: "confirmed",
      registeredAt: "2023-12-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 234-5678",
      avatar: "/placeholder.svg",
      status: "pending",
      registeredAt: "2023-12-16"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "(555) 345-6789",
      avatar: "/placeholder.svg",
      status: "confirmed",
      registeredAt: "2023-12-17"
    },
    {
      id: 4,
      name: "Robert Wilson",
      email: "r.wilson@email.com",
      phone: "(555) 456-7890",
      avatar: "/placeholder.svg",
      status: "waitlist",
      registeredAt: "2023-12-18"
    }
  ]);

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmedCount = attendees.filter(a => a.status === 'confirmed').length;
  const pendingCount = attendees.filter(a => a.status === 'pending').length;
  const waitlistCount = attendees.filter(a => a.status === 'waitlist').length;

  const handleStatusChange = (attendeeId, newStatus) => {
    setAttendees(prev => prev.map(attendee =>
      attendee.id === attendeeId ? { ...attendee, status: newStatus } : attendee
    ));
    toast({
      title: "Status Updated",
      description: `Attendee status changed to ${newStatus}`,
    });
  };

  const handleAddAttendee = () => {
    // Mock add attendee functionality
    toast({
      title: "Attendee Added",
      description: "New attendee has been successfully registered",
    });
    setIsAddAttendeeOpen(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'waitlist': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Attendee Management</span>
            </CardTitle>
            <div className="flex space-x-4 mt-2">
              <span className="text-sm text-green-600">✓ {confirmedCount} Confirmed</span>
              <span className="text-sm text-yellow-600">⏳ {pendingCount} Pending</span>
              <span className="text-sm text-blue-600">📋 {waitlistCount} Waitlist</span>
            </div>
          </div>
          <Dialog open={isAddAttendeeOpen} onOpenChange={setIsAddAttendeeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Attendee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Attendee</DialogTitle>
                <DialogDescription>
                  Manually register a new attendee for this event.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddAttendeeOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAttendee} className="bg-blue-600 hover:bg-blue-700">
                    Add Attendee
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search attendees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Attendee List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAttendees.map((attendee) => (
            <div key={attendee.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={attendee.avatar} />
                  <AvatarFallback>{getInitials(attendee.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{attendee.name}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-4">
                    <span className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {attendee.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {attendee.phone}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Registered: {new Date(attendee.registeredAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(attendee.status)}>
                  {attendee.status}
                </Badge>
                <div className="flex space-x-1">
                  {attendee.status !== 'confirmed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(attendee.id, 'confirmed')}
                      className="h-8 w-8 p-0"
                    >
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(attendee.id, 'waitlist')}
                    className="h-8 w-8 p-0"
                  >
                    <UserX className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No attendees found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendeeManagement;
