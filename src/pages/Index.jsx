
import React, { useState } from 'react'
import { Plus, Church } from 'lucide-react'
import NavTabs from '../components/ui/tabs';
import DashboardOverview from '../components/DashboardOverview';
import MemberManagement from '../components/MemberManagement';
import Finance from '../components/Finance';
import Event from '../components/Event';

const Index = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "members":
        return <MemberManagement />;
      case "finance":
        return <Finance />;
      case "events":
        return <Event />;
      default:
        return <Dashboard />;
    }
  }


    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-10'>
         {/* Header */}
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
                <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                    <Church className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">ChurchConnect</h1>
                    <p className="text-sm text-gray-500">Management System</p>
                </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md border-none flex cursor-pointer">
                <Plus className="h-4 w-4 mr-2 mt-1" />
                Quick Add
                </button>
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