import api from '../utils/api';
import { setAlert } from './alert';

import { CREATE_EQUIPMENT, EQUIPMENT_ERROR } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get current users profile
export const createEquipment = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/equipments/create', formData);

    dispatch({
      type: CREATE_EQUIPMENT,
      payload: res.data
    });

    dispatch(setAlert('Successfully created.', 'success'));
    return res.data;
  } catch (err) {
    dispatch({
      type: EQUIPMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    return false;
  }
};
