import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import OrderCard from '../components/OrderCard';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Icons (kept here as they are also used by StatCards, otherwise could be in a shared file)
const CheckCircleIcon = ({ className = "w-3.5 h-3.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ClockIcon = ({ className = "w-3.5 h-3.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ChartIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

const OrderIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

const LogoutIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
);

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [orderStats, setOrderStats] = useState({ total: 0, fulfilled: 0, pending: 0 });
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('orders');
    const [darkMode, setDarkMode] = useState(true);
    const API_BASE_URL = 'http://localhost:5001/api';

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const fetchOrders = useCallback(async () => {
        // Fetch implementation unchanged
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
            const fulfilled = data.filter(order => order.isFulfilled).length;
            const pending = data.filter(order => !order.isFulfilled).length;
            setOrderStats({ total: data.length, fulfilled, pending });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoadingOrders(false);
        }
    }, []);

    const fetchStatisticsData = useCallback(async () => {
        // Fetch stats implementation unchanged
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
            const totalOrders = chartCounts.reduce((a, b) => a + b, 0);
            setStatsData({
                labels: chartLabels,
                datasets: [{
                    label: 'Orders by Coffee Type',
                    data: chartCounts,
                    backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFA630', '#44CF6C', '#8A5CF5', '#FF8066'].slice(0, chartLabels.length),
                    borderColor: ['#ffffff'].slice(0, chartLabels.length),
                    borderWidth: 1,
                    hoverOffset: 6,
                }],
                totalOrders
            });
        } catch (err) {
            setError(`Statistics Error: ${err.message}`);
        } finally {
            setIsLoadingStats(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
        if (activeTab === 'statistics') {
            fetchStatisticsData();
        }
    }, [activeTab, fetchOrders, fetchStatisticsData]);

    const handleToggleFulfilled = async (orderId, currentStatus) => {
        // Handle toggle implementation unchanged
        const token = localStorage.getItem('adminToken');
        if (!token) {
            alert("Authentication token not found. Please login again.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ isFulfilled: !currentStatus }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to update order status');
            }
            fetchOrders(); // Re-fetch orders to update the list
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

    const renderStatCards = () => (
        <div className="row mb-4 g-3">
            {[{
                title: "Total Orders", value: orderStats.total, desc: "All-time coffee orders", icon: OrderIcon, color: "primary"
            }, {
                title: "Fulfilled", value: orderStats.fulfilled, desc: "Completed orders", icon: CheckCircleIcon, color: "success"
            }, {
                title: "Pending", value: orderStats.pending, desc: "Awaiting fulfillment", icon: ClockIcon, color: "warning"
            }].map(card => (
                <div key={card.title} className="col-12 col-md-4">
                    <div className={`card bg-${card.color} text-white animate-slide-in`}>
                        <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5 className="card-title fs-6 mb-0">{card.title}</h5>
                                <div className="bg-white bg-opacity-25 p-1 rounded">
                                    <card.icon />
                                </div>
                            </div>
                            <p className="fs-4 fw-bold mb-0">{card.value}</p>
                            <p className="small text-white-50">{card.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderOrders = () => {
        if (isLoadingOrders) return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
        if (!isLoadingOrders && error && activeTab === 'orders') return (
            <div className="alert alert-danger text-center small" role="alert">
                <p className="fw-semibold mb-1">Error fetching orders:</p>
                <p className="mb-0">{error}</p>
            </div>
        );
        if (orders.length === 0 && !isLoadingOrders) return (
            <div className="text-center p-5 bg-dark bg-opacity-50 border border-dark rounded">
                <p className="fw-semibold mb-1">No orders found</p>
                <p className="small text-muted mb-0">When customers place orders, they'll appear here.</p>
            </div>
        );

        return (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {orders.map((order, i) => (
                    <div className="col" key={order._id}>
                        <OrderCard
                            order={order}
                            onToggleFulfilled={handleToggleFulfilled}
                            formatDate={formatDate}
                            animationDelay={`${i * 0.03}s`}
                        />
                    </div>
                ))}
            </div>
        );
    };

    const renderStatistics = () => {
        if (isLoadingStats) return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
        if (!isLoadingStats && error && activeTab === 'statistics') return (
            <div className="alert alert-danger text-center small" role="alert">
                <p className="fw-semibold mb-1">Error fetching statistics:</p>
                <p className="mb-0">{error}</p>
            </div>
        );
        if (!statsData && !isLoadingStats) return (
            <div className="text-center p-5 bg-dark bg-opacity-50 border border-dark rounded">
                <p className="fw-semibold mb-1">No statistics available</p>
                <p className="small text-muted mb-0">When orders come in, you'll see analytics here.</p>
            </div>
        );
        if (statsData) {
            return (
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <div className="card bg-dark border">
                            <div className="card-body p-3">
                                <h5 className="card-title text-warning text-center mb-3">Coffee Orders by Type</h5>
                                <div style={{ height: "260px" }}>
                                    <Pie
                                        data={statsData}
                                        options={{
                                            responsive: true, maintainAspectRatio: false,
                                            plugins: {
                                                legend: { position: 'bottom', labels: { color: "#e0ded9", font: { size: 11 }, usePointStyle: true, padding: 10 } },
                                                tooltip: {
                                                    backgroundColor: "#1c1917", titleColor: "#fde68a", bodyColor: "#fff7e1",
                                                    borderColor: "#eab308", borderWidth: 1, padding: 8, cornerRadius: 4,
                                                    callbacks: {
                                                        label: (context) => ` ${context.label}: ${context.parsed} (${Math.round((context.parsed / context.dataset.data.reduce((a, b) => a + b, 0) * 100) * 10) / 10}%)`
                                                    }
                                                }
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card bg-dark border">
                            <div className="card-body p-3">
                                <h5 className="card-title text-warning text-center mb-3">Coffee Orders Distribution</h5>
                                <div className="mt-3">
                                    {statsData.labels.map((label, index) => (
                                        <div key={label} className="mb-2">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="small text-light">{label}</span>
                                                <span className="small text-light">{statsData.datasets[0].data[index]}</span>
                                            </div>
                                            <div className="progress bg-secondary">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${(statsData.datasets[0].data[index] / statsData.totalOrders) * 100}%`,
                                                        backgroundColor: statsData.datasets[0].backgroundColor[index]
                                                    }}
                                                    aria-valuenow={(statsData.datasets[0].data[index] / statsData.totalOrders) * 100}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100">
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-vh-100 font-monospace">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="container py-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
                    <div className="mb-2 mb-md-0">
                        <h1 className="fs-4 fw-bold text-warning mb-1">
                            AZTEK Admin Dashboard
                        </h1>
                        <p className="small text-muted">Manage orders and view statistics</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-warning btn-sm d-inline-flex align-items-center"
                    >
                        <LogoutIcon />
                        <span className="ms-1">Logout</span>
                    </button>
                </div>

                {renderStatCards()}

                <ul className="nav nav-tabs mb-3">
                    {[
                        { label: 'Manage Orders', tab: 'orders', icon: OrderIcon },
                        { label: 'View Statistics', tab: 'statistics', icon: ChartIcon }
                    ].map(item => (
                        <li className="nav-item" key={item.tab}>
                            <button
                                onClick={() => setActiveTab(item.tab)}
                                className={`nav-link d-flex align-items-center ${activeTab === item.tab ? 'active text-warning bg-dark' : 'text-secondary'}`}
                            >
                                <item.icon className="me-1" />
                                <span className="small">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <main>
                    {activeTab === 'orders' && renderOrders()}
                    {activeTab === 'statistics' && renderStatistics()}
                </main>
            </div>
            <Footer />

            <style jsx>{`
                .bg-opacity-25 { opacity: 0.25; }
                .bg-opacity-50 { opacity: 0.50; }
                
                @keyframes fadeInAztek { 
                    from { opacity: 0; transform: translateY(8px); } 
                    to { opacity: 1; transform: none; } 
                }
                @keyframes slideIn { 
                    from { opacity: 0; transform: translateX(-8px); } 
                    to { opacity: 1; transform: none; } 
                }
                .animate-fade-in { 
                    animation: fadeInAztek .3s ease-out forwards; 
                    opacity: 0;
                }
                .animate-slide-in { 
                    animation: slideIn .25s ease-out forwards; 
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default Admin;