const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var wall_size = 18;
var canvas_width = 1000;
var canvas_height = wall_size * 31;
var scale = window.devicePixelRatio
canvas.width = canvas_width * scale;
canvas.height = canvas_height * scale;
context.scale(scale, scale);
var ghost_img = document.createElement("img");
ghost_img.src = "./images/ghosts.png"

/// test canvas 
const test_canvas = document.getElementById('test_canvas');
const test_ctx = canvas.getContext('2d');

// ghost sprite size (160,160) space (30), space to other ghost (50,30)


var break_animation = false;
var goUp = 'ArrowUp';
var goDown = 'ArrowDown';
var goLeft = 'ArrowLeft';
var goRight = 'ArrowRight';
var velocity = 1.5; // 1 or 2 
var ghost_velocity = velocity - 0.5
var ghost_center = 20;
var mouth_open_counter = 0;
var num_of_seconds;
var timer_count = 0;
var strikes = 5;
var got_pacman = false;
var board = new Board([canvas.width / 6, 0], wall_size);

function generateRandomPosition() {
    let i = 5 + Math.floor(Math.random() * (grid.length - 10))
    let j = 5 + Math.floor(Math.random() * (grid[0].length - 10))
    if (grid[j][i] != 0) return generateRandomPosition();
    else return [i, j]
}

var pacman_start = board.getPixel(generateRandomPosition())
var pacman = new Pacman(pacman_start[0] + (wall_size / 2), pacman_start[1] + (wall_size / 2), 0, 0, wall_size / 2);
pacman.locationOngrid = board.getLocation([pacman.X, pacman.Y]);

var red_ghost_start = board.getPixel([1, 1])
var red_ghost = new Ghost(red_ghost_start[0], red_ghost_start[1], ghost_velocity, 0, 0, 0, wall_size, ghost_velocity);
red_ghost.locationOngrid = board.getLocation([red_ghost.X, red_ghost.Y]);

var pink_ghost_start = board.getPixel([1, 29])
var pink_ghost = new Ghost(pink_ghost_start[0], pink_ghost_start[1], ghost_velocity, 0, 0, 380, wall_size, ghost_velocity);
pink_ghost.locationOngrid = board.getLocation([pink_ghost.X, pink_ghost.Y]);

var orange_ghost_start = board.getPixel([26, 1])
var orange_ghost = new Ghost(orange_ghost_start[0], orange_ghost_start[1], ghost_velocity, 0, 400, 380, wall_size, ghost_velocity);
orange_ghost.locationOngrid = board.getLocation([orange_ghost.X, orange_ghost.Y]);

var blue_ghost_start = board.getPixel([26, 29])
var blue_ghost = new Ghost(blue_ghost_start[0], blue_ghost_start[1], ghost_velocity, 0, 400, 0, wall_size, ghost_velocity);
blue_ghost.locationOngrid = board.getLocation([blue_ghost.X, blue_ghost.Y]);

var extra_ghost1 = new Ghost(pink_ghost_start[0], pink_ghost_start[1], ghost_velocity, 0, 0, 0, wall_size, ghost_velocity);
extra_ghost1.locationOngrid = board.getLocation([extra_ghost1.X, extra_ghost1.Y]);
var extra_ghost2 = new Ghost(orange_ghost_start[0], orange_ghost_start[1], ghost_velocity, 0, 400, 0, wall_size, ghost_velocity);
extra_ghost2.locationOngrid = board.getLocation([extra_ghost2.X, extra_ghost2.Y]);
var ghosts = [red_ghost, pink_ghost, blue_ghost, orange_ghost] //should be random



function setGameValues() {
    goUp = document.getElementById('MoveUp_input').value;
    goDown = document.getElementById('MoveDown_input').value;
    goRight = document.getElementById('MoveRight_input').value;
    goLeft = document.getElementById('MoveLeft_input').value;
    document.getElementById('MoveUp_game').value = goUp;
    document.getElementById('MoveDown_game').value = goDown;
    document.getElementById('MoveRight_game').value = goRight;
    document.getElementById('MoveLeft_game').value = goLeft;
    var num_of_balls = document.getElementById('slider_value_balls').value;
    var num_of_ghosts = document.getElementById('slider_value_monsters').value;
    // remove random shots - depends on num_of_ghosts given.
    for (let i = 0; i < 4 - num_of_ghosts; i++) {
        random_index = Math.floor(Math.random() * (4 - i))
        ghosts.splice(random_index, 1)
    }
    num_of_seconds = document.getElementById('slider_value_time').value;
    var num_of_sour_sweet_candies = 2;
    var num_of_ghost_candy = 2;
    var num_of_5_balls = Math.floor(0.6 * num_of_balls);
    var num_of_15_balls = Math.floor(0.3 * num_of_balls);
    var num_of_25_balls = Math.floor(0.1 * num_of_balls);
    color_of_5_balls = document.getElementById('color1').value;
    color_of_15_balls = document.getElementById('color2').value;
    color_of_25_balls = document.getElementById('color3').value;
    document.getElementById('color1_game').value = document.getElementById('color1').value;
    document.getElementById('color2_game').value = document.getElementById('color2').value;
    document.getElementById('color3_game').value = document.getElementById('color3').value;
    document.getElementById('colorBtn1_game').style.background = color_of_5_balls;
    document.getElementById('colorBtn2_game').style.background = color_of_15_balls;
    document.getElementById('colorBtn3_game').style.background = color_of_25_balls;
    document.getElementById('timer_count').innerHTML = num_of_seconds;
    if (isLightColor(color_of_5_balls)) document.getElementById('colorBtn1').style.color = '#000000';
    else document.getElementById('colorBtn1').style.color = '#FFFFFF';
    board.generateRandomBalls(num_of_balls, num_of_5_balls, num_of_15_balls, num_of_25_balls, num_of_sour_sweet_candies, num_of_ghost_candy);


}

function checkIfCrash(ghost) {
    if (pacman.locationOngrid[0] == ghost.locationOngrid[0] && pacman.locationOngrid[1] == ghost.locationOngrid[1]) {
        document.getElementById('life' + strikes).style.display = "none";
        strikes--;
        document.getElementById('score_number').innerHTML = parseInt(document.getElementById('score_number').innerHTML) - 10;
        for (let i = 0; i < ghosts.length; i++) {
            let curr_ghost = ghosts[i]
            grid[curr_ghost.locationOngrid[1]][curr_ghost.locationOngrid[0]] = 0;
            curr_ghost.resetLocation();
        }
        if (extra_ghost1 in ghosts) {
            grid[extra_ghost1.locationOngrid[1]][extra_ghost1.locationOngrid[0]] = 0;
            extra_ghost1.resetLocation();
        }
        if (extra_ghost2 in ghosts) {
            grid[extra_ghost2.locationOngrid[1]][extra_ghost2.locationOngrid[0]] = 0;
            extra_ghost2.resetLocation();
        }
        grid[pacman.locationOngrid[1]][pacman.locationOngrid[0]] = 0;
        pacman.resetLocation();
        alert('got pacman!');
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    pacman.update();
    pacman.draw();
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].update();
        ghosts[i].draw();
        checkIfCrash(ghosts[i]);
    }
    if (timer_count > 60) {
        num_of_seconds--;
        document.getElementById('timer_count').innerHTML = num_of_seconds;
        timer_count = 0;
    }
    timer_count++;
    if (break_animation) return;
    requestAnimationFrame(animate);
}

function resetGame() {
    break_animation = true;
    break_animation = false;


}

window.addEventListener('keydown', function(e) {
        console.log(e.key)
        if (e.code === 'Space') break_animation = true;
        else if (e.key === goUp) pacman.setVelocity(0, -velocity);
        else if (e.key === goDown) pacman.setVelocity(0, velocity);
        else if (e.key === goLeft) pacman.setVelocity(-velocity, 0);
        else if (e.key === goRight) pacman.setVelocity(velocity, 0);
    })
    // board.generateBoard();


const reloadtButton = document.querySelector("#reload");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload, false);