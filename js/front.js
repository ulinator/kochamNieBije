$(document).ready(function() {

  if ($(window).width() >= 968){  
    $('#vid-wrap').tubular({videoId: '3znSBS1wkhQ', mute: false, ratio: 9/9}); // where idOfYourVideo is the YouTube ID.
  } 

  var a = new TimelineLite;
    a.from("#anim1", 1.5, {
        scale: 1,
        autoAlpha: 0,
        transformOrign: "50% 50%"
    }, "+=4"), a.from("#start-button", 1.2, {
        autoAlpha: 0
    }, "+=0.5"), a.play()

  $('.burger-button').click(function() {
      $('#mobile-menu').slideToggle("#mobile-menu");
  });

  $('.mute-button').click(function() {
      $(this).toggleClass('mute-button-off');
  });

  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

});