// These are my buttons and display
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const durationDisplay = document.getElementById("duration-display");

// This is used to store the setInterval function responsible for the display
let interval;

// Object Oriented Programming, this is a Stopwatch
function Stopwatch() {
  // Initializing all variables to zero.
  let startTime,
    endTime,
    running,
    stopped,
    timeDiffMilliseconds,
    elapsed = 0;

    //Debugging
    // let count = 0;

  // This should start the stopwatch
  // If stopwatch already started, it should throw an error that stop watch already started
  // Then get current time and convert to milliseconds
  // Also updated running and stopped conditions 
  this.start = function () {
    if (running === true) {
      throw new Error("Stopwatch already started");
    }

    
    startTime = (new Date()).getTime();
    stopped = false;
    running = true;
    // Debugging
    // console.log(`stopped = ${stopped}, running = ${running}`);
  };


  // This is a private property, I don't want it to be accessed by client
  // This function compares current time and start time
  // Computes the difference and format the mins,seconds and milliseconds value
  Object.defineProperty(this, "displayTime", {
    get: function () {
      timeDiffMilliseconds = elapsed + new Date().getTime() - startTime;
      let timeDiffSeconds =  timeDiffMilliseconds / 1000;
      let minutes = Math.floor(timeDiffSeconds / 60);
      let seconds = Math.floor(timeDiffSeconds % 60);
      let milliseconds = Math.floor((timeDiffMilliseconds % 1000) / 10);

      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}.${String(milliseconds).padStart(2, "0")}`;
    },
  });

  // This method is used to stop/pause the stopwatch
  // If stopwatch hasn't started, it should throw an error
  // If stopwatch has already been stopped, then throw an error
  // Stop used time before stop and update running & false conditions
  this.stop = function () {
    if (stopped === false && running === false) {
      throw new Error("Stopwatch has not started");
    }
    
    if (stopped === true) {
      throw new Error("Stopwatch already stopped");
    }

    endTime = new Date().getTime();
    elapsed += endTime - startTime;

    //  Debugging
    // console.log(count++);
    stopped = true;
    running = false;

    //  Debugging
    // console.log(`stopped = ${stopped}, running = ${running}`);
    // console.log("I am here");
  
  };


  // This method resets the time to initial state and reset all variables to zero;
  this.reset = function(){
    startTime,
    endTime,
    timeDiffMilliseconds,
    elapsed = 0;

    running = false;
    stopped = false;
  };

}

// CREATING A STOPWATCH SW
const sw = new Stopwatch();

// When start button is clicked, start the stop watch, toggle the start & stop button
startBtn.addEventListener("click", function () {
  sw.start();
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  
  // Updates the display every 100ms
  interval = setInterval(() => {
    durationDisplay.innerText = sw.displayTime;
  }, 100);
});

// When stop button is clicked, stop/pause the stop watch, toggle the start & stop button
stopBtn.addEventListener("click", function(){
  // Stops the updating
  clearInterval(interval);
  sw.stop();
  stopBtn.classList.toggle("hidden");
  startBtn.classList.toggle("hidden");
});

// When reset button is clicked, reset the stop watch;
resetBtn.addEventListener("click", function(){
  clearInterval(interval);

  if(startBtn.classList.contains("hidden") === true) {
    stopBtn.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");
  }

  sw.reset();
  durationDisplay.innerText = "00:00.00";
});
