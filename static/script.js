$(document).ready(function() {
  console.log("Howdy js is working");

  function formatTime(time) {
    return (time < 10 ? "0" : "") + time;
  }

  function timerObj(name, hours, mins, secs) {
    //name should be a string
    //other arguments accept only ints
    this.setTime = {
      hours: hours,
      mins: mins,
      secs: secs
    };

    this.name = name;
    this.switch = "on";

    this.asStr = function() {
      return (
        formatTime(this.remainingTime.hours) +
        ":" +
        formatTime(this.remainingTime.mins) +
        ":" +
        formatTime(this.remainingTime.secs)
      );
    };

    this.asInt = function() {
      return (
        this.remainingTime.hours +
        this.remainingTime.mins +
        this.remainingTime.secs
      );
    };

    this.isZero = function() {
      return this.asInt() == 0;
    };

    this.resetTime = function() {
      this.remainingTime = JSON.parse(JSON.stringify(this.setTime));
    };

    this.resetTime();

    this.decrement = function() {
      if (this.remainingTime.secs > 0) {
        this.remainingTime.secs--;
      } else {
        if (this.remainingTime.mins > 0) {
          this.remainingTime.mins--;
        } else {
          this.remainingTime.hours--;
          this.remainingTime.mins = 59
        }
        this.remainingTime.secs = 59;
      }
    };
  }

  //all pre-existing timer names and values
  var clocks = [
    new timerObj("Hour", 1, 0, 0),
    new timerObj("20 mins", 0, 20, 0)
  ];

  //function to add timer html
  function addTimerRow(timerObj) {
    var disp = timerObj.name + "disp";
    $("#main").append(
      `<tr id="${timerObj.name}" class="toggle">
      <td>${timerObj.name}</td>
      <td id="${disp}">${timerObj.asStr()}</td>
    </tr>`
    );
  }

  //Add pre-existing clock values to clocks
  for (var x in clocks) {
    addTimerRow(clocks[x]);
  }

  //toggle individual timers on/off
  $(".toggle").click(function() {
    for (x in clocks) {
      if (clocks[x].name == this.id)
        if (clocks[x].switch == "off") {
          clocks[x].switch = "on";
        } else {
          clocks[x].switch = "off";
        }
    }
  });

  //add timer

  $("#addTimer").click(function() {
    //TODO
    //ajax send to server
    //input validation
    //parse timer entry better, include seconds and minutes

    //test for doubles
    //Credit to
    //https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
    var nameIsTaken = clocks.filter(timer => timer.name === $("#timerName").val()).length;

    if (nameIsTaken)
    {
      //alert user name is used
    }
    else
    {
      var newTimer = new timerObj($("#timerName").val(), parseInt($("#timeInput").val()), 0, 0)
      clocks.push(newTimer);
      addTimerRow(newTimer);
    }
  });

  function tick() {
    for (var x in clocks) {
      if (clocks[x].switch == "on") {
        if (clocks[x].isZero()) {
          clocks[x].resetTime();
          //console.log(clocks[x].setTime);
        } else {
          clocks[x].decrement();
        }
        $("#" + clocks[x].name + "disp").html(clocks[x].asStr());
      }
    }
  }
  //TODO
  //setup Pause All
  var timers = setInterval(tick, 1000);
});
