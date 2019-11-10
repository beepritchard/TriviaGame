$(document).ready(function () {
    var selections = [
        {
            question: "What type of animal is a seahorse?", 
            choice: ["Crustacean", "Arachnid", "Fish", "Shell"],
            answer: 0,
            photo: "assets/images/seahorse.png"
         },
         {
            question: "Which of the following dogs is the smallest?", 
            choice: ["Dachshundtain", "Poodle", "Pomeranian", "Chihuahua"],
            answer: 3,
            photo: "assets/images/chiwawa.jpg"
         }, 
         {
            question: "What color are zebras?", 
            choice: ["White with black stripes", "Black with white stripes", "Both of the above", "None of the above" ],
            answer: 1,
            photo: "assets/images/zebra.jpg"
        }, 
        {
            question: "What is the biggest animal that has ever lived?", 
            choice: ["Blue whale", "African elephant", "Apatosaurus", "Spinosauruso" ],
            answer: 0,
            photo: "assets/images/bluewhale.jpg"
        }, 
        {
            question: "What pets do more families own?", 
            choice: ["Birds", "Cats", "Dogs", "Horses" ],
            answer: 2,
            photo: "assets/images/noodle.jpg"
        }, 
        {
            question: "How much weight can an elephant lift with its trunk?", 
            choice: ["55", "66", "77", "88" ],
            answer: 2,
            photo: "assets/images/elephant1.gif"
    
        }];
    
    var correct = 0;
    var wrong = 0;
    var noanswer = 0;
    var timer = 15;
    var intervalId;
    var userPick ="";
    var running = false;
    var TCount = selections.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    $("#reset").hide();
  
    $("#start").on("click", function () {
            $("#start").hide();
            Question();
            runTimer();
            for(var i = 0; i < selections.length; i++) {
        holder.push(selections[i]);
    }
        })
    
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
        
        if (timer === 0) {
            noanswer++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
   
    function Question() {
       
        index = Math.floor(Math.random()*selections.length);
        pick = selections[index];
    
            $("#questiongroup").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userList = $("<div>");
                userList.addClass("answerchoice");
                userList.html(pick.choice[i]);
               
                userList.attr("data-guessvalue", i);
                $("#answergroup").append(userList);
  
    }
    
    $(".answerchoice").on("click", function () {
       
        userPick = parseInt($(this).attr("data-guessvalue"));
    
        if (userPick === pick.answer) {
            stop();
            correct++;
            userPick="";
            $("#answergroup").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrong++;
            userPick="";
            $("#answergroup").html("<p>Incorrect! The answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    function hidepicture () {
        $("#answergroup").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        selections.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answergroup").empty();
            timer= 15;
    
        if ((wrong + correct + noanswer) === TCount) {
            $("#questiongroup").empty();
            $("#questiongroup").html("<h3>Let check the result: </h3>");
            $("#answergroup").append("<h4> Correct: " + correct + "</h4>" );
            $("#answergroup").append("<h4> Incorrect: " + wrong + "</h4>" );
            $("#answergroup").append("<h4> Nonanswered: " + noanswer + "</h4>" );
            $("#reset").show();
            correct = 0;
            wrong = 0;
            noanswer = 0;
    
        } else {
            runTimer();
            Question();
    
        }
        }, 2000);
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answergroup").empty();
        $("#questiongroup").empty();
        for(var i = 0; i < holder.length; i++) {
            selections.push(holder[i]);
        }
        runTimer();
        Question();
    
    })
    
    })
