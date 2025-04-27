import React from 'react';
import { ArrowDownLeftIcon, ArrowUpRightIcon, XIcon } from 'lucide-react';
export const ActivitySidebar = ({
  isOpen,
  onClose,
  activities
}) => {
  const formatTime = isoString => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XIcon size={20} />
        </button>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto" style={{
      height: 'calc(100vh - 64px)'
    }}>
        {activities.length > 0 ? activities.map(activity => <div key={activity.id} className="flex items-center p-3 border-l-4 bg-gray-50 rounded-r-md" style={{
        borderLeftColor: activity.action === 'entry' ? '#4ade80' : '#f87171'
      }}>
              <div className="mr-3">
                {activity.action === 'entry' ? <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <ArrowDownLeftIcon size={16} />
                  </div> : <div className="p-2 bg-red-100 rounded-full text-red-600">
                    <ArrowUpRightIcon size={16} />
                  </div>}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {activity.licensePlate}
                  <span className="font-normal text-gray-600">
                    {' '}
                    {activity.action === 'entry' ? 'entered' : 'exited'}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>) : <div className="text-center py-4 text-gray-500">
            No recent activity
          </div>}
      </div>
    </div>;
};