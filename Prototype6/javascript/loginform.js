$(document).ready(function(){

    $("#ok-reg").hide();
        $("#reg-name").hide();

        $('#registerradio').click(function(){
            $("#ok").hide();
            $("#ok-reg").show();
            $("#reg-name").show();

        }); 

        $('#loginradio').click(function(){
            $("#ok-reg").hide();
            $("#ok").show();
            $("#reg-name").hide();

        }); 


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


    $("#ok-reg").click(function(e){
        e.preventDefault();
        var emailfilled = false;
        var passwordfilled = false;
        var namefilled = false;

        if($('#login-email').val() !== ""){
            emailfilled = true;
        }
        if($('#login-passwd').val() !== ""){
            passwordfilled = true;
        }
        if($('#login-passwd').val() !== ""){
            namefilled = true;
        }

        if(emailfilled && passwordfilled && namefilled){
            var url = $('#inlog-form').serialize();
                
            $.post("php/register.php",url, function(data){
                if(data === "goed"){
                    alert("je bent nu geregistreerd, log nu in");
                    location.href = "index.php";
                }
            });      
        }else{            
            alert('Vul uw gegevens goed in');
        }
    });


});