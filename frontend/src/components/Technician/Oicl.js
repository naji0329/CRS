import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../utils/api';
import SetComponentModal from './SetComponentModal';

function Oicl() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const planId = params.get('planId');
  const technicianId = params.get('technicianId');
  const [planInfo, setPlanInfo] = useState();
  const [technician, setTechnician] = useState();
  const [isShowComponentModal, toggleComponenetModal] = useState(false);
  const [selectedEqupimentId, setSelectedEqupimentId] = useState(null);
  const [selectedMainlistItem, setSelectedMainlistItem] = useState(null);
  const [selectedSecondaryItem, setSelectedSecondaryItem] = useState(null);

  useEffect(() => {
    getPlanData();
  }, []);

  async function getPlanData() {
    if (planId) {
      let res = await api.get(
        `/maintenanceplanchecklists/getPlanForOicl?planId=${planId}&technicianId=${technicianId}`
      );
      setPlanInfo(res.data);
    }
  }

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

        <div className="mt-20">
          <div className="text-left flex gap-20">
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
                    <div key={key} className="flex gap-10">
                      <div className="border px-3 py-2 mt-2 rounded-lg border-black/25 min-w-[250px]">
                        <p>brand: {row.brand}</p>
                        <p>description: {row.description}</p>
                        <p>model: {row.model}</p>
                        <p>serialNumber: {row.serialNumber}</p>
                        <p>voltage: {row.voltage}</p>
                      </div>
                      <div>
                        <div>
                          <p className="mt-4">Main Component List</p>
                          <div className="pl-10 flex gap-10">
                            {row.mainComponentlists.map((row1, key1) => {
                              const flag = row1.oicl ? true : false;
                              return (
                                <div
                                  key={key1}
                                  className="flex justify-start items-center gap-2 border rounded-sm border-black/25 px-2 cursor-pointer"
                                  onClick={() => {
                                    setSelectedEqupimentId(row._id);
                                    setSelectedMainlistItem(row1);
                                    setSelectedSecondaryItem(null);
                                    toggleComponenetModal(true);
                                  }}>
                                  <input type={'checkbox'} checked={flag} />
                                  <p>{row1.name}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="mt-4">Secondary Component List</p>
                          <div className="pl-10 flex gap-10">
                            {row.secondaryLists.map((row1, key1) => {
                              const flag = row1.oicl ? true : false;
                              return (
                                <div
                                  key={key1}
                                  className="flex justify-start items-center gap-2 border rounded-sm border-black/25 px-2 cursor-pointer"
                                  onClick={() => {
                                    setSelectedEqupimentId(row._id);
                                    setSelectedMainlistItem(null);
                                    setSelectedSecondaryItem(row1);
                                    toggleComponenetModal(true);
                                  }}>
                                  <input type={'checkbox'} checked={flag} />
                                  {row1.file && row1.file !== ' ' && (
                                    <img src={row1.file} alt="" className="h-6 w-6" />
                                  )}
                                  <p>{row1.name}</p>
                                </div>
                              );
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
      {isShowComponentModal ? (
        <SetComponentModal
          toggleComponenetModal={toggleComponenetModal}
          technicianId={technicianId}
          planId={planId}
          equipmentId={selectedEqupimentId}
          mainComponent={selectedMainlistItem}
          secondaryItem={selectedSecondaryItem}
          getPlanData={getPlanData}
        />
      ) : null}
    </div>
  );
}

export default Oicl;
