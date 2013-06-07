$('#commentbutton').click(	
	function(e){
		e.preventDefault();

		if($('#inputcomment').val() === ""){
			alert("commentbox is empty");
		}else{

			var hash = getUrlVars();
			var vidid = hash['vidid'];
			var text = $('#inputcomment').val();
			console.log(text);

			$.post("php/setComment.php?", {vidid:vidid, comment:text}, function(data){
				alert(data);
			});
		}
	} 
);



