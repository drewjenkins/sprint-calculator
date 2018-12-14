import React, {Component} from 'react';
import logo from './logo.svg';
import without from 'lodash/without';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(
      localStorage.getItem('state') ||
        JSON.stringify({
          data: {
            daysInSprint: 10,
            developers: [],
          },
        }),
    );
  }

  updateState = update => {
    this.setState(update);

    localStorage.setItem('state', JSON.stringify(update));
  };

  addDeveloper = () => {
    const {data} = {...this.state};
    data.developers.push({
      id: Date.now(),
      name: 'Foo',
      ppd: 2,
      daysOff: 0,
    });

    this.updateState({data});
  };

  updateDeveloper = (developer, field, value) => {
    const {data} = {...this.state};
    const dev = data.developers.find(de => developer.id === de.id);
    if (dev) {
      dev[field] = value;
    }
    this.updateState({data});
  };

  updateDaysInSprint = e => {
    const {data} = {...this.state};
    data.daysInSprint = e.target.value;
    this.updateState({data});
  };

  removeDeveloper = developer => {
    const {data} = {...this.state};
    const developers = without(data.developers, developer);
    data.developers = developers;
    this.updateState({data});
  };

  renderPointTotal = () => {
    const {data} = this.state;
    const {daysInSprint, developers} = data;
    if (!developers.length) return 0;

    return developers.reduce((a, d) => a + (daysInSprint - d.daysOff) * parseFloat(d.ppd), 0);
  };

  render() {
    return (
      <div style={{margin: 'auto', width: 600, fontSize: '14px'}}>
        <div>
          <h3 style={{display: 'flex'}}>
            <div>Adjusted Point Total</div>
            <div style={{marginLeft: '10px'}}>{this.renderPointTotal()}</div>
          </h3>
        </div>

        <div
          style={{
            display: 'flex',
            marginBottom: '5px',
            marginRight: '5px',
            justifyContent: 'space-between',
            width: '375px',
          }}
        >
          <div>Number of Days in sprint</div>
          <input
            placeholder="Days In Sprint"
            value={this.state.data.daysInSprint}
            type="number"
            onChange={this.updateDaysInSprint}
          />
        </div>
        <div>
          <h3 style={{cursor: 'pointer'}} onClick={this.addDeveloper}>
            Add Developer
          </h3>
          {this.state.data.developers.map(d => (
            <div style={{display: 'flex', marginBottom: '5px'}}>
              <div
                style={{
                  dispay: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #eee',
                  padding: '5px',
                  marginRight: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    marginBottom: '5px',
                    marginRight: '5px',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Name</div>
                  <input
                    value={d.name}
                    onChange={e => this.updateDeveloper(d, 'name', e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    marginBottom: '5px',
                    marginRight: '5px',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Adjusted Points Per Day</div>
                  <input
                    type="number"
                    value={d.ppd}
                    onChange={e => this.updateDeveloper(d, 'ppd', e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    marginBottom: '5px',
                    marginRight: '5px',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Days Off</div>
                  <input
                    type="number"
                    value={d.daysOff}
                    onChange={e => this.updateDeveloper(d, 'daysOff', e.target.value)}
                  />
                </div>
              </div>

              <div style={{cursor: 'pointer'}} onClick={() => this.removeDeveloper(d)}>
                Remove
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
