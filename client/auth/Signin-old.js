import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Redirect} from 'react-router-dom'

import auth from './../auth/auth-helper'
import {signin} from './api-auth.js'
import rain from './../assets/video/rain.mp4'
import axios from 'axios'

const styles = theme => ({
  card: {
    width: 800,
    height: 400,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2,
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
  centered: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  video:{
    height: '100%',
    width: '100%'
  },
  content : {
    float: 'left',
    paddingTop: theme.spacing.unit * 8
  },
  contentRight: {
    float: 'right', 
    backgroundColor: 'blue',
    width: 400,
    height: 400,
  }
})

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false,
      whereToRedirect: null,
      isEdysorVerified: null
  }


  // clickSubmit = () => {
  //   const user = {
  //     email: this.state.email || undefined,
  //     password: this.state.password || undefined
  //   }

  //   signin(user).then((data) => {
  //     if (data.error) {
  //       this.setState({error: data.error})
  //     } else {
  //     // const whereTo = auth.whereToRedirect(data.user._id)
  //     // // console.log(whereTo)
  //     // const isEdysorVerf = auth.isEdysorVerified(data.user._id)

  //   axios.get(`/api/path/${data.user._id}`)
  //   .then(res => {
  //     // this.setState({whereToRedirect: res.data.path})
  //     const whereTo = res.data.path
      
  //         auth.authenticate(data, () => {
  //       this.setState({
  //         whereToRedirect: whereTo,
  //         redirectToReferrer: true,
  //         isEdysorVerified: false
  //       })
  //     })

  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })

  //     }
  //   })
  // }
  

    clickSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {whereToRedirect, redirectToReferrer, isEdysorVerified} = this.state
    console.log(auth.isAuthenticated())
    // 3 cases 
    // form is complete but not edysor verified --> waiting page
    // form is incomplete --> appropriate page
    // form is complete and edysor verified --> dashboard

    // if (whereToRedirect) {
    //   // appropriate form page
    //   const {from} = this.props.location.state || {
    //     from: {
    //      pathname: whereToRedirect
    //     }
    //   }
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    // const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    // }


    // else {
    //   if (isEdysorVerified) {
    //     // dashboard
    //     // update {from} appropriately
    //     const {from} = this.props.location.state || {
    //       from: {
    //        pathname: '/dashboard'
    //       }
    //     }
    
    //     if (redirectToReferrer) {
    //       return (<Redirect to={from}/>)
    //     }
    //   }
    //   else {
    //     // waiting page
    //     const {from} = this.props.location.state || {
    //       from: {
    //        pathname: '/not-verified'
    //       }
    //     }   
    //     if (redirectToReferrer) {
    //       return (<Redirect to={from}/>)
    //     }
    //   }
    // }

    return (
      <div>
        {/* <video className={classes.video} autoPlay muted loop >
          <source src={rain} type="video/mp4"/>
            Your browser does not support HTML5 video.
        </video> */}
        <div>
        <Card className={classes.card}>
        <CardContent className={classes.content}>     
          <Typography type="headline" component="h2" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardContent>
        <CardContent className={classes.contentRight}>

        </CardContent>
        {/* <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions> */}
      </Card>
      </div>
      </div>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)
