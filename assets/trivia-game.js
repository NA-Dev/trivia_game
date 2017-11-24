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
            question: 'What is this?',
            options: ['Gold','Paperweight','Trash'],
            answer: 0,
            image: 0,
        },
        {
            question: 'What are we doing?',
            options: ['Trying','Succeeding','Failing'],
            answer: 1,
            image: 0,
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
        $('answer').html('Time expired!');
        setTimeout(game.newRound, 5000)
    },

    end: function () {
        $('#time').html('00:00');
        $('#answer').empty();
        $('#questionTitle').html('Game Over');
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
            if (!clockRunning) {
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





































// function charGen() {
//     //populate each index of 'chars' with info about the character
//     $.each(names, function(i) {
//         chars[i] = {
//             index: i,
//             id: 'char' + i,
//             name: names[i],
//             image: images[i],
//             maxHealth: maxHealths[i],
//             health: maxHealths[i],
//             initAttackPower: initAttackPowers[i],
//             attackPower: initAttackPowers[i],
//             counterPower: counterPowers[i],
//         };


//         //create a div to hold character image and name
//         $('#arena').append(
//             '<div id="char' + i + '" class="img" onClick="clicked(this.id);">'
//                 + '<img src="assets/images/chars/' + chars[i].image + '">'
//                 + '<div>' + chars[i].name + '</div><div>' + chars[i].health
//                 + ' hp</div><div>' + chars[i].attackPower
//                 + ' attack</div></div>'
//         );
//     });
// }

// //lets JS know whether a clicked character is ally or foe
// function clicked(iD) {
//     if (allyReady == true) {
//         allyIndex = iD.substr(-1);
//         chooseAlly();
//     }

//     else if (foeReady == true) {
//         foeIndex = iD.substr(-1);
//         chooseFoe();
//     }
// }

// function chooseAlly() {
//     allyReady = false;

//     //create div for ally character image
//     $('#ally').html(
//     '<div class="img">'
//         + '<img src="assets/images/chars/' + chars[allyIndex].image + '">'
//         + '<div>' + chars[allyIndex].name + '</div>'
//         + '</div>'
//     );

//     //populate title with character's max health
//     $('#allyTitle').text(
//     'Ally  -  ' + chars[allyIndex].maxHealth + ' HP max'
//     );

//     //remove character from arena
//     $('#char' + allyIndex).remove();

//     //unhide panel containing ally info and image
//     $('#allyBox').css('display', 'block');

//     chooseFoeReady();
// }


// function chooseFoeReady() {
//     //start a new round
//     round++;

//     //choose foe on click of character image
//     $('#message').html('Round ' + round + ': Who will your Ally fight?');
//     foeReady = true;
// }


// function chooseFoe() {
//     foeReady = false;

//     //create div for foe character image
//     $('#foe').html(
//     '<div class="img">'
//         + '<img src="assets/images/chars/' + chars[foeIndex].image + '">'
//         + '<div>' + chars[foeIndex].name + '</div>'
//         + '</div>'
//     );

//     //populate title with character's max health
//     $('#foeTitle').text(
//     'Foe  -  ' + chars[foeIndex].maxHealth + ' HP max'
//     );

//     //remove character from arena
//     $('#char' + foeIndex).remove();

//     //unhide panel containing ally info and image
//     $('#foeBox').css('display', 'block');

//     refreshHP();
//     startGame();
// }

// function refreshHP() {
//     //get ally remaining health in percent and update hp bar
//     var percent = (chars[allyIndex].health / chars[allyIndex].maxHealth)*100
//         + '%';
//     $('#allyHP').css('width', percent);


//     //get foe remaining health in percent and update hp bar
//     percent = (chars[foeIndex].health / chars[foeIndex].maxHealth)*100 + '%';
//     $('#foeHP').css('width', percent);
// }

// function startGame() {
//     //enable attack button
//     $('#attack button').prop("disabled", false);

//     //alert user to attack or quit
//     $('#message').text(chars[allyIndex].name  + ' can attack '
//         + chars[foeIndex].name
//         + ' or run away.');
// }

// function attack() {
//     //disable attack button
//     $('#attack button').prop("disabled", true);

//     //temp variable to hold original attack power / damage done
//     var damage = chars[allyIndex].attackPower;

//     //takes health from foe
//     chars[foeIndex].health = chars[foeIndex].health
//         - damage;
//     //increases ally attack power
//     chars[allyIndex].attackPower = damage
//         + chars[allyIndex].initAttackPower;

//     //alert user of damage done
//     $('#message').text(chars[allyIndex].name  + ' attacked for '
//         + damage + ' damage.');

//     refreshHP();

//     //counter attack
//     counter();
// }

// function counter() {
//     //temp variable to hold original attack power / damage done
//     var damage = chars[foeIndex].attackPower;

//     //takes health from foe
//     chars[allyIndex].health = chars[allyIndex].health
//         - damage;

//     //no increase in foe attack power

//     //alert user of damage done
//     $('#message').append('<br>' + chars[foeIndex].name  + ' countered for '
//         + damage + ' damage.');

//     refreshHP();

//     //check for a winner
//     checkWin();
// }

// function checkWin() {
//     //if ally and foe health are both depleted...
//     if (chars[allyIndex].health < 1 && chars[foeIndex].health < 1) {

//         //display negative healths as zero
//         chars[foeIndex].health = chars[allyIndex].health = 0;

//         //the game is a draw
//         draw();
//     }

//     //if ally health depleted...
//     else if (chars[allyIndex].health < 1) {

//         //display negative health as zero
//         chars[foeIndex].health = 0;

//         //ally is defeated
//         defeat();
//     }

//     //if foe health is depleted...
//     else if (chars[foeIndex].health < 1) {
//         //display negative health as zero
//         chars[foeIndex].health = 0;

//         refreshHP();

//         //check if a new one can be found
//         newFoe();
//     }

//     //otherwise, enable attack button for next attack
//     else {
//     $('#attack button').prop("disabled", false);
//     }
// }

// function newFoe () {
//     //replace defeated foe image with sewer cap
//     $('#foe').html(
//         '<div class="img"><img src="assets/images/sewer.png"></div>'
//     );

//     //show 'Defeated' in foe title
//     $('#foeTitle').text('Foe - Defeated');

//     //if all characters are not defeated...
//     if (round < chars.length - 1) {
//         //choose another foe
//         chooseFoeReady();
//     }

//     //otherwise, user wins
//     else {
//         victory();
//     };
// }

// function draw() {
//     //update text
//     $('#restart button').text('Try Again');
//     $('#message').html(
//         'Your powers were evenly matched. Train harder next time.'
//     );
//     $('#allyTitle').text('Ally - Draw');
//     $('#foeTitle').text('Foe - Draw');
// }

// function defeat () {
//     //replace defeated ally image with sewer cap, and update text
//     $('#ally').html(
//             '<div class="img"><img src="assets/images/sewer.png"></div>'
//         );
//     $('#restart button').text('Try Again');
//     $('#message').html('Your Ally was defeated. Train harder next time.');
//     $('#allyTitle').text('Ally - Defeated');
//     $('#foeTitle').text('Foe - Victorious');
// }



// function victory() {
//     //update text
//     $('#restart button').text('Play Again');
//     $('#message').html('KOWABUNGA! Your Ally fought well and won.');
//     $('#allyTitle').text('Ally - Winner');
//     $('#foeTitle').text('Foe - Victorious');
// }


