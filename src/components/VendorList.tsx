import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Vendor {
  id: string;
  name: string;
  foodType: string;
  eventName: string;
  status: "pending" | "approved" | "rejected";
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Tasty Tacos",
    foodType: "Mexican",
    eventName: "Food Festival 2024",
    status: "pending",
  },
  {
    id: "2",
    name: "Burger Bros",
    foodType: "American",
    eventName: "Summer Night Market",
    status: "approved",
  },
];

export function VendorList() {
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    toast({
      title: "Vendor Approved",
      description: "The vendor has been approved for the event.",
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Vendor Rejected",
      description: "The vendor has been rejected for the event.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: Vendor["status"]) => {
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
            {mockVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.foodType}</TableCell>
                <TableCell>{vendor.eventName}</TableCell>
                <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(vendor.id)}
                    disabled={vendor.status !== "pending"}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(vendor.id)}
                    disabled={vendor.status !== "pending"}
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