import React from 'react'
import './sideicons.css'
import {Add} from '@material-ui/icons'

const sideicons = () => {
  return (
    <div className='sideIcons'>
        <div className='sideIcons__top'>
            <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-calendar-512.png" alt="Google Calendar" />
            <img src="https://assets.materialup.com/uploads/64f5506e-2577-4d19-9425-11a1e1fa31a8/0x0ss-85.jpg" alt="Google Keep" />
            <img src="https://www.androidpolice.com/wp-content/uploads/2018/03/nexus2cee_new-tasks-icon.png" alt="Google Tasks" />
        </div>

        <hr />
        <div className="sideIcons__plusIcon">
            <Add />
        </div>
    </div>
  )
}

export default sideicons