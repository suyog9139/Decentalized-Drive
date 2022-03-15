import './App.css';
import {Header, Sidebar, SideIcons, FilesView} from './Components'
import Web3 from 'web3';
import DStorage from './contracts/GDStorage.json'

import React, { Component }  from 'react';
//Declare IPFS
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class App extends Component {



  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else{
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    //Declare Web3
    const web3 = window.web3;
    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DStorage.networks[networkId]
    
    //IF got connection, get data from contracts
    if(networkData) {
      //Assign contract
      const gdstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
      this.setState({ gdstorage })
      //Get files amount
      const filesCount = await gdstorage.methods.fileCount().call()
      this.setState({ filesCount })
      //Load files&sort by the newest
      for(let i = filesCount; i>=1; i--) {
        const file = await gdstorage.methods.files(i).call()
        this.setState({
          files: [file, ...this.state.files]
        })
      }
    }
    else{
      window.alert('Smart contract not deployed to detected network.')
    }

    //Else
      //alert Error
      this.setState({ loading: false })

  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }


  //Upload File
  uploadFile = description => {
    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      // Assign value for the file without extension
      if(this.state.type === ''){
        this.setState({type: 'none'})
      }
      this.state.gdstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         type: null,
         name: null
       })
       window.location.reload()
      }).on('error', (e) =>{
        window.alert('Error')
        this.setState({loading: false})
      })
    })
  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      gdstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null
    }

    //Bind functions
  }


  render() {
    return (
      <div className="app">
        <>
            <Header account={this.state.account} />
          <div className="app__main">
             { this.state.loading
                ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                : <Sidebar
                    files={this.state.files}
                    captureFile={this.captureFile}
                    uploadFile={this.uploadFile}
                  />
            }
            <FilesView files={this.state.files} />
            <SideIcons />
          </div>
        </>
      </div>
    );
  }
}

export default App;
