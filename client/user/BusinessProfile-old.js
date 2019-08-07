import React, { Component } from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import {withStyles} from 'material-ui/styles'
import { Redirect } from 'react-router-dom'

import auth from './../auth/auth-helper'


const styles = theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
    },
    inputFile : {
        display: 'inline-block',
        width: '50%',
        padding: '120px 0 0 0',
        height: '50px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: "url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png') center center no-repeat #e4e4e4",
        borderRadius: '20px',
        backgroundSize: '60px 60px'
    },
    image : {
        width: '50%',
        height: '100px',
    }
  })

class DocumentUpload extends Component {

    state = {
        companyName: '',
        companyAddress: '',
        panCard : '',
        brn: '',
        gstin: '',
        
        panFile: null,
        brnFile: null,
        gstinFile: null,
        
        panError: '',
        brnError: '',
        gstinError: '',
        
        redirect: false,
        documentError: ''
    }


    handleFileChange = event => {

        if (event.target.files[0] === null) {
            return null
        }

        if (event.target.name === 'panFile') {
            this.setState({
               panFile: URL.createObjectURL(event.target.files[0])
            })
        }

        if (event.target.name === 'brnFile') {
            this.setState({
                brnFile: URL.createObjectURL(event.target.files[0])
            })
        }

        if (event.target.name === 'gstinFile') {
            this.setState({
                gstinFile: URL.createObjectURL(event.target.files[0])
            })
        }

    }

    handleTextFieldChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    uploadImage = (e) => {
        e.preventDefault()
        const {panFile, brnFile, gstinFile} = this.state

        if ((panFile && brnFile) || gstinFile) {
            const data = new FormData()
            let images = []
            images = [...images, panFile, brnFile, gstinFile]
    
            data.append('file', images)
            console.log(data)
            // write api here
        }
        else {
            this.setState({
                documentError: 'Documents are not uploaded'
            })
            console.log('Documents are not uploaded')
        }
    }

    clickSubmit = () => {

        const userID = auth.isAuthenticated().user._id
        
        const { companyName, companyAddress, panCard, brn, gstin, panError, gstinError, panFile, brnFile, gstinFile } = this.state
        
        if (panError || gstinError) {
            this.setState({
                panError: '',
                gstinError: ''
            })
        }

        if (panCard.length === 0 && gstin.length !== 15) {
            this.setState({
                gstinError: 'Incorrect GST Number'
            })
        }

        if (panCard.length !== 10 && gstin.length === 0) {
            this.setState({
                panError: 'Incorrect PAN Number'
            })
        }

        if ((panCard.length === 10 && brn && panFile && brnFile &&  companyAddress && companyName) || (gstin.length === 15) && gstinFile && companyName && companyAddress) {
            console.log('Submitted')
        }   

    }

    openPicker = () => {
      this.refs.input.click()
    }

    openPicker2 = () => {
        this.refs.input2.click()
    }

    openPicker3 = () => {
        this.refs.input3.click()
    }

    removeImage = (name) => {
      if (name === 'panFile')
        this.setState({
          panFile: null
        })

      if (name === 'brnFile')
      this.setState({
        brnFile: null
      })

      if (name === 'gstinFile')
      this.setState({
        gstinFile: null
      })
    }

    render() {

        const {classes} = this.props

        if (this.state.redirect)
            return <Redirect to='/bid' />

        return (
            <div>

                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2" className={classes.title}>
                            Business profile
                        </Typography>

                        <TextField 
                            name="companyName" 
                            label="Company Name" 
                            className={classes.textField} 
                            value={this.state.companyName} 
                            onChange={this.handleTextFieldChange} 
                            margin="normal"
                            required={true}
                        />

                        <TextField 
                            name="companyAddress"
                            label="Company Address" 
                            className={classes.textField} 
                            value={this.state.companyAddress} 
                            onChange={this.handleTextFieldChange} 
                            margin="normal"
                            required={true}
                        />

                        <Typography type="headline" component="h2" className={classes.title}>
                            Documents
                        </Typography>
                        
                        <form>
                        <TextField 
                            id="pan" 
                            name="panCard" 
                            label="PAN Card" 
                            className={classes.textField} 
                            value={this.state.panCard} 
                            onChange={this.handleTextFieldChange} 
                            margin="normal"
                        />
                        
                        {
                            this.state.panError && (<Typography component="p" color="error">
                              {this.state.panError}</Typography>)
                        }
                        <input name="panFile" onChange={this.handleFileChange} accept="image/png,image/jpeg,image/jpg" style={{display:'none'}} type="file" ref="input"/>
                        
                        {
                            this.state.panFile ? <div><img onClick={this.openPicker} src={this.state.panFile} className={classes.image} />
                            <button onClick={() => this.removeImage('panFile')}>Remove</button>
                            </div>
                            : <div className={classes.inputFile} onClick={this.openPicker}></div>
                        }



                        <br />
                        <TextField 
                            id="brn" 
                            name="brn" 
                            label="BRN" 
                            className={classes.textField} 
                            value={this.state.brn} 
                            onChange={this.handleTextFieldChange} 
                            margin="normal"
                        />
                        <br />
                        <input name="brnFile" onChange={this.handleFileChange} accept="image/png,image/jpeg,image/jpg" style={{display:'none'}} type="file" ref="input2"/>
                        
                        {
                            this.state.brnFile ? <div><img onClick={this.openPicker2} src={this.state.brnFile} className={classes.image} />
                            <button onClick={() => this.removeImage('brnFile')}>Remove</button>
                            </div>
                            : <div className={classes.inputFile} onClick={this.openPicker2}></div>
                        }
                        
                        <Typography type="headline" component="h4" className={classes.title}>
                            OR
                        </Typography>
                        
                        <TextField
                            id="gstin" 
                            name="gstin" 
                            label="GSTIN" 
                            className={classes.textField} 
                            value={this.state.gstin}
                            onChange={this.handleTextFieldChange}
                            margin="normal"
                        />

                        {
                            this.state.gstinError && (<Typography component="p" color="error">
                              {this.state.gstinError}</Typography>)
                        }
                        <input name="gstinFile" onChange={this.handleFileChange} accept="image/png,image/jpeg,image/jpg" style={{display:'none'}} type="file" ref="input3"/>
                        
                        {
                            this.state.gstinFile ? <div><img onClick={this.openPicker3} src={this.state.gstinFile} className={classes.image} />
                            <button onClick={() => this.removeImage('gstinFile')}>Remove</button>
                            </div> 
                            : <div className={classes.inputFile} onClick={this.openPicker3}></div>
                        }
                        </form>
                    </CardContent>
                    
                    <CardActions>
                        <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
                    </CardActions>

                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(DocumentUpload)


