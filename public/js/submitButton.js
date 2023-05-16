$('button').click(function(){
  var _self = $(this);
  _self.addClass('loading').removeClass('success');
  
  setTimeout(function(){
    _self.removeClass('loading').addClass('success');
  },2000);
})