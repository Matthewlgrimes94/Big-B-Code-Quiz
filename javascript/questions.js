// Questions
var questions = [
    {
        title: "What does DOM stand for?",
        choices: ["Document Oriented Model", "Dedicated Origami Maker","Document Object Model", "Document Organization Method"],
        answer: "Document Object Model"
    },
    {
        title: "In Jquery, how do you add a click event",
        choices: [".addEventListener()", ".click()", ".addClickEvent()",".listenFor('click')"],
        answer: ".click()"
    },
    {
        title: "In the array ['apples', 'oranges', 'grapes','melons'] What is at index[2]",
        choices: ["apples", "oranges", "grapes", "melons"],
        answer: "grapes"
    },
    {
        title: "What is Jquery?",
        choices: ["A Javascript library", "A Javascript command", "A DOM animator", "A confusing set of numbers"],
        answer: "A Javascript library"
    },
    {
        title: "When making a Function, what comes after the function name?",
        choices: ["Curly brackets", "Chaos, and disorder", "Backslash", "Parentheses"],
        answer: "Parentheses"
    },
    {
        title: "How do you initialize a variable?",
        choices: ["Var", "Siri, initilize my variable!", "For", "Function()"],
        answer: "Var"
    }
];
//Checks local storage for existing leaderboard
if (localStorage.getItem('leaderboard') != null) {
    leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
} else {
var leaderboard = [];
}

//Dom elements
var qHolderEl = $('#question-holder');
var startEl = $('#start');
var counterEl = $('#counterEl');
var navEl = $('#nav-btns');
var scoreEl = $('#scoreEl');
var viewScoresEl = $('#viewScores');
var scoreSpaceEl = $('#scoreSpace');
var counter = (questions.length) * 15
var score = 0;
var currentPage = 0;
var totalPages = questions.length;
var quizFinished = false;

//Start button
startEl.click(function() {
    timer();
    startQuiz();
});

//View Scores button
qHolderEl.on('click','.viewScores', function(){
    renderScores();
});

//Back button
navEl.on('click', '.back', function() {
    scoreSpaceEl.empty();
    navEl.empty();
    startEl.removeClass('hide');
    viewScoresEl.removeClass('hide');
});

//Restart button
navEl.on('click', '.restart', function () {
    currentPage = 0;
    counter = (questions.length) * 15;
    quizFinished = false;
    scoreSpaceEl.empty();
    navEl.empty();
    timer();
    startQuiz();
});

//When an answer is clicked, check if it is correct
qHolderEl.on('click','.answer', function() {
    // Create a p tag for correct/incorrect message
    var result = $('<p class="text-center message"></p>');
    // If answer chosen is correct
    if (($(event.target).attr('data-selection') === questions[currentPage].answer)) {
        result.addClass('text-success');
        result.text('Correct!');
        qHolderEl.append(result);
        //Disable button spamming
        $(':button').prop('disabled', true);
        //wait 2.2 seconds, next question
        setTimeout(function() {
        score +=10;
        currentPage ++
        renderQuestions();
        //Reenable buttons
        $(':button').prop('disabled', false);
        },1200);

    //If answer chosen is incorrect
    } if (($(event.target).attr('data-selection') !== questions[currentPage].answer)) {
        result.addClass('text-danger');
        result.text('Incorrect!');
        qHolderEl.append(result);
        //Disable button spamming
        $(':button').prop('disabled', true);
        counter -= 5;
        //Animation for subtracting time
        animateSubtraction(counterEl);
        //wait 2.2 seconds, next question
        setTimeout(function() {
        currentPage ++
        renderQuestions();
        //Reenable buttons
        $(':button').prop('disabled', false);
        },1200);
}
});

//When enter is pressed on name input
qHolderEl.on('keyup','input', function(e){
    if (e.which === 13) {
        e.preventDefault();
        var finalScore = +counter + +score +1;
        var inputVal = $(this).val();
        //store name and scores inside object
        var  userData = {'name':`${inputVal}`,'score':`${finalScore}`};
        leaderboard.push(userData);
        //Object to local storage
        localStorage.setItem('leaderboard',JSON.stringify(leaderboard));
        console.log(leaderboard);
        renderScores();
        $(this).val('');
        $(this).prop('disabled', true);

    }
    return;
});

//Timer
function timer() {
    counterEl.text(`Time: ${counter}`);
    var timer = setInterval(function() {
        counter --
        counterEl.text(`Time: ${counter}`);
        if (counter <= 0) {
            //If time runs out game over!
            clearInterval(timer);
                qHolderEl.empty();
                var gameOver = $('<div class="text-center results"></div>');
                gameOver.text('GAME OVER');
                qHolderEl.append(gameOver);
                return;
            //If quiz finishes, stop timer
        } if (quizFinished === true) {
            clearInterval(timer);
            return;
        }
    }, 1000);
}

//Start quiz
function startQuiz () {
    //Hide start and score buttons
    startEl.addClass('hide');
    viewScoresEl.addClass('hide');

    renderQuestions();
}

//Render  questions
function renderQuestions () {
    qHolderEl.empty();
    //If questions are done, dont try to render nonexistent questions
    scoreEl.text(`Score: ${score}`);
    if (currentPage >= totalPages) {
        endQuiz();
        return;
    }
    //Makes a title and all the questions, appends to DOM
    var createQuestion = $('<div class="title bg-warning pt-1 pb-1"></div>');
    createQuestion.text(questions[currentPage].title);
    qHolderEl.append(createQuestion);
    for (var i = 0; i < questions[currentPage].choices.length; i++) {
        var createAnswer = $('<button type="button" class="btn btn-block btn-primary answer"></button>');
        createAnswer.text(`${questions[currentPage].choices[i]}`);
        createAnswer.attr("data-selection", `${questions[currentPage].choices[i]}`);
        qHolderEl.append(createAnswer);
    }
}

//End quiz
function endQuiz() {
    quizFinished = true;
    var quizResults = $('<div class="text-center results"></div>');
    //Final Score Calculation
    var finalScore = +score + +counter;
    quizResults.text(`Your Score is ${finalScore}`);
    qHolderEl.append(quizResults);
    //Create input for name
    var inputLabel = $('<p class="inputLabel></p>');
    inputLabel.text('Enter Name')
    var createInput = $('<input type="text" class="inputbtn"><');
    qHolderEl.append(inputLabel);
    qHolderEl.append(createInput);
}

//Animation for subtracting time
function animateSubtraction (x) {
    x.addClass('text-danger');
    x.text(`Time: ${counter} -5`);
        setTimeout(function () {
            x.removeClass('text-danger');
            x.text(`Time: ${counter}`);
        },800);
}

//Render scoreboard
function renderScores() {
    //If start button isnt hidden, hide it
    if (startEl.hasClass('hide') !== true) {
        startEl.addClass('hide');
    //If scoreboard button isnt hidden, hide it
    } if (viewScoresEl.hasClass('hide') !== true) {
        viewScoresEl.addClass('hide');
    //Place restart button if quiz is finished
    } if ( quizFinished === true) {
        qHolderEl.empty();
        var restartBtn = $('<button type="button" class="btn btn-lg btn-primary restart" id="restart">');
        restartBtn.text('Restart');
        navEl.append(restartBtn);
    } else {
    //Place back button
        var backBtn = $('<button type="button" class="btn btn-lg btn-primary back" id="back">');
        backBtn.text('Back');
        navEl.append(backBtn);
    }
    //Sorts leaderboard by highest score
    leaderboard.sort(function(a, b){
        return b.score - a.score;
    });
    //For loop for creating leaderboards
    var scoreTitle = $('<div class="scoreEl text-center mb-2 message"></div>');
    scoreTitle.text('ScoreBoard')
    scoreSpaceEl.append(scoreTitle);
    //For loop for creating leaderboards
    for (var i = 0; i < leaderboard.length; i++) {
        var scoreEntry = $('<div class="scoreEl text-center"></div>');
        scoreEntry.text(`${leaderboard[i].name}: ${leaderboard[i].score}`);
        scoreSpaceEl.append(scoreEntry);
    }
}