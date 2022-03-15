import React, {Component} from 'react'
import './sidebar.css'
import SidebarItem from './sidebaritem'
import Modal from 'react-modal';
import ModalButton from './modal-button';
import {InsertDriveFile, ImportantDevices, PeopleAlt, QueryBuilder, StarBorder, DeleteOutline, Storage, Add} from '@material-ui/icons'

class sidebar extends Component {

    constructor() {
        super();
    
        this.state = { modalOpened: false };
        this.toggleModal = this.toggleModal.bind(this);
      }
    
      toggleModal() {
        this.setState(prevState => ({ modalOpened: !prevState.modalOpened }));
      }

    render() {
        return (
            <>
            
            <div className='app__sidebar'>
                <div className='app__sidebar-new'>
                    <ModalButton handleClick={this.toggleModal} className="app__sidebar-new-button">
                        <div className='app__sidebar-icon-ad'>
                            <Add fontSize='large' className='app__sidebar-icon-add'  />
                        </div>
                        <p className="app__new_p">New</p>
                    </ModalButton>
                </div>
               <Modal
                    className="app__add-item"
                    // overlayClassName={{ base: [style.overlayBase] }}
                    isOpen={this.state.modalOpened}
                    onRequestClose={this.toggleModal}
                    contentLabel="Modal with image"
                >
                    <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                    <h2 className="text-white text-monospace bg-dark"><b><ins>Upload File</ins></b></h2>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const description = this.fileDescription.value
                        this.props.uploadFile(description)
                    }} >
                        <div className="form-group">
                            <br></br>
                            <input
                                id="fileDescription"
                                type="text"
                                ref={(input) => { this.fileDescription = input }}
                                className="form-control text-monospace"
                                placeholder="description..."
                                required />
                        </div>
                        <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                        <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                    </form>
                </div>
                </Modal>
                <div className='sidebar__itemsContainer'>
                    <SidebarItem arrow icon={(<InsertDriveFile />)} label={'My Drive'} />
                    <SidebarItem arrow icon={(<ImportantDevices />)} label={'Computers'} />
                    <SidebarItem icon={(<PeopleAlt />)} label={'Shared with me'} />
                    <SidebarItem icon={(<QueryBuilder />)} label={'Recent'} />
                    <SidebarItem icon={(<StarBorder />)} label={'Starred'} />
                    <SidebarItem icon={(<DeleteOutline />)} label={'Bin'} />
                    
                    <hr/>
                    <SidebarItem icon={(<Storage />)} label={'Storage'} />
                </div>
            </div>
            </>
        )
        }
}

export default sidebar