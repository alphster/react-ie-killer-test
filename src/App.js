import React, { Component, PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.veryNestedObject = {
      child: { }
    };

    let ref = this.veryNestedObject.child;
    this.startTime = (new Date()).getTime();

    console.log('started', this.startTime);
    for (var i = 0; i < 1500; i++) {
      ref["text1"] = '1fasd fasd f | ';
      ref["child"] = { };
      ref = ref.child;
    }
    console.log('mapping end elapsed',  (new Date()).getTime() - this.startTime);
    //console.log(this.veryNestedObject);

    this.state = {
      counter : 0
    }
  }

  render() {
    console.log('render start elapsed',  (new Date()).getTime() - this.startTime);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{ display: 'flex' }} className="App-intro">
          <div style={{ flexBasis: '50%' }}>
            {(this.state.counter % 2 == 1) && <ChildComponent data={this.veryNestedObject.child} />}
          </div>
          <div onClick={this.onClickHandler}>
            {this.state.counter}
          </div>
        </div>
      </div>
    );
  }

  onClickHandler = () => {
    this.setState({ counter: this.state.counter + 1});
  }
}

class ChildComponent extends Component {
  render() {    
    return (
      <span>
        <span>
          {this.props.data.text1}
        </span>
        { this.props.data.child.hasOwnProperty('child') &&
        <ChildComponent data={this.props.data.child}  /> }
      </span>
    );
  }
}

const StatelessChild = ({ data }) => {
  return (
    <span>
      <span>
        {data.text1}
      </span>
      { data.child.hasOwnProperty('child') &&
      <StatelessChild data={data.child}  /> }
    </span>
  );
}

export default App;
