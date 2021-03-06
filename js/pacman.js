class Pacman extends MoveObject {
    constructor(X, Y, vx, vy, center_point) {
        super(X, Y, vx, vy, center_point);
        this.original_X = X;
        this.original_Y = Y;
        this.body_radius = wall_size * 8 / 20;
        this.start_angle = 0.15;
        this.finish_angle = 1.85;
        this.next_vx = 0;
        this.next_vy = 0;
        this.mouth_open = 0;
    }

    resetLocation() {
        this.locationOngrid = generateRandomPosition();
        let pixel_xy = board.getPixel(this.locationOngrid)
        this.X = pixel_xy[0] + (wall_size / 2);
        this.Y = pixel_xy[1] + (wall_size / 2);
        this.vx = 0;
        this.vy = 0;
        this.next_vx = 0;
        this.next_vy = 0;
        grid[this.locationOngrid[1]][this.locationOngrid[0]] = 1;
    }

    update() {
        if (got_pacman) return
        if (this.collisionDetection()) {
            this.vx = 0;
            this.vy = 0;
        }
        if (!this.checkForTurnCollision(this.next_vx, this.next_vy)) {
            this.vx = this.next_vx;
            this.vy = this.next_vy;
            this.changeDirection(this.vx, this.vy);
        }
        let check_if_edge = this.checkIfEdge(); //check if teleport pacman to other side.
        if (check_if_edge != false) {
            this.X = check_if_edge[0];
        }
        this.X += this.vx;
        this.Y += this.vy;
        let prev_location = this.locationOngrid;
        this.locationOngrid = board.getLocation([this.X, this.Y]); //return the last location accurate on grid [x,y]
        // Check if pacman moved a cell on the grid. handle what pacman encounters.
        if (!(prev_location[0] == this.locationOngrid[0] && prev_location[1] == this.locationOngrid[1])) {
            if (grid[this.locationOngrid[1]][this.locationOngrid[0]] == 4) {
                document.getElementById('score_number').innerHTML = parseInt(document.getElementById('score_number').innerHTML) + 5;
                board.numofballs--;
            } else if (grid[this.locationOngrid[1]][this.locationOngrid[0]] == 5) {
                document.getElementById('score_number').innerHTML = parseInt(document.getElementById('score_number').innerHTML) + 15;
                board.numofballs--;
            } else if (grid[this.locationOngrid[1]][this.locationOngrid[0]] == 6) {
                document.getElementById('score_number').innerHTML = parseInt(document.getElementById('score_number').innerHTML) + 25;
                board.numofballs--;
            } else if (grid[this.locationOngrid[1]][this.locationOngrid[0]] == 9) {
                for (let i = 0; i < ghosts.length; i++) {
                    ghosts[i].setVelocity(ghosts[i].velocity / 4)
                    setTimeout(function fix_ghost_velocity() {
                        if (typeof ghosts[i] !== 'undefined') ghosts[i].setVelocity(ghosts[i].velocity)
                    }, 4000)
                }
            } else if (grid[this.locationOngrid[1]][this.locationOngrid[0]] == 10) {
                if (Math.random() < 0.5) {
                    let random_index = Math.floor(Math.random() * (ghosts.length))
                    ghosts.splice(random_index, 1)
                } else {
                    if (!ex1_in_ghosts) {
                        ex1_in_ghosts = true;
                        ghosts.push(extra_ghost1)
                    } else ghosts.push(extra_ghost2)
                }
            } else if (grid[this.locationOngrid[1]][this.locationOngrid[0]] == 11) {
                document.getElementById('score_number').innerHTML = parseInt(document.getElementById('score_number').innerHTML) + 50;
                cherry.eaten = true;
            }
            grid[prev_location[1]][prev_location[0]] = 0;
            grid[this.locationOngrid[1]][this.locationOngrid[0]] = 1;
        }
    }

    setVelocity(vx, vy) {
        this.locationOngrid = board.getLocation([this.X, this.Y]);
        this.next_vx = vx;
        this.next_vy = vy;
    }

    changeDirection(vx, vy) {
        if (vx > 0) { //right
            this.start_angle = 0.15
            this.finish_angle = 1.85
        } else if (vx < 0) { //left
            this.start_angle = 1.15
            this.finish_angle = 0.85
        } else if (vy > 0) { //down
            this.start_angle = 0.65
            this.finish_angle = 0.35
        } else if (vy < 0) { //up
            this.start_angle = 1.65
            this.finish_angle = 1.35
        }
    }

    draw() {
        if (this.mouth_open > 10) this.mouth_open = 0;
        if (this.mouth_open < 5) {
            context.beginPath();
            context.arc(this.X, this.Y, this.body_radius, this.start_angle * Math.PI, this.finish_angle * Math.PI); // half circle
            context.lineTo(this.X, this.Y);
            context.fillStyle = "yellow"; //color
            context.fill();
        } else {
            context.beginPath();
            context.arc(this.X, this.Y, this.body_radius, 0 * Math.PI, 2 * Math.PI); // full circle
            context.lineTo(this.X, this.Y);
            context.fillStyle = "yellow"; //color
            context.fill();
        }
        this.mouth_open++;
    }
}