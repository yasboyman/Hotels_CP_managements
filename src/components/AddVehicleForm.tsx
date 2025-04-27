import React, { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';

export const AddVehicleForm = ({
  onAddVehicle,
  events
}) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [personName, setPersonName] = useState('');
  const [vehicleType, setVehicleType] = useState('guest'); // 'guest' or 'event'
  const [eventId, setEventId] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!licensePlate || !personName) return;
    onAddVehicle({
      licensePlate,
      personName,
      eventId: vehicleType === 'event' ? eventId : null
    });
    // Reset form
    setLicensePlate('');
    setPersonName('');
    setVehicleType('guest');
    setEventId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="vehicleType">
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={vehicleType}
          onChange={e => setVehicleType(e.target.value)}
        >
          <option value="guest">Guest</option>
          <option value="event">Event</option>
        </select>
      </div>

      {vehicleType === 'event' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="event">
            Select Event
          </label>
          <select
            id="event"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={eventId}
            onChange={e => setEventId(e.target.value)}
            required={vehicleType === 'event'}
          >
            <option value="">Select an event...</option>
            {events &&
              events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} ({new Date(event.startDate).toLocaleDateString()} -{' '}
                  {new Date(event.endDate).toLocaleDateString()})
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="licensePlate">
          License Plate
        </label>
        <input
          type="text"
          id="licensePlate"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={licensePlate}
          onChange={e => setLicensePlate(e.target.value)}
          placeholder="e.g. ABC123"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="personName">
          Person Name
        </label>
        <input
          type="text"
          id="personName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={personName}
          onChange={e => setPersonName(e.target.value)}
          placeholder="e.g. John Smith"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
      >
        <PlusCircleIcon size={18} className="mr-1" />
        Add Vehicle
      </button>
    </form>
  );
};