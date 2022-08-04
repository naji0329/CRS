import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = ({ alerts }) => {
  useEffect(() => {
    if (alerts) {
      for (let i = 0; i < alerts.length; i++) {
        console.log(alerts[i].alertType);
        if (alerts[i].alertType === 'error') {
          toast.error(alerts[i].msg);
        } else if (alerts[i].alertType === 'success') {
          toast.success(alerts[i].msg);
        } else {
          toast.warn(alerts[i].msg);
        }
      }
    }
  }, [alerts]);

  return (
    <div className="alert-wrapper">
      {/* {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))} */}
      <ToastContainer />
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
