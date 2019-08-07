import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import { searchData } from './api-universities.js'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Pagination from "react-js-pagination";

import auth from './../auth/auth-helper'



const styles = theme => ({
    serach:
    {
        maxWidth: '400px'
    },
    bids:
    {
        padding: '10px'
    },
    button:
    {

    }
})

class UniversitiesCards extends Component {

    state =
        {
            Id: '',
            msg: '',
            data: [],
            total: 2,
            activePage: 1,
            itemsCountPerPage: 1,
            pagecount: 2,
            pageNumber:'',
            redirectToReferrer: false,
            ids:'',
            universityid:''
        }

    handlePageChange = (pageNumber) => {
       
        const activePage = pageNumber;
        this.setState({ activePage: activePage })
        const Id = this.props.location.Id
        const jwt = auth.isAuthenticated()
        const indexing =
        {
            index: this.state.activePage || '',
            onepage: this.state.itemsCountPerPage || ''
        }
        searchData(Id, indexing, {t: jwt.token}).then((data) => {
     
            if (data.msg) {
                this.setState({ data: null, msg: data.msg })
            }
            else {
                this.setState({ data: data, total: data.count })
            }
            var pagecount = (this.state.total / 2)
            var totalcount = (this.state.total % 2)
            if (totalcount != 0) {
                this.setState({ pagecount: parseInt(pagecount) + 1 })
            }

        })
       

    }
    componentDidMount = () => {

        const Id = this.props.location.Id
        const jwt = auth.isAuthenticated()
        const indexing =
        {
            index: this.state.activePage || '',
            onepage: this.state.itemsCountPerPage || ''
        }
        searchData(Id, indexing, {t: jwt.token}).then((data) => {
    
            if (data.msg) {
                this.setState({ data: null, msg: data.msg })
            }
            else {
                this.setState({ data: data, total: data.count,
                    // ids:data.Bid.ids,universityid:data._id  Got agent and University Id from here..
                })
            }
            var pagecount = (this.state.total / 2)
            var totalcount = (this.state.total % 2)
            if (totalcount != 0) {
                this.setState({ pagecount: parseInt(pagecount) + 1 })
            }

        })

    }
    student = () => {
        this.setState({ redirectToReferrer: true })
    }

    render() {
        console.log(this.state.ids,this.state.universityid, "total")
        const { classes } = this.props;
        // const ids=this.state.ids//Agent Id
        // const uniId=this.state.universityid//UniversityId
        const { from } = this.props.location.state || {
            from: {
                pathname: '/student-apply',
                // AgentId:ids,
                // UniversityId:uniId
            }
        }
      
        const { redirectToReferrer } = this.state
        if (redirectToReferrer) {
            return (<Redirect to={from} />)
        }
        return (
            <div >



                {/* <Card> */}



              

                <ul>
                    {
                        this.state.data.data ?

                            this.state.data.data.map((item) => {
                                return (
                                    <ul key={item._id}>
                                        Name:{item.name+' '}
                                        Country:{item.Country}
                                        {
                                            item.Bid?
                                            item.Bid.map((item)=>
                                            {
                                                return (
                                                    <li key={item._id}>
                                                   Agent:{item.Agent}<br/>
                                                   Bid: {item.Bid}
                                                   <Button size="small" onClick={this.student} style={{backgroundColor:'primary',marginLeft:"10px"}}  variant="primary" color="raised">Apply</Button>
                                                   </li>     
                                                ) 
                                            }): <p>{this.state.msg}</p>
                                        }
                                    </ul>

                                )
                            }) : <p>{this.state.msg}</p>
                    }
                </ul>


            
                <div>
                   
                   
                </div>
                <Pagination
                      hideNavigation
                      pageRangeDisplayed={this.state.pagecount}
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.itemsCountPerPage}
                      totalItemsCount={this.state.total}
                      onChange={this.handlePageChange}
                />

            </div>


        )
    }
}

UniversitiesCards.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UniversitiesCards)