import React from 'react';
import {Container, Row} from 'react-bootstrap';
import './HeatEquationVisualiser.css';

const ROWS = 5;//20
const COLUMNS = 5;//50

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
        row.push(randomIntFromInterval(0, 255));
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

      <Container>
        <button onClick={() => this.resetgrid()}>resetgrid</button>

        <Container>
          {grid.map((row, idx) => (
            <Row className="justify-content-center">
              {row.map((point, idx) => (
                <div
                className="point"
                key={idx}
                style={{
                  
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
