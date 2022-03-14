import React, { Component} from 'react'
import './header.css'
import Identicon from 'identicon.js';


import GDriveLogo from '../../media/google-drive-logo.png'

import {Search, ExpandMore, HelpOutline, Settings, Apps, AccountCircle } from '@material-ui/icons';


class header extends Component {
    render() {
        return (
            <div className='header'>
                <div className="header__logo">
                    <img src={GDriveLogo} alt="Google Drive" />
                    <span>Drive</span>
                </div>
                <div className="header__searchContainer">
                    <div className="header__searchBar">
                        <Search />
                        <input type="text" placeholder='Search in Drive' />
                        <ExpandMore />
                    </div>
                </div>
                <div className="header__icons">
                    <span>
                        <HelpOutline />
                        <Settings />
                    </span>
                    <Apps />
                    
                </div>
                <ul className="navbar-nav px-3">
                    <li>
                        <small  className='navbar__account' id="account">
                        <a
                            target='_blank'
                            alt=''
                            className="text-white  "
                            rel="noopener noreferrer"
                            href={"https://etherscan.io/address/" + this.props.account}
                        >
                            { this.props.account ? this.props.account.substring(0,6) : '0x0'}...{this.props.account ? this.props.account.substring(38,42) : '0x0'}
                        </a>
                        </small>
                        <div className="navbar__account-img">
                            {this.props.account
                            ? <img
                                alt=''
                                className='navbar__account-img ml-2'
                                width='30'
                                height='30'
                                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                            />
                            : <span></span>
                            }
                        </div>
                    </li>
               </ul>
            </div>
        )
    }
}

export default header
