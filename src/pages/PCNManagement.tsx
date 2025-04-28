import React, { useState } from 'react';
import { AlertCircleIcon, ClockIcon } from 'lucide-react';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const PCNManagement = () => {
  const [pendingPCNs, setPendingPCNs] = useState([{
    id: 1,
    licensePlate: 'ABC123',
    make: 'Toyota',
    model: 'Camry',
    violation: 'No valid permit',
    timestamp: '2024-01-15T10:30:00',
    status: 'pending',
    timeRemaining: '2h 30m'
  }, {
    id: 2,
    licensePlate: 'XYZ789',
    make: 'Honda',
    model: 'Civic',
    violation: 'Overstayed parking limit',
    timestamp: '2024-01-15T11:45:00',
    status: 'pending',
    timeRemaining: '1h 45m'
  }]);

  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    type: 'cancel' | null;
    id: number | null;
  }>({
    isOpen: false,
    type: null,
    id: null
  });

  const handleCancelPCN = (id: number) => {
    setPendingPCNs(pendingPCNs.map(pcn => pcn.id === id ? {
      ...pcn,
      status: 'cancelled'
    } : pcn));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">PCN Management</h1>
            <p className="text-gray-600">Review and manage pending PCNs</p>
          </div>
          <div className="flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-md">
            <AlertCircleIcon size={20} />
            <span className="font-medium">
              {pendingPCNs.filter(pcn => pcn.status === 'pending').length}{' '}
              Pending PCNs
            </span>
          </div>
        </div>
      </header>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Violation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Time Detected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Time Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingPCNs.map(pcn => (
                <tr key={pcn.id} className={pcn.status !== 'pending' ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {pcn.licensePlate}
                    </div>
                    <div className="text-sm text-gray-500">
                      {pcn.make} {pcn.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {pcn.violation}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(pcn.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon size={16} className="mr-1 text-amber-500" />
                      <span className="text-amber-500 font-medium">
                        {pcn.timeRemaining}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${pcn.status === 'pending' ? 'bg-amber-100 text-amber-800' : pcn.status === 'cancelled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {pcn.status.charAt(0).toUpperCase() + pcn.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {pcn.status === 'pending' && (
                      <button
                        onClick={() => setActionModal({ isOpen: true, type: 'cancel', id: pcn.id })}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Cancel PCN
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={actionModal.isOpen}
        onClose={() => setActionModal({ isOpen: false, type: null, id: null })}
        onConfirm={() => {
          if (actionModal.id) {
            handleCancelPCN(actionModal.id);
          }
        }}
        title="Cancel PCN"
        message="Are you sure you want to cancel this PCN? This action cannot be undone."
        confirmText="Cancel PCN"
      />
    </div>
  );
};