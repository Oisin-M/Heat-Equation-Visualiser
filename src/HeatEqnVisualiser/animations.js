export function getAnimations(array, times, dt, b) {
  const animations = [];
  return SolveHeatEqn(array, animations, times, dt, b);
}

function SolveHeatEqn(array, anims, times, dt, b) {
  var anims = [];
  var grid = [];
  var row_vals = [];
  var arr=array;

  for (let i=0; i<times; i++) {
    grid=[];
    for (let j=0; j<arr.length; j++) {
      var row = arr[j];
      row_vals=[];
      for (let k=0; k<row.length; k++) {
        var temp = row[k];
        //stuff
        if ((j==0 && k==0) || (j==0 && k==row.length-1) || (j==arr.length-1 && k==0) || (j==arr.length-1 && k==row.length-1)) {
          row_vals.push(CornerSolver(arr, j, k, dt, b));
        }
        else {
          if ((j==0) || (j==arr.length-1)) {
            row_vals.push(XBoundarySolver(arr, j, k, dt, b));
          }
          else {
            if ((k==0) || (k==row.length-1)) {
              row_vals.push(YBoundarySolver(arr, j, k, dt, b));
            }
            else {
              row_vals.push(InnerSolver(arr, j, k, dt, b));
            }
          }
        }


      }
      grid.push(row_vals);
    }
    anims.push(grid);
    arr=grid;
  }
  return anims;
}

function CornerSolver(array, r, c, dt, b) {
  return 160;
}

function XBoundarySolver(array, r, c, dt, b) {
  return 80;
}

function YBoundarySolver(array, r, c, dt, b) {
  return 120;
}

function InnerSolver(array, r, c, dt, b) {
  const u_j1k = array[r+1][c];
  const u_jk = array[r][c];
  const u_j_1k = array[r-1][c];
  const u_jk1 = array[r][c+1];
  const u_jk_1 = array[r][c-1];

  const x_contrib = u_j1k - 2*u_jk + u_j_1k;
  const y_contrib = u_jk1 - 2*u_jk + u_jk_1;
  const du_dt=b*(x_contrib+y_contrib);
  return u_jk+du_dt*dt;
}
