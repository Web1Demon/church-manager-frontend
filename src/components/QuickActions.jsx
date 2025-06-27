import { Plus, UserPlus, Calendar, DollarSign } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add New Member',
      description: 'Register a new church member',
      icon: UserPlus,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Create Event',
      description: 'Schedule a new church event',
      icon: Calendar,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Record Donation',
      description: 'Log a new donation',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Quick Entry',
      description: 'Add general information',
      icon: Plus,
      color: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="space-y-3">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            className={`w-full p-4 rounded-xl text-white text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${action.color} group`}
          >
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3 group-hover:bg-white/30 transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-base">{action.title}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;
