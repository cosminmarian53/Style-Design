import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Helper Icons (Simple SVGs, you can replace with a library like Heroicons if you prefer)
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


const Admin = () => {
    const [darkMode, setDarkMode] = useState(true); // Assuming your Navbar/Footer manage this
    const toggleDarkMode = () => setDarkMode(!darkMode); // Example toggle

    const [orders, setOrders] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'statistics'

    const API_BASE_URL = 'http://localhost:5001/api'; // Define your API base URL

    // Fetch Orders
    const fetchOrders = useCallback(async () => {
        setIsLoadingOrders(true);
        setError(null);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setError("Authentication token not found. Please login again.");
            setIsLoadingOrders(false);
            // Consider redirecting to login: window.location.href = '/login';
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
        } catch (err) {
            setError(err.message);
            console.error("Fetch orders error:", err);
        } finally {
            setIsLoadingOrders(false);
        }
    }, []);

    // Fetch Statistics
    const fetchStatisticsData = useCallback(async () => {
        setIsLoadingStats(true);
        setError(null); // Clear previous errors
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
            // Process data for Pie chart
            const chartLabels = rawData.map(item => item.coffeeType);
            const chartCounts = rawData.map(item => item.count);

            setStatsData({
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Orders by Coffee Type',
                        data: chartCounts,
                        backgroundColor: [ // Add more colors if you have more types
                            'rgba(255, 99, 132, 0.7)',  // Red
                            'rgba(54, 162, 235, 0.7)', // Blue
                            'rgba(255, 206, 86, 0.7)', // Yellow
                            'rgba(75, 192, 192, 0.7)', // Green
                            'rgba(153, 102, 255, 0.7)',// Purple
                            'rgba(255, 159, 64, 0.7)', // Orange
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            setError(`Statistics Error: ${err.message}`);
            console.error("Fetch statistics error:", err);
        } finally {
            setIsLoadingStats(false);
        }
    }, []);


    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        } else if (activeTab === 'statistics') {
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
            fetchOrders(); // Re-fetch orders to reflect the change
        } catch (err) {
            console.error("Update order status error:", err);
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

    const renderOrders = () => {
        if (isLoadingOrders) return <p className="text-center text-lg py-10">Loading orders...</p>;
        if (!isLoadingOrders && error && activeTab === 'orders') return <p className="text-center text-red-500 text-lg py-10">Error fetching orders: {error}</p>;
        if (orders.length === 0 && !isLoadingOrders) return <p className="text-center text-lg py-10">No orders found.</p>;

        return (
            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className={`rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out 
                        ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                    >
                        <div className={`p-5 ${order.isFulfilled ? (darkMode ? 'bg-green-800 bg-opacity-30' : 'bg-green-50') : ''}`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                                <h3 className={`text-xl font-semibold break-all ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                    Order ID: <span className="font-mono text-sm">{order._id}</span>
                                </h3>
                                <span
                                    className={`mt-2 sm:mt-0 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full flex items-center
                              ${order.isFulfilled
                                            ? (darkMode ? 'bg-green-500 text-white' : 'bg-green-200 text-green-800')
                                            : (darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-200 text-yellow-800')
                                        }`}
                                >
                                    {order.isFulfilled ? <CheckCircleIcon /> : <ClockIcon />}
                                    {order.isFulfilled ? 'Fulfilled' : 'Pending'}
                                </span>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
                                <p><strong>Email:</strong> <a href={`mailto:${order.email}`} className="hover:underline">{order.email}</a></p>
                                <p><strong>Location:</strong> {order.location}</p>
                                <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                                <p><strong>Coffee Type:</strong> {order.coffeeType}</p>
                                <p><strong>Roast:</strong> {order.roast}</p>
                            </div>

                            {order.additionalNotes && (
                                <div className="mt-3">
                                    <p className="font-semibold text-sm">Additional Notes:</p>
                                    <p className={`p-3 rounded text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} whitespace-pre-wrap`}>
                                        {order.additionalNotes}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={`px-5 py-3 ${darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-50'}`}>
                            <button
                                onClick={() => handleToggleFulfilled(order._id, order.isFulfilled)}
                                className={`w-full sm:w-auto px-5 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150
                  ${order.isFulfilled
                                        ? (darkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-400' : 'bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-yellow-300')
                                        : (darkMode ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400' : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500')
                                    }`}
                            >
                                {order.isFulfilled ? 'Mark as Pending' : 'Mark as Fulfilled'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderStatistics = () => {
        if (isLoadingStats) return <p className="text-center text-lg py-10">Loading statistics...</p>;
        if (!isLoadingStats && error && activeTab === 'statistics') return <p className="text-center text-red-500 text-lg py-10">Error fetching stats: {error}</p>;
        if (!statsData && !isLoadingStats) return <p className="text-center text-lg py-10">No statistics data available.</p>;

        if (statsData) {
            return (
                <div className={`p-4 md:p-8 rounded-lg shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-2xl font-semibold mb-6 text-center ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        Coffee Orders by Type
                    </h3>
                    <div className="max-w-md mx-auto h-72 md:h-96"> {/* Constrain size for better display */}
                        <Pie
                            data={statsData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        labels: {
                                            color: darkMode ? 'white' : 'black',
                                            font: { size: 14 }
                                        }
                                    },
                                    title: {
                                        display: false, // Title is handled by h3 above
                                    },
                                    tooltip: {
                                        titleFont: { size: 16 },
                                        bodyFont: { size: 14 },
                                        callbacks: {
                                            label: function (context) {
                                                let label = context.label || '';
                                                if (label) {
                                                    label += ': ';
                                                }
                                                if (context.parsed !== null) {
                                                    label += context.parsed + ' order(s)';
                                                }
                                                return label;
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            );
        }
        return null; // Should be covered by earlier checks
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-gray-100' : 'bg-slate-100 text-gray-900'} pt-8 pb-16 px-4 sm:px-6 lg:px-8`}>
                <header className="max-w-4xl mx-auto mb-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Admin <span className={darkMode ? "text-yellow-400" : "text-yellow-600"}>Dashboard</span>
                        </h1>
                        <button
                            onClick={handleLogout}
                            className={`px-5 py-2.5 text-sm font-medium rounded-lg shadow-md transition-transform hover:scale-105
                ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div className={`max-w-4xl mx-auto mb-8 sticky top-0 z-10 py-2 ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                    <div className={`flex justify-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        {['orders', 'statistics'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-3 px-4 sm:px-6 text-sm sm:text-base font-semibold capitalize transition-all duration-150 focus:outline-none
                  ${activeTab === tab
                                        ? (darkMode ? 'border-yellow-400 text-yellow-400' : 'border-yellow-600 text-yellow-600') + ' border-b-2'
                                        : (darkMode ? 'text-gray-400 hover:text-yellow-500 border-transparent' : 'text-gray-500 hover:text-yellow-700 border-transparent') + ' border-b-2 hover:border-gray-400'
                                    }`}
                            >
                                {tab === 'orders' ? 'Manage Orders' : 'View Statistics'}
                            </button>
                        ))}
                    </div>
                </div>

                {error && activeTab !== 'orders' && activeTab !== 'statistics' && ( // General error display if not tab specific
                    <div className="max-w-4xl mx-auto my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                        Global Error: {error}
                    </div>
                )}

                <main className="max-w-4xl mx-auto">
                    {activeTab === 'orders' && renderOrders()}
                    {activeTab === 'statistics' && renderStatistics()}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;