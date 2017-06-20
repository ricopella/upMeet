
$("#login").on("click", function() {
    console.log('button');
   	$('#sign-up-2').hide();
   	$('#log-sign').hide();
   	$('#login-2').show();
   	
   });


$("#sign-up").on("click", function() {
    console.log('button');
   	$('#login-2').hide();
   	$('#log-sign').hide();
   	$('#sign-up-2').show();
   });

