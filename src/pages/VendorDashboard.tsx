import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VendorProfile } from "@/components/VendorProfile";
import { EventList } from "@/components/EventList";
import { BookingHistory } from "@/components/BookingHistory";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>
              <Link to="/vendor/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Link to="/vendor/events">
                <Button variant="ghost">Available Events</Button>
              </Link>
              <Link to="/vendor/history">
                <Button variant="ghost">Booking History</Button>
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
          <Route path="/profile" element={<VendorProfile />} />
          <Route path="/events" element={<EventList userType="vendor" />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/dashboard" element={<EventList userType="vendor" />} />
        </Routes>
      </main>
    </div>
  );
};

export default VendorDashboard;