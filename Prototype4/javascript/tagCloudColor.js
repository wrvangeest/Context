$(document).ready(function(){
	checkTags(colorTags,0);


});

function colorTags() {
	var amountTags = $('#tag-cloud-inner').children().length;
	for(var i = 0; i < amountTags; i++){

		if (i < Math.floor(amountTags/2)){
			//var cc = Math.floor(i*(255/(amountTags)));
			//b van 70 tm/140 verdelen
			var bovenhelft = Math.floor(amountTags/2);
			var b = Math.floor((i*(140-70)/bovenhelft) + 70);
			//var rgb = 'rgb('+ cc +',' +cc+ ','+ cc + ')';
			var r = 140;
			var g = 70;
			var rgb = 'rgb('+ r +',' +g+ ','+ b+ ')';
			$('.t' +i).css("background-color",rgb);

		}
		if(i >= Math.floor(amountTags/2)){
			var onderhelft = Math.floor(amountTags/2);
			//r verdelen van 140 tot 70
			var r = Math.floor( Math.abs( (i*(140-70)/onderhelft) - 210 ));
			var b = 140;
			var g = 70;
			var rgb = 'rgb('+ r +',' +g+ ','+ b+ ')';
			$('.t' +i).css("background-color",rgb);

		}
	}
}