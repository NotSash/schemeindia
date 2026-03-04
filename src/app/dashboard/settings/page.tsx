import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Settings, User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Account Settings</h1>
                </div>

                <div className="grid md:grid-cols-[250px_1fr] gap-8">
                    {/* Navigation Sidebar */}
                    <div className="space-y-2">
                        <Button variant="secondary" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" /> Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" /> Preferences
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Bell className="mr-2 h-4 w-4" /> Notifications
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Shield className="mr-2 h-4 w-4" /> Security
                        </Button>
                    </div>

                    {/* Main Content Area */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-muted/50 rounded-lg border text-sm text-muted-foreground grid place-items-center min-h-[150px]">
                                    Profile settings form will be implemented here.
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
