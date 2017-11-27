//--- JavaScript for a trivia game---//

$(document).ready(function() {
    $('#play').on('click', game.restart);
});


game = {
    clockRunning: false,
    round: 0,
    score: 0,

    questions: [
        {
            question: 'At which one of these games has AI not yet learned to best a human player?',
            options: ['Go', 'Chess', 'StarCraft', 'Jeopardy', 'Atari games', 'Poker'],
            answer: 2,
            image: 'q0.jpg',
            link: 'https://www.technologyreview.com/s/609242/humans-are-still-better-than-ai-at-starcraftfor-now/',
        },
        {
            question: 'Google\'s PageRank algorithm determines the relevance of a website by measuring how interconnected it is to other sites on the web.<br><br>Which is the most recent application of the PageRank algorithm?',
            options: ['predicting ecosystem collapse', 'ranking best athletes', 'debugging', 'de-ranking fake news', 'predicting traffic flow'],
            answer: 3,
            image: 'q1.jpg',
            link: 'https://www.bloomberg.com/news/articles/2017-04-25/google-rewrites-its-powerful-search-rankings-to-bury-fake-news',
        },
        {
            question: 'If "reddit.com" is using Hypertext Transfer Protocol Secure (HTTPS) on all of its pages, which of the following can your ISP, third-parties, or network sniffers access?',
            options: ['that I visited reddit', 'my posts', 'my password', 'that I visited r/dogs'],
            answer: 0,
            image: 'q2.jpg',
            link: 'https://medium.com/mozilla-internet-citizen/how-does-https-protect-you-and-how-doesnt-it-6c785884a130',
        },
        {
            question: 'Cookies are text files stored on your hard drive to store login info, to save shopping carts, or to create targeted ads. They cannot execute viruses, and only the site that created the cookie can access it.<br><br>What company invented cookies, Javascript, and SSL encryption?',
            options: ['Google', 'Mozilla', 'Facebook', 'Netscape', 'Microsoft'],
            answer: 3,
            image: 'q3.jpg',
            link: 'http://blog.kameleoon.com/en/types-web-cookies/',
        },
        {
            question: 'Which of these cannot be recognized using Google\'s Cloud Vision API, which uses algorithms to determine the content of an uploaded image?',
            options: ['faces and emotions',  'species of plants', 'text and language', 'nudity and violence', 'geographic landmarks'],
            answer: 1,
            image: 'q4.jpg',
            link: 'https://techcrunch.com/2016/02/18/google-opens-its-cloud-vision-api-to-all-developers/',
        },
        {
            question: 'Which of these quantites is the largest according to current estimates?',
            options: ['diameter of our galaxy in meters', 'amount of data on the internet in bytes', 'litres of water in Earth\'s oceans'],
            answer: 1,
            image: 'q5.jpg',
            link: 'https://www.lifewire.com/how-big-is-the-web-4065573',
        },
        {
            question: 'The world\'s largest data center currently in operation is located in which country?',
            options: ['Russia', 'United States', 'India', 'China'],
            answer: 3,
            image: 'q6.jpg',
            link: 'https://www.racksolutions.com/news/data-center-news/top-10-largest-data-centers-world/',
        },
        {
            question: 'Which company\'s database houses the largest volume of data in one unique database?',
            options: ['AT&T', 'US Governement', 'Google', 'Facebook'],
            answer: 0,
            image: 'q7.jpg',
            link: 'https://www.waterfordtechnologies.com/big-data-interesting-facts/',
        },
        {
            question: 'Apache maintains an open source processor for very large data sets called Hadoop.<br><br>From what did Hadoop get its name and elephant logo?',
            options: ['a circus animal', 'a tribal story', 'a toy', 'a book'],
            answer: 2,
            image: 'q8.jpg',
            link: 'https://www.sas.com/en_us/insights/big-data/hadoop.html',
        },
        {
            question: 'What percentage of S&P 500 companies\' market value comes from intangible assets, including data and software?',
            options: ['22%', '57%', '84%', '91%'],
            answer: 2,
            image: 'q9.jpg',
            link: 'http://files.technologyreview.com/whitepapers/MIT_Oracle+Report-The_Rise_of_Data_Capital.pdf?_ga=2.18019193.1751378999.1511739668-1844887473.1511623668',
        },
        {
            question: 'The Turing test was devised to test whether humans can distinguish between an AI program and another human. Turing bet that the test would be passed by the year 2000.<br><br>In what year was the Turing test passed?',
            options: ['1998', '2000', '2014', '2017', 'not yet passed'],
            answer: 2,
            image: 'q10.jpg',
            link: 'http://time.com/2847900/eugene-goostman-turing-test/',
        },
    ],

    restart: function() {
        game.round = 0;
        game.score = 0;
        $('#play').hide();
        game.newRound();
    },

    newRound: function () {
        if (game.questions.length > game.round) {
            game.round++;
            $('#score').html(game.score + ' / ' + game.round);
            $('#questionTitle').html('Question #' + game.round);
            $('#question').html(game.questions[game.round-1].question);
            $('#link').html('<img src="assets/images/' + game.questions[game.round-1].image + '">');
            $('#link').attr('href', game.questions[game.round-1].link);
            $('#answerTitle').html('Answer Choices:');
            $('#answer').empty();
            $.each(game.questions[game.round-1].options, function(i, val) {
                $('#answer').append(
                    '<li><button class="btn" id="btn-' + i
                    + '" onclick="game.guess(' + i + '); return false;">'
                    + val + '</button></li>'
                );
            })
            game.timer.restart();
        }
        else {
            game.end();
        }

    },

    guess: function(i) {
        game.timer.stop();
        $(".btn").prop("disabled",true);
        if (i === game.questions[game.round - 1].answer) {
            game.score++;
            $('#score').html(game.score + ' / ' + game.round);

            $('#answerTitle').html('Correct!');

            $('#btn-' + i).animate({
                backgroundColor: "#80ff80"
            }, 1000);

            setTimeout(game.newRound, 5000);
        }

        else {
            $('#answerTitle').html('Incorrect!');

            $('#btn-' + i).animate({
                backgroundColor: "#ff80bf"
            }, 1000).animate({
                backgroundColor: 'auto'
            }, 1000);

            setTimeout( function () {
                $('#btn-' + game.questions[game.round - 1].answer).animate({
                    backgroundColor: "#80ff80"
                }, 1000);
            }, 2000);

            setTimeout(game.newRound, 7000);
        }
    },

    timeout: function() {
        $('#question').html('Time expired!');
        $('#btn-' + game.questions[game.round - 1].answer).animate({
            backgroundColor: "#80ff80"
        }, 1000);

        setTimeout(game.newRound, 7000);
    },

    end: function () {
        $('#time').html('00:00');
        $('#answer').empty();
        $('#questionTitle').html('Game Over');
        $('#link').empty();
        $('#question').empty();
        $('#answerTitle').empty();
        $('#play').html('Play Again?');
        $('#play').show();
    },

    timer: {
        //time allowed to answer each question
        maxTime: 30,
        time: 0,

        restart: function() {
            //reset timer to max allowed time
            game.timer.time = game.timer.maxTime;
            var converted = game.timer.timeConverter(game.timer.time);
            $('#time').text(converted);
            if (!game.clockRunning) {
                game.clockRunning = true;
                intervalId = setInterval(game.timer.count, 1000);
            }
        },

        count: function() {
            if (game.timer.time === 0) {
                game.timer.stop();
                game.timeout();
            }

            else {
                // DONE: increment time by 1, remember we cant use "this" here.
                game.timer.time--;
                // DONE: Get the current time, pass that into the timer.timeConverter function,
                //       and save the result in a variable.
                var converted = game.timer.timeConverter(game.timer.time);
                // DONE: Use the variable we just created to show the converted time in the "time" element.
                $('#time').text(converted);
            }
        },

        timeConverter: function(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
              seconds = '0' + seconds;
            }

            if (minutes === 0) {
              minutes = '00';
            }
            else if (minutes < 10) {
              minutes = '0' + minutes;
            }

            return minutes + ':' + seconds;
        },

        stop: function() {
            // DONE: Use clearInterval to stop the count here and set the clock to not be running.
            clearInterval(intervalId);
            game.clockRunning = false;
        },
    },
}