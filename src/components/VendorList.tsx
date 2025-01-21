import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Vendor {
  id: string;
  business_name: string;
  food_type: string;
  status: "pending" | "approved" | "rejected";
}

interface Booking {
  id: string;
  vendor_id: string;
  event_id: string;
  status: "pending" | "approved" | "rejected";
  events: {
    name: string;
  };
  profiles: {
    business_name: string;
    food_type: string;
  };
}

export function VendorList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          events (
            name
          ),
          profiles (
            business_name,
            food_type
          )
        `);

      if (error) throw error;
      return data as Booking[];
    },
  });

  const updateBookingStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "rejected";
    }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  const handleApprove = async (id: string) => {
    try {
      await updateBookingStatus.mutateAsync({ id, status: "approved" });
      toast({
        title: "Vendor Approved",
        description: "The vendor has been approved for the event.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateBookingStatus.mutateAsync({ id, status: "rejected" });
      toast({
        title: "Vendor Rejected",
        description: "The vendor has been rejected for the event.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vendor Applications</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Food Type</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.profiles.business_name}</TableCell>
                <TableCell>{booking.profiles.food_type}</TableCell>
                <TableCell>{booking.events.name}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(booking.id)}
                    disabled={booking.status !== "pending"}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(booking.id)}
                    disabled={booking.status !== "pending"}
                  >
                    Reject
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