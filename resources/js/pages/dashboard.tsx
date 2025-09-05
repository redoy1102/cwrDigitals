import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { accessForAccountTeam, accessForSellTeam } from '@/types/userRole';
import { router, usePage } from '@inertiajs/react';
import { ArrowRight, BarChart3, FileText, Lightbulb, Package, PiggyBank, Receipt, ShoppingCart, TrendingUp, Wallet, Warehouse } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const loggedInUserEmail = auth.user.email;
    console.log(loggedInUserEmail);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-3">
                {/* Header Section */}
                <DashboardHeader title="Welcome Back!" subtitle="Manage your business from one central dashboard" />

                {/* Dashboard Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {dashboardRoutes.map((route, index) => {
                        const IconComponent = route.icon;
                        const routeName = route.name;

                        if(loggedInUserEmail === 'codewithredoy@gmail.com'){
                            return (
                                <div
                                    key={index}
                                    onClick={() => router.visit(route.path)}
                                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${route.color} ${route.hoverColor} cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                                    role="button"
                                >
                                    {/* Content */}
                                    <RouteDesign
                                        icon={<IconComponent className="h-8 w-8" />}
                                        routeName={route.name}
                                        routeDescription={route.description}
                                    />
                                </div>
                            );
                        }
                        else if (loggedInUserEmail === 'account@cwr.com' && accessForAccountTeam.includes(routeName)) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => router.visit(route.path)}
                                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${route.color} ${route.hoverColor} cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                                    role="button"
                                >
                                    {/* Content */}
                                    <RouteDesign
                                        icon={<IconComponent className="h-8 w-8" />}
                                        routeName={route.name}
                                        routeDescription={route.description}
                                    />
                                </div>
                            );
                        }
                        else if (loggedInUserEmail === 'sell@cwr.com' && accessForSellTeam.includes(routeName)) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => router.visit(route.path)}
                                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${route.color} ${route.hoverColor} cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                                    role="button"
                                >
                                    {/* Content */}
                                    <RouteDesign
                                        icon={<IconComponent className="h-8 w-8" />}
                                        routeName={route.name}
                                        routeDescription={route.description}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>

                {/* Quick Stats Section */}
                <div className="mt-12 mb-3 grid gap-6 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">$12,345</p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                                <p className="text-2xl font-bold text-gray-900">48</p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3">
                                <ShoppingCart className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Products</p>
                                <p className="text-2xl font-bold text-gray-900">156</p>
                            </div>
                            <div className="rounded-full bg-purple-100 p-3">
                                <Package className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const dashboardRoutes = [
    {
        name: 'Orders',
        path: '/orders',
        icon: ShoppingCart,
        color: 'from-blue-500 to-blue-700',
        hoverColor: 'hover:from-blue-600 hover:to-blue-800',
        description: 'Manage customer orders',
    },
    {
        name: 'Inventory',
        path: '/inventory',
        icon: Warehouse,
        color: 'from-blue-500 to-blue-700',
        hoverColor: 'hover:from-blue-600 hover:to-blue-800',
        description: 'Manage product inventory',
    },
    {
        name: 'Expenses',
        path: '/expenses',
        icon: Receipt,
        color: 'from-red-500 to-red-700',
        hoverColor: 'hover:from-red-600 hover:to-red-800',
        description: 'Track business expenses',
    },
    {
        name: 'Products Management',
        path: '/products',
        icon: Package,
        color: 'from-emerald-500 to-emerald-700',
        hoverColor: 'hover:from-emerald-600 hover:to-emerald-800',
        description: 'Product catalog & inventory',
    },
    {
        name: 'Investment',
        path: '/investments',
        icon: PiggyBank,
        color: 'from-amber-500 to-amber-700',
        hoverColor: 'hover:from-amber-600 hover:to-amber-800',
        description: 'Investment portfolio',
    },
    {
        name: 'Reports',
        path: '/reports',
        icon: BarChart3,
        color: 'from-teal-500 to-teal-700',
        hoverColor: 'hover:from-teal-600 hover:to-teal-800',
        description: 'Analytics & insights',
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: FileText,
        color: 'from-indigo-500 to-indigo-700',
        hoverColor: 'hover:from-indigo-600 hover:to-indigo-800',
        description: 'Important documents',
    },
    {
        name: 'Savings',
        path: '/savings',
        icon: Wallet,
        color: 'from-green-500 to-green-700',
        hoverColor: 'hover:from-green-600 hover:to-green-800',
        description: 'Savings & budgets',
    },
    {
        name: 'R&D',
        path: '/rnd',
        icon: Lightbulb,
        color: 'from-orange-500 to-orange-700',
        hoverColor: 'hover:from-orange-600 hover:to-orange-800',
        description: 'Research & development',
    },
];

interface DashboardHeaderProps {
    title: string;
    subtitle: string;
}
export const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
    return (
        <div className="mt-3 mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">{title}</h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
    );
};

interface RouteDesignProps {
    icon: React.ReactNode;
    routeName: string;
    routeDescription: string;
}
export const RouteDesign = ({ icon, routeName, routeDescription }: RouteDesignProps) => {
    return (
        <div className="p-6 text-white">
            <div className="mb-4 flex items-start justify-between">
                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">{icon}</div>
                <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowRight className="h-5 w-5" />
                </div>
            </div>

            <h3 className="mb-2 text-xl font-semibold">{routeName}</h3>
            <p className="translate-y-2 transform text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {routeDescription}
            </p>
        </div>
    );
};
