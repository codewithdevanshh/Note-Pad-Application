import React, { useContext } from 'react'
import AlertContext from '../Context/Alert/AlertContext'

const Alert = () => {

  const context = useContext(AlertContext);
  const {alert} = context;
  return (
    <div>
        {alert && <div className={`alert alert-${alert.type} d-flex align-items-center rounded-0 border border-${alert.type}`} role="alert">
            <strong>{alert.type  === "danger" ? "Error" : alert.type}!!&nbsp;</strong>
            <div>
                {alert.msg}
            </div>
        </div>}
    </div>
  )
}

export default Alert
