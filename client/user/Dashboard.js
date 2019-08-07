import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Redirect,Link} from 'react-router-dom'
import {Card, CardActions, CardContent} from '@material-ui/core'
import Typography from 'material-ui/Typography'
import Grid from '@material-ui/core/Grid'


const styles = theme => ({
  cards:
  {
  width: '90%',
    height: '90%',
    margin: 'auto',
   
  },
  layout:{
    padding:'30px',
  },
  shadow:
  {
    boxShadow: '5px 5px 5px grey',
    maxWidth: '350px',
    width:'100%',
    height:'100%',
    marginLeft:'20px',
    marginRight:'20px'
    
},
})

class Dashboard extends Component {

  
   render() {
    const {classes} = this.props
    return (
      <div className={classes.layout}>
      <Grid container spacing={8}>
      <Grid item xs={12} md={4}>
      <Card className={classes.card}  elevation={4} >
      <Link to="/agent-profile/:userId" style={{textDecoration: 'none',color:'black'}}>
      
      <CardContent>
      <h5 >PROFILE</h5>
         
      </CardContent>
      </Link>
        </Card>
        </Grid>


<Grid item xs={12} md={4}>
      <Card className={classes.card}  elevation={4} >
      <Link to="/search" style={{textDecoration: 'none',color:'black'}}>
      
      <CardContent>
      <h5 >SEARCH</h5>
         
      </CardContent>
      </Link>
        </Card>
        </Grid>

        <Grid item xs={12} md={4}>
      <Card className={classes.card}  elevation={4} >
      <Link to="/received-applications" style={{textDecoration: 'none',color:'black'}}>
      
      <CardContent>
      <h5 >RECIEVED APP</h5>
         
      </CardContent>
      </Link>
        </Card>
        </Grid>
        <Grid item xs={12} md={4}>
      <Card className={classes.card}  elevation={4} >
      <Link to="/bid" style={{textDecoration: 'none',color:'black'}}>
      
      <CardContent>
      <h5 >SET BID</h5>
       
      </CardContent>
      </Link>
        </Card>
        </Grid>
        <Grid item xs={12} md={4}>
      <Card className={classes.card}  elevation={4} >
      <Link to="/faqs" style={{textDecoration: 'none',color:'black'}}>
      
      <CardContent>
      <h5 >FAQ</h5>
         
      </CardContent>
      </Link>
        </Card>
        </Grid>
        <Grid item xs={12} md={4}>
      <Card className={classes.card}  elevation={4} >
      <Link to="/Link6/" style={{textDecoration: 'none',color:'black'}}>
      <CardContent>
      <h5 >PAYMENT</h5>
         
      </CardContent>
     
      </Link>
        </Card>
        </Grid>

        </Grid>
      </div>
      
    )
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)