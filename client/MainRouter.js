import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import otp from './user/Otp'
import BusinessProfile from './user/BusinessProfile'
import Bid from './user/Bid'
import NotVerifiedPage from './core/NotVerifiedPage'
import Dashboard from './user/Dashboard'
import Navbar from './core/b2bNavbar'
import AppNav from './core/appnav'
import AgentProfile from './user/AgentProfile';
import ReceivedApplication from './user/Received-applications'
import Popup from './user/popup'
import UniversitiesCards from './user/UniversitiesCards'
import Search from './user/Search'
import faqslide from './user/faqslide'
import Student from './user/student-apply-form'
import PositionedSnackbar from './user/Otp-old'
import ForgetPassword from './user/ForgetPassword'
import NewPassword from './user/NewPassword'
 
class MainRouter extends Component {
  // Removes the server-side injected CSS when React component mounts
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    return (<div>
      {/* <Menu/> */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/otp-verification" component={otp}/>
        <Route path="/business-profile" component={BusinessProfile}/>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/bid" component={Bid} />
        <Route path="/not-verified" component={NotVerifiedPage} />
        <Route path="/received-applications" component={ReceivedApplication} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/appnav" component={AppNav}/>
        <Route path="/agent-profile/:userId" component={AgentProfile} />
        <Route path="/popup" component={Popup} />
        <Route path="/universitieslist" component={UniversitiesCards} />
        <Route path="/search" component={Search} />
        <Route path="/faqs" component={faqslide} />
        <Route path="/student-apply" component={Student} />
        <Route path="/PositionedSnackbar" component={PositionedSnackbar}/>
        <Route path="/forgetpassword" component={ForgetPassword}/>
        <Route path="/newpassword/:userId" component={NewPassword}/>
      </Switch>
    </div>);
  }
}

export default MainRouter