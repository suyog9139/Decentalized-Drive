import React, { useState, useEffect } from 'react'
import './FilesView.css'
import { convertBytes } from './helpers';
import moment from 'moment'

import FileItem from './FileItem'
import FileCard from './FileCard'
import {Component} from 'react'

class FilesView extends Component  {
    render() {
        return (
            <div className='fileView'>
                <div className="fileView__row">
                    {
                        this.props.files.slice(0, 5).map((file, key) => (
                            <FileCard name={file.fileName} />
                        ))

                    }
                </div>
                <div className="fileView__titles">
                    <div className="fileView__titles--left">
                        <p>Name</p>
                    </div>
                    <div className="fileView__titles--right">
                        <p>Last modified</p>
                        <p>File size</p>
                    </div>
                </div>
                {
                    this.props.files.map((file, key) => (
                        <FileItem id={file.fileId} caption={file.fileName} timestamp={moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')} fileUrl={"https://ipfs.infura.io/ipfs/" + file.fileHash} size={convertBytes(file.fileSize)} />
                    ))
                }
            </div>
        )
    }
}

export default FilesView
