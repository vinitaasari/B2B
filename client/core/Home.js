import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'

import graduation from './../assets/images/graduation.jpg'

const styles = theme => ({
  root : {
    flexGrow: 1,
    marginTop: '150px',
  },
  card : {
    width: '300px',
    height: '250px',
    margin: 'auto',
    overflow: 'visible',
    opacity: '0.9'
  },
  i : {
    position: 'relative',
    top: '-30px',
    left: '115px',
    height: '80px',
    width: '80px',
    backgroundColor: '#012951'
  },
  content: {
    textAlign: 'center'
  },
  cardHead : {
    color: '#EA6645',
    fontWeight: 'bold'
  },
  cardText : {
    color: '#ACACAC'
  },
  cardBtn : {
    backgroundColor: '#012951',
    border: 'none',
    borderRadius: '20px',
    outlineStyle: 'none',
    color: 'white',
    padding: '5px',
    // width: '120px',
    paddingLeft: '15px',
    paddingRight: '15px',
    cursor: 'pointer'
  },
  cardBtn2 : {
    backgroundColor: '#EA6645',
    border: 'none',
    borderRadius: '20px',
    outlineStyle: 'none',
    color: 'white',
    padding: '5px',
    // width: '120px',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginRight: '15px',
    cursor: 'pointer'
  },
  actionBtn : {
    paddingTop: '30px',
    margin: '0 auto'
  }
})

class Home extends Component {

  // componentDidMount = () => {
  //    document.body.style.backgroundImage = `url(${graduation})`
  //    document.body.style.backgroundPosition = 'center'
  //    document.body.style.backgroundRepeat = 'no-repeat'
  //    document.body.style.backgroundSize = 'auto'    
  // }

  render() {
    const {classes} = this.props

    return (
        <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Card className={classes.card} elevation={4}>
              <h1 className={classes.i}></h1>
              <div className={classes.content}>
              <h2 className={classes.cardHead}>VIDEO</h2>
                <p className={classes.cardText}>Lorem ipsum dolor</p>
                <button className={classes.cardBtn}>Read More</button>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card className={classes.card} elevation={4}>
              <h1 className={classes.i}></h1>
              <div className={classes.content}>
              <h2 className={classes.cardHead}>PROCEDURE</h2>
                <p className={classes.cardText}>Lorem ipsum dolor</p>
                <button className={classes.cardBtn}>Read More</button>
              </div>            
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card className={classes.card} elevation={4}>
              <h1 className={classes.i}></h1>
              <div className={classes.content}>
              <h2 className={classes.cardHead}>FAQ</h2>
                <p className={classes.cardText}>Lorem ipsum dolor</p>
                <button className={classes.cardBtn}>Read More</button>
              </div>            
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card className={classes.card} elevation={4}>
              <h1 className={classes.i}></h1>
              <div className={classes.content}>
              <h2 className={classes.cardHead}>REGISTER</h2>
                <p className={classes.cardText}>Lorem ipsum dolor</p>
                <button className={classes.cardBtn}>Read More</button>
              </div>            
            </Card>
          </Grid>
          <div className={classes.actionBtn}>
            <Link to='/signup'>
              <button className={classes.cardBtn2}>Register</button>
            </Link>
            <button className={classes.cardBtn}>Request a Call</button>
          </div>
        </Grid>
       </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)