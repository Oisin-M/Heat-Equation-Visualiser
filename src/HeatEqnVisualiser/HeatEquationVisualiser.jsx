import React from 'react';
import {Container, Row} from 'react-bootstrap';
import './HeatEquationVisualiser.css';
import {getAnimations} from './animations.js';

const ROWS = (window.innerHeight-150)/30;
const COLUMNS = (window.innerWidth)/30;
const ANIMATION_SPEED_MS = 200;
const ANIMATIONS = 50;
const DT=0.1;
const BETA=1;

let colormap = require('colormap');
let colors = colormap({
    colormap: 'hot',
    nshades: 255,
    format: 'hex',
    alpha: 1
})

export default class HeatEquationVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    this.resetgrid();
  }

  resetgrid() {
  var grid = [];
  var row = [];

    for (let i = 0; i < ROWS; i++) {
      row=[];
      for (let j = 0; j < COLUMNS; j++) {
        row.push(randomFromInterval(0, 200));
      }
      grid.push(row);
    }
  this.setState({grid});
  document.getElementById('timer').innerHTML="Time: 0.00s";
  }

  Visualise() {
    const animations = getAnimations(this.state.grid, ANIMATIONS, DT, BETA);
    const points = document.getElementsByClassName('point');
    const timer = document.getElementById('timer');
    const resetbutton = document.getElementById('resetbutton');
    const simulatebutton = document.getElementById('simulatebutton');
    resetbutton.disabled=true;
    simulatebutton.disabled=true;
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
      timer.innerHTML = "Time: "+(i*ANIMATION_SPEED_MS/1000).toFixed(2)+"s";
      for (let j = 0; j<ROWS; j++) {
          for (let k=0; k<COLUMNS; k++){
            var points_index = j*COLUMNS + k;
            var value = animations[i][j][k];
            var pointstyle=points[points_index].style;
            pointstyle.backgroundColor=colors[Math.round(value)];
          }
        }
    }, (i*ANIMATION_SPEED_MS));
  }

  setTimeout(() => {
  timer.innerHTML = "COMPLETED";
  resetbutton.disabled=false;
  simulatebutton.disabled=false;
  this.setState({grid: animations[animations.length-1]})
  }, ANIMATIONS*ANIMATION_SPEED_MS);
  }

  render() {
    const {grid} = this.state;
    return (
      <Container fluid={true}>

        <div className="margintop">
        <h1 className="heading">2D Heat Equation with Insulating Boundary Conditions</h1>
        </div>

        <div className="timerdiv"><p className="timerp" id="timer">Time: 0.00s</p></div>

        <Container fluid={true}>
        <div className="grid">
          {grid.map((row, idrow) => (
            <Row className="justify-content-center" key={idrow}>
              {row.map((point, idx) => (
                <div
                className="point"
                key={idx}
                style={{
                  backgroundColor: colors[Math.round(point)]
                }}></div>
              ))}
            </Row>
          ))}
          </div>
        </Container>
        <button id="resetbutton" onClick={() => this.resetgrid()}>Reset Grid</button>
        <button id="simulatebutton" onClick={() => this.Visualise()}>Simulate for 10 Seconds</button>

        <div className="margintop">
        <h3 className="more">Find out more <a href="http://oisin-morrison.herokuapp.com/programming/articles/heat-equation-visualiser">here</a></h3>
        </div>

        <div className="margintop">
        <h5 className="note">Note: Please ensure your browser window is fullscreen.</h5>
        </div>

      </Container>
    );
  }
}

function randomFromInterval(min, max) {
  // min and max included
  return Math.random()*(max-min)+min;
}
