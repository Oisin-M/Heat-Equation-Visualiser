import React from 'react';
import {Container, Row} from 'react-bootstrap';
import './HeatEquationVisualiser.css';

const ROWS = 35;
const COLUMNS = 75;

let colormap = require('colormap');
let colors = colormap({
    colormap: 'temperature',
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
        row.push(randomIntFromInterval(154, 254));
      }
      grid.push(row);
      console.log(row);
    }
  this.setState({grid});
  console.log(grid);
  }

  render() {
    const {grid} = this.state;
    return (

      <Container fluid={true}>
        <button onClick={() => this.resetgrid()}>resetgrid</button>

        <Container fluid={true}>
          {grid.map((row, idx) => (
            <Row className="justify-content-center">
              {row.map((point, idx) => (
                <div
                className="point"
                key={idx}
                style={{
                  backgroundColor: colors[point]
                }}></div>
              ))}
            </Row>
          ))}
        </Container>
      </Container>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
