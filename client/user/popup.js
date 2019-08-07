// import React, {Component} from 'react'
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types'
// import {withStyles} from 'material-ui/styles'
// import AddUniversity from './api-extrauniversity.js'
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import axios from 'axios'
// import {Divider,  Select, NativeSelect, Typography, OutlinedInput, Grid} from '@material-ui/core';
// import DateFnsUtils from '@date-io/date-fns';
// import 'date-fns';
// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';
// import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';


// const styles = theme => ({
// dialog:{
//   minWidth:'lg',
// },
//  root: {
//     width: '100%',
//     overflowX: 'auto',

//   },
//   table: {

//     overflowX: 'auto',
//   },
// });

// class popup extends Component {
//   state={
//     award:'',
//     stream:'',
//     major_subject:'',
//     result:'',
//     institude:'',
//     medium:'',
//     year_of_passing:'',
//     error: '',
//     dialog: false,
//     selectedDate: new Date(),

//   }

//   handleChange = name => event => {
//     this.setState({[name]: event.target.value})
//   }


//   handleClickOpen = () => {
//     this.setState({dialog:true})
//   }

//   handleClose = () => {
//     this.setState({dialog:false })
//   }

//   handleDateChange = date => {
//    this.setState({ selectedDate: date });
//  };

//   render(){
//     const { classes } = this.props;

//  function createData(name, calories, fat, carbs, protein) {
//       return { name, calories, fat, carbs, protein };
//     }


// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


//     return(
// <div>
// <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
//   Add University
//  </Button>

// <Dialog open={this.state.dialog} onClose={this.handleClose}  fullWidth>
//         <DialogTitle style={{ backgroundColor: "#012951", color: "White"}}>Academic Details</DialogTitle>
//         <Divider/>
//         <DialogContent>
//         <Grid container minwidth="lg" spacing={2}>
//         <Grid item xs={6} sm={6}>
//         <Typography >Award</Typography>

//                 <Select
//                   native
//                   fullWidth value={this.state.award}
//                   onChange={this.handleChange('award')}
//                   input={
//                     <OutlinedInput name="Award" required margin="dense" />
//                   }
//                 >
//                   <option value="" >Please Select</option>
//                   <option value={"ssc"}>S.S.C</option>
//                   <option value={"hsc"}>H.S.C</option>
//                   <option value={"Diploma"}>Diploma</option>
//                   <option value={"Bachelor"}>Bachelor</option>
//                   <option value={"Post Graduate"}>Post Graduate</option>
//                   <option value={"Master"}>Master</option>
//                   <option value={"Mphill"}>Mphill</option>
//                   <option value={"Phd"}>PHD</option>
//                   <option value={"Other"}>Other</option>
//                 </Select> 
// </Grid>

//         <Grid item xs={12} sm={6}>
//         <Typography >Stream</Typography>

//                 <Select
//                   native
//                   fullWidth value={this.state.stream}
//                   onChange={this.handleChange('stream')}
//                   input={
//                     <OutlinedInput name="Stream" required margin="dense" />
//                   }
//                 >
//                   <option value="">Please Select </option>
//                   <option value={"General"}>General</option>
//                   <option value={"Science"}>Science</option>
//                   <option value={"Commerce"}>Commerce</option>
//                   <option value={"Arts"}>Arts</option>
//                   <option value={"Engineering"}>Engineering</option>
//                   <option value={"Other"}>Other</option>
//                 </Select> 
// </Grid>

//         <Grid item xs={12} sm={6}>
//          <Typography>Major Subject</Typography>
//         <TextField fullWidth variant="outlined" required id="major_subject" label="Enter Major Subject" value={this.state.major_subject} onChange={this.handleChange('major_subject')} margin="dense" />
// </Grid>
//        <Grid item xs={12} sm={6}>
//          <Typography>Result</Typography>
//         <TextField fullWidth variant="outlined" type="number" required id="result" label="Enter Percentage" value={this.state.result} onChange={this.handleChange('result')} margin="dense" />
// </Grid>
//        <Grid item xs={12} sm={6}>
//          <Typography>Institude/University</Typography>
//         <TextField fullWidth variant="outlined" required id="institude" label="Enter Institude/University" value={this.state.institude} onChange={this.handleChange('institude')} margin="dense" />
// </Grid>
//  <Grid item xs={12} sm={6}>
//         <Typography >Medium</Typography>

//                 <Select
//                   native
//                   fullWidth value={this.state.medium}
//                   onChange={this.handleChange('medium')}
//                   input={
//                     <OutlinedInput name="Medium" margin="dense" />
//                   }
//                 >
//                   <option value="">Please Select </option>
//                   <option value={"English"}>English</option>
//                   <option value={"Hindi"}>Hindi</option>
//                   <option value={"Other"}>Other</option>
//                 </Select> 
// </Grid>
//  <Grid item xs={12} sm={12}>
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <Typography >Year of Passing</Typography>
//          <DatePicker
//           views={["year"]}
//            margin="normal"
//            label="Year of Passing"
//           inputVariant="outlined"
//            value={this.state.selectedDate}
//            onChange={this.handleDateChange}
//          />
//          </MuiPickersUtilsProvider>
// </Grid>

// </Grid>

//         </DialogContent>

//         <DialogActions>
//         <Button onClick={this.handleClose} color="primary" style={{ backgroundColor: "#EA6645", color: "white" }}>
//             Cancel
//           </Button>

//         <Button color="primary" style={{ backgroundColor: "#EA6645", color: "white" } }>Save changes</Button>
//        </DialogActions>
//       </Dialog>

// <Grid container >

//     <Grid item xs={12}>

//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat (g)</TableCell>
//             <TableCell align="right">Carbs (g)</TableCell>
//             <TableCell align="right">Protein (g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map(row => (
//             <TableRow key={row.id}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//     </Grid>
//     </Grid>

// </div>
// );

// }
// }

// popup.propTypes = {
//   classes: PropTypes.object.isRequired
// }

// export default withStyles(styles)(popup)

import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AddUniversity from './api-extrauniversity.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { Divider, Select, NativeSelect, Typography, OutlinedInput, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    dialog: {
        minWidth: 'lg',
    },
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {

        overflowX: 'auto',
    },
});
class popup extends Component {
    state = {
        academic: {
            award: '',
            stream: '',
            major_subject: '',
            result: '',
            institute: '',
            medium: '',
            date: ''
        },
        selectedDate: new Date(),
        error: '',
        dialog: false,
        rows: []
    }
    clickSubmit = () => {

      const {academic} = this.state
        academic.date = this.state.selectedDate
        this.setState(prevState => ({
            academic: academic,
            rows: [...prevState.rows, prevState.academic]
        }))
        console.log(this.state.academic)
        this.handleClose()
    }
    handleChange = name => event => {
        const {academic} = this.state
        academic[name] = event.target.value
        this.setState({ academic: academic })
    }
    handleClickOpen = () => {
        this.setState({ dialog: true })
    }
    handleClose = () => {
        this.setState({ dialog: false })
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date});
    };
    render() {
        const { classes } = this.props;
        const {rows} = this.state

        // function createData(award, stream, major_subject, result, institute, medium, selectedDate) {
        //     console.log(award, stream, major_subject, result, institute, medium, selectedDate);
        //     return { award, stream, major_subject, result, institute, medium, selectedDate };
        // }
        // const rows = [
        //     createData(award, stream, major_subject, result, institute, medium, selectedDate),
        // ];

        return (
            <div>
<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
  Add University
 </Button>
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
         <Typography>Institute/University</Typography>
        <TextField fullWidth variant="outlined" required id="institute" label="Enter Institute/University" value={this.state.institute} onChange={this.handleChange('institute')} margin="dense" />
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
 <Grid item xs={12} sm={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography >Year of Passing</Typography>
         <DatePicker
          views={["year"]}
           margin="normal"
           label="Year of Passing"
          inputVariant="outlined"
           value={this.state.selectedDate}
           onChange={this.handleDateChange}
           name="selectedDate"
         />
         </MuiPickersUtilsProvider>
</Grid>
</Grid>
        </DialogContent>
        
        <DialogActions>
        <Button onClick={this.handleClose} color="primary" style={{ backgroundColor: "#EA6645", color: "white" }}>
            Cancel
          </Button>
        <Button color="primary" style={{ backgroundColor: "#EA6645", color: "white" }} onClick={this.clickSubmit}>Save changes</Button>
       </DialogActions>
      </Dialog>

<Grid container >

    <Grid item xs={12}>

    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell align="right">{row.award}</TableCell>
              <TableCell align="right">{row.stream}</TableCell>
              <TableCell align="right">{row.major_subject}</TableCell>
              <TableCell align="right">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </Grid>
    </Grid>

    

</div>
        );
    }
}

popup.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(popup)