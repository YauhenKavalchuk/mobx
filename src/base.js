import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store {
  devsList = [
    { name: "Jack", sp: 12 },
    { name: "Max", sp: 10 },
		{ name: "Leo", sp: 8 },
  ];

	get totalSum() {
    return 0;
  };

  get topPerformer() {
    return {
      name: 'Name',
    };
  };

  clearList() {

  };

  addDeveloper(dev) {

  };
};

const appStore = new Store();

const Row = ({ data: { name, sp } }) => {
  return (
		<tr>
    	<td>{name}</td>
    	<td>{sp}</td>
  	</tr>
	);
};

class Table extends Component {
  render() {
    const { store } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>SP:</td>
          </tr>
        </thead>
        <tbody>
          {store.devsList.map((dev, i) => <Row key={i} data={dev} />)}
        </tbody>
        <tfoot>
          <tr>
            <td>Team SP:</td>
            <td>{store.totalSum}</td>
          </tr>
          <tr>
            <td>Top Performer:</td>
            <td>{store.topPerformer ? store.topPerformer.name : ''}</td>
          </tr>
        </tfoot>
      </table>
		);
  }
}

class Controls extends Component {
  addDeveloper = () => {
    const name = prompt("The name:");
    const sp = parseInt(prompt("The story points:"), 10);
    this.props.store.addDeveloper({ name, sp });
  }

  clearList = () => { this.props.store.clearList(); }

  render() {
    return (
			<div className="controls">
      	<button onClick={this.clearList}>Clear table</button>
      	<button onClick={this.addDeveloper}>Add record</button>
    	</div>
		);
  }
}

class App extends Component {
  render() {
    return (
      <div>
				<DevTools />
        <h1>Sprint Board:</h1>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    )
  }
}

ReactDOM.render(<App store={Store} />, document.getElementById('root'));
