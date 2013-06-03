$(document).ready(function(){

    $('#ok').click(function(){
    	var emailfilled = false;
    	var passwordfilled = false;


    	if($('#login-email').val() !== ""){
    		emailfilled = true;
    	}
    	if($('#login-passwd').val() !== ""){
    		passwordfilled = true;
    	}

    	if(emailfilled && passwordfilled){
    		var url = $('#inlog-form').serialize();
            
            $.post("php/formlogin.php?"+url)
                .done(function (data){
                        $('#inlog-form').hide();
                        $('#nav-bar-form').append('<div id="logged-in"><span>Hello ,'+ data.name +'</span><a href="php/logout.php"  id="logout">Logout</a></div>');

                })
                //Give message when failed
                .fail(function() {

                });

    	}else{
    		
    			alert('Vul uw gegevens goed in');
    	}

    });

});