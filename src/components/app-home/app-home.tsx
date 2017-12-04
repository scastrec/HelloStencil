import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @Prop() history: RouterHistory;

  @State() username: string;
  @State() pwd: string; 
  @State() missingLogin: boolean; 
  @State() missingPwd: boolean; 

  handleSubmit(e) {
    e.preventDefault()
    let url = "https://cesi.cleverapps.io/signin";
    console.log('username='+this.username+'  pwd='+this.pwd);
    this.missingLogin = false; 
    this.missingPwd = false; 
 
    if(!this.username){
       this.missingLogin = true;
       return; 
    }
    if(!this.pwd){
      this.missingPwd = true; 
      return;
   }
   
    // do login
    fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'username='+this.username+'&pwd='+this.pwd
    })
    .then(response => response.json())
    .then(function (data) {
      console.log('Login OK', data);
      sessionStorage.setItem('token', data.token);
      this.history.push('/messages', data);               
    }.bind(this))
    .catch(function (error) {
      console.log('Login KO', error);
    });

  }

  handleLoginChange(event) {
    this.username = event.target.value;
  }

  handlePwdChange(event) {
    this.pwd = event.target.value;
  }  

  render() {
    return (
      <div>
        <p>
          Bienvenu sur notre site de test de l'API Cesi.<br/> Ce site est une PWA faite via @Stenciljs.<br/>
          So, let's play!
        </p>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input placeholder="username" value={this.username} onInput={() => this.handleLoginChange(event)}/>
          <p style={{ display: this.missingLogin ? 'block' : 'none' }}>Missed your login</p>
          <input placeholder="pwd" value={this.pwd} onInput={() => this.handlePwdChange(event)}/>
          <p style={{ display: this.missingPwd ? 'block' : 'none' }}>Missed your pwd</p>
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
