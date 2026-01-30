import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const { logout } = useAuth();

  // Combined data from all accounts
  const allAccountsData = [
    // Amazon orders
    { id: 1, orderId: 'AMZ-001', product: 'Laptop Stand', quantity: 5, price: 2500, status: 'Delivered', date: '2024-01-15', account: 'Amazon' },
    { id: 2, orderId: 'AMZ-002', product: 'Wireless Mouse', quantity: 10, price: 800, status: 'Shipped', date: '2024-01-18', account: 'Amazon' },
    { id: 3, orderId: 'AMZ-003', product: 'USB-C Cable', quantity: 20, price: 300, status: 'Processing', date: '2024-01-20', account: 'Amazon' },
    { id: 4, orderId: 'AMZ-004', product: 'Keyboard', quantity: 8, price: 1500, status: 'Delivered', date: '2024-01-22', account: 'Amazon' },
    { id: 5, orderId: 'AMZ-005', product: 'Monitor', quantity: 3, price: 15000, status: 'Pending', date: '2024-01-25', account: 'Amazon' },
    // Flipkart orders
    { id: 6, orderId: 'FLK-001', product: 'Office Chair', quantity: 12, price: 8500, status: 'Delivered', date: '2024-01-10', account: 'Flipkart' },
    { id: 7, orderId: 'FLK-002', product: 'Desk Lamp', quantity: 15, price: 1200, status: 'Shipped', date: '2024-01-14', account: 'Flipkart' },
    { id: 8, orderId: 'FLK-003', product: 'Notebook Set', quantity: 50, price: 250, status: 'Delivered', date: '2024-01-16', account: 'Flipkart' },
    { id: 9, orderId: 'FLK-004', product: 'Pen Stand', quantity: 25, price: 150, status: 'Processing', date: '2024-01-19', account: 'Flipkart' },
    { id: 10, orderId: 'FLK-005', product: 'Whiteboard', quantity: 5, price: 3500, status: 'Pending', date: '2024-01-23', account: 'Flipkart' },
    // Zepto orders
    { id: 11, orderId: 'ZPT-001', product: 'Coffee Beans', quantity: 30, price: 450, status: 'Delivered', date: '2024-01-12', account: 'Zepto' },
    { id: 12, orderId: 'ZPT-002', product: 'Tea Bags', quantity: 40, price: 200, status: 'Delivered', date: '2024-01-13', account: 'Zepto' },
    { id: 13, orderId: 'ZPT-003', product: 'Snacks Pack', quantity: 25, price: 350, status: 'Shipped', date: '2024-01-17', account: 'Zepto' },
    { id: 14, orderId: 'ZPT-004', product: 'Water Bottles', quantity: 50, price: 100, status: 'Processing', date: '2024-01-21', account: 'Zepto' },
    { id: 15, orderId: 'ZPT-005', product: 'Paper Cups', quantity: 100, price: 50, status: 'Delivered', date: '2024-01-24', account: 'Zepto' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter data based on search and status
  const filteredData = allAccountsData.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.account.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-success';
      case 'Shipped': return 'bg-info';
      case 'Processing': return 'bg-warning';
      case 'Pending': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  // Calculate statistics
  const totalOrders = filteredData.length;
  const totalQuantity = filteredData.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = filteredData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveredCount = filteredData.filter(item => item.status === 'Delivered').length;

  // Prepare chart data
  // Orders by Account
  const ordersByAccount = [
    { name: 'Amazon', orders: allAccountsData.filter(item => item.account === 'Amazon').length, value: allAccountsData.filter(item => item.account === 'Amazon').reduce((sum, item) => sum + (item.price * item.quantity), 0) },
    { name: 'Flipkart', orders: allAccountsData.filter(item => item.account === 'Flipkart').length, value: allAccountsData.filter(item => item.account === 'Flipkart').reduce((sum, item) => sum + (item.price * item.quantity), 0) },
    { name: 'Zepto', orders: allAccountsData.filter(item => item.account === 'Zepto').length, value: allAccountsData.filter(item => item.account === 'Zepto').reduce((sum, item) => sum + (item.price * item.quantity), 0) },
  ];

  // Orders by Status
  const ordersByStatus = [
    { name: 'Delivered', value: allAccountsData.filter(item => item.status === 'Delivered').length },
    { name: 'Shipped', value: allAccountsData.filter(item => item.status === 'Shipped').length },
    { name: 'Processing', value: allAccountsData.filter(item => item.status === 'Processing').length },
    { name: 'Pending', value: allAccountsData.filter(item => item.status === 'Pending').length },
  ];

  // Orders over time (by date)
  const ordersByDate = allAccountsData.reduce((acc, item) => {
    const existing = acc.find(d => d.date === item.date);
    if (existing) {
      existing.orders += 1;
      existing.value += item.price * item.quantity;
    } else {
      acc.push({ date: item.date, orders: 1, value: item.price * item.quantity });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const ACCOUNT_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D'];

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
      <div className="container-fluid py-5">
        <header className="bg-white rounded shadow-lg p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-2" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Procurement Dashboard
              </h1>
              <p className="text-muted mb-0">Welcome back! Manage your procurement operations.</p>
            </div>
            <button
              onClick={logout}
              className="btn btn-danger d-flex align-items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Statistics cards in a responsive grid */}
        <div className="row g-4 mb-4">
          {/* Total Orders card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Total Orders</h5>
                <div className="display-4 fw-bold text-primary">{totalOrders}</div>
              </div>
            </div>
          </div>
          
          {/* Total Quantity card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Total Quantity</h5>
                <div className="display-4 fw-bold text-success">{totalQuantity}</div>
              </div>
            </div>
          </div>
          
          {/* Total Value card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Total Value</h5>
                <div className="display-4 fw-bold text-info">₹{totalValue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Delivered Orders card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Delivered</h5>
                <div className="display-4 fw-bold text-success">{deliveredCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row g-4 mb-4">
          {/* Orders by Account - Bar Chart */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Orders by Account</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ordersByAccount}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8" name="Number of Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Orders by Status - Pie Chart */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Orders by Status</h5>
              </div>
              <div className="card-body d-flex justify-content-center align-items-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ordersByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ordersByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="row g-4 mb-4">
          {/* Revenue by Account - Bar Chart */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Revenue by Account</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ordersByAccount}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Total Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Orders Over Time - Line Chart */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Orders Over Time</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ordersByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product, order ID, or account..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0 fw-bold">All Orders</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Account</th>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price (₹)</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="badge bg-dark">{item.account}</span>
                        </td>
                        <td className="fw-bold">{item.orderId}</td>
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.date}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
