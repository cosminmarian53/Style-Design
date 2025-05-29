import React from 'react';

// Icons
const CheckCircleIcon = ({ className = "me-1" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} width="14" height="14">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ClockIcon = ({ className = "me-1" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} width="14" height="14">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const OrderCard = ({ order, onToggleFulfilled, formatDate, animationDelay }) => {
    if (!order) return null;

    return (
        <div
            className="card h-100 bg-dark border animate-fade-in"
            style={{ animationDelay: animationDelay }}
        >
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title small fw-bold text-warning">
                        Order #{order._id.slice(-6)}
                    </h5>
                    <span
                        className={`badge d-flex align-items-center 
                        ${order.isFulfilled ? 'bg-success text-white' : 'bg-warning text-dark'}`}
                    >
                        {order.isFulfilled ? <CheckCircleIcon /> : <ClockIcon />}
                        <span>{order.isFulfilled ? 'Fulfilled' : 'Pending'}</span>
                    </span>
                </div>

                <p className="card-text fw-semibold text-light mb-2">
                    {order.firstName} {order.lastName}
                </p>

                <dl className="small mb-2">
                    <dt className="visually-hidden">Email</dt>
                    <dd className="mb-1">
                        <span className="text-muted">Email:</span>&nbsp;
                        <a href={`mailto:${order.email}`} className="text-decoration-none text-light">{order.email}</a>
                    </dd>

                    <dt className="visually-hidden">Location</dt>
                    <dd className="mb-1">
                        <span className="text-muted">Location:</span>&nbsp;
                        <span>{order.location}</span>
                    </dd>

                    <dt className="visually-hidden">Date</dt>
                    <dd className="mb-1">
                        <span className="text-muted">Date:</span>&nbsp;
                        <span>{formatDate(order.orderDate)}</span>
                    </dd>

                    <dt className="visually-hidden">Coffee</dt>
                    <dd className="mb-1">
                        <span className="text-muted">Coffee:</span>&nbsp;
                        <span>{order.coffeeType} <span className="text-warning">({order.roast})</span></span>
                    </dd>
                </dl>

                {order.additionalNotes && (
                    <div className="small mb-3 p-2 bg-secondary bg-opacity-55 rounded">
                        <span className="fw-bold text-warning">Notes: </span>
                        <span>{order.additionalNotes}</span>
                    </div>
                )}

                <div className="mt-auto">
                    <button
                        onClick={() => onToggleFulfilled(order._id, order.isFulfilled)}
                        className={`btn btn-sm w-100 
                        ${order.isFulfilled
                                ? 'btn-outline-warning'
                                : 'btn-success'}`}
                    >
                        {order.isFulfilled ? 'Mark Pending' : 'Mark Fulfilled'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;