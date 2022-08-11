import api from '../utils/api';
import { setAlert } from './alert';

import { CREATE_TECHNICIANLIST, TECHNICIANLIST_ERROR } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get current users profile
export const createTechnicianlist = (formData) => async (dispatch) => {
  try {
    console.log('createTechnicianlist', formData);
    const res = await api.post('/technicianlists/create', formData);

    dispatch({
      type: CREATE_TECHNICIANLIST,
      payload: res.data
    });

    dispatch(setAlert('Successfully created.', 'success'));
    return true;
  } catch (err) {
    dispatch(setAlert(err.response.data.errors[0].msg, 'error'));
    dispatch({
      type: TECHNICIANLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    return false;
  }
};
