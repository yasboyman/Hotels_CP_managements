import React from 'react';
import { ArrowDownLeftIcon, ArrowUpRightIcon } from 'lucide-react';
export const RecentActivity = ({
  activities
}) => {
  const formatTime = isoString => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
                  {activity.action === 'entry' ? 'entered' : 'exited'} the car
                  park
                </span>
              </p>
              <p className="text-xs text-gray-500">
                {formatTime(activity.timestamp)}
              </p>
            </div>
          </div>) : <div className="text-center py-4 text-gray-500">No recent activity</div>}
    </div>;
};