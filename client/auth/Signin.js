import React, { Component } from 'react'
import { Card, CardActions, CardContent } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link, Redirect } from 'react-router-dom'
import auth from './../auth/auth-helper'
import { signin } from './api-auth.js'
import rain from './../assets/video/time.mp4'
import Grid from '@material-ui/core/Grid'
import withWidth from '@material-ui/core/withWidth'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
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
        width: '100%',
        borderRadius: '50px'
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2,
        textAlign:'center'
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
    video: {
        height: '100%',
        width: '100%'
    }

})

class Signin extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false,
        whereToRedirect: null,
        isEdysorVerified: null,
        showPassword: false,
        path: ''
    }

    clickSubmit = () => {
        const user = {
            email: this.state.email || undefined,
            password: this.state.password || undefined
        }

        signin(user).then((data) => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                auth.authenticate(data, () => {
                    console.log(data)
                    axios.post(`/api/checkpath/${data.user._id}`)
                    .then(res => {
                        this.setState({path: res.data.path, redirectToReferrer: true })
                    })
                })
            }
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { classes } = this.props
        const { redirectToReferrer, path } = this.state

        const { from } = this.props.location.state || {
            from: {
                pathname: path
            }
        }

        if (redirectToReferrer) {
          return (<Redirect to={path} />)
        }    

        return (
            <div >
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
      <h3> Sign In </h3>
      <p>Don't have an account? <Link to="/signup" style={{textDecoration: 'none'}}> Create your account </Link></p>

          <TextField variant="outlined" id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="dense"/><br/>
          <TextField variant="outlined" id="password" type={this.state.showPassword ? 'text' : 'password'} label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="dense"
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
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
<div style={{marginTop:"10px"}}>
<Link to="/forgetpassword" style={{textDecoration: 'none',color:"#012951"}} variant="body2"> Forgot password? </Link>          
     </div>
        </CardContent>
        <CardActions>
        <div className={classes.submit}>
          <Button variant="contained" style={{backgroundColor:"#EA6645", color:"white" }} onClick={this.clickSubmit} >Submit</Button>
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

   </div>
        );
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)