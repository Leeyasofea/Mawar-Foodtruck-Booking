import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function BookingForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    date: "",
    time: "",
    location: "",
    guests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate guests is a number
    const guestsNumber = parseInt(formData.guests);
    if (isNaN(guestsNumber)) {
      toast({
        title: "Invalid Input",
        description: "Number of guests must be a valid number",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically make an API call to save the booking
    toast({
      title: "Booking Submitted",
      description: "Your booking request has been submitted for approval.",
    });

    // Reset form
    setFormData({
      customerName: "",
      date: "",
      time: "",
      location: "",
      guests: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Number of Guests</Label>
        <Input
          id="guests"
          name="guests"
          type="number"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Booking
      </Button>
    </form>
  );
}