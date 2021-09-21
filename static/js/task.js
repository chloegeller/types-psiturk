/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */
// import _ from "lodash"
// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

// All pages to be loaded
var pages = [
    "instructions/instruct-1.html",
    "instructions/instruct-2.html",
    "instructions/instruct-3.html",
    "instructions/instruct-ready.html",
    // "experiments/exp-1.html",
    "stage.html",
    "postquestionnaire.html"
];

// In javascript, defining a function as `async` makes it return  a `Promise`
// that will "resolve" when the function completes. Below, `init` is assigned to be the
// *returned value* of immediately executing an anonymous async function.
// This is done by wrapping the async function in parentheses, and following the
// parentheses-wrapped function with `()`.
// Therefore, the code within the arrow function (the code within the curly brackets) immediately
// begins to execute when `init is defined. In the example, the `init` function only
// calls `psiTurk.preloadPages()` -- which, as of psiTurk 3, itself returns a Promise.
//
// The anonymous function is defined using javascript "arrow function" syntax.
const init = (async () => {
    await psiTurk.preloadPages(pages);
})()

var instructionPages = [ // add as a list as many pages as you like
    "instructions/instruct-1.html",
    "instructions/instruct-2.html",
    "instructions/instruct-3.html",
    "instructions/instruct-ready.html"
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

// 1. instructions
// 2. initwebgazer
// 3. var timeline = [] globally
// 4. return trial from each function
// 5. push trials to timeline

var timeline = [];
var  WebGazerInit = function () {
    var init_camera = {
        type: 'webgazer-init-camera'
      }
    
      var calibration_instructions = {
        type: 'html-button-response',
        stimulus: `
          <p>Great! Now the eye tracker will be calibrated to translate the image of your eyes from the webcam to a location on your screen.</p>
          <p>To do this, you need to click a series of dots.</p>
          <p>Keep your head still, and click on each dot as it appears. Look at the dot as you click it.</p>
        `,
        choices: ['Click to begin'],
        post_trial_gap: 1000
      }
    
      var calibration = {
        type: 'webgazer-calibrate',
        calibration_points: [[50,50], [25,25], [25,75], [75,25], [75,75]],
        //calibration_points: [[10,10],[10,30],[10,50],[10,70],[10,90],[30,10],[30,30],[30,50],[30,70],[30,90],[50,10],[50,30],[50,50],[50,70],[50,90],[70,10],[70,30],[70,50],[70,70],[70,90],[90,10],[90,30],[90,50],[90,70],[90,90]],
        // calibration_points: [
        //   [10,10],[10,50],[10,90],
        //   [30,10],[30,50],[30,90],
        //   [40,10],[40,30],[40,40],[40,45],[40,50],[40,55],[40,60],[40,70],[40,90],
        //   [50,10],[50,30],[50,40],[50,45],[50,50],[50,55],[50,60],[50,70],[50,90],
        //   [60,10],[60,30],[60,40],[60,45],[60,50],[60,55],[60,60],[60,70],[60,90],
        //   [70,10],[70,50],[70,90],
        //   [90,10],[90,50],[90,90]],
        repetitions_per_point: 3,
        randomize_calibration_order: true,
      }
    
      var validation_instructions = {
        type: 'html-button-response',
        stimulus: `
          <p>Let's see how accurate the eye tracking is. </p>
          <p>Keep your head still, and move your eyes to focus on each dot as it appears.</p>
          <p>You do not need to click on the dots. Just move your eyes to look at the dots.</p>
        `,
        choices: ['Click to begin'],
        post_trial_gap: 1000
      }
    
      var validation = {
        type: 'webgazer-validate',
        validation_points: [[25,25], [25,75], [75,25], [75,75]],
        show_validation_data: true
      }

      var start_trial = {
        type: 'html-button-response',
        stimulus: `
          <p> Start trial? </p>
        `,
        choices: ['Click to begin'],
        post_trial_gap: 1000
      }

      timeline.push(init_camera);
      timeline.push(calibration_instructions);
      timeline.push(calibration);
      timeline.push(validation_instructions);
      timeline.push(validation);
      timeline.push(start_trial);
};

var TypesExperiment = function() {
    var n = 12;
    var m = 15;

    var empty_grid = generate_empty_grid(n, m);

    var panel = factory_panel(empty_grid, 1, 0);


    var grid = fill_grid(panel, nums.one, 3, 3);
    grid = fill_grid(grid, nums.two, 3, 4);
    grid = fill_grid(grid, atoms.add1, 4, 3);
    grid = fill_grid(grid, atoms.add2, 4, 4);
    grid = fill_grid(grid, belt.empty, 5, 3);
    grid = fill_grid(grid, nums_belt.three, 5, 4);
    grid = fill_grid(grid, atoms.copy, 5, 5);
    grid = fill_grid(grid, shapes.square, 4, 5);
    grid = fill_grid(grid, belt.guess, 5, 6);
    grid = fill_grid(grid, colors.blue, 4, 7);
    grid = fill_grid(grid, atoms.paint, 5, 7);
    grid = fill_grid(grid, shapes_blue_belt.square, 5, 8);
    grid = fill_grid(grid, belt.guess, 5, 9);
    grid = fill_grid(grid, belt.guess, 5, 10);

    var trial = {
        type: 'custom-grid',
        stimuli: grid,
        choices: ['y', 'n'],
        prompt: 'Does this work? (y or n)',
        trial_duration: 2000000,
        // extensions: [
        //     {
        //       type: 'webgazer', 
        //       params: { 
        //         targets: ['#custom-grid']
        //       }
        //     }
        //   ]
    };

    timeline.push(trial);
};

/********************
* STROOP TEST       *
********************/
var StroopExperiment = function() {

    var wordon, // time word is presented
        listening = false;

    // Stimuli for a basic Stroop experiment
    var stims = [
            ["SHIP", "red", "unrelated"],
            ["MONKEY", "green", "unrelated"],
            ["ZAMBONI", "blue", "unrelated"],
            ["RED", "red", "congruent"],
            ["GREEN", "green", "congruent"],
            ["BLUE", "blue", "congruent"],
            ["GREEN", "red", "incongruent"],
            ["BLUE", "green", "incongruent"],
            ["RED", "blue", "incongruent"]
        ];

    stims = _.shuffle(stims);

    var next = function() {
        if (stims.length===0) {
            finish();
        }
        else {
            stim = stims.shift();
            show_word( stim[0], stim[1] );
            wordon = new Date().getTime();
            listening = true;
            d3.select("#query").html('<p id="prompt">Type "R" for Red, "B" for blue, "G" for green.</p>');
        }
    };
    
    var response_handler = function(e) {
        if (!listening) return;

        var keyCode = e.keyCode,
            response;

        switch (keyCode) {
            case 82:
                // "R"
                response="red";
                break;
            case 71:
                // "G"
                response="green";
                break;
            case 66:
                // "B"
                response="blue";
                break;
            default:
                response = "";
                break;
        }
        if (response.length>0) {
            listening = false;
            var hit = response == stim[1];
            var rt = new Date().getTime() - wordon;

            psiTurk.recordTrialData({'phase':"TEST",
                                     'word':stim[0],
                                     'color':stim[1],
                                     'relation':stim[2],
                                     'response':response,
                                     'hit':hit,
                                     'rt':rt}
                                   );
            remove_word();
            next();
        }
    };

    var finish = function() {
        $("body").unbind("keydown", response_handler); // Unbind keys
        currentview = new Questionnaire();
    };
    
    var show_word = function(text, color) {
        d3.select("#stim")
            .append("div")
            .attr("id","word")
            .style("color",color)
            .style("text-align","center")
            .style("font-size","150px")
            .style("font-weight","400")
            .style("margin","20px")
            .text(text);
    };

    var remove_word = function() {
        d3.select("#word").remove();
    };

    
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');

    // Register the response handler that is defined above to handle any
    // key down events.
    $("body").focus().keydown(response_handler); 

    // Start the test
    next();
};


/****************
* Questionnaire *
****************/

// var Questionnaire = function() {

//     var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

//     record_responses = function() {

//         psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

//         $('textarea').each( function(i, val) {
//             psiTurk.recordUnstructuredData(this.id, this.value);
//         });
//         $('select').each( function(i, val) {
//             psiTurk.recordUnstructuredData(this.id, this.value);		
//         });

//     };

//     prompt_resubmit = function() {
//         document.body.innerHTML = error_message;
//         $("#resubmit").click(resubmit);
//     };

//     resubmit = function() {
//         document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
//         reprompt = setTimeout(prompt_resubmit, 10000);
        
//         psiTurk.saveData({
//             success: function() {
//                 clearInterval(reprompt); 
//                 psiTurk.computeBonus('compute_bonus', function(){
//                     psiTurk.completeHIT(); // when finished saving compute bonus, the quit
//                 }); 


//             }, 
//             error: prompt_resubmit
//         });
//     };

//     // Load the questionnaire snippet 
//     psiTurk.showPage('postquestionnaire.html');
//     psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
    
//     $("#next").click(function () {
//         record_responses();
//         psiTurk.saveData({
//             success: function(){
//                 psiTurk.computeBonus('compute_bonus', function() { 
//                     psiTurk.completeHIT(); // when finished saving compute bonus, the quit
//                 }); 
//             }, 
//             error: prompt_resubmit});
//     });
    
    
// };

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
 // In this example `task.js file, an anonymous async function is bound to `window.on('load')`.
 // The async function `await`s `init` before continuing with calling `psiturk.doInstructions()`.
 // This means that in `init`, you can `await` other Promise-returning code to resolve,
 // if you want it to resolve before your experiment calls `psiturk.doInstructions()`.

 // The reason that `await psiTurk.preloadPages()` is not put directly into the
 // function bound to `window.on('load')` is that this would mean that the pages
 // would not begin to preload until the window had finished loading -- an unnecessary delay.
$(window).on('load', async () => {
    await init;
    psiTurk.doInstructions(
        instructionPages, // a list of pages you want to display in sequence
        function() {

            // currentview = new TypesExperiment();
            // jsPsych.extensions.webgazer.startMouseCalibration();
            // WebGazerInit();
            TypesExperiment();

            jsPsych.init({
                timeline: timeline,
                // extensions: [
                //     {type: 'webgazer'}
                // ],
                on_finish: function() {
                    jsPsych.data.displayData();
                }
            })
        } // what you want to do when you are done with instructions
    );
});
