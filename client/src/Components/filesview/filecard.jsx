import React from 'react'
import './filecard.css'

import {InsertDriveFile} from '@material-ui/icons'

const filecard = ({name}) => {
  return (
    <div className='fileCard'>
        <div className='filecard--top'>
            <InsertDriveFile style={{fontSize: 130}} />
        </div>

        <div className='fileCard--bottom' >
            <p>{name}</p>
        </div>
    </div>
  )
}

export default filecard