
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifyDocumentProcessed, setNotifyDocumentProcessed] = useState(true);
  const [notifyFlawsDetected, setNotifyFlawsDetected] = useState(true);
  
  const handleSaveProfile = () => {
    // In a real app, this would update the profile via API
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-3xl font-serif font-medium">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="document-processed" className="flex-1">
                Document processing notifications
                <p className="text-sm text-muted-foreground mt-1">
                  Get notified when your documents are processed
                </p>
              </Label>
              <Switch 
                id="document-processed"
                checked={notifyDocumentProcessed}
                onCheckedChange={setNotifyDocumentProcessed}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="flaws-detected" className="flex-1">
                Flaw detection notifications
                <p className="text-sm text-muted-foreground mt-1">
                  Get notified when flaws are detected in your documents
                </p>
              </Label>
              <Switch 
                id="flaws-detected"
                checked={notifyFlawsDetected}
                onCheckedChange={setNotifyFlawsDetected}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotifications}>Save Preferences</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">API Integration</CardTitle>
            <CardDescription>Configure external AI services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <Input 
                id="api-key" 
                type="password" 
                placeholder="Enter your API key"
              />
              <p className="text-xs text-muted-foreground">
                Required for AI-powered text processing and analysis
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save API Settings</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Account Security</CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="••••••••"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
