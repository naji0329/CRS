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
        <h1 className="text-4xl font-bold underline">Technician</h1>

        <div className="grid sm:grid-cols-2 gap-10 mt-20">
          <Link to={'/technician/pmp'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Pick Maintenance Plan
            </div>
          </Link>
          {/* <Link to={'/technician/oicl'}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Onsite Interactive Check List
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
