import React, { useState } from 'react';
import { CalendarIcon, QrCodeIcon, UsersIcon, CarIcon } from 'lucide-react';
export const EventManagement = ({
  events,
  setEvents
}) => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'conference',
    startDate: '',
    endDate: '',
    expectedVehicles: '',
    description: ''
  });
  const handleAddEvent = e => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      ...newEvent,
      qrCodeUrl: '#' // Placeholder for QR code URL
    };
    setEvents([...events, event]);
    setShowAddEvent(false);
    setNewEvent({
      name: '',
      type: 'conference',
      startDate: '',
      endDate: '',
      expectedVehicles: '',
      description: ''
    });
  };
  return <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Event Management
            </h1>
            <p className="text-gray-600">
              Manage parking events and generate QR codes
            </p>
          </div>
          <button onClick={() => setShowAddEvent(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <CalendarIcon size={20} className="mr-2" />
            Add New Event
          </button>
        </div>
      </header>
      {showAddEvent && <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
          <form onSubmit={handleAddEvent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newEvent.name} onChange={e => setNewEvent({
              ...newEvent,
              name: e.target.value
            })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newEvent.type} onChange={e => setNewEvent({
              ...newEvent,
              type: e.target.value
            })}>
                  <option value="conference">Conference</option>
                  <option value="wedding">Wedding</option>
                  <option value="hotel">Hotel Stay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newEvent.startDate} onChange={e => setNewEvent({
              ...newEvent,
              startDate: e.target.value
            })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newEvent.endDate} onChange={e => setNewEvent({
              ...newEvent,
              endDate: e.target.value
            })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Vehicles
                </label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newEvent.expectedVehicles} onChange={e => setNewEvent({
              ...newEvent,
              expectedVehicles: e.target.value
            })} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newEvent.description} onChange={e => setNewEvent({
              ...newEvent,
              description: e.target.value
            })} rows={3} />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button type="button" onClick={() => setShowAddEvent(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Event
              </button>
            </div>
          </form>
        </div>}
      <div className="grid gap-6">
        {events.map(event => <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.name}
                </h3>
                <p className="text-gray-600 mt-1">{event.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon size={16} className="mr-2" />
                    {new Date(event.startDate).toLocaleDateString()} -{' '}
                    {new Date(event.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CarIcon size={16} className="mr-2" />
                    Expected Vehicles: {event.expectedVehicles}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs ${event.type === 'wedding' ? 'bg-pink-100 text-pink-800' : event.type === 'conference' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <button className="flex items-center px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200" onClick={() => {}}>
                  <QrCodeIcon size={16} className="mr-1" />
                  View QR Code
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};