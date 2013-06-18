//Runs functions for the login form
$(document).ready(function(){

//################### Functions to properly display login forms #########################
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

//########################################################################################

//Function to run the login
    $('#ok').click(function(e){
        
        document.getElementById("ok").innerHTML = "Logging in...";
        e.preventDefault(); // prevents default submit action
        document.getElementById("ok").disabled = true;


        var emailfilled = false;
        var passwordfilled = false;

        if($('#login-email').val() !== ""){
            emailfilled = true;
        }
        if($('#login-passwd').val() !== ""){
            passwordfilled = true;
        }

        if(emailfilled && passwordfilled){

            var phpUrl = "php/formlogin.php?"+ $('#inlog-form').serialize();

            $.ajax( {
                type: 'POST',
                url: phpUrl,
                data: $('#inlog-form').serialize(),
                success: function(result) {
                    console.log(result);
                    switch(result){
                    case '1': alert("Er is iets mis gegaan"); location.reload();break;
                    case '2': alert("Gebruiker bestaat niet"); location.reload();break;
                    case '3': location.reload();break;
                    }
                }
            } );
        }else{

                document.getElementById("ok").innerHTML = "Log in";
                document.getElementById("ok").disabled = false;
                alert('Vul uw gegevens goed in');
        }

    }); 


//Function to run registration
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
                    alert("Registratie is gelukt. U kunt nu inloggen.");
                    location.href = "index.php";
                }
            });      
        }else{            
            alert('Vul uw gegevens goed in');
        }
    });


});