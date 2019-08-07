import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Popup from "reactjs-popup"
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CancelIcon from 'material-ui-icons/Cancel'
import TrueIcon from 'material-ui-icons/CheckCircle'

const styles = theme => ({
  modal: {
    fontSize: '12px',
    height:'250px'
  },
 header:
  {
    width: '100%',
    borderBottom: '1px solid gray',
    fontSize: '18px',
    textAlign: 'center',
    padding: '5px'
  },
  heading:{
    width: '100%',
    padding: '20px 5px',
    textAlign:'center',
    font:'sans-serif'
   
  },
  content:{
    width: '100%',
    padding: '20px 5px',
    fontSize:'20px',
    textAlign:'center'
   
  },
  actions: {
    width:' 100%',
    padding: '10px 5px',
    margin: 'auto',
    textAlign: 'center'
  },
  close :
  {
    cursor:' pointer',
    position:' absolute',
    display: 'block',
    padding: '2px 5px',
    lineHeight: '20px',
    right:' -10px',
    top:' -10px',
    fontSize: '24px',
    background:' #ffffff',
    borderRadius: '018px',
    border: '1px solid #cfcece'
  },
  icon:
   {
      
       color:'green',
      
   },
   btn:
    {
      float:'centre',
      variant:"primary"
       
    },
    button:
    {
    
   width:'80%',
   borderRadius:'30px',
   color:'white',
   borderColor:'transparent',
   backgroundColor:'green',
   padding:'-20px'
	 
    
      
		
    }
  })


class Link1 extends Component {
    render(){
        const {classes} = this.props

    
        return(
            <Card className={classes.root} elevation={4} >
            <Typography type="title" className={classes.title} >
            <Popup trigger={<Button> Open Modal </Button>} modal>
    {close => (
      <div className={classes.modal}>
       <div className={classes.heading}>
        <IconButton className={classes.icon}><TrueIcon></TrueIcon></IconButton>
        
            <h4 >
            Email is verified!
           <p className={classes.content}>we have sent a confirmation to your email for verification</p>
            </h4>
            <Button className={classes.button} border='transparent' >Ok</Button>
          
        </div >

        
      </div>
    )}
    
  </Popup>
 
            </Typography>
            
         </Card>
        )
    }
}

Link1.propTypes = {
    classes: PropTypes.object.isRequired
   }
   
   export default withStyles(styles)(Link1)	
