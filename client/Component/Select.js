import React from 'react';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ReactDOM from 'react-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { upperFirst, isEmpty } from 'lodash';
import {OutlinedInput} from '@material-ui/core';
class SelectBox extends React.Component {
    constructor(){
        super();
        this.state = {
            labelWidth:0
        }
    }
    componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }
    render(){
        const {name,value,onChange,required,items,errors,label,inputProps} = this.props;
        return (
  
            <FormControl  variant="outlined" style={{ width: '100%'}}  error={Boolean(!isEmpty(errors) && !isEmpty(errors[name]))}  >
              <InputLabel  ref={ref => { 
              this.InputLabelRef = ref;
            }} htmlFor="{${name}-error}">{upperFirst(label)}</InputLabel>
        
                <Select
                  {...inputProps}
                  name={name}
                  value={value || ''}
                  onChange={onChange.bind(this)}
                  required={required}
                  error={Boolean(!isEmpty(errors) && !isEmpty(errors[name]))} 
                  input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="age"
                        id="outlined-age-simple"
                      />
                    }
                >
                  {
                      items.map((item,index) =>(
                          <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                      ))
                  }
                </Select>
        
                {
                      !isEmpty(errors) && !isEmpty(errors[name]) && (
                          <FormHelperText style={{margin:'4px 0px 0px 0px'}} id="name-error-text">{errors[name].messages}</FormHelperText>
                      )
                  }
              </FormControl>
          )
    }
}

SelectBox.defaultProps = {
    name:'',
    value:'',
    onChange:() => null,
    required:true,
    items:[],
    errors:{},
    label:'',
    inputProps:{}
}

export default SelectBox;