//Dom elements
var qHolderEl = $('#question-holder');
var startEl = $('#start');
var counterEl = $('#counterEl');
var navEl = $('#nav-btns');
var scoreEl = $('#scoreEl');
var counter = 60;
var score = 0;

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
    }
]
var currentPage = 0;
var totalPages = questions.length;

startEl.click(function() {
    startQuiz();
})

qHolderEl.on('click','button', function() {
    var result = $('<p>');
    if (($(event.target).attr('data-selection') === questions[currentPage].answer)) {
        result.addClass('text-success');
        result.text('Correct!');
        qHolderEl.append(result);
        setTimeout(function() {
        score++
        currentPage ++
        renderQuestions();
        },2000);
    } if (($(event.target).attr('data-selection') !== questions[currentPage].answer)) {
        result.addClass('text-danger');
        result.text('Incorrect!');
        qHolderEl.append(result);
        setTimeout(function() {
        currentPage ++
        renderQuestions();
        },2000);
}
});

function startQuiz () {
    startEl.addClass('hide');
    renderQuestions();

}

function renderQuestions () {
    qHolderEl.empty();
    scoreEl.text(`Score: ${score}`);
    if (currentPage >= totalPages) {
        endQuiz();
        return;
    }
    var createQuestion = $('<div class="title bg-warning pt-1 pb-1"></div>');
    createQuestion.text(questions[currentPage].title);
    qHolderEl.append(createQuestion);
    for (var i = 0; i < questions[currentPage].choices.length; i++) {
        var createAnswer = $('<button type="button" class="btn btn-block btn-primary"></button>');
        createAnswer.text(`${questions[currentPage].choices[i]}`);
        createAnswer.attr("data-selection", `${questions[currentPage].choices[i]}`);
        qHolderEl.append(createAnswer);
    }
}

function endQuiz() {
    var quizResults = $('<div class="text-center results"></div>');
    quizResults.text(`Your Score is ${score}/${totalPages}`);
    qHolderEl.append(quizResults);
}
