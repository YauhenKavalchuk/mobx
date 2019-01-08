import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

const nickName = observable({
  firstName: 'Yauhen',
  age: 30,

  get nickName() {
    console.log('Generate nickName!');
    return `${this.firstName}${this.age}`;
  },

  increment() { this.age++ },

  decrement() { this.age-- },
});

const todos = observable([
  { text: 'Learn React' },
  { text: 'Learn MobX' },
])

@observer class Counter extends Component {

  handleIncrement = () => { this.props.store.increment() };
  handleDecrement = () => { this.props.store.decrement() };

  render() {
    return (
      <div className="App">
        <DevTools />
        {/*<h1>{this.props.store.nickName}</h1>
        <h1>{this.props.store.age}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>*/}

        <ul>
          {todos.map(({ text }) => <li key={text}>{text}</li>)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={todos} />, document.getElementById('root'));

todos.push({ text: 'Learn Redux' });

serviceWorker.unregister();
