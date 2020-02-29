$( document ).ready(function() {
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

  var Query = document.getElementById('tweets').getAttribute('data-hashtag');
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
          setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
            document.getElementById('tweets').classList.add('loaded');
            document.querySelectorAll('twitter-widget')[activeTweet].classList.remove("hidden-tweet");
            passTweet();
          }, 1000);
          
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
      
      


  if($('#map').length){
    mapboxgl.accessToken = 'pk.eyJ1IjoibWJvbmlsbGEiLCJhIjoiY2s3N3JhNzZoMGF2ZDNrb2R1aW00dHhlayJ9.xohHAIYuNj-rHsGRGgjWsw';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-77.04, 38.907],
    zoom: 1.5
    });
    
    map.on('load', function() {

    var geoJson = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          
        ]
      }
    }

    $('.country-marker').each(function(index, element) {
      var feature = {
        'type': 'Feature',
        'properties': {
          'description': $(element).data('text'),
          'icon': 'marker',
          'country': $(element).data('name'),
        },
        'geometry': {
          'type': 'Point',
          'coordinates': $(element).data('cordinates')
        }
      }

      geoJson.data.features.push(feature);
      
    })

    map.addSource('places', geoJson);
    
    // Add a layer showing the places.
    map.addLayer({
    'id': 'places',
    'type': 'symbol',
    'source': 'places',
    'layout': {
    'icon-image': '{icon}-15',
    'icon-allow-overlap': true
    }
    });
    
    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });
    
    map.on('mouseenter', 'places', function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';
      
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
      
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
    });

    map.on('click', 'places', function(e) {
      var country = e.features[0].properties.country;
      $('#modal-country').html(country.toUpperCase());
      $('.team').removeClass('active');
      $('*[data-country='+country+']').addClass('active');
      $('#MyModal').modal();
    });
    
    map.on('mouseleave', 'places', function() {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    map.scrollZoom.disable();


    });


  } 


  $('.suscribe *[type="submit"]').click(function(e){
    e.preventDefault();
    var email = $('.suscribe *[type="text"]').val();
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var url = $('.suscribe form').attr('action')+email;
    if(pattern.test(email)){
      $.get(url, function(data, status){
        if(data.Success){
          $('.suscribe .message').addClass('success').html(data.Message);
        }else{
          $('.suscribe .message').addClass('error').html(data.Message);
        }
      });
    }else{
      $('.suscribe .message').addClass('error').html('Invalid Email.')
    }
  })
});