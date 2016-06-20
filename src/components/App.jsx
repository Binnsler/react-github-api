import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: 'Binnsler',
      userData: [],
      userRepos: [],
      perPage: 10,
    }
  }

  // Get user data from github
  getUserData(){

    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userData: data});
      }.bind(this),
      error: function(xhr, status, err){
        alert('User not found');
        console.log('failure')
        console.log(err);
      }
    });
  }

  handleFormSubmit(username){
    this.setState({username: username}, function(){
      this.getUserData();
      this.getUserRepos();
    });
  }

  // Get user data from repos
  getUserRepos(){

    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userRepos: data});
      }.bind(this),
      error: function(xhr, status, err){
        alert('Error in reading repos.')
      }
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render(){
    return(
      <div>
        <Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
        <Profile {...this.state}/>
      </div>
    )
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string,
};

App.defaultProps = {
  clientId: '537059ea749b1d577ee5',
  clientSecret: '6efbb800d25ce7e3ecdc61d76504106f24a15944',
};

export default App

// From the documentation: https://facebook.github.io/react/docs/reusable-components.html

// The ES6 API is similiar to React.createClass with the exception of getInitialState. Instead of providing a separate getInitialState() method, you set up your own state property in the constructor.

// Another difference is that propTypes and defaultProps are defined as properties on the constructor instead of in the class body.
