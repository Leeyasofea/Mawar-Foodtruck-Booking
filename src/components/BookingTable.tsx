import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BookingForm } from "./BookingForm";

interface Booking {
  id: string;
  customerName: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
  location: string;
  guests: number;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    customerName: "John Doe",
    date: "2024-02-15",
    time: "12:00 PM",
    status: "pending",
    location: "Central Park",
    guests: 50,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    date: "2024-02-16",
    time: "3:00 PM",
    status: "approved",
    location: "Downtown Plaza",
    guests: 75,
  },
];

export function BookingTable() {
  const { toast } = useToast();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleApprove = (id: string) => {
    toast({
      title: "Booking Approved",
      description: `Booking #${id} has been approved successfully.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Booking Rejected",
      description: `Booking #${id} has been rejected.`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        <Button 
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {showBookingForm ? "Hide Form" : "New Booking"}
        </Button>
      </div>

      {showBookingForm && (
        <div className="mb-6">
          <BookingForm />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.location}</TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(booking.id)}
                    disabled={booking.status !== "pending"}
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(booking.id)}
                    disabled={booking.status !== "pending"}
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}