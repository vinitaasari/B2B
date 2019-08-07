import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import auth from './../auth/auth-helper'
import {isEdysorVerified} from '../auth/api-auth'

const Navbar = withRouter(({history}) => (
<nav className=" navbar navbar-expand-md  navbar-dark" style={{backgroundColor: '#012951'}}>
  <Link to="/" style={{textDecoration: 'none'}}>
           <Button className="navbar-brand">Logo
           </Button>
         </Link>
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>

 {
     !auth.isAuthenticated() && 
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
   <ul className="navbar-nav mr-auto">
     <li className="nav-item active">
       <Link to="/signup" style={{textDecoration: 'none'}}>
         <Button className="nav-link" >Sign up</Button>
       </Link>
     </li>

     <li className="nav-item active">
       <Link to="/signin" style={{textDecoration: 'none'}}>
         <Button className="nav-link">Sign in</Button>
       </Link>
     </li>
    </ul>
    </div>
 }

 {
     auth.isAuthenticated() && auth.isEdysorVerified() &&
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   <ul className="navbar-nav mr-auto">
     <li className="nav-item active">
       <Link to="/link1" style={{textDecoration: 'none'}}>
         <Button className="nav-link" >Link 1</Button>
       </Link>
     </li>

     <li className="nav-item active">
       <Link to="/link2" style={{textDecoration: 'none'}}>
         <Button className="nav-link">Link 2</Button>
       </Link>
     </li>

     <li className="nav-item active">
       <Link to="/link3" style={{textDecoration: 'none'}}>
         <Button className="nav-link">Link 3</Button>
       </Link>
     </li>

     <li className="nav-item active">
       <Link to="/link4" style={{textDecoration: 'none'}}>
         <Button className="nav-link">Link 4</Button>
       </Link>
     </li>

     <li className="nav-item active">
       <Link to="/link5" style={{textDecoration: 'none'}}>
         <Button className="nav-link">Link 5</Button>
       </Link>
     </li>
     </ul>
 </div> }



{ auth.isAuthenticated() && auth.isEdysorVerified() &&
 <div id="navbarSupportedContent">
   <ul className="navbar-nav ">
   <div>
  <li className="nav-item  dropdown navbar-right nav-link " role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i className="fa fa-bell navbar-brand" aria-hidden="true" ></i>
         <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
         </div>
  </li>
  </div>

  <div>
  <li className="nav-item dropdown navbar-right nav-link " id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i className="fa fa-user navbar-brand " aria-hidden="true" ></i>
         <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
         <Typography className="dropdown-item" href="#">Logout</Typography>
       </div>
  </li>
  </div>
</ul>
 </div>
}

{
   auth.isAuthenticated() && !auth.isEdysorVerified() && <div id="navbarSupportedContent">
    <ul className="navbar-nav ">
    <div>
   <li className="nav-item  dropdown navbar-right nav-link " role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <Button className="nav-link" onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Logout</Button>
   </li>
   </div>
 
 </ul>
  </div> 
}

</nav>

))

export default Navbar