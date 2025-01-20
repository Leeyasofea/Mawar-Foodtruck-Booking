import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { useState } from "react";

export function VendorProfile() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Vendor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" placeholder="Your food truck name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell customers about your food truck..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="contact@foodtruck.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="(555) 123-4567" />
          </div>

          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <Label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Upload className="w-4 h-4" />
                Upload Image
                <Input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}