import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { setAlert } from '../../../actions/alert';
import { useDispatch } from 'react-redux';
import { createSecondaryList } from '../../../actions/secondarylist';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    instruction: ''
  });

  const { description, instruction } = formData;

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

    let newFormdata = new FormData();
    newFormdata.append('description', description);
    newFormdata.append('instruction', instruction);
    newFormdata.append('file', file);

    const res = await dispatch(createSecondaryList(newFormdata));
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
        <h1 className="text-4xl font-bold underline text-center">Create Secondary List Items</h1>

        <div className="mt-20 m-auto">
          <form className="form" onSubmit={onSubmit}>
            <div className="flex justify-center gap-20">
              <div className="flex ">
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
                  <p className="font-medium">Special Instructions</p>
                  <input
                    type={'text'}
                    name="instruction"
                    value={instruction}
                    onChange={onChange}
                    className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                  />
                </div>
              </div>
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
