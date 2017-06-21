$("#login").on("click", function() {
    $('#sign-up-2').hide();
    $('#log-sign').hide();
    $('#signout-btn').hide()
    $('#login-2').show();

});


$("#sign-up").on("click", function() {
    $('#login-2').hide();
    $('#log-sign').hide();
    $('#signout-btn').hide();
    $('#sign-up-2').show();
});