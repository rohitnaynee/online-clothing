import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ChickenPage from './pages/chickenpage/chickenpage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ContactPage from './pages/contact-us/contact-us.component';
import AboutUsPage from './pages/about-us/about-us.component';
import HiringPage from './pages/hiring/hiring.component';
import Mutton from './components/mutton/mutton.component';
import SeaFood from './components/sea-food/sea-food.component';
import Exotic from './components/exotic/exotic.component';
import ColdCuts from './components/cold-cuts/cold-cuts.component';  
import Eggs from './components/eggs/eggs.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null
  
  componentDidMount () {

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
           setCurrentUser({
               id: snapShot.id,
               ...snapShot.data()
             })
          });          
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render() {
  return (
    <div>
      <Header />
        <Switch>
        <Route exact path = '/' component = {HomePage} />
        <Route exact path ='/chicken'  component = {ChickenPage} />  
        <Route exact path = '/shop' component = {ShopPage} /> 
        <Route exact path = '/mutton' component = {Mutton} />
        <Route exact path = '/seafood' component = {SeaFood} />
        <Route exact path = '/exotic' component = {Exotic} />
        <Route exact path = '/coldcuts' component = {ColdCuts} />
        <Route exact path = '/eggs' component = {Eggs} />
        <Route exact path = '/checkout' component = {CheckoutPage} />
        <Route exact path = '/contact' component = {ContactPage} />
        <Route exact path = '/aboutus' component = {AboutUsPage} />
        <Route exact path = '/hiring' component = {HiringPage} />
        
        <Route exact path = '/signin' 
             render = {() => this.props.currentUser 
              ? 
              (<Redirect to = '/' />)
              :
             (<SignInAndSignUpPage /> )} 
        />
        </Switch>    
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps 
  )(App);
