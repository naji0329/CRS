import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <div className="n-container text-center">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline">Administrator</h1>

        <div className="grid sm:grid-cols-2 gap-10 mt-20">
          <Link to={'/admin/technicianlist/get'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Technician List
            </div>
          </Link>
          <Link to={'/admin/maincomponentlist/get'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Main Component List Items
            </div>
          </Link>
          <Link to={'/admin/customerprofile/create'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Create Customer profile
            </div>
          </Link>
          <Link to={'/admin/secondarylist/create'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Create Secondary list items
            </div>
          </Link>
          <Link to={'/admin/equipment/create'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Create Equipment profile
            </div>
          </Link>
          <Link to={'/admin/maintenanceplanchecklist/create'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Create Maintenance Plan Check List
            </div>
          </Link>
          <Link to={'/admin/past_maintenance_report/create'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Load a Past Maintenance Report
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
