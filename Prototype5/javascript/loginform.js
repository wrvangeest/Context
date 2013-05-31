$(document).ready(function(){


    $("#inlog-form").submit(function(){

    	var emailfilled = false;
    	var passwordfilled = false;


    	if($('#login-email').val() !== ""){
    		emailfilled = true;
    	}
    	if($('#login-email').val() !== ""){
    		passwordfilled = true;
    	}

    	if(emailfilled && passwordfilled){
    		var data = $('#inlog-form').serialize();
			$.ajax({
				 url: "php/formlogin.php",
				 type: "post",
				 data: data,
				 dataType: "json",
				 success: function(data) {
					 if (data.success) {
					   window.location = "../admin.php";
					 }
					 else {
					   alert('Invalid Login');
					  }
				}
			 });

    	}else{
    		
    			alert('Vul uw gegevens goed in');
 
    	}

    });

});