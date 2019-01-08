import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

const nickName = new class UserNickName {
  @observable firstName = 'Yauhen';
  @observable age = 30;

  @computed get nickName() {
    console.log('Generate nickName!');
    return `${this.firstName}${this.age}`;
  }
}

nickName.increment = function() {
  this.age++
}

nickName.decrement = function() {
  this.age--
}

@observer class Counter extends Component {

  handleIncrement = () => { this.props.store.increment() };
  handleDecrement = () => { this.props.store.decrement() };

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.nickName}</h1>
        <h1>{this.props.store.age}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));

serviceWorker.unregister();
