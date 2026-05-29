var computer_secret_number = 0;
//var one_round = {guessed_number:0, a:0, b:0};
var one_round_array = [];
var computer_one_round_array = [];
var valid_numbers = [];
var pc_guessnumber=0;
document.getElementById("enterarrow").style.color = "#AF4C4C";
document.getElementById("entercomputerguessnumber").style.color = "#AF4C4C";
var whose_turn = true;

function printall(one_round_array) {
    var printall_var = "";
    for (var i=0; i<one_round_array.length; i++) { 
        printall_var = printall_var + one_round_array[i].guessed_number + " " +one_round_array[i].a + "A " + one_round_array[i].b + "B <br>";
    }
    return printall_var;
}

function myMethod(guess_number) {

    if (computer_secret_number == 0) {
        alert("you have not press the start button!");
        return true;
    }

    if (whose_turn == false) {
        alert("it's the computer's turn to guess your number. please provide an A and B and click next round!");
        return true;
    }

    if (guess_number < 0 || guess_number > 9999) {
        alert("you did not enter a 4 digit number");
        return true;
    }

    if (check_number(guess_number)) {
        alert("you did not enter a valid 4 digit number");
        return true;
    }

    var secret_number_array = int_to_array(computer_secret_number);
    var guess_number_array = int_to_array(guess_number);
    var match_a = 0;
    var match_b = 0;
    //console.log("computer secret number is" +computer_secret_number);
    //console.log("people guess number is" +guess_number);
    for (var i = 0; i < 4; i++)  {
        for (var j = 0; j < 4; j++)  {
            if (secret_number_array[i] == guess_number_array[j]) {
                if (i == j) {
                    match_a++;
                }else {
                    match_b++;
                }
            }
        }
    }
    if (match_a == 4) {
        alert("YOU WIN!!");
        return true;
    }

    var one_round = new Object();
    one_round.guessed_number = guess_number;
    one_round.a = match_a;
    one_round.b = match_b;
    one_round_array.push(one_round);

    document.getElementById("demo2").innerHTML = "Your clues: <br>" +printall(one_round_array);
 //   console.log("start generate next number");
    guessnextnumber();
   // console.log("end generate next number");
    document.getElementById("enterarrow").style.color = "#AF4C4C";
    document.getElementById("entercomputerguessnumber").style.color = "greenyellow";
    whose_turn = false;
}

function guessnextnumber() {
    do{
        if (valid_numbers.length > 0) {
            var temporary_index = Math.floor((Math.random() * valid_numbers.length));
            //console.log("the size of valid_numbers is" +valid_numbers.length);
           // console.log("the temporary_index is" +temporary_index);
            pc_guessnumber = valid_numbers[temporary_index];
            valid_numbers.splice(temporary_index, 1);
            //delete valid_numbers[temporary_index];
            //console.log("pc_guessnumber in guessnextnumber" +pc_guessnumber);
        }else {
            alert("I've ruled out all the nubmers but none of them match your secret number. You must've given me the wrong clue!");
            document.getElementById("arrow1").style.color = "greenyellow";
            document.getElementById("entercomputerguessnumber").style.color = "#AF4C4C";
            return true;
        }
    } while(compare_number_with_myclue(pc_guessnumber))

    document.getElementById("computersguess").innerHTML = "I guess your number is: "+pc_guessnumber;
}

function compare_number_with_myclue(pc_guessnumber) {
    for(var i=0;i<computer_one_round_array.length;i++) {
        var how_many_a = how_many_a_b(computer_one_round_array[i].guessed_number, pc_guessnumber, true); 
        var how_many_b = how_many_a_b(computer_one_round_array[i].guessed_number, pc_guessnumber, false); 
        if (!(how_many_a == computer_one_round_array[i].a && how_many_b == computer_one_round_array[i].b)) {
            return true;
        }
    }
    return false;
}

function how_many_a_b(guess_number, mysecret_number, is_a) {
    var secret_number_array = int_to_array(mysecret_number);
    var guess_number_array = int_to_array(guess_number);
    var match_a = 0;
    var match_b = 0;
    //console.log("secret number in how_many_a_b" +mysecret_number);
    //console.log("people guess number is" +guess_number);
    for (var i = 0; i < 4; i++)  {
        for (var j = 0; j < 4; j++)  {
            if (secret_number_array[i] == guess_number_array[j]) {
                if (i == j) {
                    match_a++;
                }else {
                    match_b++;
                }
            }
        }
    }
    if (is_a) {
        return match_a;
    } else {
        return match_b;
    }
}

function nextround(a, b){
    var one_round = new Object();
    //valid_number(Math.floor((Math.random() * valid_number.length))); 
    one_round.guessed_number = pc_guessnumber;
    one_round.a = a;
    one_round.b = b;
    var total_a_b = parseInt(a)+parseInt(b);

    if (whose_turn == true) {
        alert("it's your turn to guess the computers number. please enter a four digit number that you want to guess!");
        return true;
    }

    //console.log("this is A:" +a);
    //console.log("this is B:" +b);
    //console.log("this is total:" +total_a_b);
    if (total_a_b > 4) {
            alert("you have given be an impossible solution");
            return true;
    }

    computer_one_round_array.push(one_round);

    if (a == 4) {
        alert("COMPUTER WIN!!");
        document.getElementById("arrow1").style.color = "greenyellow";
        document.getElementById("entercomputerguessnumber").style.color = "#AF4C4C";
        return true;
    }

    document.getElementById("computersclue").innerHTML = "My clues: <br>" +printall(computer_one_round_array);

    document.getElementById("enterarrow").style.color = "greenyellow";
    document.getElementById("entercomputerguessnumber").style.color = "#AF4C4C";
    whose_turn = true;
}

//document.getElementById("demo2").innerHTML = myMethod(secret_number, document.getElementById("guess_number").innerHTML, true) + "A, " +myMethod(secret_number, document.getElementById("guess_number").innerHTML, false) + "B";

function int_to_array(a) {
    var my_number = new Array(4);
    my_number[0] = Math.floor(a/1000);
	my_number[1] = Math.floor(a%1000/100);
	my_number[2] = Math.floor(a%100/10);
    my_number[3] = Math.floor(a%10);
    return my_number;
}

function check_number(a) {
    var my_number = new Array(4);
    my_number[0] = Math.floor(a/1000);
	my_number[1] = Math.floor(a%1000/100);
	my_number[2] = Math.floor(a%100/10);
    my_number[3] = Math.floor(a%10);
    //console.log("my number array is:" +my_number);
    if (my_number[0] == 0) {
        return true;
    }
    for (var i=0; i < my_number.length; i++) {
        for (var j=i+1; j < my_number.length; j++) {
            //console.log("i is:" + i);
            //console.log("j is:" +j);
            if (my_number[i] == my_number[j]) {
                return true;
            } 
        }
    }
    return false;
}

function createsecretnumber() {
    var x;
    document.getElementById("demo2").innerHTML = "";
    one_round_array = [];
    computer_one_round_array = [];
    valid_numbers = [];
    document.getElementById("computersclue").innerHTML = "";
    document.getElementById("computersguess").innerHTML = "";
    document.getElementById('abc').value = '';
    whose_turn = true;

    //document.getElementById('arrow1').style.borderColor = "red";
    //document.getElementById("arrow1").innerHTML = "<===";
    //document.getElementById("arrow1").style.borderColor = "black";
    document.getElementById("arrow1").style.color = "#AF4C4C";
    document.getElementById("enterarrow").style.color = "greenyellow";
    document.getElementById("entercomputerguessnumber").style.color = "#AF4C4C";
    //document.getElementById("demo").innerHTML
    do {
        x = Math.floor((Math.random() * 10000)); 
    } while (check_number(x));

    //console.log("the secret number is:" +x);

    for (var i=1023; i<=9876; i++) {
        if (!check_number(i)) {
            valid_numbers.push(i);
        }
    }
    //console.log(valid_numbers);

    //document.getElementById("demo").innerHTML = x;
    computer_secret_number = x;
}

