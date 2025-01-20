import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  eventName: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const mockBookings: Booking[] = [
  {
    id: "1",
    eventName: "Food Festival 2024",
    date: "2024-06-15",
    status: "approved",
  },
  {
    id: "2",
    eventName: "Summer Night Market",
    date: "2024-07-20",
    status: "pending",
  },
];

export function BookingHistory() {
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
      <h2 className="text-2xl font-bold">Booking History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.eventName}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}