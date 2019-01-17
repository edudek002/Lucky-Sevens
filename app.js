//============= define global variables =========================
var startingBet;   //number picked by the user
var myMoney;       //money at a given time 
var maxMoney;      //maximum amount of money held by the player
var roll1;         //number on dice1 
var roll2;         //number on dice2 
var rollSum;       // sum of dice1 and dice2
var count;         //number of times the dice was rolled
var countAtMax;    //number of times the dice was rolled at the point when the user held the most money
var truCount;      //number of times the dice was rolled for the Results table use

//====================function that rolls the dice ========================
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

//===================function that plays the game ========================

function playLuckySeven() {
    //reset all values to 0 before playing the game each time
    myMoney=0;       
    maxMoney=0;      
    roll1=0;         
    roll2=0;         
    rollSum=0;       
    count=0;         
    countAtMax=0;    
    //The program asks the user how many dollars they want to bet
    do {
        startingBet = prompt("How many dollars do you want to bet?");
        if (startingBet <= 0||isNaN(startingBet)) {
            alert("Error. Please enter the number greater than 0.");
        }
        else{
            alert("Your starting bet is "+ startingBet + " dollars. Click PLAY button to play the game.");
            $("#myBet").text("$"+startingBet); 
        }
    } while (startingBet <= 0||isNaN(startingBet));

    myMoney=parseInt(startingBet);
    maxMoney=myMoney;
    console.log("STARTING BET = " + maxMoney + " is my initial MAX money");

    //When the user clicks the Play button, the program then rolls 2 dice repeatedly until all money is gone
    $("#play").click(function(){
        for(count=1; myMoney>0; count++){
            roll1 = rollDice();
            roll2 = rollDice();
            rollSum = roll1 + roll2;
            console.log("Sum = " + rollSum);
            if (rollSum==7){
                myMoney = myMoney + 4;
                console.log("Account = " + myMoney + " dollars");
            }
            else {
                myMoney--;
                console.log("Account = " + myMoney + " dollars");
            }
            console.log("Computer played " + count + " times")
            if (maxMoney<=myMoney){
            maxMoney=myMoney;
            countAtMax=count;
            console.log("Your MAX amount is " + maxMoney + " dollars after roll# " + countAtMax);
            }
            truCount=count;
        }
        console.log("==========================================================================================")
        console.log("    GAME ENDS  with MAX amount of " + maxMoney + " dollars at " + countAtMax + " rolls.")
        console.log("==========================================================================================")
        populateTable();
    });
    //alow user time to read the Results table before giving an option to play the game again
    setTimeout(startAgain, 5000);                
}

//============= function that displays second page when the user choses to quit the game ===========

function show(shown, hidden) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
}

//============= function that gives an option to play again or quit the game =====================

function startAgain(){
    var myQuestion=prompt("Do you want to play the Lucky Seven game again?");
    myQuestion=myQuestion.toLowerCase();
    if (myQuestion=="yes") {
        playLuckySeven();
    }
    else if(myQuestion=="no"){
        show('Page1a','Page1');
    }
    else{
        alert("Please answer: yes or no");
        startAgain();
    }    
}

//========================= function that populates Results table =====================

function populateTable(){
    //Empty table before populating with new results
    $("#results-table").empty();
    //Populate the table
    var myTitle = $("<caption>Results</caption>")
    $("#results-table").append(myTitle);
    var row1 = $("<tr class='results-row'>")
            .append ($("<td>" + "Starting Bet" + "</td>"))
            .append ($("<td>" + "$" + startingBet + "</td>"))
    var row2 = $("<tr class='results-row'>")
            .append ($("<td>" + "Total Rolls Before Going Broke" + "</td>"))
            .append ($("<td>" + truCount + "</td>"))
    var row3 = $("<tr class='results-row'>")
            .append ($("<td>" + "Highest Amount Won" + "</td>"))
            .append ($("<td>" + "$" + maxMoney + "</td>"))
    var row4 = $("<tr class='results-row'>")
            .append ($("<td>" + "Roll Count at Highest Amount Won" + "</td>"))
            .append ($("<td>" + countAtMax + "</td>"))
    $("#results-table").append(row1);
    $("#results-table").append(row2);
    $("#results-table").append(row3);
    $("#results-table").append(row4);
} 

playLuckySeven();