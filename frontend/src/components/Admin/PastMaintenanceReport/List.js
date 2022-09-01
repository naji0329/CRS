import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';

function List() {
  const [plans, setPlans] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();
  const [selectedTechnician, setSelectedTechnician] = useState();
  const [technician, setTechnician] = useState();
  const [planInfo, setPlanInfo] = useState();

  useEffect(() => {
    async function getPlans() {
      const res = await api.get('/maintenanceplanchecklists/getPlans');
      setPlans(res.data);
    }
    getPlans();
  }, []);

  useEffect(() => {
    async function getTechnicianData() {
      const res = await api.get('/technicianlists');
      setTechnicians(res.data);
    }
    getTechnicianData();
  }, []);

  useEffect(() => {
    async function getTechnicianData() {
      if (selectedTechnician) {
        const res = await api.get(`technicianlists/getTechnicianById/${selectedTechnician}`);
        setTechnician(res.data);
      }
    }
    getTechnicianData();
  }, [selectedTechnician]);

  useEffect(() => {
    getPlanData();
  }, [selectedTechnician, selectedPlan]);

  async function getPlanData() {
    if (selectedPlan) {
      let res = await api.get(
        `/maintenanceplanchecklists/getPlanForOicl?planId=${selectedPlan}&technicianId=${selectedTechnician}`
      );
      setPlanInfo(res.data);
    }
  }

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Past Maintenance List</h1>

        <div className="flex justify-start gap-10 mt-10 items-center">
          <div className="max-w-[400px] text-left">
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
          <div className="max-w-[400px] text-left">
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
        </div>
        <div className="text-left flex gap-20 mt-3">
          <p>
            Technician: <span className="text-xl">{technician ? technician.name : ''}</span>
          </p>
          <p>
            Plan: <span className="text-xl">{planInfo ? planInfo.planName : ''}</span>
          </p>
          <p>
            Business: <span className="text-xl">{planInfo ? planInfo.business : ''}</span>
          </p>
          <p>
            Date: <span className="text-xl">{planInfo ? planInfo.date : ''}</span>
          </p>
        </div>
        <div className="mt-5">
          <p className="text-lg font-medium">Equipments</p>
          <div className="">
            {planInfo &&
              planInfo.equipments.map((row, key) => {
                return (
                  <div key={key} className="flex gap-10 items-start">
                    <div className="border px-3 py-2 mt-2 rounded-lg border-black/25 min-w-[250px]">
                      <p>brand: {row.brand}</p>
                      <p>description: {row.description}</p>
                      <p>model: {row.model}</p>
                      <p>serialNumber: {row.serialNumber}</p>
                      <p>voltage: {row.voltage}</p>
                    </div>
                    <div>
                      <div>
                        {row.mainComponentlists.length > 0 ? (
                          <p className="mt-4">Main Component List</p>
                        ) : null}
                        <div className="pl-10">
                          {row.mainComponentlists.map((row1, key1) => {
                            const flag = row1.oicl ? true : false;
                            if (flag) {
                              return (
                                <div
                                  key={key1}
                                  className="mt-4 flex justify-start items-start gap-2 border rounded-sm border-black/25 px-2 cursor-pointer">
                                  <div>
                                    <p>{row1.name}</p>
                                    <div>
                                      <p>Description</p>
                                      <p>{row1.oicl.description}</p>
                                    </div>
                                  </div>
                                  <img src={row1.oicl.file} alt="" />
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                      <div>
                        {row.secondaryLists.length > 0 ? (
                          <p className="mt-4">Secondary Component List</p>
                        ) : null}

                        <div className="pl-10">
                          {row.secondaryLists.map((row1, key1) => {
                            const flag = row1.oicl ? true : false;

                            if (flag) {
                              return (
                                <div
                                  key={key1}
                                  className="mt-4 flex justify-start items-center gap-2 border rounded-sm border-black/25 px-2 cursor-pointer">
                                  {row1.file && row1.file !== ' ' && (
                                    <img src={row1.file} alt="" className="h-6 w-6" />
                                  )}
                                  <p>{row1.name}</p>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
