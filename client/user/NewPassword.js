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
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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



class NewPassword extends Component {
  state = {
      newpassword: '',
      confirmpassword:'',
      open: false,
      error: '',
      userid: '',
      redirectToReferrer: false,
      showPassword: false,
      showConfirmPassword: false
  }

    handleChange = name => event => {
      this.setState({[name]: event.target.value})
    }

  clickSubmit = () => {
    const {newpassword, confirmpassword} = this.state
    const userId = this.props.match.params.userId
    if (newpassword === confirmpassword) {
      axios.post(`/api/new_password/${userId}`, {newpassword: newpassword})
      .then(res => {
        console.log(res)
        this.setState({redirectToReferrer: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
    else {
      alert('Passwords do not match')
    }
  }


handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
  };


  render() {
    const {classes} = this.props
    
    const {from} = this.props.location.state || {
      from: {
        pathname: '/signin'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)  
    }

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
      <h3> New Password </h3>
      <p>Already have a account? <Link to="/signin" style={{textDecoration: 'none'}}> Sign in </Link></p>
          <TextField variant="outlined" id="newpassword" type={this.state.showPassword ? 'text' : 'password'} label="New Password" className={classes.textField} value={this.state.newpassword} onChange={this.handleChange('newpassword')} margin="dense"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          <TextField variant="outlined" id="confirmpassword" type={this.state.showConfirmPassword ? 'text' : 'password'} label="Confirm Password" className={classes.textField} value={this.state.confirmpassword} onChange={this.handleChange('confirmpassword')} margin="dense"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowConfirmPassword}
                >
                  {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          
          </CardContent>
      <CardActions>
          <div className={classes.submit}>
          <Button  variant="contained" style={{backgroundColor:"#EA6645", color:"white"}} onClick={this.clickSubmit}>Submit</Button>
        </div>
         </CardActions>
         </div>

         <Hidden only={['sm', 'xs']}>
         <CardContent className={classes.cover} style={{backgroundColor:"#012951", color:"white" }}>
         <h1> welcome </h1>
         <p>Lorem Ipsum is simply dummy text of the printing sd Ipsum is simply dummy typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </p>
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

NewPassword.propTypes = {
 classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewPassword)