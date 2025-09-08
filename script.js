// mobile menu

$( document ).ready(function() {

  $( ".cross" ).hide();
  $( ".menu" ).hide();
  $( ".canva_expander" ).click(function() {
  $( ".menu" ).slideToggle( "slow", function() {
  $( ".canva_expander" ).hide();
  $( ".cross" ).show();
  });
  });
  
  $( ".cross" ).click(function() {
  $( ".menu" ).slideToggle( "slow", function() {
  $( ".cross" ).hide();
  $( ".canva_expander" ).show();
  });
  });
  
  });

 // Close out sub menu
 $('.sub__close').click(function(e) {
  e.preventDefault();
  
  $(this).parent().parent().removeClass('is-active');
});

// Trigger sub menu
$('.menu ul .nav__submenu').click(function(e) {
  e.preventDefault();
  
  $(this).siblings().addClass('is-active');
});



// sticky header

$(window).on("scroll touchmove", function() {

  if ($(document).scrollTop() > $("#sticky-wrapper").position().top) {
    $('.sticky-area').css('width', '100%');
    $('.sticky-area').css('max-width', '1600px');
    $('.sticky-area').css('margin', '0 auto');
    $('.sticky-area').css('position', 'fixed');
    $('.sticky-area').css('top', '0px');
    $('.sticky-area').css('background', '#e9f2ff');
    $('.sticky-area').css('z-index', '1111');
    $('.sticky-area').css('box-shadow', '0 3px 16px -2px #ebe8e8');
    $('#sticky-wrapper').addClass('is-sticky');

  }
  else{
  $('.sticky-area').removeAttr('style');

  }
  
});