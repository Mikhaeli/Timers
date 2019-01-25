$(document).ready(function() {
  function formatTime(time) {
    return (time < 10 ? "0" : "") + time;
  }
  function timerObj(name, hours, mins, secs) {
    //function should accept only ints
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
      //this.remainingTime = {...this.setTIme};
      //this.remainingTime = Object.assign({}, this.setTIme);
      //Object.assign(this.remainingTime, this.setTime);
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

  //all timer names and values
  var clocks = [
    new timerObj("hour", 1, 0, 2),
    new timerObj("20mins", 15, 20, 4),
    new timerObj("houre", 0, 0, 4),
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

  //generate html table with values in clocks
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
    //input validation
    //test for doubles
    console.log("Yeet");
    clocks.push({
      name: $("#timerName").val(),
      time: parseInt($("#timeInput").val()),
      switch: "on"
    });
    addTimerRow(clocks.length - 1);
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
