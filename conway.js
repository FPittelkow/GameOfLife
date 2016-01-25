var grid = [];
var new_grid = [];
var width = 50;
var height = 50;

function grid_get(x, y) {
    //Connect edges of grid
    if (y==-1) y=height-1;
    if (x==-1) x=width -1;
    if (x==width) x=0;
    if (y==height) y=0;

    return grid[y*width+x];
}

function grid_set(x, y, value) {
    grid[y*width+x] = value;
}

function new_grid_set(x, y, value) {
    new_grid[y*width+x] = value;
}

function step() {
    new_grid = [];
    for (var y = 0; y<height; y++) {
        for (var x = 0; x<width; x++) {
            var neighbors =
                grid_get(x-1, y-1)
                + grid_get(x  , y-1)
                + grid_get(x+1, y-1)

                + grid_get(x-1, y  )
                + grid_get(x+1, y  )

                + grid_get(x-1, y+1)
                + grid_get(x  , y+1)
                + grid_get(x+1, y+1);

            var me = grid_get(x, y);

            if (me && neighbors<2) {
                new_grid_set(x,y,0);    // Lonely
            }
            else if (me && neighbors>=4) {
                new_grid_set(x,y,0);    // Overcrowded
            }
            else if (me && (neighbors==2 || neighbors==3)) {
                new_grid_set(x,y,1);    // Lives
            }
            else if (!me && neighbors==3) {
                new_grid_set(x,y,1);    // It takes three to give birth!
            }
            else if (!me && neighbors!=3) {
                new_grid_set(x,y,0);    // Barren
            }
        }
    }

    grid = new_grid;
    render();
}

function render() {
    var html = "<table>";
    for (var y=0; y<height; y++) {
        html += "<tr>";
        for (var x=0; x<width; x++) {
            var clz = "white";
            if (grid_get(x,y)==1) clz="black";
            html += "<td class='"+clz+"'></td>"
        }
        html += "</tr>";
    }
    html += "</table>";

    document.getElementById("container").innerHTML = html;
}

function init() {
    for (var y=0; y<height; y++) {
        for (var x=0; x<width; x++) {
            grid_set(x,y,0);
        }
    }

    var preset = 1;

    if (preset == 1) {
        grid_set(20,20,1);
        grid_set(21,20,1);
        grid_set(21,18,1);

        grid_set(23,19,1);

        grid_set(24,20,1);
        grid_set(25,20,1);
        grid_set(26,20,1);
    } else {
        grid_set(20,20,1);
        grid_set(20,21,1);
        grid_set(20,22,1);

        grid_set(19,20,1);
        grid_set(18,21,1);
    }

    render();
}