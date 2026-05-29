document.getElementById("demo3").style.display = "none";
document.getElementById("demo2").style.display = "none";
document.getElementById("demo").style.display = "none";
var count_id = 0;
var cow_array = [];
var image_array = ["./images/cow1.PNG", "./images/cow2.PNG", "./images/cow3.PNG", "./images/cow4.PNG", "./images/cow5.PNG", "./images/cow6.PNG", "./images/cow7.PNG", "./images/cow8.PNG", "./images/cow9.PNG", "./images/cow10.PNG", "./images/cow11.PNG", "./images/cow12.PNG", "./images/cow_game_win.PNG"]
var image_width = [93, 117, 124, 145, 133, 142, 167, 171, 191, 189, 191, 192, 528];
var image_height = [60, 82, 89, 119, 151, 191, 113, 152, 187, 189, 193, 189, 446];
var container_one = document.getElementById("container_one");
var container_two = document.getElementById("container_two");
var save_width;
var you_win = false;
if (window.innerWidth > 1000) {
    save_width = 1000;
} else {
    save_width = window.innerWidth - 16;
}
container_one.style.width = save_width + "px";
container_one.style.height = (save_width * 0.7) + "px";
container_two.style.width = save_width + "px";
container_two.style.height = (save_width * 0.7) + "px";
container_two.style.display = "none";
//var debug = setInterval(debug, 1000);
add_cow(0, 0, 0);
/*add_cow(1, 0, 0);
add_cow(2, 0, 0);
add_cow(3, 0, 0);
add_cow(4, 0, 0);
add_cow(5, 0, 0);
add_cow(6, 0, 0);
add_cow(7, 0, 0);
add_cow(8, 0, 0);
add_cow(9, 0, 0);
add_cow(10, 0, 0);
add_cow(11, 0, 0);*/
//var generate_cow = setInterval(add_cow(0, 0, 0), 500);
var generate_cow = setInterval(function () { add_cow(0, 0, 0); }, 5000);

var container = document.querySelectorAll("#container_one, #container_two");
var stop_drag_0 = document.getElementById("world0");
stop_drag_0.draggable = false;
var stop_drag_1 = document.getElementById("world1");
stop_drag_1.draggable = false;
var activeItem = null;

var active = false;

container[0].addEventListener("touchstart", dragStart, false);
container[0].addEventListener("touchend", dragEnd, false);
container[0].addEventListener("touchmove", drag, false);
container[1].addEventListener("touchstart", dragStart, false);
container[1].addEventListener("touchend", dragEnd, false);
container[1].addEventListener("touchmove", drag, false);

container[0].addEventListener("mousedown", dragStart, false);
container[0].addEventListener("mouseup", dragEnd, false);
container[0].addEventListener("mousemove", drag, false);
container[1].addEventListener("mousedown", dragStart, false);
container[1].addEventListener("mouseup", dragEnd, false);
container[1].addEventListener("mousemove", drag, false);

function show_container_one() {
    if (you_win == false) {
        container_two.style.display = "none";
        container_one.style.display = "block";
    }
}

function show_container_two() {
    if (you_win == false) {
        container_one.style.display = "none";
        container_two.style.display = "block";
    }
}

function debug() {
    var cow = document.getElementById("cow0");
    /*console.log(cow_array.length);
    console.log("cow.x+cow.currentX: " + (cow.x+cow.currentX));
    console.log("cow.y+cow.currentY: " + (cow.y+cow.currentY));
    console.log("position: " + cow.style.position);
    console.log("x: " + cow.clientX);
    console.log("y: " + cow.clientY);
    console.log("cow.style.clientX: " + cow.style.clientX);
    console.log("cow.style.clientY: " + cow.style.clientY);*/
    console.log("cow.currentX: " + cow.currentX);
    console.log("cow.currentY: " + cow.currentY);
    /*console.log("cow.initialX: " + cow.initialX);
    console.log("cow.initialY: " + cow.initialY);
    console.log("cow.left: " + cow.left);
    console.log("cow.top: " + cow.top);
    console.log("cow.x: " + cow.x);
    console.log("cow.y: " + cow.y);
    console.log("cow.xPos: " + cow.xPos);
    console.log("cow.yPos: " + cow.yPos);*/
    /*if (typeof cow.currentX === 'null') {
        console.log("currentX is undefined");
    } else {
        console.log("currentX is" +cow.currentX);
    }*/
    /*if (cow.currentX === null) {
        console.log("currentX is null");
        cow.currentX = 0;
    } else {
        console.log("currentX is" + cow.currentX);
    }
    if (cow.currentY === null) {
        console.log("currentY is null");
        cow.currentY = 0;
    } else {
        console.log("currentY is" + cow.currentY);
    }
    var top_x_y = "(" + (cow.x + cow.currentX) + "," + (cow.y + cow.currentY) + ")";
    var bottom_x_y = "(" + (cow.x + cow.currentX + 61) + "," + (cow.y + cow.currentY + 46) + ")";
    document.getElementById("coordinates").innerHTML = "top coordinates: " + top_x_y + " & bottom coordinates: " + bottom_x_y;
    if (cow.currentX == undefined || cow.currentY == undefined) {
        document.getElementById("coordinates").innerHTML = "top coordinates: (700, 100) & bottom coordinates: (761, 146)";
    } else {
    var top_x_y = "(" + (cow.x+cow.currentX) + "," + (cow.y+cow.currentY) + ")";
    var bottom_x_y = "(" + (cow.x+cow.currentX+61) + "," + (cow.y+cow.currentY+46) + ")";
    document.getElementById("coordinates").innerHTML = "top coordinates: " + top_x_y + " & bottom coordinates: " + bottom_x_y;
    }*/
}

function get_coordinates() {
    var keys = document.getElementById("cow0");
    var keysTop = keys.style.top;
    var keysLeft = keys.style.left;
    keys.style.position = "absolute";
    keys.style.left = "200px";
    keys.style.top = "200px";
    var coords = "(left :" + keysLeft + ",top : " + keysTop + " position :" + keys.style.position + ")";
    document.getElementById("demo3").innerHTML = coords;
}

function add_cow(cow_type, x, y) {
    if (cow_type >= 12) {
        var myimg = document.createElement("img");
        myimg.src = "./images/cow_game_win.PNG";
        var src = document.getElementById("container_two");
        src.appendChild(myimg);
        clearInterval(generate_cow);
        you_win = true;
        //container_one.style.display = "none";
        container[0].removeEventListener("touchstart", dragStart, false);
        container[0].removeEventListener("touchend", dragEnd, false);
        container[0].removeEventListener("touchmove", drag, false);
        container[1].removeEventListener("touchstart", dragStart, false);
        container[1].removeEventListener("touchend", dragEnd, false);
        container[1].removeEventListener("touchmove", drag, false);

        container[0].removeEventListener("mousedown", dragStart, false);
        container[0].removeEventListener("mouseup", dragEnd, false);
        container[0].removeEventListener("mousemove", drag, false);
        container[1].removeEventListener("mousedown", dragStart, false);
        container[1].removeEventListener("mouseup", dragEnd, false);
        container[1].removeEventListener("mousemove", drag, false);
        return true;
    }
    var myimg = document.createElement("img");
    myimg.id = "cow" + count_id;
    myimg.src = image_array[cow_type];
    myimg.style.position = "absolute";
    if (x == 0 && y == 0) {
        myimg.style.left = (Math.floor(Math.random() * (save_width - 192)) + 1) + "px";
        myimg.style.top = (Math.floor(Math.random() * ((save_width * 0.7) - 189)) + 1) + "px";
    } else {
        myimg.style.left = x + "px";
        myimg.style.top = y + "px";
    }
    myimg.draggable = false;
    myimg.currentX = 0;
    myimg.currentY = 0;
    if (cow_type >= 6) {
        var src = document.getElementById("container_two");
        src.appendChild(myimg);
    } else {
        var src = document.getElementById("container_one");
        src.appendChild(myimg);
    }

    var one_cow = new Object();
    one_cow.cow_id = myimg.id;
    one_cow.cow_image = myimg.src;
    one_cow.cow_type = cow_type;
    cow_array.push(one_cow);

    count_id++;
}

function remove_cow() {
    var el = document.getElementById("new_cow");
    el.remove();
}

function dragStart(e) {

    if (e.target !== e.currentTarget) {
        if (e.target.id != "world0" && e.target.id != "world1") {
            //console.log(e.target.id);
            active = true;

            // this is the item we are interacting with
            activeItem = e.target;

            if (activeItem !== null) {
                if (!activeItem.xOffset) {
                    activeItem.xOffset = 0;
                }

                if (!activeItem.yOffset) {
                    activeItem.yOffset = 0;
                }

                if (e.type === "touchstart") {
                    activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                    activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
                } else {
                    //console.log("doing something!");
                    activeItem.initialX = e.clientX - activeItem.xOffset;
                    activeItem.initialY = e.clientY - activeItem.yOffset;
                }
            }
        }
    }
}

function dragEnd(e) {
    var my_x;
    var my_y;
    var can_delete = false;
    var image_c;
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }

    if (active) {
        if (e.type === "touchmove") {
            image_c = "image: (" + e.touches[0].clientX + "," + e.touches[0].clientY + "," + activeItem.id + ")";
            my_x = e.touches[0].clientX;
            my_y = e.touches[0].clientY;
        } else {
            image_c = "image: (" + e.clientX + "," + e.clientY + "," + activeItem.id + ")";
            my_x = e.clientX;
            my_y = e.clientY;
        }

        document.getElementById("demo2").innerHTML = image_c;
        for (var i = 0; i < cow_array.length; i++) {
            var cow = document.getElementById(cow_array[i].cow_id);
            console.log("(" + cow.id + ":" + (cow.x + cow.currentX) + "," + (cow.y + cow.currentY) + ")");
            var remove_activeItem = document.getElementById(activeItem.id);
            //console.log(cow_array[i].cow_id);
            if (cow.currentX == undefined || cow.currentY == undefined) {
                alert(cow.id + "undefined");
            }
            if (activeItem.id != cow_array[i].cow_id) {
                if (activeItem.src == cow_array[i].cow_image) {
                    if (my_x >= (cow.x + cow.currentX) && my_x <= (cow.x + cow.currentX + image_width[cow_array[i].cow_type])) {
                        if (my_y >= (cow.y + cow.currentY) && my_y <= (cow.y + cow.currentY + image_height[cow_array[i].cow_type])) {
                            if (cow_array[i].cow_type + 1 == 12) {
                                add_cow(cow_array[i].cow_type + 1, (save_width / 4), ((save_width * 0.7) / 4));
                            } else {
                                add_cow(cow_array[i].cow_type + 1, my_x, my_y);
                            }
                            cow.remove();
                            //console.log("hi");
                            remove_activeItem.remove();
                            cow_array.splice(i, 1);
                            i--;
                            can_delete = true;
                            break;
                        }
                    }
                }
            }
        }
        if (can_delete) {
            for (var j = 0; j < cow_array.length; j++) {
                if (cow_array[j].cow_id == activeItem.id) {
                    cow_array.splice(j, 1);
                    break;
                }
            }
        }
    }
    active = false;
    activeItem = null;
}

function drag(e) {
    var mouse_c;
    var image_c;
    var src;
    if (active) {
        src = document.getElementById(activeItem.id);
        if (e.type === "touchmove") {
            e.preventDefault(); e.touches[0].clientY
            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
            mouse_c = "mouse: (" + e.touches[0].clientX + "," + e.touches[0].clientY + "," + activeItem.id + ")";
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
            mouse_c = "mouse: (" + e.clientX + "," + e.clientY + "," + activeItem.id + ")";
        }

        document.getElementById("demo").innerHTML = mouse_c;
        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}