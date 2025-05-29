import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Icons
const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ChartIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

const OrderIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const LogoutIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
);

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [orderStats, setOrderStats] = useState({
        total: 0,
        fulfilled: 0,
        pending: 0
    });
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('orders');
    const API_BASE_URL = 'http://localhost:5001/api';

    // Fetch Orders
    const fetchOrders = useCallback(async () => {
        setIsLoadingOrders(true);
        setError(null);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setError("Authentication token not found. Please login again.");
            setIsLoadingOrders(false);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || `Failed to fetch orders: ${response.statusText}`);
            }
            const data = await response.json();
            setOrders(data);

            // Calculate order statistics
            const fulfilled = data.filter(order => order.isFulfilled).length;
            const pending = data.filter(order => !order.isFulfilled).length;
            setOrderStats({
                total: data.length,
                fulfilled: fulfilled,
                pending: pending
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoadingOrders(false);
        }
    }, []);

    // Fetch Statistics
    const fetchStatisticsData = useCallback(async () => {
        setIsLoadingStats(true);
        setError(null);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setError("Authentication token not found for stats. Please login again.");
            setIsLoadingStats(false);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/admin/stats/coffee-types`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || `Failed to fetch statistics: ${response.statusText}`);
            }
            const rawData = await response.json();
            const chartLabels = rawData.map(item => item.coffeeType);
            const chartCounts = rawData.map(item => item.count);

            // Calculate total orders from stats
            const totalOrders = chartCounts.reduce((a, b) => a + b, 0);

            setStatsData({
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Orders by Coffee Type',
                        data: chartCounts,
                        backgroundColor: [
                            '#FF6B6B', // coral red
                            '#4ECDC4', // turquoise 
                            '#FFA630', // amber
                            '#44CF6C', // green
                            '#8A5CF5', // purple
                            '#FF8066', // salmon
                        ].slice(0, chartLabels.length),
                        borderColor: [
                            '#ffffff',
                            '#ffffff',
                            '#ffffff',
                            '#ffffff',
                            '#ffffff',
                            '#ffffff',
                        ].slice(0, chartLabels.length),
                        borderWidth: 2,
                        hoverOffset: 10,
                    },
                ],
                totalOrders
            });
        } catch (err) {
            setError(`Statistics Error: ${err.message}`);
        } finally {
            setIsLoadingStats(false);
        }
    }, []);

    useEffect(() => {
        // Always fetch orders for statistics
        fetchOrders();

        if (activeTab === 'statistics') {
            fetchStatisticsData();
        }
    }, [activeTab, fetchOrders, fetchStatisticsData]);

    const handleToggleFulfilled = async (orderId, currentStatus) => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            alert("Authentication token not found. Please login again.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ isFulfilled: !currentStatus }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to update order status');
            }
            fetchOrders();
        } catch (err) {
            alert(`Error updating order: ${err.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // Render the statistics dashboard cards
    const renderStatCards = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Orders Card */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col justify-between animate-slide-in">
                    <div className="flex justify-between items-start">
                        <h3 className="text-white text-lg font-semibold">Total Orders</h3>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <OrderIcon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-white">{orderStats.total}</p>
                        <p className="text-sm text-blue-100 mt-1">All-time coffee orders</p>
                    </div>
                </div>

                {/* Fulfilled Orders Card */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 flex flex-col justify-between animate-slide-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex justify-between items-start">
                        <h3 className="text-white text-lg font-semibold">Fulfilled</h3>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <CheckCircleIcon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-white">{orderStats.fulfilled}</p>
                        <p className="text-sm text-emerald-100 mt-1">Completed orders</p>
                    </div>
                </div>

                {/* Pending Orders Card */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 flex flex-col justify-between animate-slide-in" style={{ animationDelay: "0.4s" }}>
                    <div className="flex justify-between items-start">
                        <h3 className="text-white text-lg font-semibold">Pending</h3>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <ClockIcon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-white">{orderStats.pending}</p>
                        <p className="text-sm text-amber-100 mt-1">Awaiting fulfillment</p>
                    </div>
                </div>
            </div>
        );
    };

    // Renders the list of orders
    const renderOrders = () => {
        if (isLoadingOrders) return (
            <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );

        if (!isLoadingOrders && error && activeTab === 'orders') return (
            <div className="bg-red-900/40 border border-red-700/50 text-red-300 rounded-xl p-6 text-center">
                <p className="text-lg font-semibold">Error fetching orders:</p>
                <p>{error}</p>
            </div>
        );

        if (orders.length === 0 && !isLoadingOrders) return (
            <div className="bg-stone-800/50 border border-stone-700/50 text-stone-300 rounded-xl p-12 text-center">
                <p className="text-xl font-semibold">No orders found</p>
                <p className="mt-2 text-stone-400">When customers place orders, they'll appear here.</p>
            </div>
        );

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order, i) => (
                    <div
                        key={order._id}
                        className={`relative rounded-xl overflow-hidden shadow-lg bg-[#1A1A1A] border border-[#36312b] 
                        transition transform duration-300 hover:-translate-y-1 hover:shadow-amber-500/20 flex flex-col
                        animate-fade-in`}
                        style={{ animationDelay: `${i * 0.1}s`, minHeight: 230 }}
                    >
                        <div className={`px-4 pt-4 pb-2 flex justify-between items-center`}>
                            <span className="text-xs tracking-widest text-amber-400 font-bold">#{order._id.slice(-6)}</span>
                            <span
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium text-xs 
                                ${order.isFulfilled
                                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-600/30'
                                        : 'bg-amber-600/30 text-amber-300 border border-amber-500/30'
                                    } transition`}
                            >
                                {order.isFulfilled ? <CheckCircleIcon /> : <ClockIcon />}
                                {order.isFulfilled ? 'Fulfilled' : 'Pending'}
                            </span>
                        </div>
                        <div className="px-4 pb-3 pt-1">
                            <div className="font-semibold text-lg text-white mb-1">{order.firstName} {order.lastName}</div>
                            <div className="text-xs text-[#d1cfc8] mb-1 flex flex-col gap-0.5">
                                <span><span className="font-semibold">Email:</span> <a href={`mailto:${order.email}`} className="hover:text-amber-400 transition">{order.email}</a></span>
                                <span><span className="font-semibold">Location:</span> {order.location}</span>
                                <span><span className="font-semibold">Date:</span> {formatDate(order.orderDate)}</span>
                                <span><span className="font-semibold">Coffee:</span> {order.coffeeType} <span className="pl-1 text-xs font-normal text-yellow-600">({order.roast})</span></span>
                            </div>
                            {order.additionalNotes && (
                                <div className="mt-2.5 bg-[#28251f] rounded-lg p-2.5 text-xs text-[#ffe7b3] max-h-16 overflow-y-auto">
                                    <span className="font-bold text-amber-400">Notes: </span>{order.additionalNotes}
                                </div>
                            )}
                        </div>
                        <div className="flex-1" />
                        <div className="p-4 pt-3 flex justify-end items-center">
                            <button
                                onClick={() => handleToggleFulfilled(order._id, order.isFulfilled)}
                                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md font-medium text-sm 
                                transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-400
                                hover:scale-105
                                ${order.isFulfilled
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700'
                                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                                    }`}
                            >
                                {order.isFulfilled ? 'Mark Pending' : 'Mark Fulfilled'}
                            </button>
                        </div>
                        {/* Colored bar at bottom */}
                        <div className={`h-1 w-full ${order.isFulfilled ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    </div>
                ))}
            </div>
        );
    };

    // Renders the statistics charts
    const renderStatistics = () => {
        if (isLoadingStats) return (
            <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );

        if (!isLoadingStats && error && activeTab === 'statistics') return (
            <div className="bg-red-900/40 border border-red-700/50 text-red-300 rounded-xl p-6 text-center">
                <p className="text-lg font-semibold">Error fetching statistics:</p>
                <p>{error}</p>
            </div>
        );

        if (!statsData && !isLoadingStats) return (
            <div className="bg-stone-800/50 border border-stone-700/50 text-stone-300 rounded-xl p-12 text-center">
                <p className="text-xl font-semibold">No statistics available</p>
                <p className="mt-2 text-stone-400">When orders come in, you'll see analytics here.</p>
            </div>
        );

        if (statsData) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Orders by Coffee Type Chart */}
                    <div className="bg-[#1A1A1A] border border-[#36312b] rounded-xl shadow-lg p-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-amber-400 text-center mb-4 tracking-wide">Coffee Orders by Type</h3>
                        <div className="h-80">
                            <Pie
                                data={statsData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                color: "#f5e6c8",
                                                font: { size: 14 },
                                                usePointStyle: true,
                                                padding: 20,
                                            }
                                        },
                                        tooltip: {
                                            backgroundColor: "#1c1917",
                                            titleColor: "#fde68a",
                                            bodyColor: "#fff7e1",
                                            borderColor: "#eab308",
                                            borderWidth: 1,
                                            padding: 12,
                                            cornerRadius: 8,
                                            callbacks: {
                                                label: function (context) {
                                                    const value = context.parsed;
                                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                    const percentage = Math.round((value / total * 100) * 10) / 10;
                                                    return ` ${context.label}: ${value} (${percentage}%)`;
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Coffee Orders Distribution */}
                    <div className="bg-[#1A1A1A] border border-[#36312b] rounded-xl shadow-lg p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <h3 className="text-xl font-bold text-amber-400 text-center mb-4 tracking-wide">Coffee Orders Distribution</h3>
                        <div className="space-y-6 mt-8">
                            {statsData.labels.map((label, index) => (
                                <div key={label} className="relative">
                                    <div className="flex justify-between mb-1.5">
                                        <span className="text-[#f5e6c8] text-sm font-medium">{label}</span>
                                        <span className="text-[#f5e6c8] text-sm font-medium">{statsData.datasets[0].data[index]}</span>
                                    </div>
                                    <div className="w-full bg-stone-800 rounded-full h-2.5">
                                        <div
                                            className="h-2.5 rounded-full"
                                            style={{
                                                width: `${(statsData.datasets[0].data[index] / statsData.totalOrders) * 100}%`,
                                                backgroundColor: statsData.datasets[0].backgroundColor[index]
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-[#121212] text-[#ffe7b3] font-sans">
            <Navbar darkMode={true} toggleDarkMode={() => { }} />
            <div className="max-w-7xl mx-auto pt-8 pb-24 px-4 md:px-6">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-amber-400 mb-1">
                            AZTEK Admin Dashboard
                        </h1>
                        <p className="text-stone-400">Manage your coffee orders and view statistics</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-400 
                        rounded-lg shadow-md border border-stone-700 transition-colors duration-200 font-medium"
                    >
                        <LogoutIcon />
                        Logout
                    </button>
                </div>

                {/* Statistics Summary Cards */}
                {renderStatCards()}

                {/* Tab Navigation */}
                <div className="flex justify-start mb-6 border-b border-[#36312b]">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-6 py-3 text-base font-semibold tracking-wide transition-colors relative
                        ${activeTab === 'orders'
                                ? 'text-amber-400 border-amber-400'
                                : 'text-stone-400 hover:text-stone-200 border-transparent'
                            }`}
                    >
                        <OrderIcon className={activeTab === 'orders' ? 'text-amber-400' : 'text-stone-400'} />
                        Manage Orders
                        {activeTab === 'orders' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('statistics')}
                        className={`flex items-center gap-2 px-6 py-3 text-base font-semibold tracking-wide transition-colors relative
                        ${activeTab === 'statistics'
                                ? 'text-amber-400 border-amber-400'
                                : 'text-stone-400 hover:text-stone-200 border-transparent'
                            }`}
                    >
                        <ChartIcon className={activeTab === 'statistics' ? 'text-amber-400' : 'text-stone-400'} />
                        View Statistics
                        {activeTab === 'statistics' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"></div>}
                    </button>
                </div>

                {/* Main Content */}
                <main>
                    {activeTab === 'orders' && renderOrders()}
                    {activeTab === 'statistics' && renderStatistics()}
                </main>
            </div>
            <Footer />

            {/* Animations */}
            <style jsx>{`
                @keyframes fadeInAztek { 
                    from { opacity: 0; transform: translateY(16px); } 
                    to { opacity: 1; transform: none; } 
                }
                @keyframes slideIn { 
                    from { opacity: 0; transform: translateX(-20px); } 
                    to { opacity: 1; transform: none; } 
                }
                .animate-fade-in { 
                    animation: fadeInAztek .6s cubic-bezier(.4,0,.2,1) forwards; 
                    opacity: 0;
                }
                .animate-slide-in { 
                    animation: slideIn .5s cubic-bezier(.4,0,.2,1) forwards; 
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default Admin;