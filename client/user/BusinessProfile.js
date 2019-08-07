import React, { Component } from 'react'

import { Card, CardActions, CardContent } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { upload } from './api-user.js'
import auth from './../auth/auth-helper'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import { Link, Redirect } from 'react-router-dom'
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
        [`& fieldset`]: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        },
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
    video: {
        height: 'auto',
        width: '100%',
        // position: 'fixed',
        // right: '0',
        // bottom: '0',
        // maxWidth: '100%', 
        // maxHeight: '100%'
    },
    upload: {
        padding: '50px',

    }
})



class Businessprofile extends Component {
    state = {
        pan: '',
        gst: '',
        brn: '',
        other: '',

        panfile: '',
        gstfile: '',
        brnfile: '',
        otherfile: '',

        open: false,

        error: '',

        color1: '#4BB543',
        color2: '#53AC2E',

        check: {
            pan: false,
            gst: false,
            brn: false,
            other: false,
            panfile: false,
            gstfile: false,
            brnfile: false,
            otherfile: false
        },

        redirectToReferrer: false
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        }, () => {
            switch (name) {
                case 'pan':
                    if (this.state.pan.length === 10) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                pan: true
                            }
                        }))
                    } else {
                        this.setState(prevState => ({
                            error: '10 digits are reqired',
                            check: {
                                ...prevState.check,
                                pan: false
                            }
                        }));
                    }
                    break;
                case 'gst':
                    if (this.state.gst.length === 15) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                gst: true
                            }
                        }))
                    } else {

                        this.setState(prevState => ({
                            error: '15 digits are reqired',
                            check: {
                                ...prevState.check,
                                gst: false
                            }
                        }));
                    }
                    break;

                case 'brn':
                    if (this.state.brn.length === 10) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                brn: true
                            }
                        }))
                    } else {
                        this.setState(prevState => ({
                            error: '10 digits are reqired',
                            check: {
                                ...prevState.check,
                                brn: false
                            }
                        }));
                    }
                    break;

                case 'other':
                    if (this.state.other.length === 10) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                other: true
                            }
                        }))
                    } else {
                        this.setState(prevState => ({
                            error: '10 digits are reqired',
                            check: {
                                ...prevState.check,
                                other: false
                            }
                        }));
                    }
                    break;
                case 'panfile':
                    if (this.state.panfile) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                panfile: true
                            }
                        }))
                    } else {
                        this.setState({ error: 'PAN file is required' });
                    }
                    break;
                case 'gstfile':
                    if (this.state.brn) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                gstfile: true
                            }
                        }))
                    } else {
                        this.setState({ error: 'GST File is reqired' });
                    }
                    break;
                case 'brnfile':
                    if (this.state.brnfile) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                brnfile: true
                            }
                        }))
                    } else {
                        this.setState({ error: 'BRN file is reqired' });
                    }
                    break;
                case 'otherfile':
                    if (this.state.brn) {
                        this.setState(prevState => ({
                            error: '',
                            check: {
                                ...prevState.check,
                                otherfile: true
                            }
                        }))
                    } else {
                        this.setState({ error: 'Other file is reqired' });
                    }
                    break;
            }

        })

    }

    handleFileChange = event => {

        if (event.target.name === 'panfile') {
            event.target.files[0] ?
            this.setState({
                panfile: event.target.files[0],
            }) : null
        }

        if (event.target.name === 'brnfile') {
            event.target.files[0] ?
            this.setState({
                brnfile: event.target.files[0],
            }) : null
        }

        if (event.target.name === 'gstfile') {
            event.target.files[0] ?
            this.setState({
                gstfile: event.target.files[0],
            }) : null
        }

        if (event.target.name === 'otherfile') {
            event.target.files[0] ?
            this.setState({
                otherfile: event.target.files[0],
            }) : null
        }
    }

    openPicker = () => {
        this.refs.input1.click()
    }

    openPicker2 = () => {
        this.refs.input2.click()
    }

    openPicker3 = () => {
        this.refs.input3.click()
    }

    openPicker4 = () => {
        this.refs.input4.click()
    }

    clickSubmit = () => {

        const jwt = auth.isAuthenticated()
        const Id = jwt.user._id //userId Here Logged in 
        var form = new FormData();


        form.append('panno', this.state.pan);
        form.append('gstin', this.state.gst);
        form.append('brnno', this.state.brn);
        form.append('other', this.state.other);

        form.append('PanDoc', this.state.panfile);
        form.append('BRNDoc', this.state.brnfile);
        form.append('gstDoc', this.state.gstfile);
        form.append('otherDoc', this.state.otherfile);

        axios.post(`/api/documents/${Id}`, form, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + jwt.token
                }
            })
            .then(res => {
                if (res.data.msg) {
                    this.setState({ error: res.data.msg, redirectToReferrer: true })
                } else {
                    this.setState({ error: '' })
                }
            })

    }

    render() {
        const { classes } = this.props
        
        // const { from } = this.props.location.state || {
        //     from: {
        //         pathname: '/dashboard'
        //     }
        // }

        const { redirectToReferrer } = this.state
        if (redirectToReferrer) {
            return (<Redirect to={'/dashboard'} />)
        }

        const {panfile, gstfile, brnfile, otherfile } = this.state
 
        return (<div>
      <Hidden only={['sm', 'xs']}>
        <video className={classes.video} autoPlay muted loop >
          <source src={rain} type="video/mp4" />
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

                <Typography variant="h4"> Document </Typography><br />
                <div>
                  <Grid container>
                    <Grid item xs={4} md={4}>
                      <Button variant="contained" style={{ backgroundColor: panfile?this.state.color1 :this.state.color2, color: "white", margin: "auto", marginTop: "8px", borderTopRightRadius: "0", borderBottomRightRadius: "0", padding: "8px 18px" }} className={classes.upload} component="label" fullWidth margin="dense">
                        {!panfile ? "Upload" : "Uploaded"}  <input name="panfile" onChange={this.handleFileChange} accept="image/png,image/jpeg,image/jpg" type="file"  onClick={this.openPicker} style={{ display: "none" }} ref="input1" />
                        
                      </Button>
                    </Grid>
                    <Grid item xs={7} md={7}>
                      <TextField variant="outlined" id="pan" label="Pan Number" className={classes.textField} value={this.state.pan} onChange={this.handleChange('pan')} margin="dense" /><br />
                    </Grid>
                    <Grid item xs={1} md={1}>
                      {
                        this.state.check.pan && panfile && (<i className="material-icons" style={{ color: "green", marginTop: "15px", marginLeft: "5px" }}>check_circle_outline</i>
                        )
                      }
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <Button variant="contained" style={{ backgroundColor: gstfile?this.state.color1 :this.state.color2, color: "white", margin: "auto", marginTop: "8px", borderTopRightRadius: "0", borderBottomRightRadius: "0", padding: "8px 18px" }} className={classes.upload} component="label" fullWidth margin="dense">
                        {!gstfile ? "Upload" : "Uploaded"} <input type="file" onChange={this.handleFileChange} name='gstfile' accept="image/png,image/jpeg,image/jpg"  onClick={this.openPicker2} style={{ display: "none" }} ref="input2" />
                      </Button>
                    </Grid>
                    <Grid item xs={7} md={7}>
                      <TextField variant="outlined" id="gst" label="GST IN" className={classes.textField} value={this.state.gst} onChange={this.handleChange('gst')} margin="dense" /><br />

                    </Grid>
                    <Grid item xs={1} md={1}>
                      {
                        this.state.check.gst && gstfile && (<i className="material-icons" style={{ color: "green", marginTop: "15px", marginLeft: "5px" }}>check_circle_outline</i>
                        )
                      }
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <Button variant="contained" style={{ backgroundColor: brnfile?this.state.color1 :this.state.color2, color: "white", margin: "auto", marginTop: "8px", borderTopRightRadius: "0", borderBottomRightRadius: "0", padding: "8px 18px" }} className={classes.upload} component="label" fullWidth margin="dense">
                        {!brnfile ? "Upload" : "Uploaded"} <input type="file" name='brnfile' onChange={this.handleFileChange} accept="image/png,image/jpeg,image/jpg" onClick={this.openPicker3} style={{ display: "none" }} ref="input3" />
                      </Button>
                    </Grid>
                    <Grid item xs={7} md={7}>
                      <TextField variant="outlined" id="brn" label="BRN" className={classes.textField} value={this.state.brn} onChange={this.handleChange('brn')} margin="dense" /><br />
                    </Grid>
                    <Grid item xs={1} md={1}>
                      {
                        this.state.check.brn && brnfile && (<i className="material-icons" style={{ color: "green", marginTop: "15px", marginLeft: "5px" }}>check_circle_outline</i>
                        )
                      }
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <Button variant="contained" style={{ backgroundColor: otherfile?this.state.color1 :this.state.color2, color: "white", margin: "auto", marginTop: "8px", borderTopRightRadius: "0", borderBottomRightRadius: "0", padding: "8px 18px" }} className={classes.upload} component="label" fullWidth margin="dense">
                        {!otherfile ? "Upload" : "Uploaded"} <input type="file" name="otherfile" onChange={this.handleFileChange} accept="image/png,image/jpeg,image/jpg" onClick={this.openPicker4} style={{ display: "none" }} ref="input4" />
                      </Button>
                    </Grid>
                    <Grid item xs={7} md={7}>
                      <TextField variant="outlined" id="other" label="Other" className={classes.textField} value={this.state.other} onChange={this.handleChange('other')} margin="dense" /><br />
                    </Grid>
                    <Grid item xs={1} md={1}>
                      {
                        this.state.check.other && otherfile && (<i className="material-icons" style={{ color: "green", marginTop: "15px", marginLeft: "5px" }}>check_circle_outline</i>
                        )
                      }
                    </Grid>
                    
                    {
                      this.state.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {this.state.error}</Typography>)
                    }

                  </Grid>
                </div>

              </CardContent>
              
              <CardActions>
                               
                <div className={classes.submit}>
                  <Button disabled={!this.state.pan&&!this.state.gst&&!this.state.brn&&!this.state.other&&!this.state.panfile&&!this.state.gstfile&&!this.state.brnfile&&!this.state.other}
                    variant="contained" style={{ backgroundColor: "#ea6645", color: "white" }} onClick={this.clickSubmit}
                  >Submit</Button>
                </div>
              
              </CardActions>
            </div>

            <Hidden only={['sm', 'xs']}>
              <CardContent className={classes.cover} style={{ backgroundColor: "#003366", color: "white" }}>
                <Typography variant="h3"> welcome </Typography><br />
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

Businessprofile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Businessprofile)