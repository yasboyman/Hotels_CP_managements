import React, { useState } from 'react';
import { UserIcon, PlusCircleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
export const StaffPermits = () => {
  const [staffPermits, setStaffPermits] = useState([{
    id: 1,
    name: 'John Smith',
    department: 'Reception',
    licensePlate: 'ABC123',
    validUntil: '2024-12-31',
    active: true
  }, {
    id: 2,
    name: 'Sarah Johnson',
    department: 'Housekeeping',
    licensePlate: 'DEF456',
    validUntil: '2024-12-31',
    active: true
  }]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPermit, setNewPermit] = useState({
    name: '',
    department: '',
    licensePlate: '',
    validUntil: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    setStaffPermits([...staffPermits, {
      id: staffPermits.length + 1,
      ...newPermit,
      active: true
    }]);
    setShowAddForm(false);
    setNewPermit({
      name: '',
      department: '',
      licensePlate: '',
      validUntil: ''
    });
  };
  return <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Staff Permits</h1>
            <p className="text-gray-600">Manage staff parking permits</p>
          </div>
          <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <PlusCircleIcon size={20} className="mr-2" />
            Add Staff Permit
          </button>
        </div>
      </header>
      {showAddForm && <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Staff Name
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newPermit.name} onChange={e => setNewPermit({
              ...newPermit,
              name: e.target.value
            })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newPermit.department} onChange={e => setNewPermit({
              ...newPermit,
              department: e.target.value
            })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newPermit.licensePlate} onChange={e => setNewPermit({
              ...newPermit,
              licensePlate: e.target.value
            })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valid Until
                </label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={newPermit.validUntil} onChange={e => setNewPermit({
              ...newPermit,
              validUntil: e.target.value
            })} required />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Permit
              </button>
            </div>
          </form>
        </div>}
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                License Plate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valid Until
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffPermits.map(permit => <tr key={permit.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserIcon size={20} className="text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">
                      {permit.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {permit.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {permit.licensePlate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(permit.validUntil).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${permit.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {permit.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900 ml-4">
                    <XCircleIcon size={20} />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};