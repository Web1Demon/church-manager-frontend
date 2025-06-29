import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tab";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar, Clock, MapPin, Users, Plus, Search, Filter, BarChart3, Share2, Download, Copy } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import EventAnalytics from "./EventAnalytics";
import EventCalendarView from "./EventCalendarView";
import AdvancedEventFilters from "./AdvancedEventFilters";
import AttendeeManagement from "./AttendeeManagement";
import PageTitle from "./PageTitle";

const EventManagement = () => {
  const { toast } = useToast();
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isAttendeeManagementOpen, setIsAttendeeManagementOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);

  const upcomingEvents = [
    {
      id: 1,
      title: "Christmas Eve Service",
      description: "Special Christmas Eve worship service with candlelight and carols",
      date: "Dec 24, 2023",
      time: "7:00 PM",
      location: "Main Sanctuary",
      capacity: 300,
      registered: 245,
      status: "Open",
      category: "Worship"
    },
    {
      id: 2,
      title: "Youth New Year Retreat",
      description: "3-day retreat for youth ages 13-18 with activities and worship",
      date: "Dec 29, 2023",
      time: "6:00 PM",
      location: "Mountain View Camp",
      capacity: 50,
      registered: 42,
      status: "Open",
      category: "Youth"
    },
    {
      id: 3,
      title: "New Members Class",
      description: "Introduction class for new church members",
      date: "Jan 7, 2024",
      time: "10:00 AM",
      location: "Conference Room A",
      capacity: 25,
      registered: 18,
      status: "Open",
      category: "Education"
    },
    {
      id: 4,
      title: "Women's Bible Study",
      description: "Weekly women's Bible study and fellowship",
      date: "Jan 10, 2024",
      time: "7:00 PM",
      location: "Fellowship Hall",
      capacity: 40,
      registered: 35,
      status: "Open",
      category: "Bible Study"
    }
  ];

  const pastEvents = [
    {
      id: 5,
      title: "Thanksgiving Dinner",
      description: "Community Thanksgiving dinner and fellowship",
      date: "Nov 23, 2023",
      time: "5:00 PM",
      location: "Fellowship Hall",
      capacity: 150,
      attended: 142,
      status: "Completed",
      category: "Community"
    },
    {
      id: 6,
      title: "Fall Festival",
      description: "Annual fall festival with games, food, and family fun",
      date: "Oct 28, 2023",
      time: "2:00 PM",
      location: "Church Grounds",
      capacity: 200,
      attended: 185,
      status: "Completed",
      category: "Community"
    }
  ];

  const allEvents = [...upcomingEvents, ...pastEvents];
  const eventsToDisplay = filteredEvents.length > 0 ? filteredEvents : upcomingEvents;

  const handleAddEvent = () => {
    toast({
      title: "Event Created",
      description: "New event has been successfully created and scheduled.",
    });
    setIsAddEventOpen(false);
  };

  const handleRSVP = (eventId) => {
    toast({
      title: "RSVP Confirmed",
      description: "Your RSVP has been recorded successfully.",
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  const handleFilterChange = (events, filters) => {
    setFilteredEvents(events);
  };

  const handleShareEvent = (event) => {
    navigator.clipboard.writeText(`Check out this event: ${event.title} on ${event.date} at ${event.time}. Location: ${event.location}`);
    toast({
      title: "Event Link Copied",
      description: "Event details have been copied to clipboard.",
    });
  };

  const handleExportEvents = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Date,Time,Location,Category,Registered,Capacity\n" +
      eventsToDisplay.map(event => 
        `"${event.title}","${event.date}","${event.time}","${event.location}","${event.category}",${event.registered || event.attended || 0},${event.capacity}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Events Exported",
      description: "Events have been exported to CSV file.",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <PageTitle 
            size="medium" 
            align="center" 
            className="mb-8"
            showUnderline
          >
            Event Management
          </PageTitle>
          <p className="text-theme-muted">Organize and manage church events</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>{showAnalytics ? 'Hide' : 'Show'} Analytics</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowCalendarView(!showCalendarView)}
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>{showCalendarView ? 'List' : 'Calendar'} View</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleExportEvents}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
            <DialogTrigger onClick={() => setIsAddEventOpen(true)}>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                <Plus className="h-4 w-4" />
                <span>Create Event</span>
              </Button>
            </DialogTrigger>
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogContent className="sm:max-w-[500px] md:min-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Create a new church event and set up registration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" placeholder="Event title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" placeholder="Event description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input id="time" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" placeholder="Event location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">
                    Capacity
                  </Label>
                  <Input id="capacity" type="number" placeholder="Max attendees" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent} className="bg-blue-600 hover:bg-blue-700">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <EventAnalytics events={allEvents} />
      )}

      {/* Advanced Filters */}
      <AdvancedEventFilters 
        events={upcomingEvents} 
        onFilterChange={handleFilterChange}
      />

      {/* Calendar View */}
      {showCalendarView ? (
        <EventCalendarView 
          events={upcomingEvents} 
          onEventClick={handleEventClick}
        />
      ) : (
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming" className="cursor-pointer">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past" className="cursor-pointer">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {eventsToDisplay.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShareEvent(event)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Badge className={`${
                          event.registered >= event.capacity ? 'bg-red-100 text-red-800' :
                          event.registered >= event.capacity * 0.8 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Registration</span>
                        <span>{Math.round((event.registered / event.capacity) * 100)}% full</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            event.registered >= event.capacity ? 'bg-red-500' :
                            event.registered >= event.capacity * 0.8 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        onClick={() => handleRSVP(event.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        disabled={event.registered >= event.capacity}
                      >
                        {event.registered >= event.capacity ? 'Full' : 'RSVP'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEventClick(event)}
                      >
                        Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsAttendeeManagementOpen(true);
                        }}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="opacity-90">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <Badge variant="secondary" className="w-fit">
                          {event.category}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="bg-gray-100 text-gray-600">
                        {event.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-600">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.attended}/{event.capacity} attended</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance</span>
                        <span>{Math.round((event.attended / event.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${(event.attended / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Event Details Dialog */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  {selectedEvent.title}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShareEvent(selectedEvent)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </DialogTitle>
                <DialogDescription>
                  {selectedEvent.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{selectedEvent.registered || selectedEvent.attended}/{selectedEvent.capacity}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Register Now
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsEventDetailsOpen(false);
                      setIsAttendeeManagementOpen(true);
                    }}
                  >
                    Manage Attendees
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Attendee Management Dialog */}
      <Dialog open={isAttendeeManagementOpen} onOpenChange={setIsAttendeeManagementOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[600px] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>Manage Attendees - {selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  View and manage event attendees and registrations.
                </DialogDescription>
              </DialogHeader>
              <AttendeeManagement event={selectedEvent} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventManagement;
