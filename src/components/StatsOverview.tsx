import React from 'react';
import { CarIcon, ShieldCheckIcon, ShieldAlertIcon } from 'lucide-react';
export const StatsOverview = ({
  totalVehicles,
  withPermit,
  withoutPermit
}) => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <CarIcon size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">
              Total Vehicles
            </h3>
            <p className="text-2xl font-semibold text-gray-800">
              {totalVehicles}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <ShieldCheckIcon size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">With Permit</h3>
            <p className="text-2xl font-semibold text-gray-800">{withPermit}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
        <div className="flex items-center">
          <div className="p-3 bg-amber-100 rounded-full">
            <ShieldAlertIcon size={24} className="text-amber-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">
              Without Permit
            </h3>
            <p className="text-2xl font-semibold text-gray-800">
              {withoutPermit}
            </p>
          </div>
        </div>
      </div>
    </div>;
};