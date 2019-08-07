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

import axios from 'axios'
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

class EmailDialog extends React.Component {

  state = {
    email: '',
    updated: false
  }
  
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  updateEmail = () => {
    const {email} = this.state
    const userId = this.props.userId // pass userId as props
    const jwt = auth.isAuthenticated()

    axios.post(`/api/changeemail/${userId}`, {newemail: email}, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.token
      }
    })
    .then(res => {
      this.setState({updated: true})
    })
    .catch(err => {
      console.log(err)
    })
  }      

 
  render() {
    const {classes, show} = this.props;
    const {updated} = this.state;

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
       <Typography variant="h5">Enter your new email ID</Typography>
        
        <TextField
              variant="outlined"
              name="email"
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              style={{marginTop:"20px"}}
              onChange={this.handleChange("email")}
            />

        </CardContent>
        <CardActions >
         <Button variant="contained" style={{backgroundColor:"#ff8000", color:"white"}} onClick={this.props.handleClose}>Cancel</Button>
         <Button variant="contained" style={{backgroundColor:"#ff8000", color:"white"}} onClick={this.updateEmail} >
              Submit
            </Button>          
          </CardActions >
          </div>

          </Card>
      
        </Dialog>
      </div>
    );
  }
}

EmailDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmailDialog);