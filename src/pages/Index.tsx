import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingTable } from "@/components/BookingTable";
import { VendorProfile } from "@/components/VendorProfile";

const Index = () => {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Food Truck Management
      </h1>
      
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="bookings">Booking Approvals</TabsTrigger>
          <TabsTrigger value="profile">Vendor Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Pending Bookings</h2>
            </div>
            <BookingTable />
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <VendorProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;