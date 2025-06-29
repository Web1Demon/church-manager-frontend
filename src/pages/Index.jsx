import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import  NavTabs  from "../components/ui/tabs";
import { Users, Calendar, DollarSign, Plus, TrendingUp, Church, Settings, Search, Bell } from "lucide-react";
import MemberManagement from "../components/MemberManagement";
import FinanceTracking from "../components/FinanceTracking";
import EventManagement from "../components/EventManagement";
import DashboardOverview from "../components/DashboardOverview";
import DarkModeToggle from "../components/DarkModeToggle";
//import { useNavigate } from "react-router-dom";
  
const Index = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
  //  const navigate = useNavigate();

    const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "members":
        return <MemberManagement />;
      case "finance":
        return <FinanceTracking />;
      case "events":
        return <EventManagement />;
      default:
        return <Dashboard />;
    }
  }


    return (
       <div className="{Darktheme } ">
      {/* Premium Header */}
      <header className="bg-theme-primary text-theme-primary backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Brand Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-green-500 dark:to-emerald-600 rounded-2xl shadow-lg">
                  <Church className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  ChurchConnect
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Enterprise Management Platform</p>
              </div>
            </div>
            {/* Action Section */}
            <div className="flex items-center space-x-3">
              
              <Button
                variant="outline"
                size="icon"
                className="relative border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>

              <DarkModeToggle />

              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
              >
                <Settings className="h-4 w-4" />
              </Button>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white border-0 rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </div>
          </div>
        </div>
      </header>

        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <NavTabs value={activeTab}  onValueChange={setActiveTab}/>
            {renderContent()}
        </main>

    </div>

    )
}



export default Index;