import React from 'react'
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {upperFirst,isEmpty} from 'lodash';
​
 const CustomField = props => {
    
    return ( 
        <FormControl   required={props.required}>
            <TextField 
                autoComplete="off"
                value={props.value || '' }
                placeholder={props.placeholder}
                type={props.type}
                label={upperFirst(props.label)}
                required={props.required}
                name={props.name}
                onChange={props.onChange.bind(this)}
                autoComplete="off"
                variant="outlined"
                // ref={props.onRef.bind(this)}
                {...props}
            /> {
                !isEmpty(props.errors) && !isEmpty(props.errors[props.name]) && (
                    <FormHelperText style={{margin:'4px 0px 0px 15px',color:'#f44336'}} id="name-errors-text">{props.errors[props.name].messages}</FormHelperText>
                )
            }
        </FormControl>
    )
}
CustomField.defaultProps={
    required:false,
    value:'',
    type:'text',
    onChange:()=> null,
    placeholder:'',
    errors:{},
    name:'name',
}
export default CustomField;