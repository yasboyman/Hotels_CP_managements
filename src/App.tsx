import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { EventManagement } from './pages/EventManagement';
import { StaffPermits } from './pages/StaffPermits';
import { PCNManagement } from './pages/PCNManagement';
import { LayoutDashboardIcon, CalendarIcon, UserIcon, AlertTriangleIcon } from 'lucide-react';

export function App() {
  const [events, setEvents] = useState([{
    id: 1,
    name: "Andy's Wedding",
    type: 'wedding',
    startDate: '2024-06-15',
    endDate: '2024-06-16',
    expectedVehicles: 50,
    qrCodeUrl: '#',
    description: 'Wedding ceremony and reception'
  }, {
    id: 2,
    name: 'Google Tech Conference',
    type: 'conference',
    startDate: '2024-07-10',
    endDate: '2024-07-12',
    expectedVehicles: 200,
    qrCodeUrl: '#',
    description: 'Annual tech conference'
  }]);

  return (
    <Router>
      <div className="min-h-screen bg-indigo-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <LayoutDashboardIcon size={20} className="mr-2" />
                  Dashboard
                </Link>
                <Link to="/events" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <CalendarIcon size={20} className="mr-2" />
                  Events
                </Link>
                <Link to="/staff-permits" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <UserIcon size={20} className="mr-2" />
                  Staff Permits
                </Link>
                <Link to="/pcn" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <AlertTriangleIcon size={20} className="mr-2" />
                  PCN Management
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard events={events} />} />
          <Route path="/events" element={<EventManagement events={events} setEvents={setEvents} />} />
          <Route path="/staff-permits" element={<StaffPermits />} />
          <Route path="/pcn" element={<PCNManagement />} />
        </Routes>
      </div>
    </Router>
  );
}