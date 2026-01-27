import React from 'react';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
      <div className="container py-5">
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
          {/* Vendors card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Vendors</h5>
                <div className="display-4 fw-bold text-primary">12</div>
              </div>
            </div>
          </div>
          
          {/* Pending POs card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Pending POs</h5>
                <div className="display-4 fw-bold text-warning">3</div>
              </div>
            </div>
          </div>
          
          {/* Inventory Items card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Inventory Items</h5>
                <div className="display-4 fw-bold text-success">45</div>
              </div>
            </div>
          </div>

          {/* Total Orders card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Total Orders</h5>
                <div className="display-4 fw-bold text-info">128</div>
              </div>
            </div>
          </div>
        </div>

        {/* Second row of statistics */}
        <div className="row g-4 mb-4">
          {/* Active Contracts card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Active Contracts</h5>
                <div className="display-4 fw-bold text-secondary">8</div>
              </div>
            </div>
          </div>

          {/* Monthly Spend card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Monthly Spend</h5>
                <div className="display-4 fw-bold text-danger">$45K</div>
              </div>
            </div>
          </div>

          {/* Approved Requests card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Approved Requests</h5>
                <div className="display-4 fw-bold text-success">24</div>
              </div>
            </div>
          </div>

          {/* Pending Approvals card */}
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted mb-3">Pending Approvals</h5>
                <div className="display-4 fw-bold text-warning">7</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Recent Purchase Orders</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>PO-2024-001</strong>
                      <br />
                      <small className="text-muted">Office Supplies - ABC Corp</small>
                    </div>
                    <span className="badge bg-success">Approved</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>PO-2024-002</strong>
                      <br />
                      <small className="text-muted">IT Equipment - Tech Solutions</small>
                    </div>
                    <span className="badge bg-warning">Pending</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>PO-2024-003</strong>
                      <br />
                      <small className="text-muted">Furniture - Design Co</small>
                    </div>
                    <span className="badge bg-info">In Progress</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>PO-2024-004</strong>
                      <br />
                      <small className="text-muted">Cleaning Services - Clean Pro</small>
                    </div>
                    <span className="badge bg-success">Approved</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Top Vendors</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>ABC Corporation</strong>
                      <br />
                      <small className="text-muted">Office Supplies</small>
                    </div>
                    <span className="text-primary fw-bold">$12,500</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Tech Solutions Inc</strong>
                      <br />
                      <small className="text-muted">IT Equipment</small>
                    </div>
                    <span className="text-primary fw-bold">$8,900</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Design Co</strong>
                      <br />
                      <small className="text-muted">Furniture & Fixtures</small>
                    </div>
                    <span className="text-primary fw-bold">$6,750</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Clean Pro Services</strong>
                      <br />
                      <small className="text-muted">Maintenance</small>
                    </div>
                    <span className="text-primary fw-bold">$4,200</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
