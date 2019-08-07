import React, { Component } from 'react'

import { getUniversitiesNames } from './api-universities.js'
import { countryName } from './api-universities.js'
import { countrySuggestions } from './api-universities.js'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import { Card, CardActions, CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Cancel, LocationOn } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';

import auth from './../auth/auth-helper'

const styles = theme => ({
  search:
  {
    width: '100%'
  },
  button:
  {
    margin: 'auto',
  },
  centered: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
})

class Search extends Component {

  state = {
    user: [],
    uni: '',
    data: [],
    items: [],
    display: false,
    err1: null,
    err2: '',
    university: '',
    country: '',
    id: '',
    error1: '',
    universitydata: '',
    universityerr: '',
    disabled: false,
    redirectToReferrer: false,
    countryId: '',
    uniId: '',
    datas: [],
    submitted: false,
    submit: false
  }


  //University suggestion
  getSuggestions = () => {
    const uni = { search: this.state.university };
    getUniversitiesNames(uni).then((data) => {

      if (data.msg) {
        this.setState({ data: null, err1: data.msg })
      }
      else {
        this.setState({ data: data })
      }

    })

  }
  //Suggestions for country
  getcountrySuggestions = () => {
    const jwt = auth.isAuthenticated()
    const country = this.state.country;
    countrySuggestions(country, {t: jwt.token}).then((datas) => {

      if (datas.msg) {
        this.setState({ datas: null, err2: datas.msg })
      }
      else {
        this.setState({ datas: datas })
      }
    })

  }


  //Checking length of charters
  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (this.state.university.length > 2) {

        this.getSuggestions()
      }

      else if (this.state.country.length > 2) {

        this.getcountrySuggestions()
      }
      else {
        this.setState({ err1: '', err2: '', error1: '', error2: '', data: '' })

        if (this.state.university > 1 ) {
          this.setState({ error2: "Atleast 3 characters are reqiured!" })
        }
        else 
        if (this.state.country > 1 )
         {
          this.setState({ error1: "Atleast 3 characters are reqiured!" })
        }
        // else {
        //   this.setState({ error1: '', error2: '' })
        // }
      }
    })
  }


  //displaying universities from university suggestions
  displayfromUniversity = (id, fromuni) => {

    const getuni = fromuni
    countryName(id, getuni).then((data) => {

      if (data.msg) {
        this.setState({ data: null, err1: data.msg })
      }
      else {
        this.setState({ country: data[0]._id, uniId: id, university: getuni, data: [], disabled: !this.state.disabled }

        )

      }
    })

  }

  //Passing country Id 
  displayfromCountry = (fromcountry) => {
    this.setState({ countryId: fromcountry, redirectToReferrer: true })

  }

  // On submit redirect to another page
  Submit = () => {
    if (this.state.university !== ' ' && this.state.country !== '') {
      this.setState({ redirectToReferrer: true })
    }
    else {
      this.setState({ error1: 'fill the field first', error2: 'fill the field first' })
    }
  }

  close = () => {
    this.setState({ university: '', country: '', data: '', disabled: '', error: '' })
  }

  render() {
    let ID;
    if (this.state.countryId !== '') {
      ID = this.state.countryId
    }
    else {
      ID = this.state.uniId

    }

    const { from } = this.props.location.state || {
      from: {
        pathname: '/universitieslist',
        Id: ID

      }
    }
    const { classes } = this.props;
    const { redirectToReferrer } = this.state

    console.log(this.state.data, 'error data')
    console.log(this.state.country, 'country name')
    if (redirectToReferrer) {
      return (<Redirect to={from} />)
    }
    return (

      <div >
        <Grid container className={classes.centered} spacing={2}>
          <Grid item xs={2}>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h3" >
              Find Universities Abroad that are Right for you
        
      </Typography>
          </Grid>


          <Grid item xs={2}>
          </Grid>

          <Grid item xs={2}>
          </Grid>

          <Grid item xs={8} >
            <Typography variant="body2" >
              Discover Research Decide
      </Typography>
          </Grid>

          <Grid item xs={2}>
          </Grid>

          <Grid item xs={2}>
          </Grid>
          <Grid item xs={4} className={classes.search}>

            <TextField type="search" fullwidth="true" variant="outlined" margin="dense" className={classes.search}
              label="Enter university name..." id="universities" value={this.state.university}
              disabled={(this.state.disabled) ? true : false}
              onChange={this.handleChange('university')}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.close} position="end">
                    <Cancel />

                  </InputAdornment>

                ),

              }}
            />

            {
              this.state.error2 && <Typography >{this.state.error2}</Typography>
            }
            <ul style={{ listStyleType: 'none' }}>
              {
                this.state.data ?
                  this.state.data.map((item) => {
                    return (
                      <li key={item._id} onClick={() => this.displayfromUniversity(item._id, item.university)}>
                        {item.university}
                        <Divider />
                      </li>
                    )
                  }) : <p>{this.state.err1}</p>
              }
            </ul>
          </Grid>
          <Grid item xs={3} className={classes.search}>
            <TextField type="search" fullwidth="true" variant="outlined" margin="dense" className={classes.search}
              label="Enter country name..." id="country" value={this.state.country}
              disabled={(this.state.disabled) ? true : false}
              onChange={this.handleChange('country')}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.close} position="end">
                    <LocationOn />

                  </InputAdornment>
                ),
              }}
            />
            {
              this.state.error1 && <Typography >{this.state.error1}</Typography>
            }

            <ul style={{ listStyleType: 'none' }}>
              {
                this.state.datas ?
                  this.state.datas.map((item) => {
                    return (
                      <li key={item._id} onClick={() => this.displayfromCountry(item._id)} >
                        {item.Name}
                        <Divider />
                      </li>
                    )
                  }) : <p>{this.state.err2}</p>
              }
            </ul>

          </Grid>
          <Grid item xs={1} className={classes.button}>
            <Button style={{ backgroundColor: '#ea6645', marginTop: "9px" }} onClick={() => this.Submit()} className={classes.search} > Search </Button>
          </Grid>
          <Grid item xs={2} >
          </Grid>

        </Grid>



      </div>

    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Search)