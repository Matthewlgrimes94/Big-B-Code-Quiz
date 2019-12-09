//Dom elements
var qHolder = $('#question-holder');
var start = $('#start');
var counterEl = $('#counterEl');
var buttonSpace = $('#button-space');
var counter = 60;


start.click(function() {
    startTimer();
    startQuiz();
});

function startTimer () {
    setInterval(function(){
        if (counter > 0) {
         counter--;
         counterEl.text(`Time: ${counter}`);
         console.log(counter);
        } if (counter === 0) {
            clearInterval(counter);
        }
    },1000); 
}

function startQuiz () {
    start.detach();
    addNextButton();
    var nextBtn = $('#next');
    nextBtn.click(nextQuestion);
}

function addNextButton () {
    var newBtn = 
    $('<button type="button" class="btn btn-lg btn-primary" id="next"><span>Next</span></button>');
    newBtn.appendTo($('#btn-space'));
}

function buildQuestions () {
    
}
// needs to check if anything was clicked, and if the answer was correct
function nextQuestion () {

}