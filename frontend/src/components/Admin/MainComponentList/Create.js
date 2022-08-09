import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMainComponentList } from '../../../actions/maincomponentlist';

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    filter: '',
    filterSize: '',
    belt: '',
    beltSize: ''
  });

  const { filter, filterSize, belt, beltSize } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(createMainComponentList(formData));
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
          Create Main Component List Items
        </h1>

        <form className="form" onSubmit={onSubmit}>
          <div className="mt-20 flex justify-center gap-20">
            <div>
              <div className="mt-4 mr-20">
                <p className="font-medium">Filter(s)</p>
                <input
                  type={'text'}
                  name="filter"
                  value={filter}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4 ml-20">
                <p className="font-medium">Size(s)</p>
                <input
                  type={'text'}
                  name="filterSize"
                  value={filterSize}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4 mr-20">
                <p className="font-medium">Belt(s)</p>
                <input
                  type={'text'}
                  name="belt"
                  value={belt}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-4 ml-20">
                <p className="font-medium">Size(s)</p>
                <input
                  type={'text'}
                  name="beltSize"
                  value={beltSize}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center items-end">
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
