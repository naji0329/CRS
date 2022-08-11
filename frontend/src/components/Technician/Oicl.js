import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../utils/api';

function Oicl() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const planId = params.get('planId');

  const [planInfo, setPlanInfo] = useState();
  useEffect(() => {
    async function getPlanData() {
      if (planId) {
        const res = await api.get('/maintenanceplanchecklists/getPlan?planId=' + planId);
        setPlanInfo(res.data);
      }
    }
    getPlanData();
  }, []);

  return (
    <div>
      <div className="n-container text-center">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline">Onsite Interactive Check List</h1>

        <div className="mt-20 flex justify-center items-center gap-20">
          <div className="text-left">
            <p className="mt-4 font-medium text-2xl">Plan: {planInfo ? planInfo.planName : ''}</p>
            <p className="mt-4 font-medium text-2xl">
              Business: {planInfo ? planInfo.business : ''}
            </p>
            <p className="mt-4 font-medium text-2xl">Date: {planInfo ? planInfo.date : ''}</p>
          </div>

          <Link to={'/technician/olfpm?planId=' + planId}>
            <div className="px-6 py-4 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
              Order list for preparing maintenance
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Oicl;
