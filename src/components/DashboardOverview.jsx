import { Users, DollarSign, Calendar, TrendingUp, Plus, Clock, MapPin } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Button } from './ui/Button';

const DashboardOverview = () => {

    const stats = [
        {
        title: "Total Members",
        value: "324",
        change: "+12 this month",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-100"
        },
        {
        title: "Monthly Donations",
        value: "$18,450",
        change: "+8.2% from last month",
        icon: DollarSign,
        color: "text-green-600",
        bgColor: "bg-green-100"
        },
        {
        title: "Upcoming Events",
        value: "8",
        change: "This month",
        icon: Calendar,
        color: "text-purple-600",
        bgColor: "bg-purple-100"
        },
        {
        title: "Growth Rate",
        value: "4.2%",
        change: "Year over year",
        icon: TrendingUp,
        color: "text-orange-600",
        bgColor: "bg-orange-100"
        }
    ]

    const recentActivities = [
    { type: "member", action: "New member registered", name: "Sarah Johnson", time: "2 hours ago" },
    { type: "donation", action: "Donation received", name: "$500 from Mark Davis", time: "5 hours ago" },
    { type: "event", action: "Event created", name: "Youth Bible Study", time: "1 day ago" },
    { type: "member", action: "Member updated profile", name: "Emily Chen", time: "2 days ago" }
  ];

  const upcomingEvents = [
    { name: "Sunday Service", date: "Dec 24", time: "10:00 AM", location: "Main Sanctuary" },
    { name: "Youth Group Meeting", date: "Dec 26", time: "6:00 PM", location: "Youth Room" },
    { name: "Bible Study", date: "Dec 28", time: "7:00 PM", location: "Conference Room" }
  ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Statistics Cards */}
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-medium text-gray-600">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                    Recent Activity
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'member' ? 'bg-blue-500' :
                            activity.type === 'donation' ? 'bg-green-500' : 'bg-purple-500'
                            }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.name}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                    Upcoming Events
                    <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Event
                    </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{event.name}</p>
                            <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.date} at {event.time}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardOverview;