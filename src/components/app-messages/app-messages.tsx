import { Component, State, Prop } from '@stencil/core';


@Component({
  tag: 'app-messages',
  styleUrl: 'app-messages.scss'
})
export class AppMessages {

  @State() message: string;
  @State() messages: any = [];

  @Prop() url = "https://cesi.cleverapps.io/messages";
  
  componentDidLoad() {
    console.log('The component has been rendered');
    this.getMessages();
  }

  getMessages(){
    fetch(this.url, {
        method: 'get',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
          "token": sessionStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(function (data) {
        console.log('message loaded OK', data);
        this.messages = data;
      }.bind(this))
      .catch(function (error) {
        console.log('message loaded KO', error);
      });
  }

  postMessage(e) {
    e.preventDefault()

    if(!this.message){
        //no message, do nothing
        return;
    }
   
    // do login
    fetch(this.url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "token": sessionStorage.getItem('token')        
      },
      body: 'message='+this.message
    })
    .then(function (data) {
      console.log('message sent OK', data);
      this.message = '';
    })
    .catch(function (error) {
      console.log('message sent KO', error);
    });

  }

  handleMessageChange(event) {
    this.message = event.target.value;
  }

  render() {
    return (
      <div class="main">
        <form onSubmit={(e) => this.postMessage(e)} class="footer">
          <input placeholder="message" value={this.message} onInput={() => this.handleMessageChange(event)}/>
          <button type="submit">
            send
          </button>
        </form>
        <div class="list">
            {this.messages.map(m =>
                <app-message message={m}></app-message>
            )}
        </div>

      </div>
    );
  }
}
