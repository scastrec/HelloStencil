import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'app-message',
  styleUrl: 'app-message.scss'
})
export class AppMessages {

  @Prop() message: any;

  render() {
    return (
      <div>
        <div class="card">
            <h3>{this.message.message}</h3>
            <p><i>{this.message.date}</i></p>
            <p>{this.message.username}</p>
        </div>       
      </div>
    );
  }
}
