import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifyDocumentProcessed, setNotifyDocumentProcessed] = useState(true);
  const [notifyFlawsDetected, setNotifyFlawsDetected] = useState(true);

  const handleSaveProfile = () => {
    // In a real app, this would update the profile via API
    alert("Profile updated");
  };

  const handleSaveNotifications = () => {
    alert("Notification preferences updated");
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-3xl font-serif font-medium">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="font-serif text-xl mb-2">Profile Information</h2>
          <p className="text-muted-foreground mb-4">Update your personal details</p>
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-2 mt-4">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mt-4">
            <button onClick={handleSaveProfile} className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Save Profile</button>
          </div>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="font-serif text-xl mb-2">Notification Preferences</h2>
          <p className="text-muted-foreground mb-4">Manage how you receive alerts</p>
          <div className="flex items-center justify-between mb-4">
            <label htmlFor="document-processed" className="flex-1">
              Document processing notifications
              <p className="text-sm text-muted-foreground mt-1">
                Get notified when your documents are processed
              </p>
            </label>
            <input
              id="document-processed"
              type="checkbox"
              checked={notifyDocumentProcessed}
              onChange={() => setNotifyDocumentProcessed((v) => !v)}
            />
          </div>
          <hr className="my-4" />
          <div className="flex items-center justify-between mb-4">
            <label htmlFor="flaws-detected" className="flex-1">
              Flaw detection notifications
              <p className="text-sm text-muted-foreground mt-1">
                Get notified when flaws are detected in your documents
              </p>
            </label>
            <input
              id="flaws-detected"
              type="checkbox"
              checked={notifyFlawsDetected}
              onChange={() => setNotifyFlawsDetected((v) => !v)}
            />
          </div>
          <div>
            <button onClick={handleSaveNotifications} className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Save Preferences</button>
          </div>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="font-serif text-xl mb-2">API Integration</h2>
          <p className="text-muted-foreground mb-4">Configure external AI services</p>
          <div className="space-y-2">
            <label htmlFor="api-key" className="block font-medium">OpenAI API Key</label>
            <input
              id="api-key"
              type="password"
              placeholder="Enter your API key"
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-muted-foreground">
              Required for AI-powered text processing and analysis
            </p>
          </div>
          <div className="mt-4">
            <button className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Save API Settings</button>
          </div>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="font-serif text-xl mb-2">Account Security</h2>
          <p className="text-muted-foreground mb-4">Manage your password and security settings</p>
          <div className="space-y-2">
            <label htmlFor="current-password" className="block font-medium">Current Password</label>
            <input
              id="current-password"
              type="password"
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-2 mt-4">
            <label htmlFor="new-password" className="block font-medium">New Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-2 mt-4">
            <label htmlFor="confirm-password" className="block font-medium">Confirm New Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mt-4">
            <button className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
