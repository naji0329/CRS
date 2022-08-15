import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function Pmp() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();
  const [selectedTechnician, setSelectedTechnician] = useState();

  useEffect(() => {
    async function getPlans() {
      console.log('getPlans');
      const res = await api.get('/maintenanceplanchecklists/getPlans');
      setPlans(res.data);
    }
    getPlans();
  }, []);

  const [technicians, setTechnicians] = useState([]);
  useEffect(() => {
    async function getTechnicianData() {
      const res = await api.get('/technicianlists');
      setTechnicians(res.data);
    }
    getTechnicianData();
  }, []);

  async function nextPage() {
    if (selectedPlan) {
      navigate(`/technician/plan?planId=${selectedPlan}&technicianId=${selectedTechnician}`);
    } else {
      alert('Please Select Plan');
    }
  }

  return (
    <div>
      <div className="n-container text-center">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline">Pick Maintenance Plan</h1>

        <div className="mt-20 max-w-[400px] m-auto text-left">
          <p>Technician Name</p>
          <select
            className="border border-[#5C6BC0] px-2 py-2 w-full rounded shadow-sm mt-2"
            onChange={(e) => setSelectedTechnician(e.target.value)}>
            <option>Select Technician</option>
            {technicians.map((row, key) => {
              return (
                <option key={key} value={row._id}>
                  {row.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-10 max-w-[400px] m-auto text-left">
          <p>Pick Plan</p>
          <select
            className="border border-[#5C6BC0] px-2 py-2 w-full rounded shadow-sm mt-2"
            onChange={(e) => setSelectedPlan(e.target.value)}>
            <option>Select Plan</option>
            {plans.map((row, key) => {
              return (
                <option key={key} value={row._id}>
                  {row.planName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mt-10 flex justify-center items-center gap-5">
          <div className="">
            <Link to={'/admin/dashboard'}>
              <button className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
                Back
              </button>
            </Link>
          </div>
          <div>
            <input
              type="submit"
              value={'Next'}
              onClick={() => nextPage()}
              className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pmp;
