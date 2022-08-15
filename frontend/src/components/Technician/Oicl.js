import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../utils/api';

function Oicl() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const planId = params.get('planId');
  const technicianId = params.get('technicianId');
  const [planInfo, setPlanInfo] = useState();
  const [technician, setTechnician] = useState();

  useEffect(() => {
    async function getPlanData() {
      if (planId) {
        const res = await api.get('/maintenanceplanchecklists/getPlan?planId=' + planId);
        setPlanInfo(res.data);
      }
    }
    getPlanData();
  }, []);

  useEffect(() => {
    async function getTechnicianData() {
      if (technicianId) {
        const res = await api.get(`technicianlists/getTechnicianById/${technicianId}`);
        setTechnician(res.data);
      }
    }
    getTechnicianData();
  }, []);

  return (
    <div>
      <div className="n-container ">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Onsite Interactive Check List</h1>

        <div className="mt-20 flex justify-center items-center gap-20">
          <div className="text-left">
            <p className="">Technician: {technician ? technician.name : ''}</p>
            <p className="">Plan: {planInfo ? planInfo.planName : ''}</p>
            <p className="">Business: {planInfo ? planInfo.business : ''}</p>
            <p className="">Date: {planInfo ? planInfo.date : ''}</p>
          </div>
          <div>
            <p className="text-lg font-medium">Equipments</p>
            <div>
              {planInfo &&
                planInfo.equipments.map((row, key) => {
                  return (
                    <div key={key} className="border px-3 py-2 mt-2 rounded-lg border-black/25">
                      <p>brand: {row.brand}</p>
                      <p>description: {row.description}</p>
                      <p>model: {row.model}</p>
                      <p>serialNumber: {row.serialNumber}</p>
                      <p>voltage: {row.voltage}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oicl;
