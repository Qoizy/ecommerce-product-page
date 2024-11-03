// Countdown Timer
function countdown(endDate) {
    let timer, days, hours, minutes, seconds;
  
    endDate = new Date(endDate).getTime();
  
    if (isNaN(endDate)) return;
  
    timer = setInterval(function() {
      let now = new Date().getTime();
      let timeRemaining = endDate - now;
  
      if (timeRemaining >= 0) {
        days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }
  
  // Set countdown date to 7 days from now
  countdown(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  