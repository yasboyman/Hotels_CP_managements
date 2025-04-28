import React, { useState } from 'react';
import { UserIcon, PlusCircleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { ConfirmationModal } from '../components/ConfirmationModal';

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

  const [editingCell, setEditingCell] = useState<{id: number, field: string} | null>(null);
  const [editValue, setEditValue] = useState('');

  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, id: number | null}>({
    isOpen: false,
    id: null
  });

  const handleDelete = (id: number) => {
    setStaffPermits(staffPermits.filter(permit => permit.id !== id));
  };

  const handleEditStart = (id: number, field: string, value: string) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  const handleEditSave = (id: number, field: string) => {
    setStaffPermits(staffPermits.map(permit => 
      permit.id === id ? { ...permit, [field]: editValue } : permit
    ));
    setEditingCell(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Staff Permits</h1>
            <p className="text-gray-600">Manage staff parking permits</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircleIcon size={20} className="mr-2" />
            Add New Permit
          </button>
        </div>
      </header>

      {showAddForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Permit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newPermit.name}
                  onChange={(e) => setNewPermit({ ...newPermit, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  value={newPermit.department}
                  onChange={(e) => setNewPermit({ ...newPermit, department: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Plate</label>
                <input
                  type="text"
                  value={newPermit.licensePlate}
                  onChange={(e) => setNewPermit({ ...newPermit, licensePlate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                <input
                  type="date"
                  value={newPermit.validUntil}
                  onChange={(e) => setNewPermit({ ...newPermit, validUntil: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Permit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
            {staffPermits.map(permit => (
              <tr key={permit.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserIcon size={20} className="text-gray-400 mr-2" />
                    {editingCell?.id === permit.id && editingCell.field === 'name' ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleEditSave(permit.id, 'name')}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditSave(permit.id, 'name')}
                        className="border rounded px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <div
                        className="text-sm font-medium text-gray-900 cursor-pointer"
                        onClick={() => handleEditStart(permit.id, 'name', permit.name)}
                      >
                        {permit.name}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCell?.id === permit.id && editingCell.field === 'department' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleEditSave(permit.id, 'department')}
                      onKeyPress={(e) => e.key === 'Enter' && handleEditSave(permit.id, 'department')}
                      className="border rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm text-gray-500 cursor-pointer"
                      onClick={() => handleEditStart(permit.id, 'department', permit.department)}
                    >
                      {permit.department}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCell?.id === permit.id && editingCell.field === 'licensePlate' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleEditSave(permit.id, 'licensePlate')}
                      onKeyPress={(e) => e.key === 'Enter' && handleEditSave(permit.id, 'licensePlate')}
                      className="border rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm text-gray-500 cursor-pointer"
                      onClick={() => handleEditStart(permit.id, 'licensePlate', permit.licensePlate)}
                    >
                      {permit.licensePlate}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCell?.id === permit.id && editingCell.field === 'validUntil' ? (
                    <input
                      type="date"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleEditSave(permit.id, 'validUntil')}
                      onKeyPress={(e) => e.key === 'Enter' && handleEditSave(permit.id, 'validUntil')}
                      className="border rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm text-gray-500 cursor-pointer"
                      onClick={() => handleEditStart(permit.id, 'validUntil', permit.validUntil)}
                    >
                      {new Date(permit.validUntil).toLocaleDateString()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${permit.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {permit.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setDeleteModal({ isOpen: true, id: permit.id })}
                    className="text-red-600 hover:text-red-900"
                  >
                    <XCircleIcon size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={() => deleteModal.id && handleDelete(deleteModal.id)}
        title="Delete Staff Permit"
        message="Are you sure you want to delete this staff permit? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};