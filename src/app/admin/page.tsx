'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    LayoutDashboard,
    Users,
    FileText,
    CreditCard,
    Activity,
    AlertCircle,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock admin data
const MOCK_STATS = {
    totalUsers: 1247,
    paidUsers: 412,
    totalRevenue: 98700,
    schemesTracked: 14,
    matchesRun: 3856,
    successRate: 94.3,
};

const MOCK_RECENT_PAYMENTS = [
    { id: 'pay_abc123', user: 'ramesh.k@gmail.com', plan: 'Detailed', amount: 299, date: '2025-01-15', status: 'captured' },
    { id: 'pay_def456', user: 'priya.s@outlook.com', plan: 'Premium', amount: 599, date: '2025-01-15', status: 'captured' },
    { id: 'pay_ghi789', user: 'gurmeet@yahoo.com', plan: 'Basic', amount: 99, date: '2025-01-14', status: 'captured' },
    { id: 'pay_jkl012', user: 'anita.d@gmail.com', plan: 'Detailed', amount: 299, date: '2025-01-14', status: 'failed' },
    { id: 'pay_mno345', user: 'suresh.p@gmail.com', plan: 'Premium', amount: 599, date: '2025-01-13', status: 'captured' },
];

const MOCK_SCRAPE_LOGS = [
    { source: 'myscheme.gov.in', status: 'success', count: 156, duration: '12.3s', date: '2025-01-15 02:00' },
    { source: 'india.gov.in', status: 'success', count: 89, duration: '8.7s', date: '2025-01-15 02:00' },
    { source: 'scholarships.gov.in', status: 'failed', count: 0, duration: '30.0s', date: '2025-01-15 02:00' },
    { source: 'myscheme.gov.in', status: 'success', count: 154, duration: '11.8s', date: '2025-01-14 02:00' },
    { source: 'india.gov.in', status: 'success', count: 89, duration: '9.1s', date: '2025-01-14 02:00' },
    { source: 'scholarships.gov.in', status: 'success', count: 42, duration: '15.2s', date: '2025-01-14 02:00' },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <LayoutDashboard className="h-6 w-6 text-brand-blue" />
                            Admin Dashboard
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">SchemeIndia Platform Management</p>
                    </div>
                    <Badge className="bg-red-500 text-white">Admin Access</Badge>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6 flex-wrap">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="scraping">Scraping Logs</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
                            {[
                                { label: 'Total Users', value: MOCK_STATS.totalUsers.toLocaleString(), icon: Users, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
                                { label: 'Paid Users', value: MOCK_STATS.paidUsers.toLocaleString(), icon: CreditCard, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                                { label: 'Revenue', value: `₹${MOCK_STATS.totalRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
                                { label: 'Schemes Tracked', value: MOCK_STATS.schemesTracked.toString(), icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
                                { label: 'Matches Run', value: MOCK_STATS.matchesRun.toLocaleString(), icon: Activity, color: 'text-pink-600', bg: 'bg-pink-100' },
                                { label: 'Success Rate', value: `${MOCK_STATS.successRate}%`, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                            ].map((stat) => (
                                <Card key={stat.label} className="border-0 shadow-sm">
                                    <CardContent className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                                                <stat.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">{stat.value}</p>
                                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Clock className="h-4 w-4" /> Recent Payments
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Payment ID</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">User</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Plan</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Amount</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_RECENT_PAYMENTS.slice(0, 5).map((p) => (
                                                <tr key={p.id} className="border-b">
                                                    <td className="py-2 px-3 font-mono text-xs">{p.id}</td>
                                                    <td className="py-2 px-3">{p.user}</td>
                                                    <td className="py-2 px-3">{p.plan}</td>
                                                    <td className="py-2 px-3 font-medium">₹{p.amount}</td>
                                                    <td className="py-2 px-3">
                                                        <Badge className={`text-xs border-0 ${p.status === 'captured' ? 'bg-brand-green/10 text-brand-green' : 'bg-red-100 text-red-600'}`}>
                                                            {p.status === 'captured' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                                            {p.status}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payments Tab */}
                    <TabsContent value="payments">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold mb-4">All Payments</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Payment ID</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">User</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Plan</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Amount</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_RECENT_PAYMENTS.map((p) => (
                                                <tr key={p.id} className="border-b hover:bg-muted/30">
                                                    <td className="py-2.5 px-3 font-mono text-xs">{p.id}</td>
                                                    <td className="py-2.5 px-3">{p.user}</td>
                                                    <td className="py-2.5 px-3"><Badge variant="secondary" className="text-xs">{p.plan}</Badge></td>
                                                    <td className="py-2.5 px-3 font-medium">₹{p.amount}</td>
                                                    <td className="py-2.5 px-3 text-muted-foreground">{p.date}</td>
                                                    <td className="py-2.5 px-3">
                                                        <Badge className={`text-xs border-0 ${p.status === 'captured' ? 'bg-brand-green/10 text-brand-green' : 'bg-red-100 text-red-600'}`}>
                                                            {p.status}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Scraping Logs Tab */}
                    <TabsContent value="scraping">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold">Scraping Logs</h3>
                            <Button size="sm" variant="outline">
                                <RefreshCw className="mr-2 h-3 w-3" /> Run Scraper Now
                            </Button>
                        </div>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Source</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Schemes Found</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Duration</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Run At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_SCRAPE_LOGS.map((log, i) => (
                                                <tr key={i} className="border-b hover:bg-muted/30">
                                                    <td className="py-2.5 px-3 font-medium">{log.source}</td>
                                                    <td className="py-2.5 px-3">
                                                        <Badge className={`text-xs border-0 ${log.status === 'success' ? 'bg-brand-green/10 text-brand-green' : 'bg-red-100 text-red-600'}`}>
                                                            {log.status === 'success' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                                                            {log.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-2.5 px-3">{log.count}</td>
                                                    <td className="py-2.5 px-3 text-muted-foreground">{log.duration}</td>
                                                    <td className="py-2.5 px-3 text-muted-foreground">{log.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Users className="h-4 w-4" /> Recent Users
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Name</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Email</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">State</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Plan</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Schemes</th>
                                                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { name: 'Ramesh Kumar', email: 'ramesh.k@gmail.com', state: 'UP', plan: 'Detailed', schemes: 14, joined: '2025-01-15' },
                                                { name: 'Priya Sharma', email: 'priya.s@outlook.com', state: 'MH', plan: 'Premium', schemes: 12, joined: '2025-01-15' },
                                                { name: 'Gurmeet Singh', email: 'gurmeet@yahoo.com', state: 'PB', plan: 'Basic', schemes: 8, joined: '2025-01-14' },
                                                { name: 'Anita Devi', email: 'anita.d@gmail.com', state: 'RJ', plan: '—', schemes: 0, joined: '2025-01-14' },
                                                { name: 'Suresh Patel', email: 'suresh.p@gmail.com', state: 'GJ', plan: 'Premium', schemes: 16, joined: '2025-01-13' },
                                            ].map((user) => (
                                                <tr key={user.email} className="border-b hover:bg-muted/30">
                                                    <td className="py-2.5 px-3 font-medium">{user.name}</td>
                                                    <td className="py-2.5 px-3">{user.email}</td>
                                                    <td className="py-2.5 px-3">{user.state}</td>
                                                    <td className="py-2.5 px-3"><Badge variant="secondary" className="text-xs">{user.plan}</Badge></td>
                                                    <td className="py-2.5 px-3">{user.schemes}</td>
                                                    <td className="py-2.5 px-3 text-muted-foreground">{user.joined}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
