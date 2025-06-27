const RecentActivity = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
            <div className={`${activity.bgColor || 'bg-gray-100'} p-3 rounded-xl shadow-sm mr-4 group-hover:scale-110 transition-transform duration-200`}>
              <Icon className={`h-5 w-5 ${activity.color || 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">{activity.message}</p>
              <p className="text-xs text-gray-500 font-medium">{activity.time}</p>
            </div>
            <div className="text-gray-300 group-hover:text-gray-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivity;
