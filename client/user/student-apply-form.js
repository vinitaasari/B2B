import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon';
import { StudentApply } from './api-student.js'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import NativeSelect from '@material-ui/core/NativeSelect';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox'
import { Suggestion } from './api-user.js'
import { getStudentData } from './api-student.js'
import { Redirect } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {Dialog, DialogActions,DialogContent, DialogTitle} from '@material-ui/core';
import { OutlinedInput} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { MuiPickersUtilsProvider,  DatePicker } from '@material-ui/pickers';

import auth from './../auth/auth-helper'

const styles = theme => ({
  formControl: {

    minWidth: 120,
  },
  container:
  {
    padding: theme.spacing(5, 0, 6),
  },
  submit: {
    margin: 'auto',
    textAlign: 'center'
  },
  search: {
    width: '100%'
  }

})


class Student extends Component {
  state = {
    firstname: '',
    middlename: '',
    lastname: '',
    title: '',
    mobileno: '',
    alternateno: '',
    email: '',
    dob: new Date(),
    marriage: '',
    education: '',
    english: '',
    work: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    abroad: '',
    refusedvisa: '',
    interestedcountry: '',
    interestedcourse: '',
    Campuses: '',
    institutes: '',
    inquiry: '',
    pte: '',
    redirectToReferrer: false,
    checked: true,
    search: '',
    newstudent: '',
    open: false,
    data: [],
    allcheck:false,
    error: '',
    check:
    {
      title: false,
      firstname: false,
      lastname: false,
      mobileno: false,
      email: false,
      work: false,
      address: false,
      state: false,
      city: false,
      pincode: false
    },

    award:'',
    stream:'',
    major_subject:'',
    result:'',
    institude:'',
    medium:'',
    selectedDate: new Date(),
    dialog: false,
  }

  clickSubmit = () => {

    const UniversityId = '5d247462704eff3ae466ac2d'//this.props.location.UniversityId 
    const Userid1 = '5d3c31e13b97034aec8c3ed7'//auth.isAuthenticated().user._id  Logged In Id
    const Userid2 = '5d3c327a718c0749b463202b'//this.props.location.Agent Agent Id
    const student = {
      title: this.state.title || undefined,
      firstname: this.state.firstname || undefined,
      middlename: this.state.middlename || undefined,
      lastname: this.state.lastname || undefined,
      mobile_number: this.state.mobileno || undefined,
      alternate_number: this.state.alternato || undefined,
      email: this.state.email || undefined,
      work_experience: this.state.work || undefined,
      address: this.state.address || undefined,
      state: this.state.state || undefined,
      city: this.state.city || undefined,
      pincode: this.state.pincode || undefined,
      abroad: this.state.abroad || undefined,
      refused_visa: this.state.refusedvisa || undefined,
      interested_country: this.state.interestedcountry || undefined,
      institutes: this.state.institutes || undefined,
      campuses: this.state.campuses || undefined,
      interested_course: this.state.interestedcourse || undefined,
      intake: this.state.intake || undefined,
      pay: this.state.payforeducation || undefined,
      loan: this.state.loan || undefined,
      pte: this.state.pte || undefined,
      enquiry: this.state.inquiry || undefined,
      redirectToReferrer: false


    }
    const { check } = this.state
    if (this.state.title == '') {
      check['title'] = true
      this.setState({ check: check })
    }
  
    if (this.state.firstname == '') {
      check['firstname'] = true
      this.setState({ check: check })
    }

    if (this.state.lastname == '') {
      check['lastname'] = true
      this.setState({ check: check })
    }
    if (this.state.mobile_number == '') {
      check['mobileno'] = true
      this.setState({ check: check })
    }
    if (this.state.email == '') {
      check['email'] = true
      this.setState({ check: check })
    }
  
    if (this.state.work == '') {
      check['work'] = true
      this.setState({ check: check })
    }

    if (this.state.address == '') {
      check['address'] = true
      this.setState({ check: check })
    }
  
    if (this.state.state == '') {
      check['state'] = true
      this.setState({ check: check })
    }
  
    if (this.state.city == '') {
      check['city'] = true
      this.setState({ check: check })
    }
   
    if (this.state.pincode == '') {
      check['pincode'] = true
      this.setState({ check: check })
    }
    else {
      this.setState({allcheck:true})
      
    }



  
{
  const jwt = auth.isAuthenticated()
  if(this.state.allcheck==true)

  StudentApply(UniversityId,Userid1,Userid2,student,{t: jwt.token}).then((data) => {
    
    console.log(student,"student")
    console.log(data)
    if (data.error) {
      this.setState({ error: '' })
    } else {
      this.setState({ error: '', redirectToReferrer: true })

    }

  })
  }
}

  getdata = (Id) => {

    const id = Id
    const jwt = auth.isAuthenticated()
    getStudentData(id, {t: jwt.token}).then((data) => {

      if (data.error) {
        this.setState({ error: 'User Not Found' })
      }
      else {
        this.setState({
          error: '',
          firstname: data[0].firstname,
          middlename: data[0].middlename,
          lastname: data[0].lastname,
          title: data[0].title,
          mobileno: data[0].mobile_number,
          alternateno: data[0].alternate_number,
          email: data[0].email,
          work: data[0].work,
          address: data[0].work,
          state: data[0].state,
          city: data[0].city,
          pincode: data[0].pincode,
          abroad: data[0].abroad,
          refusedvisa: data[0].refused_visa,
          interestedcountry: data[0].interested_country,
          interestedcourse: data[0].interested_course,
          Campuses: data[0].campuses,
          institutes: data[0].institutes,
          inquiry: data[0].enquiry,
          pte: data[0].pte,
        })

      }
    })
  }


  studentSuggestion = () => {
    const search = this.state.search
    const jwt = auth.isAuthenticated()
    Suggestion(ID, search, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({ error: '' })
      } else {
        this.setState({ error: '', data: data })

      }

    })
  }


  handleChange = name => event => {
    const {check} = this.state;
    check[name] = '';
    this.setState({ [name]: event.target.value, check: check,allcheck:true}, () => {
      if (this.state.search.length > 2) {

        this.studentSuggestion()

      }
      else 
      {
        this.setState({error:'Atleast 3 characters are required'})
      }
    }
    )


  }

  OpenSeachbar = () => {
    this.setState({ open: true, newstudent: '' })

  }

  CloseSearchbar = () => {

    this.setState({ open: false })
  }

  handleClickOpen = () => {
    this.setState({dialog:true})
  }

  handleClose = () => {
    this.setState({dialog:false })
  }

  handleDateChange = date => {
   this.setState({ dob: date });
 };

 handleYearChange = date => {
   this.setState({ selectedDate: date });
 };

  render() {
    const { classes } = this.props
    // function createData(name, calories, fat, carbs, protein) {
    //   return { name, calories, fat, carbs, protein };
    // }

    const { from } = this.props.location.state || {
      from: {
        pathname: '/received-applications',

      }
    }
    const { redirectToReferrer, error } = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from} />)
    }


    const rows = [
      // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      // createData('Eclair', 262, 16.0, 24, 6.0),
      // createData('Cupcake', 305, 3.7, 67, 4.3),
      // createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    return (

      <div className={classes.container} >
        <Box borderColor="#012951" border={1} clone style={{ marginRight: "10px", marginLeft: "10px" }}>
          <Container maxWidth="lg">

            <Typography variant="h6">PERSONAL DETAILS </Typography>
            <Divider />
            <Grid container spacing={2} style={{
              margin: 0,
              width: '100%',
              padding: '20px',

            }}>
              <Grid item xs={12} sm={3}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="newstudent"
                    name="newstudent"
                    onClick={this.CloseSearchbar}
                    value={this.state.newstudent}
                    onChange={this.handleChange('newstudent')}
                    row
                  >
                    <FormControlLabel
                      value="New Student"
                      control={<Radio color="primary" />}
                      label="New Student"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="existingstudent"
                    name="existingstudent"
                    value={this.state.newstudent}
                    onClick={this.OpenSeachbar}
                    onChange={this.handleChange('newstudent')}
                    row
                  >
                    <FormControlLabel
                      value="Existing Student"
                      control={<Radio color="primary" />}
                      label="Existing Student"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {

                this.state.open &&
                <div className={classes.search}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth variant="outlined" required id="search" label="search student" value={this.state.search} onChange={this.handleChange('search')} margin="dense" />
                  </Grid>
                  <div className="row">
                    <div className="col-xs-12  col-md-12">


                      <ul style={{ listStyleType: 'none' }}>
                        {

                          this.state.data ?
                            this.state.data.map((item) => {
                              return (
                                <li key={item._id} onClick={() => { this.getdata(item._id) }}>
                                  {item.name}
                                </li>
                              )
                            }) : <p>{this.state.msg}</p>
                        }
                      </ul>
                    </div>
                  </div>
                </div>

              }


              <Grid item xs={6} md={3}>

                <Typography >Title</Typography>

                <Select
                  native
                  fullWidth value={this.state.title}
                  onChange={this.handleChange('title')}
                  input={
                    <OutlinedInput name="Title" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"Mr"}>Mr.</option>
                  <option value={"Mrs"}>Mrs.</option>
                  <option value={"Miss"}>Miss</option>
                </Select>
                {
                  this.state.check.title && (<Typography component="p" color="error">
                    {'Title is Required'}</Typography>)
                }
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography >First Name</Typography>
                <TextField fullWidth variant="outlined" required id="firstname" label="First Name" value={this.state.firstname} onChange={this.handleChange('firstname')} margin="dense" />
                {
                  this.state.check.firstname && (<Typography component="p" color="error">
                    {'Firstname is required '}</Typography>)
                }
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >Middle Name</Typography>
                <TextField fullWidth variant="outlined" id="middlename" label="Middle Name" value={this.state.middlename} onChange={this.handleChange('middlename')} margin="dense" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >Last Name</Typography>
                <TextField fullWidth variant="outlined" required id="lastname" label="Last Name" value={this.state.lastname} onChange={this.handleChange('lastname')} margin="dense" />
                {
                  this.state.check.lastname && (<Typography component="p" color="error">
                    {'Lastname is required '}</Typography>)
                }
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography >Mobile Number</Typography>
                <TextField fullWidth variant="outlined" type="number" required id="mobileno" label="Mobile Number" value={this.state.mobileno} onChange={this.handleChange('mobileno')} margin="dense" />
                {
                  this.state.check.mobileno && (<Typography component="p" color="error">
                    {'Mobile Number is required '}</Typography>)
                }
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >Alternate Number</Typography>
                <TextField fullWidth variant="outlined" type="number" id="alternateno" label="Alternate Number" value={this.state.alternateno} onChange={this.handleChange('alternateno')} margin="dense" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >Email</Typography>
                <TextField fullWidth variant="outlined" required type="email" id="email" label="Email Address" value={this.state.email} onChange={this.handleChange('email')} margin="dense" />
                {
                  this.state.check.email && (<Typography component="p" color="error">
                    {'Email is required '}</Typography>)
                }
              </Grid>

<Grid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography >Date of Birth</Typography>
                <DatePicker
                margin="dense"
                fullWidth required
                label="Date of Birth"
                value={this.state.dob}
                format="dd/MM/yyyy"
                inputVariant="outlined"
                onChange={this.handleDateChange}
                />
         </MuiPickersUtilsProvider>
                {
                  this.state.check.dob && (<Typography component="p" color="error">
                    {'DOB is required '}</Typography>)
                }
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography >Marital Status</Typography>
                <Select
                  native
                  fullWidth value={this.state.marriage}
                  onChange={this.handleChange('marriage')}
                  input={
                    <OutlinedInput name="marriage" required margin="dense" />
                  }
                >
                  <option value="" >Please Select</option>
                  <option value={"Single"}>Single</option>
                  <option value={"Married"}>Married</option>
                  <option value={"Divorced"}>Divorced</option>
                  <option value={"Widowed"}>Widowed</option>
                </Select>
                {
                  this.state.error && (<Typography component="p" color="error">
                    {'Marital Status is required '}</Typography>)
                }
              </Grid>

              


              <Grid item xs={12} sm={3}>
                <FormControl component="fieldset">
                  <Typography >Work Experience</Typography>
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.work}
                    onChange={this.handleChange('work')}
                    row
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
                {
                  this.state.check.work && (<Typography component="p" color="error">
                    {'Work is required'}</Typography>)
                }
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >Highest Education</Typography>
                <Select
                  native
                  fullWidth value={this.state.education}
                  onChange={this.handleChange('education')}
                  input={
                    <OutlinedInput name="education" required margin="dense" />
                  }
                >
                  <option value="" >Please Select</option>
                  <option value={"ssc"}>S.S.C</option>
                  <option value={"hsc"}>H.S.C</option>
                  <option value={"Diploma"}>Diploma</option>
                  <option value={"Bachelor"}>Bachelor</option>
                  <option value={"Post Graduate"}>Post Graduate</option>
                  <option value={"Master"}>Master</option>
                  <option value={"Mphill"}>Mphill</option>
                  <option value={"Phd"}>PHD</option>
                  <option value={"Other"}>Other</option>
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >English Proficiency</Typography>
                <Select
                  native
                  fullWidth value={this.state.english}
                  onChange={this.handleChange('english')}
                  input={
                    <OutlinedInput name="english" required margin="dense" />
                  }
                >
                  <option value="" >Please Select</option>
                  <option value={"No"}>No</option>
                  <option value={"IELTS"}>IELTS</option>
                  <option value={"TOEFL"}>TOEFL</option>
                  <option value={"PTE"}>PTE</option>
                  <option value={"SAT"}>SAT</option>
                  <option value={"ACT"}>ACT</option>
                  <option value={"GRE"}>GRE</option>
                  <option value={"GMAT"}>GMAT</option>
                </Select>
              </Grid>

            </Grid>


            <Typography variant="h6" >CURRENT ADDRESS </Typography>
            <Divider />
            <Grid container spacing={2} style={{
              margin: 0,
              width: '100%',
              padding: '20px',
            }}>
              <Grid item xs={12} sm={3}>
                <Typography >Address</Typography>
                <TextField fullWidth variant="outlined" multiline rowsMax="4" required id="address" label="ENTER ADDRESS" value={this.state.address} onChange={this.handleChange('address')} margin="dense" />
                {
                  this.state.check.address && (<Typography component="p" color="error">
                    {'Address is required '}</Typography>)
                }
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >State</Typography>
                <TextField fullWidth variant="outlined" required id="state" label="ENTER STATE" value={this.state.state} onChange={this.handleChange('state')} margin="dense" />
                {
                  this.state.check.state && (<Typography component="p" color="error">
                    {'State is required '}</Typography>)
                }
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >City</Typography>
                <TextField fullWidth variant="outlined" required id="city" label="ENTER CITY" value={this.state.city} onChange={this.handleChange('city')} margin="dense" />
                {
                  this.state.check.city && (<Typography component="p" color="error">
                    {'City is required '}</Typography>)
                }
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography >Pincode</Typography>
                <TextField fullWidth variant="outlined" required id="pincode" label="ENTER PINCODE" value={this.state.pincode} onChange={this.handleChange('pincode')} margin="dense" />
                {
                  this.state.check.pincode && (<Typography component="p" color="error">
                    {'Pincode is required'}</Typography>)
                }
              </Grid>
            </Grid>

<Grid container  style={{
              margin: 0,
              width: '100%',
              padding: '20px',
            }}>
            <Grid item xs={11} md={11}>
            <Typography variant="h6" >ACADEMIC DETAILS </Typography>
            </Grid>
            <Grid item xs={1} md={1}>
            <Fab size="small" color="primary" aria-label="Add" style={{float:"right"}} onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        </Grid>
        </Grid>
            <Divider />
            <Grid container spacing={2} style={{
              margin: 0,
              width: '100%',
              padding: '20px',
            }}>
            </Grid>

            <Typography variant="h6">SPECIFIC DETAILS</Typography>
            <Divider />
            <Grid container spacing={2} style={{
              margin: 0,
              width: '100%',
              padding: '20px',
            }}>

              <Grid item xs={12} sm={6}>
                <Typography >Have you ever been to abroad?(if yes, please tell us to which country, on what Visa and for How Long?)</Typography>
                <TextField fullWidth variant="outlined" multiline rows="3" required id="abroad" value={this.state.abroad} onChange={this.handleChange('abroad')} margin="dense" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography >Have you ever been refused for Visa any country?(if yes, please tell us to which country, on what Visa and for How Long?)</Typography>
                <TextField fullWidth variant="outlined" multiline rows="3" required id="refusedvisa" value={this.state.refusedvisa} onChange={this.handleChange('refusedvisa')} margin="dense" />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography >Interested Country</Typography>
                <Select
                  native
                  fullWidth value={this.state.interestedcountry}
                  onChange={this.handleChange('interestedcountry')}
                  input={
                    <OutlinedInput name="interestedcountry" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"interested country"}>interested country</option>
                  <option value={"interested country"}>interested country</option>
                  <option value={"interested country"}>interested country</option>
                </Select>
              </Grid>


              <Grid item xs={12} sm={3}>
                <Typography >Institutes</Typography>
                <Select
                  native
                  fullWidth value={this.state.institutes}
                  onChange={this.handleChange('institutes')}
                  input={
                    <OutlinedInput name="institutes" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"Institutes"}>Institutes</option>
                  <option value={"Institutes"}>Institutes</option>
                  <option value={"Institutes"}>Institutes</option>
                </Select>
              </Grid>


              <Grid item xs={12} sm={3}>
                <Typography >Campuses</Typography>
                <Select
                  native
                  fullWidth value={this.state.campuses}
                  onChange={this.handleChange('campuses')}
                  input={
                    <OutlinedInput name="campuses" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"campuses"}>campuses</option>
                  <option value={"campuses"}>campuses</option>
                  <option value={"campuses"}>campuses</option>
                </Select>
              </Grid>


              <Grid item xs={12} sm={3}>
                <Typography >Interested Course</Typography>
                <Select
                  native
                  fullWidth value={this.state.interestedcourse}
                  onChange={this.handleChange('interestedcourse')}
                  input={
                    <OutlinedInput name="interestedcourse" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"Interested Course"}>Interested Course</option>
                  <option value={"Interested Course"}>Interested Course</option>
                  <option value={"Interested Course"}>Interested Course</option>
                </Select>
              </Grid>


              <Grid item xs={12} sm={3}>
                <Typography >Which Intake you would like go for?</Typography>
                <Select
                  native
                  fullWidth value={this.state.intake}
                  onChange={this.handleChange('intake')}
                  input={
                    <OutlinedInput name="intake" required margin="dense" />
                  }
                >
                  <option value="">Select Intake </option>
                  <option value={"Intake"}>Intake</option>
                  <option value={"Intake"}>Intake</option>
                  <option value={"Intake"}>Intake</option>
                </Select>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography >Who will pay for your education?</Typography>
                <Select
                  native
                  fullWidth value={this.state.payforeducation}
                  onChange={this.handleChange('payforeducation')}
                  input={
                    <OutlinedInput name="payforeducation" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"pay for education"}>pay for education</option>
                  <option value={"pay for education"}>pay for education</option>
                  <option value={"pay for education"}>pay for education</option>
                </Select>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography >Would you be going for bank loan?</Typography>
                <Select
                  native
                  fullWidth value={this.state.loan}
                  onChange={this.handleChange('loan')}
                  input={
                    <OutlinedInput name="loan" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"Yes"}>Yes</option>
                  <option value={"No"}>No</option>
                </Select>
              </Grid>
              <Hidden only={['sm', 'xs']}>
                <Grid item xs={12} sm={3}>
                </Grid>
              </Hidden>

              <Grid item xs={12} sm={3}>
                <Typography >Are you willing to give IELTS/TOEFL/PTE?</Typography>
                <TextField fullWidth variant="outlined" id="pte" value={this.state.pte} onChange={this.handleChange('pte')} margin="dense" />
              </Grid>


              <Grid item xs={12} sm={3}>
                <Typography >Status</Typography>
                <Select
                  native
                  fullWidth value={this.state.inquiry}
                  onChange={this.handleChange('inquiry')}
                  input={
                    <OutlinedInput name="inquiry" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"Yes"}>Yes</option>
                  <option value={"No"}>No</option>
                </Select>
              </Grid>
            </Grid>

            <Typography variant="h6" >DOCUMENTS REQUIRED</Typography>
            <Divider />
            <Grid container spacing={2} style={{
              margin: 0,
              width: '100%',
              padding: '20px',
            }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" >[1] 10th Mark Sheet + Certificate<br />
                  [2] 12th Mark Sheet + Certificate<br />
                  [3] Graduation Mark Sheet<br />
                  [4] Provisional Degree<br />
                  [5] Passport<br />
                  [6] Photograph<br />
                  [7] Statement of Purpose (SOP)<br />
                  [8] Letter of Recommendation (LOR)<br />
                  [9] IELTS/PTE/ TOEFL/GRE/ GMAT<br />
                  [10] Resume<br />
                  [11] Medical Certificate</Typography>

              </Grid>
            </Grid>


            <Typography variant="h6" style={{ backgroundColor: "#012951", color: "White", textAlign: "center" }}>Please read this carefully...</Typography>

            <Grid container spacing={2} style={{
              margin: 0,
              width: '100%',
              padding: '20px',
            }}>
              <Grid item xs={12} sm={12}>
                <Typography variant="body1" >We at Gateway International Pvt. Ltd. Assist our Associates for various application procedures. We help your students in getting admission in foreign countries. Options provided by us is based on information provided by you, which is to be believed as correct and updated. We provide information based on Institutes requirement & immigration rules. We shall try our best to provide you most updated information. However, we do not take any responsibilities in case of any recent changes in the visa laws or institutes and course details.
    </Typography>

              </Grid>
            </Grid>

            <Typography variant="h6" style={{ backgroundColor: "#012951", color: "White", textAlign: "center" }}>Declaration</Typography>

            <Grid container spacing={2} style={{
              margin: 0,
              width: '100%',
              padding: '20px',
            }}>

              <Grid item xs={12} sm={12} style={{ display: "inline-flex" }}>
                <FormControlLabel control={<Checkbox value="checked" color="primary" />} label="I hereby solemnly declare that the information provided by me herein is accurate and updated as on the date of submitting this form." />

              </Grid>
              <Grid item xs={12} sm={12}>
                <div className={classes.submit}>
                  <Button variant="contained" style={{ backgroundColor: "#EA6645", color: "white" }} onClick={this.clickSubmit}>Submit</Button>
                </div>
              </Grid>
            </Grid>


<Dialog open={this.state.dialog} onClose={this.handleClose}  fullWidth>
        <DialogTitle style={{ backgroundColor: "#012951", color: "White"}}>Academic Details</DialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container minwidth="lg" spacing={2}>
        <Grid item xs={6} sm={6}>
        <Typography >Award</Typography>

                <Select
                  native
                  fullWidth value={this.state.award}
                  onChange={this.handleChange('award')}
                  input={
                    <OutlinedInput name="Award" required margin="dense" />
                  }
                >
                  <option value="" >Please Select</option>
                  <option value={"ssc"}>S.S.C</option>
                  <option value={"hsc"}>H.S.C</option>
                  <option value={"Diploma"}>Diploma</option>
                  <option value={"Bachelor"}>Bachelor</option>
                  <option value={"Post Graduate"}>Post Graduate</option>
                  <option value={"Master"}>Master</option>
                  <option value={"Mphill"}>Mphill</option>
                  <option value={"Phd"}>PHD</option>
                  <option value={"Other"}>Other</option>
                </Select> 
</Grid>

        <Grid item xs={12} sm={6}>
        <Typography >Stream</Typography>

                <Select
                  native
                  fullWidth value={this.state.stream}
                  onChange={this.handleChange('stream')}
                  input={
                    <OutlinedInput name="Stream" required margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"General"}>General</option>
                  <option value={"Science"}>Science</option>
                  <option value={"Commerce"}>Commerce</option>
                  <option value={"Arts"}>Arts</option>
                  <option value={"Engineering"}>Engineering</option>
                  <option value={"Other"}>Other</option>
                </Select> 
</Grid>

        <Grid item xs={12} sm={6}>
         <Typography>Major Subject</Typography>
        <TextField fullWidth variant="outlined" required id="major_subject" label="Enter Major Subject" value={this.state.major_subject} onChange={this.handleChange('major_subject')} margin="dense" />
</Grid>
       <Grid item xs={12} sm={6}>
         <Typography>Result</Typography>
        <TextField fullWidth variant="outlined" type="number" required id="result" label="Enter Percentage" value={this.state.result} onChange={this.handleChange('result')} margin="dense" />
</Grid>
       <Grid item xs={12} sm={6}>
         <Typography>Institude/University</Typography>
        <TextField fullWidth variant="outlined" required id="institude" label="Enter Institude/University" value={this.state.institude} onChange={this.handleChange('institude')} margin="dense" />
</Grid>
 <Grid item xs={12} sm={6}>
        <Typography >Medium</Typography>

                <Select
                  native
                  fullWidth value={this.state.medium}
                  onChange={this.handleChange('medium')}
                  input={
                    <OutlinedInput name="Medium" margin="dense" />
                  }
                >
                  <option value="">Please Select </option>
                  <option value={"English"}>English</option>
                  <option value={"Hindi"}>Hindi</option>
                  <option value={"Other"}>Other</option>
                </Select> 
</Grid>
 <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography >Year of Passing</Typography>
         <DatePicker
          views={["year"]}
           margin="dense"
           label="Year of Passing"
          inputVariant="outlined"
           value={this.state.selectedDate}
           onChange={this.handleYearChange}
         />
         </MuiPickersUtilsProvider>
</Grid>

</Grid>

        </DialogContent>
        
        <DialogActions>
        <Button onClick={this.handleClose} color="primary" style={{ backgroundColor: "#EA6645", color: "white" }}>
            Cancel
          </Button>

        <Button color="primary" style={{ backgroundColor: "#EA6645", color: "white" }}>Save changes</Button>
       </DialogActions>
      </Dialog>

          </Container>
        </Box>

      </div>


    )
  }
}


Student.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Student)