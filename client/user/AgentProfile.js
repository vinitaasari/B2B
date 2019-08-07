import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Edit from 'material-ui-icons/Edit'
import Person from 'material-ui-icons/Person'
import Divider from 'material-ui/Divider'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

import seashell from './../assets/images/seashell.jpg'

import auth from './../auth/auth-helper'
import { read } from './api-user.js'

import EmailDialog from './../Dialogs/EmailDialog'
import PhoneDialog from './../Dialogs/PhoneDialog'
import PasswordDialog from './../Dialogs/PasswordDialog'

import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

const styles = theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 5
    }),
    title: {
        margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
        color: theme.palette.protectedTitle
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    mygrid: {
        display: 'inline-block'
    }
})

class AgentProfile extends Component {

    constructor({ match }) {
        super()
        this.state = {
            userId: '',
            user: null,
            redirectToSignin: false,
            profileImg: null,
            emailDialogShow: false,
            phoneDialogShow: false,
            passwordDialogShow: false,
            show: false,
            showPhone: false,
            showPassword: false,
            loading: true
        }
        this.match = match
    }

    // init = (userId) => {
    //   const jwt = auth.isAuthenticated()
    //   read({
    //     userId: userId
    //   }, {t: jwt.token}).then((data) => {
    //     if (data.error) {
    //       this.setState({redirectToSignin: true})
    //     } else {
    //       this.setState({user: data})
    //     }
    //   })
    // }
    // componentWillReceiveProps = (props) => {
    //   this.init(props.match.params.userId)
    // }
    componentDidMount = () => {
      // this.init(this.match.params.userId)
      this.setState({userId: this.match.params.userId})
    }

    openPicker = () => {
        this.refs.profileImg.click()
    }

    showEmailDialog = () => {
        this.setState({ emailDialogShow: true, show: true })
    }

    closeEmailDialog = () => {
        this.setState({ emailDialogShow: false, show: false })
    }

    showPhoneDialog = () => {
        this.setState({ phoneDialogShow: true, showPhone: true })
    }

    closePhoneDialog = () => {
        this.setState({ phoneDialogShow: false, showPhone: false })
    }

    showPasswordDialog = () => {
        this.setState({ passwordDialogShow: true, showPassword: true })
    }

    closePasswordDialog = () => {
        this.setState({ passwordDialogShow: false, showPassword: false })
    }

    onFileChange = (e) => {
        let file = e.target.files || e.dataTransfer.files;
        if (file.length > 0) {
            let docs = file[0];
            var reader = new FileReader();
            var url = reader.readAsDataURL(docs);
            reader.onloadend = function(e) {
                this.setState({ profileImg: reader.result })
            }.bind(this);
        }

    }

    render() {
        const { classes } = this.props
        const { redirectToSignin, profileImg, emailDialogShow, show, phoneDialogShow, showPhone, passwordDialogShow, showPassword, userId } = this.state

        // console.log("user", this.state.user)

        if (redirectToSignin) {
            return <Redirect to='/signin'/>
        }

        // console.log(this.props)

        return (
            <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <Grid container justify="center" alignItems="center">
            { !profileImg ? <Avatar alt="image" src={seashell} className={classes.bigAvatar} onClick={this.openPicker} />
                          : <Avatar src={profileImg} className={classes.bigAvatar} onClick={this.openPicker} />
            }
        </Grid>
        <input type="file" name="profileImg" 
            onClick={this.openClick} style={{display: 'none'}} 
            ref="profileImg" onChange={this.onFileChange} 
        />
        <Grid container className={classes.mygrid}>
          <Grid item xs={12} md={4}>
            <Button onClick={this.showEmailDialog} variant="raised" color="primary" className={classes.button} >
              Change Email
            </Button>
          </Grid>
          {
            emailDialogShow ? <EmailDialog userId={userId} handleClickOpen={this.showEmailDialog} handleClose={this.closeEmailDialog} fullScreen={false} show={show} /> : 
                            <EmailDialog userId={userId} handleClickOpen={this.showEmailDialog} handleClose={this.closeEmailDialog} fullScreen={false} show={show} />
          }
          <Grid item xs={12} md={4}>
            <Button onClick={this.showPhoneDialog} variant="raised" color="primary" className={classes.button}>
              Change Phone
            </Button>
          </Grid>
          {
            phoneDialogShow ? <PhoneDialog userId={userId} handleClickOpen={this.showPhoneDialog} handleClose={this.closePhoneDialog} fullScreen={false} show={showPhone} /> : 
                              <PhoneDialog userId={userId} handleClickOpen={this.showPhoneDialog} handleClose={this.closePhoneDialog} fullScreen={false} show={showPhone} />
          }          
          <Grid item xs={12} md={4}>
            <Button onClick={this.showPasswordDialog} variant="raised" color="primary" className={classes.button}>
              Change Password
            </Button>
          </Grid>
          {
            passwordDialogShow ? <PasswordDialog userId={userId} handleClickOpen={this.showPasswordDialog} handleClose={this.closePasswordDialog} fullScreen={false} show={showPassword} /> : 
                              <PasswordDialog userId={userId} handleClickOpen={this.showPasswordDialog} handleClose={this.closePasswordDialog} fullScreen={false} show={showPassword} />
          }       
        </Grid>  
      </Paper>
        )
    }
}

AgentProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AgentProfile)