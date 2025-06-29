import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Users, Calendar, CheckCircle } from "lucide-react";

const EventAnalytics = ({ events }) => {
  const upcomingEvents = events.filter(event => event.status === 'Open');
  const pastEvents = events.filter(event => event.status === 'Completed');
  
  const categoryData = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count
  }));

  const attendanceData = pastEvents.map(event => ({
    name: event.title.substring(0, 10) + '...',
    attended: event.attended || 0,
    capacity: event.capacity
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const totalCapacity = upcomingEvents.reduce((sum, event) => sum + event.capacity, 0);
  const totalRegistered = upcomingEvents.reduce((sum, event) => sum + event.registered, 0);
  const averageAttendance = pastEvents.length > 0 
    ? Math.round(pastEvents.reduce((sum, event) => sum + (event.attended || 0), 0) / pastEvents.length)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Key Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{events.length}</div>
          <p className="text-xs text-muted-foreground">
            {upcomingEvents.length} upcoming
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRegistered}</div>
          <p className="text-xs text-muted-foreground">
            of {totalCapacity} capacity
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageAttendance}</div>
          <p className="text-xs text-muted-foreground">
            per event
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round((pastEvents.length / events.length) * 100)}%
          </div>
          <p className="text-xs text-muted-foreground">
            events completed
          </p>
        </CardContent>
      </Card>

      {/* Event Categories Chart */}
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Events by Category</CardTitle>
          <CardDescription>Distribution of events across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, count }) => `${category}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Attendance Comparison */}
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Attendance vs Capacity</CardTitle>
          <CardDescription>Recent event performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="capacity" fill="#E5E7EB" name="Capacity" />
              <Bar dataKey="attended" fill="#3B82F6" name="Attended" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventAnalytics;
