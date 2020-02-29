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


// Simple 'canplay' detection (not mobile friendly)

// Use js to fade in video when it's ready to play
// $(function() {
  
//   // Fade in video from css when it's ready to play
//   var video = document.getElementById("video");
  
//   // Listen for canplay event and fade video in
//   video.addEventListener('canplay', function () {
//     // console.log('video duration information available'); 
//     $('#video').animate({
//       opacity: 1
//     }, 50);
//   });
  
// });
