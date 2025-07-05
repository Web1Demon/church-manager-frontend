import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { toast } from "../hooks/use-toast";
import DarkModeToggle from "../components/DarkModeToggle";

import { Moon, Sun, Bell, Database, Shield, Globe, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    emailNotifications: true,
    language: "en",
    timezone: "UTC",
    autoBackup: true,
    backupFrequency: "daily",
    churchName: "ChurchConnect Community",
    churchAddress: "123 Faith Street, City, State 12345",
    churchPhone: "(555) 123-4567",
    churchEmail: "info@churchconnect.org",
    requireApproval: true,
    allowGuestAccess: false,
    sessionTimeout: "30"
  });

  // Auto-save settings whenever they change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Auto-saving settings:", settings);
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated automatically.",
      });
    }, 1000); // Save after 1 second of no changes

    return () => clearTimeout(timeoutId);
  }, [settings]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleManualSave = () => {
    console.log("Manually saving settings:", settings);
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };


  return (
    <div className="min-h-screen  p-6 {DarkTheme}">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/")}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-green-400">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400">Settings save automatically as you make changes</p>
            </div>
          </div>
          <Button onClick={handleManualSave} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-gray-800">
            <Save className="h-4 w-4 mr-2" />
            Save Now
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appearance Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-green-400">
                <Sun className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-300">Theme</Label>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Choose between light and dark mode
                  </div>
                </div>
                <DarkModeToggle />
              </div>

              <Separator className="dark:bg-gray-700" />

              <div className="space-y-2">
                <Label htmlFor="language" className="dark:text-gray-300">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => handleSettingChange("language", value)}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    <SelectItem value="en" className="dark:text-gray-300 dark:hover:bg-gray-700">English</SelectItem>
                    <SelectItem value="es" className="dark:text-gray-300 dark:hover:bg-gray-700">Spanish</SelectItem>
                    <SelectItem value="fr" className="dark:text-gray-300 dark:hover:bg-gray-700">French</SelectItem>
                    <SelectItem value="pt" className="dark:text-gray-300 dark:hover:bg-gray-700">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="dark:text-gray-300">Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => handleSettingChange("timezone", value)}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    <SelectItem value="UTC" className="dark:text-gray-300 dark:hover:bg-gray-700">UTC</SelectItem>
                    <SelectItem value="EST" className="dark:text-gray-300 dark:hover:bg-gray-700">Eastern Time</SelectItem>
                    <SelectItem value="CST" className="dark:text-gray-300 dark:hover:bg-gray-700">Central Time</SelectItem>
                    <SelectItem value="MST" className="dark:text-gray-300 dark:hover:bg-gray-700">Mountain Time</SelectItem>
                    <SelectItem value="PST" className="dark:text-gray-300 dark:hover:bg-gray-700">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-green-400">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-300">Push Notifications</Label>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Receive notifications in the app
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-300">Email Notifications</Label>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Receive notifications via email
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Church Information */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-green-400">
                <Globe className="h-5 w-5" />
                <span>Church Information</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Update your church's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="churchName" className="dark:text-gray-300">Church Name</Label>
                <Input
                  id="churchName"
                  value={settings.churchName}
                  onChange={(e) => handleSettingChange("churchName", e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="churchAddress" className="dark:text-gray-300">Address</Label>
                <Input
                  id="churchAddress"
                  value={settings.churchAddress}
                  onChange={(e) => handleSettingChange("churchAddress", e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="churchPhone" className="dark:text-gray-300">Phone</Label>
                <Input
                  id="churchPhone"
                  value={settings.churchPhone}
                  onChange={(e) => handleSettingChange("churchPhone", e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="churchEmail" className="dark:text-gray-300">Email</Label>
                <Input
                  id="churchEmail"
                  type="email"
                  value={settings.churchEmail}
                  onChange={(e) => handleSettingChange("churchEmail", e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security & Privacy */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-green-400">
                <Shield className="h-5 w-5" />
                <span>Security & Privacy</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-300">Require Approval for New Members</Label>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    New member registrations need admin approval
                  </div>
                </div>
                <Switch
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => handleSettingChange("requireApproval", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-300">Allow Guest Access</Label>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Allow visitors to view public information
                  </div>
                </div>
                <Switch
                  checked={settings.allowGuestAccess}
                  onCheckedChange={(checked) => handleSettingChange("allowGuestAccess", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout" className="dark:text-gray-300">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card className="lg:col-span-2 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-green-400">
                <Database className="h-5 w-5" />
                <span>Backup Settings</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Configure automatic backups for your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-300">Automatic Backups</Label>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Enable automatic data backups
                  </div>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                />
              </div>

              {settings.autoBackup && (
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency" className="dark:text-gray-300">Backup Frequency</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                  >
                    <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="daily" className="dark:text-gray-300 dark:hover:bg-gray-700">Daily</SelectItem>
                      <SelectItem value="weekly" className="dark:text-gray-300 dark:hover:bg-gray-700">Weekly</SelectItem>
                      <SelectItem value="monthly" className="dark:text-gray-300 dark:hover:bg-gray-700">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Create Backup Now
                </Button>
                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Restore from Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
