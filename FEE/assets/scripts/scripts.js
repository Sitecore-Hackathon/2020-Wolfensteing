// Mobile friendlier approach
// Detects mobile device to prevent mobile video from downloading, otherwise it replaces data-src with src a reloads video for desktop
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if ( !isMobile.any() ) {
	
  // get reference to video sources
  var sources = document.getElementsByClassName('video__source');

  // loop through and replace data-src with src
  for (var i=0; i<sources.length; i++) {
    if (sources[i].getAttribute('data-src')) {
      sources[i].setAttribute('src',sources[i].getAttribute('data-src'));
      sources[i].removeAttribute('data-src'); // use only if you need to remove data-src attribute after setting src
    }
  }

  // fade in video from css when it's ready to play
  var video = document.getElementById('video');

  // listen for canplay event and fade video in
  video.addEventListener('canplay', function () {
    //console.log('video duration information available'); 
    video.style.transition="opacity 2s";
    video.style.opacity=1;
  });
  
  // reload video sources
  video.load();
}






//Tweets

var Query = '#SCHackathon';
var tweets = null;
var activeTweet = 0;
TweetJs.Search(Query, function(data, index) {
  data.statuses.forEach(function(item, index){
    twttr.widgets.createTweet(
      item.id_str,
      document.getElementById('tweets'),
      {
        conversation : 'none',
        cards: 'hidden',
      }
    ).then(function (el) {
      var twitterWidget= el.shadowRoot;
      el.classList.add('hidden-tweet');
      twitterWidget.querySelector('.EmbeddedTweet').style.color = "#aaa";
      twitterWidget.querySelector('.EmbeddedTweet').style.backgroundColor = "transparent";
      twitterWidget.querySelector('.EmbeddedTweet').style.fontSize = "12px";
      twitterWidget.querySelector('.EmbeddedTweet').style.borderColor = "transparent";
      twitterWidget.querySelector('.EmbeddedTweet .CallToAction').style.borderColor = "transparent";
      twitterWidget.querySelector('.EmbeddedTweet .CallToAction').style.fontSize = "12px";
      twitterWidget.querySelector('.EmbeddedTweet .CallToAction').style.paddingTop = "0";
      twitterWidget.querySelector('.EmbeddedTweet .EmbeddedTweet-tweet').style.paddingBottom = "0";
      twitterWidget.querySelector('.EmbeddedTweet .TweetInfo').style.fontSize = "12px";
      if(twitterWidget.querySelector('.QuoteTweet')){
        twitterWidget.querySelector('.QuoteTweet').style.display = "none";
      }
      if(index === data.statuses.length -1){
        console.log('s');
        console.log(document.querySelectorAll('twitter-widget'));
        document.querySelectorAll('twitter-widget')[activeTweet].classList.remove("hidden-tweet");
        passTweet();
      }
    });

  });
});
function passTweet(){
  setTimeout(function(){ 
    document.querySelectorAll('twitter-widget')[activeTweet].classList.add("hidden-tweet");
    if(activeTweet === document.querySelectorAll('twitter-widget').length-1 ){
      activeTweet = 0;
    }else{
      activeTweet ++;
    }
    document.querySelectorAll('twitter-widget')[activeTweet].classList.remove("hidden-tweet");
    passTweet();
  }, 6000);
}

    // Set the date we're counting down to
var countDownDate = new Date(document.getElementById("timer").getAttribute('data-date')).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);
    
    


    