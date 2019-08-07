import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import EditIcon from "material-ui-icons/Edit";
import Popup from "reactjs-popup";
import { Redirect } from "react-router-dom";
import { otpverification } from "./api-user.js";
import { editnumber } from "./api-user.js";
import { otp_resend } from "./api-user.js";
import rain from "./../assets/video/time.mp4";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { Card, CardActions, CardContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import auth from "./../auth/auth-helper";

const styles = theme => ({
  card: {
    display: "flex",
    opacity: "0.9"
  },
  cover: {
    width: "55%"
  },
  details: {
    width: "100%"
  },
  content: {
    width: "100%"
  },
  video: {
    height: "100%",
    width: "100%"
  },
  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

class otp extends Component {
  state = {
    name: "",
    otp: "",
    number: "",
    otpvalid: false,
    newnumber: "",
    error: "",
    toastvalid: "",
    redirectToReferrer: false,
    userid: "",
    open: false,
    numb: ""
  };
  
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submit = () => {
    const newnum = {
      number: this.state.newnumber || undefined
    };

    const newid = {
      userid: this.state.userid || undefined
    };

    editnumber(newid, newnum).then(data => {
      if (data.error) {
        this.setState({ error: "number is invalid" });
      } else {
        this.setState({ error: "", number: numb });
        //open :false//for closing the dialog
      }
    });
  };

  clickSubmit = () => {
    const otp = {
      otp: this.state.otp || undefined
    };
    const id = {
      userId: this.state.userid || undefined
    };
    otpverification(id, otp).then(data => {
      console.log("otpverify")
      console.log(id,"id");
      console.log(otp,"otp")
      console.log(data,"data")
      if (data.error) {
        this.setState({ error: "OTP is invalid" });
      } else {
        this.setState({ error: "", redirectToReferrer: true });
      }
    });
  };
  
  componentDidMount() {
    this.setState({
      userid: this.props.location.userID || "",
      number: this.props.location.Number || ""
    });
  }

  resend = () => {
    const id = {
      userId: this.state.userid || undefined
    };
    otp_resend(id).then(data => {
      if (data.error) {
        this.setState({ error: "OTP cannot be sent on this number" });
      } else {
        this.setState({ error: "" });
      }
    });
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }); //closing on Ok button
  };
  
  render() {
    const { classes } = this.props;
    const { redirectToReferrer, error } = this.state;

    const { from } = this.props.location.state || {
      from: {
        pathname: "/business-profile"
      }
    };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Hidden only={["sm", "xs"]}>
          <video className={classes.video} autoPlay muted loop>
            <source src={rain} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </Hidden>
        <Grid container className={classes.centered}>
          <Grid item xs={1} md={3} />

          <Grid item xs={10} md={6}>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <h3> OTP </h3>
                  <p>
                    OTP has been sent to {this.state.number}
                    <Fab
                      size="small"
                      aria-label="Edit"
                      className={classes.fab}
                      onClick={this.handleClickOpen}
                    >
                      <Icon onClick={this.submit}>edit_icon</Icon>
                    </Fab>
                  </p>

                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Change Mobile Number
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        required={true}
                      //  error={error}
                        margin="dense"
                        variant="outlined"
                        id="newnumber"
                        type="number"
                        label="Enter new number"
                        onChange={this.handleChange("newnumber")}
                      />
                    </DialogContent>

                    <DialogActions>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#EA6645", color: "white" }}
                        onClick={this.submit}
                      >
                        ok
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#EA6645", color: "white" }}
                        onClick={this.handleClose}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="otp"
                    type="number"
                    label="OTP"
                    className={classes.textField}
                    onChange={this.handleChange("otp")}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#EA6645", color: "white" }}
                    onClick={this.clickSubmit}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#EA6645", color: "white" }}
                    onClick={this.resend}
                  >
                    Resend
                  </Button>
                  {this.state.error && (
                    <Typography component="p" color="error">
                      <Icon color="error" className={classes.error}>
                        error
                      </Icon>
                      {this.state.error}
                    </Typography>
                  )}
                </CardActions>
              </div>
              <Hidden only={["sm", "xs"]}>
                <CardContent
                  className={classes.cover}
                  style={{ backgroundColor: "#012951", color: "white" }}
                >
                  <h1> welcome </h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing sd Ipsum is
                    simply dummy typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s{" "}
                  </p>
                </CardContent>
              </Hidden>
            </Card>
          </Grid>

          <Grid item xs={1} md={3} />
        </Grid>
      </div>
    );
  }
}

otp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(otp);
