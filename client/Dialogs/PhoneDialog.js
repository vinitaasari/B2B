import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import {Card, CardActions, CardContent} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import {withStyles} from 'material-ui/styles'
import axios from 'axios';

import auth from './../auth/auth-helper'

const styles = theme => ({
card: {
    display: 'flex',
     padding:'30px'
  },
   details: {
    width: '100%',
  },
  content: {
    width: '100%',
  }

})


class PhoneDialog extends React.Component {

  state = {
    newnumber: '',
    isSubmitted: false,
    otp: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }  

  handleSubmit = () => {
    const userId = this.props.userId
    const {newnumber} = this.state
    const jwt = auth.isAuthenticated()

    axios.post(`/api/newnumber/${userId}`, {newnumber: newnumber}, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.token
      }
    })
    .then(res => {
      this.setState({isSubmitted: true})
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleVerifyOTP = () => {
    const userId = this.props.userId
    const {otp} = this.state
    const jwt = auth.isAuthenticated()

    axios.post(`/api/verifyNewnumber/${userId}`, {otp: otp}, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.token
      }
    })
    .then(res => {
      this.setState({isSubmitted: false}, () => {
        this.props.handleClose()
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleDialogClose = () => {
    this.setState({isSubmitted: false}, () => {
      this.props.handleClose()
    })
  }

  render() {
    const {show} = this.props;
    const {n, isSubmitted} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <Dialog
          open={show}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >

<Card className={classes.card}>
         <div className={classes.details}> 
      <CardContent className={classes.content}>
       <Typography variant="h5">Change Phone number</Typography>
        

              <TextField
              margin="dense"
              variant="outlined"
              id="name"
              label="Enter phone number"
              type="number"
              fullWidth
              style={{marginTop:"20px"}}
              onChange={this.handleChange('newnumber')}
            ></TextField>
            {
              isSubmitted ?
              <TextField
              margin="dense"
              variant="outlined"
              id="otp"
              label="Enter OTP"
              type="number"
              fullWidth
              onChange={this.handleChange('otp')}
              style={{marginTop:"20px"}}
            ></TextField> : null              
            }
          </CardContent>
          <CardActions>
            <Button variant="contained" style={{backgroundColor:"#ff8000", color:"white"}} onClick={this.handleDialogClose} >
              Cancel
            </Button>
          {
            !isSubmitted ? 
            <Button variant="contained" style={{backgroundColor:"#ff8000", color:"white"}} onClick={this.handleSubmit} >
              Submit
            </Button>
            : 
            <Button variant="contained" style={{backgroundColor:"#ff8000", color:"white"}} onClick={this.handleVerifyOTP} >
              Verify OTP
            </Button>            
          }
          </CardActions>
                    </div>

          </Card>

        </Dialog>
      </div>
    );
  }
}

PhoneDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhoneDialog);