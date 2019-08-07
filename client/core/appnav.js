import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Award', field: 'award', lookup:{1:'Science', 2:'Commerce'}},
      { title: 'Stream', field: 'surname',lookup:{1:'Science', 2:'Commerce'} },
      { title: 'Major Subject', field: 'major' },
      { title: 'Institude/University', field: 'university' },
      { title: 'Result', field: 'result',type:'numeric' },
      { title: 'Medium', field: 'medium'},
      { title: 'Year Completed', field: 'year', lookup:{1:'2018', 2:'2019'}},
    ],
    data: [
    ],
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}




// import React, {Component} from 'react'
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types'
// // import {withStyles} from 'material-ui/styles'
// import AddUniversity from './api-extrauniversity.js'
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import axios from 'axios'

// class popup extends Component {
//   state={
//     universityName: '',
//     universityCountry:'',
//     universityPhone:'',
//     universityEmail:'',
//     universityAddress:'',
//      error: '',
//      open: false
//   }

//   handleChange = name => event => {
//     this.setState({[name]: event.target.value})
//   }

//   clickSave = () =>{

//       const user = {
//       universityName: this.state.universityName || undefined,
//       universityCountry: this.state.universityCountry || undefined,
//       universityPhone: this.state.universityPhone || undefined,
//       universityEmail: this.state.universityEmail || undefined,
//       universityAddress: this.state.universityAddress || undefined
//     }

//     axios.post('/api/extrauniversity', user)
//     .then(res => {
//       console.log(res)
//     })
//     .catch(err => console.log(err))

//   }

//   handleClickOpen = () => {
//     this.setState({open:true})
//   }

//   handleClose = () => {
//     this.setState({open:false })
//   }

//   render(){
//     return(
// <div>
// <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
//   Add University
//  </Button>

// <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Add University</DialogTitle>
//         <DialogContent>
//          <TextField variant="outlined" margin="dense" fullWidth id="universityName" type="text" label="University Name" placeholder="Enter university Name" onChange={this.handleChange('universityName')} /><br/>
//          <TextField variant="outlined" margin="dense" fullWidth id="universityCountry" type="text" label="University Country" placeholder="Enter university Country" onChange={this.handleChange('universityCountry')} /><br/>
//          <TextField variant="outlined" margin="dense" fullWidth id="universityPhone" type="number" label="University Phone number" placeholder="Enter university Phone number" onChange={this.handleChange('universityPhone')} /><br/>
//          <TextField variant="outlined" margin="dense" fullWidth id="universityEmail" type="email" label="University Email" placeholder="Enter university Email" onChange={this.handleChange('universityEmail')} /><br/>
//          <TextField variant="outlined" margin="dense" fullWidth id="universityAddress" type="text" label="University Address" placeholder="Enter university Address" onChange={this.handleChange('universityAddress')} /><br/>
//        </DialogContent>
//         <DialogActions>
//         <Button onClick={this.handleClose} color="primary">
//             Cancel
//           </Button>

//         <Button color="primary" onClick={this.clickSave}>Save changes</Button>
//        </DialogActions>
//       </Dialog>
    
// </div>
// );

// }
// }
  
// export default popup
