/**
 * grid interpretation:
 * 0 - free space
 * 1 - pacman
 * 2 - ghost
 * 3 - wall
 * 4 - 5 points ball
 * 5 - 15 points ball
 * 6 - 25 point ball
 * 7 - empty zone
 * 8 - teleport cell
 * 9 - sour sweet candy
 * 10 - ghost candy
 * 11 - cherry
 */


var grid = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3],
    [3, 0, 3, 7, 7, 3, 0, 3, 7, 7, 7, 3, 0, 3, 3, 0, 3, 7, 7, 7, 3, 0, 3, 7, 7, 3, 0, 3],
    [3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 0, 3],
    [3, 0, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3],
    [7, 7, 7, 7, 7, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 3, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 7, 7, 7, 7, 7],
    [3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3],
    [7, 7, 7, 7, 7, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 3, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 7, 7, 7, 7, 7],
    [3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3],
    [3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3],
    [3, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 3],
    [3, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 3],
    [3, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3],
    [3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]



class Board {
    constructor(startlocation, wallsize) {
        this.width = 31;
        this.height = 28;
        this.wall_size = wallsize;
        this.startLocation = startlocation;
        this.sour_sweet_candy_size = 60;
        this.sour_sweet_growth = false;
        this.ghosts_cells = [
            [1, 1],
            [29, 1],
            [1, 26],
            [29, 26]
        ]
        this.numofballs = -1;
    }


    isGhostCell(i, j) {
        return (i == 1 && j == 1) || (i == 29 && j == 1) || (i == 1 && j == 26) || (i == 29 && j == 26) ||
            (i == 17 && j == 14)
    }

    getLocation(location) {
        var x = Math.floor((location[0] - this.startLocation[0]) / (this.wall_size))
        var y = Math.floor((location[1] - this.startLocation[1]) / (this.wall_size))
        return [x, y];
    };

    getPixel(location) {
        var px_X = (location[0] * this.wall_size) + this.startLocation[0];
        var px_Y = (location[1] * this.wall_size) + this.startLocation[1];
        return [px_X, px_Y]
    }

    draw() {
        if (this.sour_sweet_candy_size < 0 && !this.sour_sweet_growth) {
            this.sour_sweet_candy_size = 0;
            this.sour_sweet_growth = true;
        } else if (this.sour_sweet_candy_size > 60 && this.sour_sweet_growth) {
            this.sour_sweet_candy_size = 60;
            this.sour_sweet_growth = false;
        }
        if (this.sour_sweet_growth) this.sour_sweet_candy_size++;
        else this.sour_sweet_candy_size--;
        let num_of_current_balls = 0;
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if (grid[i][j] == 3) {
                    context.beginPath();
                    context.rect(this.startLocation[0] + this.wall_size * j, this.startLocation[1] + this.wall_size * i, this.wall_size, this.wall_size);
                    context.fillStyle = "blue"; //color
                    context.fill();
                } else if (grid[i][j] == 4) {
                    num_of_current_balls++;
                    let pixel_xy = this.getPixel([j, i])
                    context.beginPath();
                    context.arc(pixel_xy[0] + pacman.body_radius + 2, pixel_xy[1] + pacman.body_radius + 2, pacman.body_radius - 4, 0 * Math.PI, 2 * Math.PI); // full circle
                    context.lineTo(this.X, this.Y);
                    context.fillStyle = color_of_5_balls; //color
                    context.fill();
                    context.lineWidth = 0.5;
                    context.strokeStyle = "white";
                    context.stroke();
                } else if (grid[i][j] == 5) {
                    num_of_current_balls++;

                    let pixel_xy = this.getPixel([j, i])
                    context.beginPath();
                    context.arc(pixel_xy[0] + pacman.body_radius + 2, pixel_xy[1] + pacman.body_radius + 2, pacman.body_radius - 4, 0 * Math.PI, 2 * Math.PI); // full circle
                    context.lineTo(this.X, this.Y);
                    context.fillStyle = color_of_15_balls; //color
                    context.fill();
                    context.lineWidth = 0.5;
                    context.strokeStyle = "white";
                    context.stroke();
                } else if (grid[i][j] == 6) {
                    num_of_current_balls++;

                    let pixel_xy = this.getPixel([j, i])
                    context.beginPath();
                    context.arc(pixel_xy[0] + pacman.body_radius + 2, pixel_xy[1] + pacman.body_radius + 2, pacman.body_radius - 4, 0 * Math.PI, 2 * Math.PI); // full circle
                    context.lineTo(this.X, this.Y);
                    context.fillStyle = color_of_25_balls; //color
                    context.fill();
                    context.lineWidth = 0.5;
                    context.strokeStyle = "white";
                    context.stroke();
                } else if (grid[i][j] == 9) {
                    let pixel_xy = this.getPixel([j, i])
                    context.beginPath();
                    context.arc(pixel_xy[0] + pacman.body_radius + 2, pixel_xy[1] + pacman.body_radius + 2, pacman.body_radius - this.sour_sweet_candy_size / 25, 0 * Math.PI, 2 * Math.PI); // full circle
                    context.lineTo(this.X, this.Y);
                    context.fillStyle = "#37FF00"; //color
                    context.fill();
                    context.lineWidth = 2;
                    context.strokeStyle = "pink";
                    context.stroke();
                } else if (grid[i][j] == 10) {
                    let pixel_xy = this.getPixel([j, i])
                    context.beginPath();
                    context.arc(pixel_xy[0] + pacman.body_radius + 2, pixel_xy[1] + pacman.body_radius + 2, pacman.body_radius - this.sour_sweet_candy_size / 25, 0 * Math.PI, 2 * Math.PI); // full circle
                    context.lineTo(this.X, this.Y);
                    context.fillStyle = "#FF0023"; //color
                    context.fill();
                    context.lineWidth = 2;
                    context.strokeStyle = "yellow";
                    context.stroke();
                }
            }
        }
        // handle gap between board.numofballs to the drawed ones.
        if (game_started && board.numofballs != num_of_current_balls) board.numofballs = num_of_current_balls;
    }

    isCorner(i, j) {
        return (i < grid.length / 5 && j < grid.length / 5) ||
            (i < grid.length / 5 && j > 4 * grid.length / 5) ||
            (i > 4 * grid.length / 5 && j < grid.length / 5) ||
            (i > 4 * grid.length / 5 && j > 4 * grid.length / 5)
    }

    clearGrid() {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] != 3 && grid[i][j] != 7 && grid[i][j] != 8) grid[i][j] = 0;
            }
        }
    }

    generateRandomBalls(balls_remain, num_of_5_balls, num_of_15_balls, num_of_25_balls, num_of_sour_sweet_candies, num_of_ghost_candy) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                // generate 5 points ball
                if (grid[i][j] == 0 && balls_remain > 0 && num_of_5_balls > 0 && Math.random() < 0.01) {
                    grid[i][j] = 4;
                    balls_remain--;
                    num_of_5_balls--;
                }
                // generate 15 points ball
                else if (grid[i][j] == 0 && balls_remain > 0 && num_of_15_balls > 0 && Math.random() < 0.01) {
                    grid[i][j] = 5;
                    balls_remain--;
                    num_of_15_balls--;
                }
                // generate 25 points ball
                else if (grid[i][j] == 0 && balls_remain > 0 && num_of_25_balls > 0 && Math.random() < 0.01) {
                    grid[i][j] = 6;
                    balls_remain--;
                    num_of_25_balls--;
                } else if (grid[i][j] == 0 && !this.isGhostCell(i, j) && this.isCorner(i, j) && num_of_sour_sweet_candies > 0 && Math.random() < 0.01) {
                    grid[i][j] = 9;
                    num_of_sour_sweet_candies--;
                } else if (grid[i][j] == 0 && !this.isGhostCell(i, j) && this.isCorner(i, j) && num_of_ghost_candy > 0 && Math.random() < 0.01) {
                    grid[i][j] = 10;
                    num_of_ghost_candy--;
                }
                // handle the remainder of balls from the Math.floor() - put 5 points balls.
                else if (grid[i][j] == 0 && !([i, j] in this.ghosts_cells) && balls_remain > 0 && num_of_5_balls == 0 &&
                    num_of_15_balls == 0 && num_of_25_balls == 0 && Math.random() < 0.01) {
                    grid[i][j] = 4;
                    balls_remain--;
                }
            }
        }
        // recursive call if more balls remain.
        if (balls_remain > 0 || num_of_sour_sweet_candies > 0 || num_of_ghost_candy > 0) this.generateRandomBalls(balls_remain, num_of_5_balls, num_of_15_balls, num_of_25_balls, num_of_sour_sweet_candies, num_of_ghost_candy);
    }
}