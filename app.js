$(function () {
  //write your code here
  let startRace = $("#startRace");
  let startOver = $("#startOver");
  let counterHtml = $("#counter");

  let carOne = $("#carOne");
  let carTwo = $("#carTwo");
  let resultCarOne = $("#statsOne");
  let resultCarTwo = $("#statsTwo");
  let finishFlag = $("#finishFlag");

  counterHtml.hide();
  finishFlag.hide();

  let counter = 4;

  let maxWidth = $(window).width() - carOne.width() - 20;
  let randomOne = Math.floor(Math.random() * 1500);
  let randomTwo = Math.floor(Math.random() * 1500);

  function carOnePlace() {
    if (randomOne < randomTwo) {
      return "first";
    } else {
      return "second";
    }
  }

  function carTwoPlace() {
    if (randomTwo < randomOne) {
      return "first";
    } else {
      return "second";
    }
  }

  // Start Race
  startRace.on("click", function () {
    startRace.prop("disabled", true);
    startOver.prop("disabled", true);

    counterHtml.show();

    let interval = setInterval(function () {
      counter--;
      counterHtml.text(counter);
      if (counter == 0) {
        stopCountDown();
        counterHtml.hide();
        setTimeout(function () {
          carOne.animate(
            {
              marginLeft: maxWidth,
            },
            function () {
              finishFlag.show();
              startRace.prop("disabled", false);
              startOver.prop("disabled", false);
            }
          );
        }, randomOne);
        setTimeout(function () {
          carTwo.animate(
            {
              marginLeft: maxWidth,
            },
            function () {
              finishFlag.show();
              startRace.prop("disabled", false);
              startOver.prop("disabled", false);
            }
          );
        }, randomTwo);
        setTimeout(function () {
          resultCarOne.prepend(
            `
				<p>Finished in: <span style="color:#ffebf7; font-weight:bold;">${carOnePlace()}</span> place with a time of: <span style="color:#ffebf7; font-weight:bold;">
        ${randomOne}</span> milliseconds!</p>
			  `
          );
        }, randomOne);
        setTimeout(function () {
          resultCarTwo.prepend(
            `
				<p>Finished in: <span style="color:#ba0000; font-weight:bold;">${carTwoPlace()}</span> place with a time of: <span style="color:#ba0000; font-weight:bold;">
        ${randomTwo}</span> milliseconds!</p>
			  `
          );
        }, randomTwo);
      }
      localStorage.setItem("resultOne", carOnePlace());
      localStorage.setItem("timingOne", randomOne);

      localStorage.setItem("resultTwo", carTwoPlace());
      localStorage.setItem("timingTwo", randomTwo);
    }, 1000);
    function stopCountDown() {
      clearInterval(interval);
      return false;
    }
  });

  // Start Over Button
  startOver.on("click", function () {
    finishFlag.hide();
    carOne.animate({ marginLeft: "0px" });
    carTwo.animate({ marginLeft: "0px" });
    counterHtml.text("");
    counter = 4;
    randomOne = Math.floor(Math.random() * 1500);
    randomTwo = Math.floor(Math.random() * 1500);
    console.log(randomOne);
  });

  //Previous Results
  let previousResults = $("#previousResults");
  let prevResultOne = localStorage.getItem("resultOne");
  let prevTimingOne = localStorage.getItem("timingOne");
  let prevResultTwo = localStorage.getItem("resultTwo");
  let prevTimingTwo = localStorage.getItem("timingTwo");

  if (prevResultOne && prevTimingOne && prevResultTwo && prevTimingTwo) {
    previousResults.html(
      `
      <h3>Results from the previous time you played this game:</h3>
      <p class="text-white">
      <span style="color:#ffebf7; font-weight:bold;">Car1</span> finished in <span style="color:#ffebf7; font-weight:bold;">${prevResultOne}</span> place, with a time of 
      <span style="color:#ffebf7; font-weight:bold;">${prevTimingOne}</span> milliseconds!
      </p>
      <p class="text-white">
      <span style="color:#ba0000; font-weight:bold;">Car2</span> finished in <span style="color:#ba0000; font-weight:bold;">${prevResultTwo}</span> place, with a time of 
      <span style="color:#ba0000; font-weight:bold;">${prevTimingTwo}</span> milliseconds!
      </p>
      `
    );
  }
});
