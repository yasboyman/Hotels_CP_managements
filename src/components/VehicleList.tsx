import React from 'react';
import { CheckCircleIcon, XCircleIcon, CalendarIcon } from 'lucide-react';
export const VehicleList = ({
  vehicles,
  updateVehiclePermit,
  events
}) => {
  const formatTime = isoString => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getEventBadgeColor = eventType => {
    const colors = {
      wedding: 'bg-pink-100 text-pink-800',
      conference: 'bg-purple-100 text-purple-800',
      hotel: 'bg-blue-100 text-blue-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[eventType] || colors.default;
  };
  const getEventDetails = eventId => {
    if (!events || !eventId) return null;
    return events.find(e => e.id === eventId);
  };
  return <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">License Plate</th>
            <th className="py-3 px-6 text-left">Vehicle</th>
            <th className="py-3 px-6 text-left">Event</th>
            <th className="py-3 px-6 text-left">Entry Time</th>
            <th className="py-3 px-6 text-left">Permit Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {vehicles.length > 0 ? vehicles.map(vehicle => {
          const eventDetails = getEventDetails(vehicle.eventId);
          return <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left font-medium">
                    {vehicle.licensePlate}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {vehicle.make} {vehicle.model}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {eventDetails ? <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center ${getEventBadgeColor(eventDetails.type)}`}>
                          <CalendarIcon size={12} className="mr-1" />
                          {eventDetails.name}
                        </span>
                      </div> : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {formatTime(vehicle.entryTime)}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className={`px-2 py-1 rounded-full text-xs ${vehicle.hasPermit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {vehicle.hasPermit ? 'Has Permit' : 'No Permit'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      {vehicle.hasPermit ? <button onClick={() => updateVehiclePermit(vehicle.id, false)} className="text-red-500 hover:text-red-700 mr-2" title="Remove permit">
                          <XCircleIcon size={18} />
                        </button> : <button onClick={() => updateVehiclePermit(vehicle.id, true)} className="text-green-500 hover:text-green-700 mr-2" title="Grant permit">
                          <CheckCircleIcon size={18} />
                        </button>}
                    </div>
                  </td>
                </tr>;
        }) : <tr>
              <td colSpan={6} className="py-4 text-center text-gray-500">
                No vehicles currently in the car park
              </td>
            </tr>}
        </tbody>
      </table>
    </div>;
};