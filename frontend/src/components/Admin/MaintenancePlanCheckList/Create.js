import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { setAlert } from '../../../actions/alert';
import { useDispatch } from 'react-redux';
import { createMaintenancePlanCheckList } from '../../../actions/maintenanceplanchecklist';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    planName: '',
    business: '',
    equipment: '',
    assignMainComponent: '',
    notesMainComponent: '',
    assignSecondaryComponent: '',
    notesSecondaryComponent: ''
  });

  const {
    planName,
    business,
    equipment,
    assignMainComponent,
    notesMainComponent,
    assignSecondaryComponent,
    notesSecondaryComponent
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(createMaintenancePlanCheckList(formData));
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
            <div>
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
                <input
                  type={'text'}
                  name="business"
                  value={business}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4">
                <p className="font-medium">Equipment</p>
                <input
                  type={'text'}
                  name="equipment"
                  value={equipment}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
            </div>
            <div>
              <div className="mt-4 mr-20">
                <p className="font-medium">Assign Main Component</p>
                <input
                  type={'text'}
                  name="assignMainComponent"
                  value={assignMainComponent}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4 ml-20">
                <p className="font-medium">Allow technician notes</p>
                <input
                  type={'text'}
                  name="notesMainComponent"
                  value={notesMainComponent}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4 mr-20">
                <p className="font-medium">Assign Secondary Component</p>
                <input
                  type={'text'}
                  name="assignSecondaryComponent"
                  value={assignSecondaryComponent}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4 ml-20">
                <p className="font-medium">Allow technician notes</p>
                <input
                  type={'text'}
                  name="notesSecondaryComponent"
                  value={notesSecondaryComponent}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <div className="">
                <div>
                  <input
                    type="submit"
                    value={'Create'}
                    className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg"
                  />
                </div>
                <div className="mt-5">
                  <Link to={'/admin/dashboard'}>
                    <button className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
