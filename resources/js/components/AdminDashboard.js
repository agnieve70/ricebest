import React, { useEffect } from 'react'
import Sidebar from './admin/Sidebar';
import TabContent from './admin/TabContent';

function AdminDashboard() {

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return (
      <div>
        <h6 className="text-center">Please Use Computer or Laptop to View Admin Dashboard</h6>
      </div>
    )
  }

 

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      window.location.href = "/";
    }
  })
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <TabContent />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard