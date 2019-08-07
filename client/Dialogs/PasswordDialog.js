import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Card, CardActions, CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { withStyles } from 'material-ui/styles'

import axios from 'axios'
import auth from './../auth/auth-helper'

const styles = theme => ({
    card: {
        display: 'flex',
        padding: '30px'
    },
    details: {
        width: '100%',
    },
    content: {
        width: '100%',
    }

})

class PasswordDialog extends React.Component {

    state = {
        showPassword: false,
        oldpassword: '',
        password: '',
        confirmPassword: '',
        msg: '',
        updated: false
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    updatePassword = () => {
        const { oldpassword, password, confirmPassword } = this.state
        const jwt = auth.isAuthenticated()

        const userId = this.props.userId // pass userId through props
        axios.post(`/api/change-password/${userId}`, { oldpassword: oldpassword, password: password, retypePassword: confirmPassword }, {
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt.token
          }
        })
        .then(res => {
            // Set toast message here
            this.setState({updated: true})
        })
        .catch(err => {
            console.log(err)
        })
    }


    render() {
        const { show, classes } = this.props;
        const { showPassword, oldPassword, newPassword, confirmPassword, updated } = this.state

        if (updated) {
          this.props.handleClose()
        }

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
       <Typography variant="h5">Change Password</Typography>
 

       <TextField
              id="outlined-adornment-password"
              name="oldPassword"
              type="password"
              label="Current Password"
              fullWidth
              variant="outlined"
              margin="dense"
               style={{marginTop:"20px", marginBottom:"20px"}}
              onChange={this.handleChange('oldpassword')}
      ></TextField>
       
              <TextField
              
              variant="outlined"
              margin="dense"
              name="newPassword"
              label="New password"
              type="password"
              fullWidth
              onChange={this.handleChange('password')}
              style={{marginTop:"20px"}}
            ></TextField>
              <TextField
              
              variant="outlined"
              margin="dense"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              onChange={this.handleChange('confirmPassword')}
               style={{marginTop:"20px"}}
            ></TextField>
          </CardContent>
        <CardActions >
          <Button variant="contained" style={{backgroundColor:"#ff8000", color:"white"}} onClick={this.props.handleClose}>Cancel</Button>

         <Button variant="contained" style={{backgroundColor:"#ff8000", color:"white"}} onClick={this.updatePassword} >
              Submit
            </Button>
          </CardActions>
            </div>

          </Card>
      
        </Dialog>
      </div>
        );
    }
}

PasswordDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PasswordDialog);