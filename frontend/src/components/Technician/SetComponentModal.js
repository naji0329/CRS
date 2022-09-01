/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import api from '../../utils/api';

// eslint-disable-next-line react/prop-types
function SetComponentModal({
  toggleComponenetModal,
  technicianId,
  planId,
  equipmentId,
  mainComponent,
  secondaryItem,
  getPlanData
}) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [preImg, setPreImg] = useState(null);
  const [description, setDescription] = useState();

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

  const onSubmit = async () => {
    setLoading(true);

    if (!file) {
      dispatch(setAlert('Please choose file.', 'warning'));
      return false;
    }
    if (!description) {
      dispatch(setAlert('Please enter description.', 'warning'));
      return false;
    }

    console.log(technicianId, planId, equipmentId, mainComponent, secondaryItem);

    let newFormdata = new FormData();
    newFormdata.append('file', file);
    newFormdata.append('description', description);

    newFormdata.append('technicianId', technicianId);
    newFormdata.append('planId', planId);
    newFormdata.append('equipmentId', equipmentId);

    newFormdata.append('secondaryItemId', secondaryItem && secondaryItem._id);
    newFormdata.append('mainComponentId', mainComponent && mainComponent._id);

    try {
      const res = await api.post('/oicl/create', newFormdata);
      console.log(res.data);
      dispatch(setAlert('Success.', 'success'));
    } catch (error) {
      console.log(error);
    }
    await getPlanData();
    setLoading(false);
    toggleComponenetModal(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Set Comment</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => toggleComponenetModal(false)}>
                <span className=" text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex justify-center gap-4">
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
                <div>
                  <textarea
                    className="w-full h-full border border-black/25 outline-0 p-2 min-w-[280px] rounded-lg"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => toggleComponenetModal(false)}>
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                disabled={isLoading}
                onClick={() => {
                  onSubmit();
                }}>
                {isLoading ? 'Loading' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default SetComponentModal;
