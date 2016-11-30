(function($){
  $(function(){
    //Event initializations
    $('.collapse').sideNav();
    $('.modal').modal();
    $('input#search').focus(function() { $(this).parent().addClass('focused'); });
    $('input#search').blur(function() {
      if (!$(this).val()) {
        $(this).parent().removeClass('focused');
      }
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
