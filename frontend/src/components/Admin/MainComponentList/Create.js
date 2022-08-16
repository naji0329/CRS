import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMainComponentList } from '../../../actions/maincomponentlist';

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState('filter');
  const [name, setName] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(createMainComponentList(type, name));

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
          Create Main Component List Items
        </h1>

        <form className="form" onSubmit={onSubmit}>
          <div className="mt-20 flex justify-center gap-20">
            <div>
              <div className="mt-4 mr-20">
                <p className="font-medium">Type</p>
                <select
                  className="border border-[#5C6BC0] px-2 py-2 w-full rounded shadow-sm mt-2"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}>
                  <option value={'filter'}>Filter</option>
                  <option value={'belt'}>Belt</option>
                </select>
              </div>

              <div className="mt-4 mr-20">
                <p className="font-medium">Name</p>
                <input
                  type={'text'}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center items-end">
              <div className="">
                <div className="mt-5">
                  <input
                    type="submit"
                    value={isLoading ? 'Loading' : 'Create'}
                    disabled={isLoading}
                    className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg"
                  />
                </div>
                <div className="mt-5">
                  <Link to={'/admin/maincomponentlist/get'}>
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
