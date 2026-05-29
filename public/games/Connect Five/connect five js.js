document.getElementById("stop").style.display = "none";
document.getElementById("all_black").style.display = "none";
document.getElementById("all_white").style.display = "none";
document.getElementById("whats_next").style.display = "none";
document.getElementById("take_turns").style.display = "none";
//document.getElementById("demo").style.display = "none";
const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg1.setAttribute("width", "100");
svg1.setAttribute("height", "100");
svg1.setAttribute("viewBox", "0 0 760 760");
document.getElementById('svg_div').appendChild(svg1);
create_vertical_lines();
create_horizantal_lines();
var click_x_y_coords = [90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570, 610, 650, 690];
var x_y_coord_for_delete = [];
var black_tile = false;
var take_turn = true;
var tiles_array = new Array(16);
var black_array = new Array(16);
var white_array = new Array(16);
var can_create_circle = true;
var debug = false;
var black_biggest = 0;
var white_biggest = 0;
var circle_id = 0;
var end_game = false;
var the_winner = 0;
//var myVar = setInterval(check_all_tiles_in_board, 10000);

for (let i = 0; i < tiles_array.length; i++) {
    tiles_array[i] = new Array(16);
    black_array[i] = new Array(16);
    white_array[i] = new Array(16);
}

for (var i = 0; i < tiles_array.length; i++) {
    for (var j = 0; j < tiles_array[i].length; j++) {
        tiles_array[i][j] = 0;
        black_array[i][j] = 0;
        white_array[i][j] = 0;
    }
}

function undo_tiles() {
    console.log("cir"+(circle_id-1));
    console.log(x_y_coord_for_delete.length);
    var first_circle = document.getElementById("cir"+(circle_id-1));
    first_circle.remove();
    tiles_array[x_y_coord_for_delete[circle_id-1].x][x_y_coord_for_delete[circle_id-1].y] = 0;
    x_y_coord_for_delete.pop();
    console.log(x_y_coord_for_delete.length);
    circle_id--;
    var second_circle = document.getElementById("cir"+(circle_id-1));
    second_circle.remove();
    tiles_array[x_y_coord_for_delete[circle_id-1].x][x_y_coord_for_delete[circle_id-1].y] = 0;
    x_y_coord_for_delete.pop();
    console.log(x_y_coord_for_delete.length);
    circle_id --;
}

function check_score(score, black_or_white) {
    /*console.log("black biggest: " + black_biggest);
    console.log("white biggest: " + white_biggest);
    console.log("score: " + score);
    console.log("black or white: " + black_or_white);*/
    if (black_or_white == 1) {
        if (black_biggest >= score) {
            return true;
        } 
    } else {
        if (white_biggest >= score) {
            return true;
        } 
    }
    return false;
}

function which_one_is_bigger() {
    black_biggest = 0;
    white_biggest = 0;
    var black_x = 0;
    var black_y = 0;
    var white_x = 0;
    var white_y = 0;
    for (var x = 0; x < black_array.length; x++) {
        for (var y = 0; y < black_array[x].length; y++) {
            if (black_array[x][y] >= 1000) {
                console.log("black: " + black_array[x][y]);
            }
            if (white_array[x][y] >= 1000) {
                console.log("x: " + x + ", y: " + y + ", white: " + white_array[x][y]);
            }
            if (black_array[x][y] > black_biggest) {
                black_biggest = black_array[x][y];
                black_x = x;
                black_y = y;
                console.log("black_x: " + black_x);
                console.log("black_y: " + black_y);
            }
            if (white_array[x][y] > white_biggest) {
                white_biggest = white_array[x][y];
                white_x = x;
                white_y = y;
            }
        }
    }

    for (var z = 5; z > 0; z--) {
        if (check_score(Math.pow(10, z), 1)) {
            tiles_array[black_x][black_y] = 1;
            if (black_array[black_x][black_y] >= 100000) {
                end_game = true;
                the_winner = 1;
            }
            draw_circle(black_x, black_y, "black");
            return true;
        } 
        if (check_score(Math.pow(10, z), -1)) {
            tiles_array[white_x][white_y] = 1;
            draw_circle(white_x, white_y, "black");
            return true;
        }
    }
}

function draw_circle(x, y, color) {
    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir1.setAttribute("cx", ((40 * x) + 80));
    cir1.setAttribute("cy", ((40 * y) + 80));
    cir1.setAttribute("r", 15);
    cir1.setAttribute("stroke", color);
    cir1.setAttribute("fill", color);
    cir1.setAttribute("id", "cir" + circle_id);
    svg1.appendChild(cir1);
    console.log("place black x: " + x);
    console.log("place black y: " + y);
    circle_id++;

    var one_tile = new Object();
    one_tile.x = x;
    one_tile.y = y;
    x_y_coord_for_delete.push(one_tile);
    if (end_game) {
        //if (one_before_end) {
            setTimeout(check_for_end, 500);
            /*if (the_winner == 1) {
                alert("computer wins!");
            } else {
                alert("you win!");
            }*/
            return true;
        //} else {
        //    one_before_end = true;
        //}
    } 
}

function check_for_end() {
    if (the_winner == 1) {
        alert("computer wins!");
    } else {
        alert("you win!");
    }
}

function check_all_tiles_in_board() {
    for (var x = 0; x < black_array.length; x++) {
        for (var y = 0; y < black_array[x].length; y++) {

            check_one_tile_in_board(x, y);
            
            //console.log("black i: " + i + ", j: " + j + ", score: " + black_array[i][j]);
            //console.log("white i: " + i + ", j: " + j + ", score: " + white_array[i][j]);
        }
    }
    which_one_is_bigger();
}

function check_one_tile_in_board(x, y) {
    if (tiles_array[x][y] == 0) {
        black_array[x][y] = check_one_direction(x, y, 0, 1, 1) + check_one_direction(x, y, 1, 0, 1) + check_one_direction(x, y, 1, 1, 1) + check_one_direction(x, y, 1, -1, 1);
        white_array[x][y] = check_one_direction(x, y, 0, 1, -1) + check_one_direction(x, y, 1, 0, -1) + check_one_direction(x, y, 1, 1, -1) + check_one_direction(x, y, 1, -1, -1);
    } else {
        black_array[x][y] = 0;
        white_array[x][y] = 0;
    }
    if (debug) {
        document.getElementById("added_together").innerHTML = "black all added together: " + black_array[x][y];
        document.getElementById("wadded_together").innerHTML = "white all added together: " + white_array[x][y];
    }
}

function create_horizantal_lines() {
    var y_position;
    for (var i = 2; i < 18; i++) {
        y_position = i * 40;
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '80');
        line2.setAttribute('y1', y_position);
        line2.setAttribute('x2', '680');
        line2.setAttribute('y2', y_position);
        line2.setAttribute("stroke", "black");
        line2.setAttribute('stroke-width', 2);

        svg1.appendChild(line2);
    }
}

function create_vertical_lines() {
    var x_position;
    for (var i = 2; i < 18; i++) {
        x_position = i * 40;
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', x_position);
        line2.setAttribute('y1', '80');
        line2.setAttribute('x2', x_position);
        line2.setAttribute('y2', '680');
        line2.setAttribute("stroke", "black");
        line2.setAttribute('stroke-width', 2);

        svg1.appendChild(line2);
    }
}

/*function showCoords(event) {
    if (end_game) {
        return;
    }
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coords;
    if (can_create_circle) {
        find_x_y_for_circle(event.clientX, event.clientY);
    } else {
        check_how_many_in_a_line(event.clientX, event.clientY);
    }
}*/

function getCursorPosition(canvas, event) {
    if (end_game) {
        return;
    }
    const rect = canvas.getBoundingClientRect()
    const scale = 760 / rect.width
    const x = (event.clientX - rect.left) * scale
    const y = (event.clientY - rect.top) * scale
    console.log("x: " + x + " y: " + y)
    if (can_create_circle) {
        find_x_y_for_circle(x, y);
    } else {
        check_how_many_in_a_line(x, y);
    }
}

function check_one_direction(x, y, x_move, y_move, black_or_white) {
    var keep_max = 0;
    var temp_score = 0;
    var final_score = 0;
    var can_grant_ten_thousand = true;
    all_scores = "";
    var all_added_together = 0;
    for (var m = 0; m < 5; m++) {
        var my_x = (x - m * x_move);
        var my_y = (y - m * y_move);
        if (my_x >= 0 && my_x <= 15) {
            if (my_y >= 0 && my_y <= 15) {
                if (tiles_array[my_x][my_y] == 0) {
                    can_grant_ten_thousand = true;
                }
                /*console.log("call check five x: " + x);
                console.log("call check five y: " + y);
                console.log("call check five m: " + m);
                console.log("call check five 1: " + (x - m * x_move));
                console.log("call check five 2: " + (y - m * y_move));
                console.log("call check five 3: " + x_move);
                console.log("call check five 4: " + y_move);
                console.log("call check five 5: " + black_or_white);*/
                temp_score = check_five(my_x, my_y, x_move, y_move, black_or_white);
                all_scores = all_scores + ", " + temp_score;
                if (can_grant_ten_thousand) {
                    if (temp_score == 4) {
                        final_score = final_score + 10000;
                        can_grant_ten_thousand = false;
                    }
                }
                if (temp_score != 4) {
                    final_score = final_score + Math.pow(10, temp_score);
                }
                if (keep_max < temp_score) {
                    keep_max = temp_score;
                }
            }
        }
    }
    if (debug) {
        if (x_move == 0 && y_move == 1) {
            if (black_or_white == 1) {
                document.getElementById("scoreh").innerHTML = all_scores;
                document.getElementById("score").innerHTML = "black vertical lines: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            } else {
                document.getElementById("wscoreh").innerHTML = all_scores;
                document.getElementById("wscore").innerHTML = "white vertical lines: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            }
        }
        if (x_move == 1 && y_move == 0) {
            if (black_or_white == 1) {
                document.getElementById("score1h").innerHTML = all_scores;
                document.getElementById("score1").innerHTML = "black horizontal lines: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            } else {
                document.getElementById("wscore1h").innerHTML = all_scores;
                document.getElementById("wscore1").innerHTML = "white horizontal lines: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            }
        }
        if (x_move == 1 && y_move == 1) {
            if (black_or_white == 1) {
                document.getElementById("score2h").innerHTML = all_scores;
                document.getElementById("score2").innerHTML = "black top left to bottom right: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            } else {
                document.getElementById("wscore2h").innerHTML = all_scores;
                document.getElementById("wscore2").innerHTML = "white top left to bottom right: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            }
        }
        if (x_move == 1 && y_move == -1) {
            if (black_or_white == 1) {
                document.getElementById("score3h").innerHTML = all_scores;
                document.getElementById("score3").innerHTML = "black bottom left to top right: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            } else {
                document.getElementById("wscore3h").innerHTML = all_scores;
                document.getElementById("wscore3").innerHTML = "white bottom left to top right: " + keep_max + ", " + final_score + ", " + (Math.floor(final_score / Math.pow(10, keep_max))) * Math.pow(10, keep_max);
            }
        }
    }

    return (Math.floor(final_score/Math.pow(10, keep_max)))*Math.pow(10, keep_max);
}

function check_five(x, y, move_x, move_y, black_or_white) {
    var circles_in_line = 1;
    for (var m = 0; m < 5; m++) {
        var new_x = x + m * move_x;
        var new_y = y + m * move_y;
        if (new_x < 0 || new_x > 15) {
            return 0;
        }
        if (new_y < 0 || new_y > 15) {
            return 0;
        }
        if (tiles_array[new_x][new_y] == (1*black_or_white)) {
            circles_in_line++;
        }
        if (tiles_array[new_x][new_y] == -1*black_or_white) {
            return 0;
        }
    }
    return circles_in_line;
}

function check_vertical_lines(i, j) {
    var circles_in_line = 1;
    if (tiles_array[i][j] == 0) {
        for (var z = 0; z < 16; z++) {
            if (tiles_array[i][z] == 1) {
                circles_in_line++;
            }
        }
        return circles_in_line;
    }
}

function check_how_many_in_a_line(x_coord, y_coord) {
    for (var i = 0; i < 16; i++) {
        if (x_coord >= ((40 * i) + 75) && x_coord <= ((40 * i) + 105)) {
            for (var j = 0; j < 16; j++) {
                if (y_coord >= ((40 * j) + 75) && y_coord <= ((40 * j) + 105)) {
                    check_one_tile_in_board(i, j)
                }
            }
        }
    }
}

function find_x_y_for_circle(x_coord, y_coord) {
    if (can_create_circle) {
        for (var i = 0; i < 16; i++) {
            if (x_coord >= ((40 * i) + 75) && x_coord <= ((40 * i) + 105)) {
                for (var j = 0; j < 16; j++) {
                    if (y_coord >= ((40 * j) + 75) && y_coord <= ((40 * j) + 105)) {
                        create_circle(i, j);
                    }
                }
            }
        }
    }
}

function create_circle(x, y) {
    if (tiles_array[x][y] == 0) {
        if (take_turn) {
            if (white_array[x][y] >= 100000) {
                end_game = true;
                the_winner = -1;
            }
            draw_circle(x, y, "white");
            tiles_array[x][y] = -1;
            black_tile = true;
            if (!end_game) {
                check_all_tiles_in_board();
            }
        } else {
            if (black_tile) {
                tiles_array[x][y] = 1;
                draw_circle(x, y, "black");
            } else {
                draw_circle(x, y, "white");
                tiles_array[x][y] = -1;
            }
        }
    }
}