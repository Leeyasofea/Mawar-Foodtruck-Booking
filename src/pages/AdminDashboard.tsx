import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EventList } from "@/components/EventList";
import { CreateEvent } from "@/components/CreateEvent";
import { VendorList } from "@/components/VendorList";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <Link to="/admin/events">
                <Button variant="ghost">Events</Button>
              </Link>
              <Link to="/admin/create-event">
                <Button variant="ghost">Create Event</Button>
              </Link>
              <Link to="/admin/vendors">
                <Button variant="ghost">Vendors</Button>
              </Link>
            </div>
            <div className="flex items-center">
              <Link to="/login">
                <Button variant="ghost">Logout</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/events" element={<EventList userType="admin" />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/dashboard" element={<EventList userType="admin" />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;