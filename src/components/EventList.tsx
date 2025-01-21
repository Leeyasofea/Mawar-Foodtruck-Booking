import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  max_vendors: number;
}

interface EventListProps {
  userType: "vendor" | "admin";
}

export function EventList({ userType }: EventListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });

  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("status", "approved");

      if (error) throw error;
      return data;
    },
  });

  const createBooking = useMutation({
    mutationFn: async (eventId: string) => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { error } = await supabase.from("bookings").insert([
        {
          event_id: eventId,
          vendor_id: userData.user.id,
          status: "pending",
        },
      ]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  const handleBookEvent = async (eventId: string) => {
    try {
      await createBooking.mutateAsync(eventId);
      toast({
        title: "Booking Submitted",
        description: "Your booking request has been submitted for approval.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getSpotsLeft = (eventId: string) => {
    const approvedBookings = bookings?.filter(
      (booking) => booking.event_id === eventId && booking.status === "approved"
    );
    const event = events?.find((e) => e.id === eventId);
    return event ? event.max_vendors - (approvedBookings?.length || 0) : 0;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {userType === "admin" ? "Manage Events" : "Available Events"}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {events?.map((event) => {
          const spotsLeft = getSpotsLeft(event.id);
          return (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{event.name}</CardTitle>
                  <Badge variant="secondary">{spotsLeft} spots left</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p>
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>{event.description}</p>
                </div>
                {userType === "vendor" && (
                  <Button
                    onClick={() => handleBookEvent(event.id)}
                    disabled={spotsLeft === 0}
                    className="w-full"
                  >
                    {spotsLeft === 0 ? "Fully Booked" : "Book Event"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}