import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountTable = () => {
  const { accountName } = useParams();
  const { logout } = useAuth();

  // Sample data for different accounts
  const [accountData, setAccountData] = useState({
    amazon: [
      { id: 1, orderId: 'AMZ-001', product: 'Laptop Stand', quantity: 5, price: 2500, status: 'Delivered', date: '2024-01-15' },
      { id: 2, orderId: 'AMZ-002', product: 'Wireless Mouse', quantity: 10, price: 800, status: 'Shipped', date: '2024-01-18' },
      { id: 3, orderId: 'AMZ-003', product: 'USB-C Cable', quantity: 20, price: 300, status: 'Processing', date: '2024-01-20' },
      { id: 4, orderId: 'AMZ-004', product: 'Keyboard', quantity: 8, price: 1500, status: 'Delivered', date: '2024-01-22' },
      { id: 5, orderId: 'AMZ-005', product: 'Monitor', quantity: 3, price: 15000, status: 'Pending', date: '2024-01-25' },
    ],
    flipkart: [
      { id: 1, orderId: 'FLK-001', product: 'Office Chair', quantity: 12, price: 8500, status: 'Delivered', date: '2024-01-10' },
      { id: 2, orderId: 'FLK-002', product: 'Desk Lamp', quantity: 15, price: 1200, status: 'Shipped', date: '2024-01-14' },
      { id: 3, orderId: 'FLK-003', product: 'Notebook Set', quantity: 50, price: 250, status: 'Delivered', date: '2024-01-16' },
      { id: 4, orderId: 'FLK-004', product: 'Pen Stand', quantity: 25, price: 150, status: 'Processing', date: '2024-01-19' },
      { id: 5, orderId: 'FLK-005', product: 'Whiteboard', quantity: 5, price: 3500, status: 'Pending', date: '2024-01-23' },
    ],
    zepto: [
      { id: 1, orderId: 'ZPT-001', product: 'Coffee Beans', quantity: 30, price: 450, status: 'Delivered', date: '2024-01-12' },
      { id: 2, orderId: 'ZPT-002', product: 'Tea Bags', quantity: 40, price: 200, status: 'Delivered', date: '2024-01-13' },
      { id: 3, orderId: 'ZPT-003', product: 'Snacks Pack', quantity: 25, price: 350, status: 'Shipped', date: '2024-01-17' },
      { id: 4, orderId: 'ZPT-004', product: 'Water Bottles', quantity: 50, price: 100, status: 'Processing', date: '2024-01-21' },
      { id: 5, orderId: 'ZPT-005', product: 'Paper Cups', quantity: 100, price: 50, status: 'Delivered', date: '2024-01-24' },
    ],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState('');

  const data = accountData[accountName] || [];

  // Filter data based on search and status
  const filteredData = data.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditedQuantity(item.quantity);
  };

  const handleSave = (itemId) => {
    // Update the quantity in the data for the current account
    setAccountData(prevData => ({
      ...prevData,
      [accountName]: prevData[accountName].map(item => 
        item.id === itemId 
          ? { ...item, quantity: parseInt(editedQuantity) || item.quantity }
          : item
      )
    }));
    setEditingId(null);
    setEditedQuantity('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedQuantity('');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-success';
      case 'Shipped': return 'bg-info';
      case 'Processing': return 'bg-warning';
      case 'Pending': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  const capitalizeAccountName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
      <div className="container-fluid py-5">
        <header className="bg-white rounded shadow-lg p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-2" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                {capitalizeAccountName(accountName)} Orders
              </h1>
              <p className="text-muted mb-0">View and manage orders from {capitalizeAccountName(accountName)}</p>
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

        {/* Filters and Search */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product or order ID..."
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
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
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
                        <td className="fw-bold">{item.orderId}</td>
                        <td>{item.product}</td>
                        <td>
                          {item.status === 'Pending' && editingId === item.id ? (
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: '80px' }}
                              value={editedQuantity}
                              onChange={(e) => setEditedQuantity(e.target.value)}
                              min="1"
                            />
                          ) : (
                            item.quantity
                          )}
                        </td>
                        <td>₹{item.price.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.date}</td>
                        <td>
                          {item.status === 'Pending' ? (
                            editingId === item.id ? (
                              <div className="d-flex gap-1">
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => handleSave(item.id)}
                                  title="Save"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                  </svg>
                                </button>
                                <button
                                  className="btn btn-sm btn-secondary"
                                  onClick={handleCancel}
                                  title="Cancel"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(item)}
                                title="Edit Quantity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                </svg>
                              </button>
                            )
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="row g-4 mt-2">
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted mb-2">Total Orders</h6>
                <h3 className="fw-bold text-primary">{filteredData.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted mb-2">Total Quantity</h6>
                <h3 className="fw-bold text-success">
                  {filteredData.reduce((sum, item) => sum + item.quantity, 0)}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted mb-2">Total Value</h6>
                <h3 className="fw-bold text-info">
                  ₹{filteredData.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-muted mb-2">Delivered</h6>
                <h3 className="fw-bold text-success">
                  {filteredData.filter(item => item.status === 'Delivered').length}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTable;
