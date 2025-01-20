import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spotsLeft: number;
  status?: "pending" | "approved" | "rejected";
}

const mockEvents: Event[] = [
  {
    id: "1",
    name: "Food Festival 2024",
    date: "2024-06-15",
    time: "10:00",
    location: "Central Park",
    description: "Annual food truck festival",
    spotsLeft: 15,
  },
  {
    id: "2",
    name: "Summer Night Market",
    date: "2024-07-20",
    time: "18:00",
    location: "Downtown Plaza",
    description: "Evening food market with live music",
    spotsLeft: 8,
  },
];

interface EventListProps {
  userType: "vendor" | "admin";
}

export function EventList({ userType }: EventListProps) {
  const { toast } = useToast();

  const handleBookEvent = (eventId: string) => {
    toast({
      title: "Booking Submitted",
      description: "Your booking request has been submitted for approval.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {userType === "admin" ? "Manage Events" : "Available Events"}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {mockEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{event.name}</CardTitle>
                <Badge variant="secondary">{event.spotsLeft} spots left</Badge>
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
                  disabled={event.spotsLeft === 0}
                  className="w-full"
                >
                  {event.spotsLeft === 0 ? "Fully Booked" : "Book Event"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}