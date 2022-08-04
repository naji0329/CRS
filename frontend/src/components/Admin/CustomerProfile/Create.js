import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCustomer } from '../../../actions/customer';

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    business_name: '',
    address: '',
    contact_name: '',
    contact_email_address: '',
    contact_phone_number: ''
  });

  const { business_name, address, contact_name, contact_email_address, contact_phone_number } =
    formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(createCustomer(formData));
    if (res) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center">
          <Link to={'/admin/dashboard'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Create Customer Profile</h1>

        <div className="mt-20 max-w-[400px] m-auto">
          <form className="form" onSubmit={onSubmit}>
            <div className="mt-4">
              <p className="font-medium">Business Name</p>
              <input
                type={'text'}
                name="business_name"
                value={business_name}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-4">
              <p className="font-medium">Address</p>
              <input
                type={'text'}
                name="address"
                value={address}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-4">
              <p className="font-medium">Contact Name</p>
              <input
                type={'text'}
                name="contact_name"
                value={contact_name}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-4">
              <p className="font-medium">Contact Email Address</p>
              <input
                type={'text'}
                name="contact_email_address"
                value={contact_email_address}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-4">
              <p className="font-medium">Contact Phone Number</p>
              <input
                type={'text'}
                name="contact_phone_number"
                value={contact_phone_number}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-10 flex justify-center gap-5">
              <input
                type="submit"
                value={'Create'}
                className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg"
              />
              <Link to={'/admin/dashboard'}>
                <button className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
