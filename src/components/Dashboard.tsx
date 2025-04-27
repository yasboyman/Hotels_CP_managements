import React, { useState } from 'react';
import { VehicleList } from './VehicleList';
import { AddVehicleForm } from './AddVehicleForm';
import { ActivitySidebar } from './ActivitySidebar';
import { StatsOverview } from './StatsOverview';
import { CarIcon, BellIcon } from 'lucide-react';
export const Dashboard = ({
  events
}) => {
  const [isActivitySidebarOpen, setIsActivitySidebarOpen] = useState(false);
  const [vehicles, setVehicles] = useState([{
    id: 1,
    licensePlate: 'ABC123',
    make: 'Toyota',
    model: 'Camry',
    hasPermit: true,
    entryTime: '2023-06-10T08:30:00',
    eventId: 1
  }, {
    id: 2,
    licensePlate: 'DEF456',
    make: 'Honda',
    model: 'Civic',
    hasPermit: true,
    entryTime: '2023-06-10T09:15:00',
    eventId: 2
  }, {
    id: 3,
    licensePlate: 'GHI789',
    make: 'Ford',
    model: 'Focus',
    hasPermit: false,
    entryTime: '2023-06-10T10:05:00',
    eventId: null
  }, {
    id: 4,
    licensePlate: 'JKL012',
    make: 'BMW',
    model: 'X5',
    hasPermit: true,
    entryTime: '2023-06-10T11:20:00',
    eventId: 1
  }]);
  const [recentActivity, setRecentActivity] = useState([{
    id: 1,
    licensePlate: 'ABC123',
    action: 'entry',
    timestamp: '2023-06-10T08:30:00'
  }, {
    id: 2,
    licensePlate: 'DEF456',
    action: 'entry',
    timestamp: '2023-06-10T09:15:00'
  }, {
    id: 3,
    licensePlate: 'MNO345',
    action: 'exit',
    timestamp: '2023-06-10T09:45:00'
  }, {
    id: 4,
    licensePlate: 'GHI789',
    action: 'entry',
    timestamp: '2023-06-10T10:05:00'
  }, {
    id: 5,
    licensePlate: 'JKL012',
    action: 'entry',
    timestamp: '2023-06-10T11:20:00'
  }]);
  const addVehicle = vehicle => {
    const newVehicle = {
      id: vehicles.length + 1,
      ...vehicle,
      eventId: vehicle.eventId ? parseInt(vehicle.eventId) : null,
      entryTime: new Date().toISOString()
    };
    setVehicles([...vehicles, newVehicle]);
    const newActivity = {
      id: recentActivity.length + 1,
      licensePlate: vehicle.licensePlate,
      action: 'entry',
      timestamp: new Date().toISOString()
    };
    setRecentActivity([newActivity, ...recentActivity]);
  };
  const updateVehiclePermit = (id, hasPermit) => {
    setVehicles(vehicles.map(vehicle => vehicle.id === id ? {
      ...vehicle,
      hasPermit
    } : vehicle));
  };
  const vehiclesWithPermit = vehicles.filter(v => v.hasPermit).length;
  const vehiclesWithoutPermit = vehicles.filter(v => !v.hasPermit).length;
  return <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Hotel Parking Management
            </h1>
            <p className="text-gray-600">
              Manage vehicle permits and car park access
            </p>
          </div>
          <button onClick={() => setIsActivitySidebarOpen(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <BellIcon size={20} />
            <span className="font-medium">Recent Activity</span>
          </button>
        </div>
      </header>
      <StatsOverview totalVehicles={vehicles.length} withPermit={vehiclesWithPermit} withoutPermit={vehiclesWithoutPermit} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CarIcon className="mr-2 text-blue-600" size={20} />
              Who's in the car park
            </h2>
            <VehicleList vehicles={vehicles} updateVehiclePermit={updateVehiclePermit} events={events} />
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CarIcon className="mr-2 text-blue-600" size={20} />
              Add Vehicle
            </h2>
            <AddVehicleForm onAddVehicle={addVehicle} events={events} />
          </div>
        </div>
      </div>
      <ActivitySidebar isOpen={isActivitySidebarOpen} onClose={() => setIsActivitySidebarOpen(false)} activities={recentActivity} />
    </div>;
};