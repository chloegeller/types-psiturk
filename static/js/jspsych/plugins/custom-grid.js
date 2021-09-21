jsPsych.plugins['custom-grid'] = (function(){

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('custom-grid', 'stimuli', 'image');

  plugin.info = {
    name: 'custom-grid',
    description: '',
    parameters: {
      stimuli: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimuli',
        array: true,
        default: undefined,
        description: 'An array that defines a grid.'
      },
      image_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image size',
        array: true,
        default: [100,100],
        description: 'Array specifying the width and height of the images to show.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEY,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: 2000,
        description: 'How long to show the stimulus for in milliseconds.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {
    var start_time = performance.now();

    var container = document.createElement("div");
    container.className = 'trial-container';
    
    var stimulus = plugin.generate_stimulus(trial.stimuli);
    // var stimulus2 = plugin.generate_stimulus(trial.stimuli2);

    container.appendChild(stimulus);
    // container.appendChild(stimulus2);
    // display_element.appendChild(stimulus);

    var query = plugin.generate_query(trial.prompt);
    container.appendChild(query);
    // display_element.appendChild(query);

    display_element.appendChild(container);

    var response = {
      rt: null,
      key: null
    };

    jsPsych.pluginAPI.setTimeout(function() {
      end_trial();
    }, trial.trial_duration);

    var end_trial = function() {
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      var trial_data = {
        rt: performance.now() - start_time,
        // stimulus: trial.stimuli,
        response: response.key
      };

      display_element.innerHTML = '';

      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      // display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';
      display_element.querySelector('#custom-grid').className += ' responded';
      console.log(response, info);
      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#custom-grid').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }
  };

  plugin.generate_stimulus = function(pattern) {
    var nrows = pattern.length;
    var ncols = pattern[0].length;

    var grid = document.createElement("div");
    grid.id = "custom-grid";

    for(var row = 0; row < nrows; row++){
      var gridrow = document.createElement("div");
      gridrow.classList.add("custom-grid-row");
      
      for(var col = 0; col < ncols; col++){
        var gridcell = document.createElement("div");
        gridcell.classList.add("custom-grid-cell", `custom-grid-cell-${row}-${col}`);
        gridcell.setAttribute("data-row", row); 
        gridcell.setAttribute("data-col", col);

        var image = document.createElement("img");
        image.src = pattern[row][col];
        image.style.width = '101%';
        image.style.height = '100%';
        // image.style.width = Math.floor(window.innerWidth / 10);
        // image.style.height = Math.floor(window.innerHeight / 8);
        
        if (pattern[row][col] !== 0) gridcell.appendChild(image);
        gridrow.appendChild(gridcell);
      }
      grid.appendChild(gridrow);
    }

    // var query_card = document.createElement('div');
    // query_card.className = 'query-card-cont';
    // // query_card.className = 'card border-dark mb-3';
    // // query_card.style = 'max-width: 18rem';

    // var card_body = document.createElement('div');
    // card_body.className = 'query-card-body';
    // // card_body.style = 'text-dark';

    // // let title = document.createElement('h5');
    // // title.innerText = task.title;
    // // title.className = 'card-title';

    // var query = document.createElement('div');
    // query.className = 'query-text';
    // query.innerText = prompt;

    // card_body.appendChild(query);
    // query_card.appendChild(card_body);
    // grid.appendChild(query_card);

    return grid;
  };

  plugin.generate_query = function(prompt) {

      var query_card = document.createElement('div');
      query_card.className = 'query-card-cont';
  
      var card_body = document.createElement('div');
      card_body.className = 'query-card-body';
  
      var query = document.createElement('div');
      query.className = 'query-text';
      query.innerText = prompt;
  
      card_body.appendChild(query);
      query_card.appendChild(card_body);

      return query_card;
  };

  return plugin;
})();
