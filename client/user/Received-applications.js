import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { ReceiveApplication } from './api-user.js'

const styles = theme => ({
    card: {
        display: 'flex',
        opacity: '0.9'
    }
})

class ReceivedApplication extends Component {
    state =
        {
            error:'',
            data: [],
            msg:'',
        }

    componentDidMount() {

        console.log("in cdm")
        const Id = '5d3fd1e4b5612c46389dba72'
        ReceiveApplication(Id).then((data) => {
            console.log(Id, "id")
            console.log(data, "data")
            if (data.error) {
                this.setState({ error: 'NOT FOUND' })
            }
            else {
                this.setState({ error: '', data: data })

            }
        })
    }


    render() {
        return (
            <div>
                <ul>
                    {
                        
                        this.state.data ?
                            this.state.data.map((item) => {
                                return (
                                    <div key={item._id}>
                                        Agent:  {' ' + item.Agent + ' '}<br/>
                                        University:  {' ' + item.University + ' '}<br/>
                                        Title:  {' ' + item.title + ' '}<br/>
                                        Name:  {' ' + item.student_name + ' '}<br/>
                                        Mobile:  {' ' + item.mobile + ' '}<br/>
                                        Address:  {' ' + item.Address + ' '}<br/>
                                        City:  {' ' + item.City + ' '}<br/>
                                        State:  {' ' + item.state + ' '}<br/>
                                        Work Experience:  {' ' + item.work_experience + ' '}<br/>                                        
                                    </div>
                                )
                            }) : <p>{this.state.msg}</p>
                    }

                </ul>
            </div>
        )
    }
}




ReceivedApplication.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReceivedApplication)