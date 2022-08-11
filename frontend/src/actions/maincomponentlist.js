import api from '../utils/api';
import { setAlert } from './alert';

import { CREATE_MAINCOMPONENTLIST, MAINCOMPONENTLIST_ERROR } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get current users profile
export const createMainComponentList = (type, name) => async (dispatch) => {
  try {
    console.log('createTechnicianlist');
    const res = await api.post('/maincomponentlists/create', {
      type,
      name
    });

    dispatch({
      type: CREATE_MAINCOMPONENTLIST,
      payload: res.data
    });

    dispatch(setAlert('Successfully created.', 'success'));
    return true;
  } catch (err) {
    console.log(err);
    dispatch({
      type: MAINCOMPONENTLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    return false;
  }
};
