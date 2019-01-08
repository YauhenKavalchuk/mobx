import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, configure, action, when, autorun } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store {
  @observable count = 0;
	@action increment() { this.count++ };
  @action decrement() { this.count-- };
};

const appStore = new Store();

when(
  () => appStore.count > 5,
  () => { alert('Count value is more than 5') }
);

autorun(() => {
  alert(`Count value is: ${appStore.count}`);
}, {
  name: 'Custom autorun',
  delay: 3000,
})

@observer class App extends Component {
  handleIncrement = () => {this.props.store.increment() }
  handleDecrement = () => {this.props.store.increment() }
  render() {
    return (
      <div>
				<DevTools />
        <h1>{this.props.store.count}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));
