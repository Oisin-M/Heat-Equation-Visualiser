export function getAnimations(array, times) {
  const animations = [];
  return SolveHeatEqn(array, animations, times);
}

function SolveHeatEqn(arr, anims, times) {
  var anims = [];
  var grid = [];
  var row_vals = [];

  for (let i=0; i<times; i++) {
    grid=[];
    for (let row of arr) {
      row_vals=[];
      for (let temp of row) {
        row_vals.push(temp+10*i); //just a test, just increasing each value
      }
      grid.push(row_vals);
    }
    anims.push(grid);
  }
  return anims;
}
