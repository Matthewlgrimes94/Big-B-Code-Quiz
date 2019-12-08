//Dom elements
var qHolder = $('#question-holder');
var start = $('#start');
var counterEl = $('#counterEl');
var counter = 60;


start.click(function() {
    startTimer();
});

function startTimer () {
    setInterval(function(){
        $('#start').detach();
        if (counter > 0) {
         counter--;
         counterEl.text(`Time: ${counter}`);
         console.log(counter);
        } if (counter === 0) {
            clearInterval(counter);
        }
    },1000); 
}


