import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { setAlert } from '../../../actions/alert';
import { useDispatch } from 'react-redux';
import { createMaintenancePlanCheckList } from '../../../actions/maintenanceplanchecklist';
import api from '../../../utils/api';
import Multiselect from 'multiselect-react-dropdown';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    planName: '',
    business: '',
    equipments: []
  });
  const epuipmentsMultiselectRef = React.createRef();

  const { planName, business, equipments } = formData;

  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    async function getCustomersData() {
      const res = await api.get('/customers/');
      if (res.data) {
        setBusinesses(res.data);
      }
    }
    getCustomersData();
  }, []);

  const [equipmentsData, setEquipmentsData] = useState([]);
  useEffect(() => {
    async function getEquipmentDataByBusiness() {
      setFormData({ ...formData, ['equipments']: [] });
      epuipmentsMultiselectRef.current.resetSelectedValues();
      const res = await api.post('/equipments/getEquipmentDataByBusiness', {
        business: business
      });
      setEquipmentsData(res.data);
    }
    if (business) {
      getEquipmentDataByBusiness();
    }
  }, [business]);

  async function onSelectEquipments(selectedList) {
    setFormData({ ...formData, ['equipments']: selectedList });
  }
  async function onRemoveEquipments(selectedList) {
    setFormData({ ...formData, ['equipments']: selectedList });
  }

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(createMaintenancePlanCheckList(formData));
    setLoading(false);

    if (res) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">
          Create Maintenance Plan Check List
        </h1>

        <form className="form" onSubmit={onSubmit}>
          <div className="mt-20 flex justify-center items-center gap-20">
            <div className="w-1/3">
              <div className="mt-4">
                <p className="font-medium">Plan Name</p>
                <input
                  type={'text'}
                  name="planName"
                  value={planName}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4">
                <p className="font-medium">Business</p>
                <select
                  className="border border-[#5C6BC0] px-2 py-2 w-full rounded shadow-sm mt-2"
                  onChange={onChange}
                  name="business">
                  <option>Select Business</option>
                  {businesses.map((row, key) => {
                    return (
                      <option key={key} value={row.business_name}>
                        {row.business_name}
                      </option>
                    );
                  }, [])}
                </select>
              </div>
              <div className="mt-4">
                <p className="font-medium">Equipment</p>
                <div className="mt-2 flex gap-3">
                  <Multiselect
                    options={equipmentsData} // Options to display in the dropdown
                    onSelect={onSelectEquipments} // Function will trigger on select event
                    onRemove={onRemoveEquipments} // Function will trigger on remove event
                    displayValue="description" // Property name to display in the dropdown options
                    ref={epuipmentsMultiselectRef}
                    className="border border-[#5C6BC0] w-full rounded shadow-sm mt-2"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-lg">Main Component List</p>
              <div className="pl-4">
                {equipments.map((equ) => {
                  return (
                    <ul className="list-disc" key={equ._id}>
                      {equ.mainComponentlists.map((row) => {
                        return <li key={row}>{row.name}</li>;
                      })}
                    </ul>
                  );
                })}
              </div>
              <p className="text-lg mt-4">Secondary List</p>
              <div className="pl-4">
                {equipments.map((equ) => {
                  return (
                    <ul className="list-disc" key={equ._id}>
                      {equ.secondaryLists.map((row) => {
                        return <li key={row._id}>{row.name}</li>;
                      })}
                    </ul>
                  );
                })}
              </div>
            </div>
            <div className="mt-10 flex justify-center gap-5">
              <Link to={'/admin/dashboard'}>
                <button className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
                  Back
                </button>
              </Link>
              <input
                type="submit"
                disabled={isLoading}
                value={isLoading ? 'Loading' : 'Create'}
                className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
