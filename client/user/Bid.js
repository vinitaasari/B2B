// import ReactDragListView from 'react-drag-listview';
import { getUniversityNames } from './api-bid'
import axios from 'axios'
import React, { Component } from 'react'

import auth from './../auth/auth-helper'

// UI - search by key --> Select Menu Type
class Bid extends Component {

    state = {
        user: [],
        uni: '',
        data: [],
        items: [],
        bids: [],
        showBid: false,
        display: false,
        clickedValue: '',
        allBids: [],
        myBid: '',
        bidError: false,
        msg: null,
        uniID: '',
        bidmsg: null,
        delmsg: null,
        editmsg: null,
        showEditBid: false,
        udata: null
    }

    getSuggestions = () => {

        const test = { search: this.state.uni };

        getUniversityNames(test)
            .then((data) => {
                if (data.msg) {
                    this.setState({ data: null, msg: data.msg })
                } else {
                    this.setState({ data: data })
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleChange = (event) => {

        const { uni } = this.state

        this.setState({
            [event.target.name]: event.target.value,
            bidmsg: '',
            showBid: false,
            showEditBid: false,
            myBid: ''
        }, () => {
            if (uni && uni.length >= 2) {
                this.getSuggestions()
            }
        })
    }

    displayBids = (id, name) => {
        axios.get('/api/universities/' + id)
            .then(res => {
                this.setState({ udata: res.data[0] })
            })
            .catch(err => console.log(err))

        axios.get('/api/bids/' + id)
            .then(res => {
                let bids = []
                if (res.data.length === 0) {
                    this.setState({ bids: null })
                } else {
                    const dt = res.data[0].Bids
                    bids = dt
                    this.setState({ bids: bids })
                }

            }).then(

                this.setState({
                    showBid: true,
                    clickedValue: id,
                    uni: name,
                    data: []
                })
            )
            .catch(err => console.log(err))

    }

    handleClick = () => {
        const user = auth.isAuthenticated()
        const { clickedValue, myBid } = this.state
        const userID = user.user._id

        const bid = { bid: myBid }

        if (this.state.myBid === '')
            this.setState({ bidError: true })
        else {

            fetch(`/api/university/${clickedValue}/${userID}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(bid)
                })
                .then((response) => {
                    response.json()
                        .then(data => {
                            this.setState({ bidmsg: data.msg, myBid: '' })
                        }).then(
                            axios.get(`/api/allbids/${userID}`)
                            .then(res => {
                                if (res.data.length === 0) {
                                    this.setState({ allBids: [] })
                                } else {
                                    const allbids = res.data[0].allbids
                                    this.setState({ allBids: allbids })
                                }
                            })
                            .catch(err => console.log(err))
                        )
                }).catch((err) => console.log(err))

        }
    }

    componentDidMount() {
        const userID = auth.isAuthenticated().user._id

        axios.get(`/api/allbids/${userID}`)
            .then(res => {
                if (res.data.length === 0) {
                    this.setState({ allBids: [] })
                } else {
                    const allbids = res.data[0].allbids
                    this.setState({ allBids: allbids })
                }
            })
            .catch(err => console.log(err))
    }

    handleBidChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteBid = (id) => {
        const userID = auth.isAuthenticated().user._id

        axios.post(`/api/deletebid/${userID}/${id}`)
            .then(res => {
                if (res.data.message) {
                    this.setState({ delmsg: res.data.message, showEditBid: false, showBid: false })
                }
            }).then(

                axios.get(`/api/allbids/${userID}`)
                .then(res => {
                    if (res.data.length === 0) {
                        this.setState({ allBids: [] })
                    } else {
                        const allbids = res.data[0].allbids
                        this.setState({ allBids: allbids })
                    }

                })
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
    }

    editBid = (id, name, bid) => {

        const userID = auth.isAuthenticated().user._id

        axios.get('/api/universities/' + id)
            .then(res => {
                this.setState({ udata: res.data[0] })
            })
            .catch(err => console.log(err))

        this.setState({ clickedValue: id })
        this.displayBids(id, name)
        this.setState({ myBid: bid, showEditBid: true, showBid: false })
    }

    handleEditClick = () => {
        const userID = auth.isAuthenticated().user._id
        axios.post(`/api/editbid/${userID}/${this.state.clickedValue}`, { bid: this.state.myBid })
            .then(res => {
                this.setState({ editmsg: res.data.msg, myBid: '' })
            }).then(
                axios.get(`/api/allbids/${userID}`)
                .then(res => {
                    if (res.data.length === 0) {
                        this.setState({ allBids: [] })
                    } else {
                        const allbids = res.data[0].allbids
                        this.setState({ allBids: allbids })
                    }
                    this.setState({ showEditBid: false })
                })
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
    }

    render() {
        //const that = this;
        // const dragProps = {
        //   onDragEnd(fromIndex, toIndex) {
        //     const data = that.state.allBids;
        //     const item = data.splice(fromIndex, 1)[0];
        //     data.splice(toIndex, 0, item);
        //     that.setState({ allBids: data });
        //   },
        //   nodeSelector: 'tr',
        //   handleSelector: 'td'
        // };
        return (
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12  col-md-12">
                            <input className="form-control mx-sm-3 mb-2 mt-5" type="text" 
                            placeholder="Enter university name..." name="uni" value={this.state.uni} 
                            onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12  col-md-12">
                           <ul style={{listStyleType: 'none'}}>
                           {
                               this.state.data ?
                               this.state.data.map((item) => {
                                   return <li key={item._id} onClick={() => this.displayBids(item._id, item.Name)}>{item.Name}</li>
                               }) : <p>{this.state.msg}</p>
                           }
                           </ul>
                        </div>
                       
                        <div className="col-xs-12  col-md-12">
                           {
                               this.state.showBid && this.state.udata ?
                               <div>
                               <p>{this.state.udata.university}</p>
                               </div>
                               : null
                           }

                            {
                               this.state.showEditBid && this.state.udata ?
                               <div>
                                <p>{this.state.udata.university}</p>
                               </div>
                               : null
                           }

                           {
                            this.state.showBid && this.state.bids ?
                            this.state.bids.map((bid,i) => {
                                return (
                                    <div key={i}>
                                    <p>{bid.Username}</p>
                                    <p>{bid.B}</p>
                                    </div>
                                    )
                            })
                            : null
                           }

                            {
                            this.state.showEditBid && this.state.bids ?
                            this.state.bids.map((bid,i) => {
                                return (
                                    <div key={i}>
                                    <p>{bid.Username}</p>
                                    <p>{bid.B}</p>
                                    </div>
                                    )
                            })
                            : null
                           }

                           {
                               this.state.showBid ?
                               <div>
                               <p>Enter your Bid:</p>
                               <input className="form-control mx-sm-3 mb-2" type="number" placeholder="Enter in percentages" 
                               value={this.state.myBid} name='myBid' 
                               onChange={this.handleBidChange} />
                               {this.state.bidError ? <p style={{color: 'red'}}>Bid cannot be Empty</p> : null}
                               <button className="btn btn-primary" onClick={this.handleClick}>Bid</button>
                               {this.state.bidmsg === 'already bid set' ? <p style={{color: 'red'}}>{this.state.bidmsg}</p> : null }
                               {this.state.bidmsg === 'Bid Updated' ? <p style={{color: 'green'}}>{this.state.bidmsg}</p> : null }
                               </div> : null
                           }

                           {
                               this.state.showEditBid ?
                               <div>
                               <p>Update your Bid:</p>
                               <input className="form-control mx-sm-3 mb-2" type="number" placeholder="Enter in percentages" 
                               value={this.state.myBid} name='myBid' 
                               onChange={this.handleBidChange} />
                               {this.state.bidError ? <p style={{color: 'red'}}>Bid cannot be Empty</p> : null}
                               <button className="btn btn-primary" onClick={this.handleEditClick}>Bid</button>
                               {this.state.bidmsg === 'already bid set' ? <p style={{color: 'red'}}>{this.state.bidmsg}</p> : null }
                               {this.state.bidmsg === 'Bid Updated' ? <p style={{color: 'green'}}>{this.state.bidmsg}</p> : null }
                               </div> : null
                           }

                        </div>
                        <div style={{marginTop: '30px'}}>
                            
                            {
                                this.state.allBids.length === 0 ? <p>You have not placed any bids</p>
                                : 
                                <div className="col-xs-12 col-md-12">
                                {/* <ReactDragListView {...dragProps}> */}
                                <table className="table table-striped">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>S No.</th>
                                        <th>University Name</th>
                                        <th>Bid</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.allBids.map((bid, index) => {
                                            return (
                                                <tr key={bid.u_id}>
                                                    <td>{index+1}</td>
                                                    <td>{bid.Name}</td>
                                                    <td>{bid.bid}</td>
                                                    <td><button onClick={() => this.editBid(bid.u_id, bid.Name, bid.bid)}>Edit</button></td>
                                                    <td><button onClick={() => this.deleteBid(bid.u_id)}>Delete</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                 </tbody>
                                </table>
                                {/* </ReactDragListView> */}
                            </div>
                            }
                        </div>

                    </div>
                </div>
        )
    }
}

export default Bid