var baby_y = 300;
var c = document.getElementById("myCanvas");
c.width = window.innerWidth - 100;
c.height = 600;
var zombie_x = c.width;
var ctx = c.getContext("2d");
ctx.font = "10px consolas";
var zombie_array = [];
var score = 0;
var level = 10;
var previous_level = 10;
var level_array = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10];
var generate_zombie_level = 10;
var can_shoot_knife = true;
var waitcount = 8;
var move_ratio = c.width/1500.001;
console.log(move_ratio);
create_big_zombie();
create_small_zombie();
create_poop_zombie();
var myVar = setInterval(movezombie, 500);

function create_big_zombie() {
    var one_zombie = new Object();
    one_zombie.zombie_image = bigzombie;
    one_zombie.x = zombie_x;
    one_zombie.y = (Math.floor(Math.random() * 5) + 1) * 100;
    one_zombie.speed = move_ratio*7;
    one_zombie.life = 10;
    one_zombie.is_knife = false;
    zombie_array.push(one_zombie);
}

function create_small_zombie() {
    var one_zombie = new Object();
    one_zombie.zombie_image = smallzombie;
    one_zombie.x = zombie_x;
    one_zombie.y = (Math.floor(Math.random() * 5) + 1) * 100;
    one_zombie.speed = move_ratio*20;
    one_zombie.life = 1;
    one_zombie.is_knife = false;
    zombie_array.push(one_zombie);
}

function create_poop_zombie() {
    var one_zombie = new Object();
    one_zombie.zombie_image = poop;
    one_zombie.x = zombie_x;
    one_zombie.y = (Math.floor(Math.random() * 5) + 1) * 100;
    one_zombie.speed = move_ratio*10;
    one_zombie.life = 5;
    one_zombie.is_knife = false;
    zombie_array.push(one_zombie);
}

function create_knife() {
    var one_zombie = new Object();
    one_zombie.zombie_image = knife;
    one_zombie.x = 75;
    one_zombie.y = baby_y;
    one_zombie.speed = move_ratio*-50;
    one_zombie.life = 1;
    one_zombie.is_knife = true;
    zombie_array.push(one_zombie);
}

function up_arrow() {
    if (baby_y <= 100) {
        return true;
    }
    baby_y -= 100;
}

function down_arrow() {
    if (baby_y >= 500) {
        return true;
    }
    baby_y += 100;
}

function right_arrow() {
    if (can_shoot_knife) {
        console.log("create one kinfe");
        create_knife();
        can_shoot_knife = false;
    }
}

function check_levels() {
    level = 10 - Math.floor(score / 100);
    if (previous_level != level) {
        waitcount = 8;
        previous_level = level;
        generate_zombie_level -= 1;
        for (var i = 0; i < zombie_array.length; i++) {
            zombie_array.splice(i, 1);
        }
    }
}

function generate_zombie() {
    var generate_a_zombie = (Math.floor(Math.random() * generate_zombie_level) + 1);
    console.log("the generate number is: " +generate_a_zombie);
    if (generate_a_zombie == 1) {
        var which_zombie = (Math.floor(Math.random() * 3) + 1);
        switch (which_zombie) {
            case 1:
                create_small_zombie();
                break;
            case 2:
                create_big_zombie();
                break;
            case 3:
                create_poop_zombie();
                break;
        }
    }
}

function check_if_knife_hits_zombie() {
    for (var i = 0; i < zombie_array.length; i++) {
        for (var j = 0; j < zombie_array.length; j++) {
            if (zombie_array[i].is_knife != zombie_array[j].is_knife) {
                if (zombie_array[i].y == zombie_array[j].y) {
                    if (zombie_array[j].is_knife) {
                        if (zombie_array[j].x >= zombie_array[i].x) {
                            zombie_array[i].life -= 1;
                            zombie_array[j].life -= 1;
                            score += 1;
                        }
                    }
                }
            }
        }
    }
}

function removed_unused_zombies() {
    for (var z = 0; z < zombie_array.length; z++) {
        zombie_array[z].x -= zombie_array[z].speed;
        if ((zombie_array[z].life <= 0) || (zombie_array[z].x >= c.width)) {
            zombie_array.splice(z, 1);
        }
    }
}

function movezombie() {
    if (waitcount != 0) {
        ctx.clearRect(0, 0, c.width, c.height);
        waitcount -= 1;
        ctx.drawImage(level_array[10 - level], (zombie_x-500)/2, 100);
        ctx.font = "100px consolas";
        ctx.fillStyle = "#AF4C4C"
        ctx.fillText("" +waitcount, c.width/2, 500);
        return true;
    } 
    ctx.clearRect(0, 0, c.width, c.height);
    generate_zombie();
    for (var i = 0; i < zombie_array.length; i++) {
        if (!zombie_array[i].is_knife) {
            if (zombie_array[i].x <= 100) {
                //zombie_array.splice(i, 1);
                //i--;
                ctx.drawImage(zombie_end, 130, 0);
                ctx.font = "30px consolas";
                ctx.fillStyle = "#AF4C4C";
                ctx.fillText("you lost!", 690, 50);
                clearInterval(myVar);
                return true;
            }
        }
        zombie_array[i].x -= zombie_array[i].speed;
        ctx.drawImage(zombie_array[i].zombie_image, zombie_array[i].x, zombie_array[i].y);
        ctx.font = "15px consolas";
        ctx.fillStyle = "black";
        if (zombie_array[i].zombie_image == bigzombie) {
            ctx.fillText(zombie_array[i].life, zombie_array[i].x+45, zombie_array[i].y+12);
        } else {
            if (zombie_array[i].zombie_image == poop) {
                ctx.fillText(zombie_array[i].life, zombie_array[i].x+50, zombie_array[i].y+13);
            } else {
                if (zombie_array[i].zombie_image == smallzombie) {
                    ctx.fillText(zombie_array[i].life, zombie_array[i].x+23, zombie_array[i].y+12);
                }
            }
        }
    }
    check_if_knife_hits_zombie();
    removed_unused_zombies();
    check_levels();
    ctx.drawImage(baby, 25, baby_y);
    ctx.font = "15px consolas";
    ctx.fillStyle = "#AF4C4C";
    ctx.fillText("Your score is: " + score, c.width/2-50, 20);
    can_shoot_knife = true;
}