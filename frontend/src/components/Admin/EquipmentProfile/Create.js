import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { setAlert } from '../../../actions/alert';
import { useDispatch } from 'react-redux';
import { createEquipment } from '../../../actions/equipment';
import api from '../../../utils/api';
import Multiselect from 'multiselect-react-dropdown';
import { setAlert } from '../../../actions/alert';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    serialNumber: '',
    description: '',
    voltage: '',
    brand: '',
    location: '',
    model: ''
  });
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    async function getCustomersData() {
      const res = await api.get('/customers/');
      console.log(res.data);
      if (res.data) {
        setBusinesses(res.data);
      }
    }
    getCustomersData();
  }, []);

  const [mainComponentlists, setMainComponentlists] = useState([]);
  useEffect(() => {
    async function getMainComponents() {
      const res = await api.get('/maincomponentlists');
      console.log(res.data);
      if (res.data) {
        setMainComponentlists(res.data);
      }
    }
    getMainComponents();
  }, []);
  const [selectedSecondaryLists, setSelectedSecondaryLists] = useState([]);
  async function onSelectSecondaryLists(selectedList, selectedItem) {
    console.log(selectedList, selectedItem);
    setSelectedSecondaryLists(selectedList);
  }
  async function onRemoveSecondaryLists(selectedList, selectedItem) {
    console.log(selectedList, selectedItem);
    setSelectedSecondaryLists(selectedList);
  }

  const [secondarylists, setSecondarylists] = useState([]);
  useEffect(() => {
    async function getSecondaryLists() {
      const res = await api.get('/secondarylists');
      if (res.data) {
        setSecondarylists(res.data);
      }
    }
    getSecondaryLists();
  }, []);
  const [selectedMainComponentLists, setSelectedMainComponentLists] = useState([]);
  async function onSelectMainComponentLists(selectedList, selectedItem) {
    console.log(selectedList, selectedItem);
    setSelectedMainComponentLists(selectedList);
  }
  async function onRemoveMainComponentLists(selectedList, selectedItem) {
    console.log(selectedList, selectedItem);
    setSelectedMainComponentLists(selectedList);
  }

  const { businessName, serialNumber, description, voltage, brand, location, model } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [file, setFile] = useState();
  const [preImg, setPreImg] = useState(null);

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    // Assuming only image
    var file = event.target.files[0];
    setFile(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setPreImg(reader.result);
    }.bind(this);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!businessName) {
      dispatch(setAlert('Please select Business Name', 'warning'));
      return false;
    }
    setLoading(true);

    let newFormdata = new FormData();
    newFormdata.append('businessName', businessName);
    newFormdata.append('serialNumber', serialNumber);
    newFormdata.append('description', description);
    newFormdata.append('voltage', voltage);
    newFormdata.append('brand', brand);
    newFormdata.append('location', location);
    newFormdata.append('model', model);
    newFormdata.append('file', file);
    newFormdata.append('mainComponentlists', JSON.stringify(selectedMainComponentLists));
    newFormdata.append('secondaryLists', JSON.stringify(selectedSecondaryLists));

    console.log('selectedMainComponentLists', selectedMainComponentLists);

    const res = await dispatch(createEquipment(newFormdata));
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
        <h1 className="text-4xl font-bold underline text-center">Create Equipment Profile</h1>

        <div className="mt-20 m-auto">
          <form className="form" onSubmit={onSubmit}>
            <div className="grid grid-cols-3 justify-center gap-20">
              <div className="flex justify-end items-center">
                <div
                  className="border border-[#5C6BC0] rounded-xl p-4 h-64 w-64"
                  onClick={handleClick}>
                  <img src={preImg} alt="" className={`m-auto h-full ${preImg ? '' : 'hidden'}`} />
                  <input
                    type={'file'}
                    className="hidden"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                  />
                  <div className={`${preImg ? 'hidden' : ''} p-10`}>
                    <img src="/img/upload_nft.png" alt="" className="m-auto" />

                    <div className="flex justify-center">
                      <button className="bg-gradient-blue py-3 px-6 text-white text-xl font-medium mt-6 rounded-2xl m-auto text-center">
                        Browse Files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p className="font-medium">Business Name</p>
                  <select
                    className="border border-[#5C6BC0] px-2 py-2 w-full rounded shadow-sm mt-2"
                    onChange={onChange}
                    name="businessName">
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
                  <p className="font-medium">Description</p>
                  <input
                    type={'text'}
                    name="description"
                    value={description}
                    onChange={onChange}
                    className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-medium">Brand</p>
                  <input
                    type={'text'}
                    name="brand"
                    value={brand}
                    onChange={onChange}
                    className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-medium">Model</p>
                  <input
                    type={'text'}
                    name="model"
                    value={model}
                    onChange={onChange}
                    className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="font-medium">Serial Number</p>
                  <input
                    type={'text'}
                    name="serialNumber"
                    value={serialNumber}
                    onChange={onChange}
                    className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-medium">Voltage</p>
                  <input
                    type={'text'}
                    name="voltage"
                    value={voltage}
                    onChange={onChange}
                    className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-medium">Location(Indoor/Outdoor)</p>
                  <select
                    onChange={onChange}
                    name="location"
                    className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2">
                    <option value={'indoor'}>Indoor</option>
                    <option value={'outdoor'}>Outdoor</option>
                  </select>
                </div>
                <div className="mt-4">
                  <p className="font-medium">Main Component Lists</p>
                  <Multiselect
                    options={mainComponentlists} // Options to display in the dropdown
                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelectMainComponentLists} // Function will trigger on select event
                    onRemove={onRemoveMainComponentLists} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    className="border border-[#5C6BC0] w-full rounded shadow-sm mt-2"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-medium">Secondary Lists</p>
                  <Multiselect
                    options={secondarylists} // Options to display in the dropdown
                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelectSecondaryLists} // Function will trigger on select event
                    onRemove={onRemoveSecondaryLists} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    className="border border-[#5C6BC0] w-full rounded shadow-sm mt-2"
                  />
                </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
