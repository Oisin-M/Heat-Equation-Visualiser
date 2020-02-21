import React from 'react';
import {Container, Row} from 'react-bootstrap';
import './HeatEquationVisualiser.css';
import {getAnimations} from './animations.js';

const ROWS = 30;
const COLUMNS = 70;
const ANIMATION_SPEED_MS = 200;
const ANIMATIONS = 10;

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
  console.log(grid);
  }

  Visualise() {
    const animations = getAnimations(this.state.grid, ANIMATIONS);
    const points = document.getElementsByClassName('point');
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
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
  //this.setState({grid: animations[animations.length-1]});
  //console.log(this.state.grid);
  }

  render() {
    const {grid} = this.state;
    return (

      <Container fluid={true}>
        <button onClick={() => this.resetgrid()}>resetgrid</button>
        <button onClick={() => this.Visualise()}>Visualise</button>

        <Container fluid={true}>
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
        </Container>
      </Container>
    );
  }
}

function randomFromInterval(min, max) {
  // min and max included
  return Math.random()*(max-min)+min;
}
