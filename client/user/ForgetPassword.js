import React, {Component} from 'react'
import {Card, CardActions, CardContent} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-user.js'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import {Link, Redirect} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import withWidth from '@material-ui/core/withWidth'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import rain from './../assets/video/time.mp4'
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios'
                                                               
const styles = theme => ({
  card: {
    display: 'flex',
     opacity: '0.9'
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
    width: '100%'
  },
   dense: {
    marginTop: 16,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2

  },
  centered: {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
},
  cover: {
    width: '55%',
  },
   details: {
    width: '100%',
  },
  content: {
    width: '100%',
  },
  video:{
  height: '100%',
  width: '100%'
  }
})



class ForgetPassword extends Component {
  state = {
      email: '',
      open: false,
      error: '',

  }

    handleChange = name => event => {
      this.setState({[name]: event.target.value})
    }

  clickSubmit = () => {
    const {email} = this.state
    axios.post('/api/forgot_password', {'email': email})
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const {classes} = this.props
    
    return (<div>
    <Hidden only={['sm', 'xs']}>
      <video className={classes.video} autoPlay muted loop >
  <source src={rain} type="video/mp4"/>
  Your browser does not support HTML5 video.
</video>
</Hidden>  
<Grid container className={classes.centered}>
      <Grid item xs={1} md={3}>
      </Grid>
       
      <Grid item xs={10} md={6}>
       <Card className={classes.card}> 
       <div className={classes.details}> 
      <CardContent className={classes.content}>
      <h3> Reset Password </h3>
      <Typography variant="body">To reset your password, enter your email below and submit. </Typography>
          <TextField variant="outlined"  id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="dense"/><br/>
          
          </CardContent>
      <CardActions>
          <div className={classes.submit}>
          <Button  variant="contained" style={{backgroundColor:"#EA6645", color:"white"}} onClick={this.clickSubmit}>Submit</Button>
        </div>
         </CardActions>
         </div>
         <Hidden only={['sm', 'xs']}>
         <CardContent className={classes.cover} style={{backgroundColor:"#012951", color:"white" }}>
         <h2> Reset Password </h2>
         <p>An email will be sent to you with instructions about how to complete the process.</p>
          </CardContent>
          </Hidden>
    </Card>
    </Grid> 
      
          <Grid item xs={1} md={3}>
          </Grid>
          </Grid>

   </div>)
 }
}

ForgetPassword.propTypes = {
 classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ForgetPassword)