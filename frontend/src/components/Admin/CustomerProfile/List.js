import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';

function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getListData() {
      const res = await api.get('/technicianlists');
      setList(res.data);
    }
    getListData();
  }, []);

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Technician List</h1>
        <div className="mt-10 flex justify-end gap-5">
          <Link to={'/admin/dashboard'}>
            <div className="px-2 py-2 w-32 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg text-center">
              Back
            </div>
          </Link>
          <Link to={'/admin/technicianlist/create'}>
            <div className="px-2 py-2 w-32 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg text-center">
              Create
            </div>
          </Link>
        </div>
        <div className="mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {list.map((row, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.phonenumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default List;
