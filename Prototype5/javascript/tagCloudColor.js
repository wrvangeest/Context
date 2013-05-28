$(document).ready(function(){
	checkTags(colorTags,0);


});

function colorTags() {
	var amountTags = $('#tag-cloud-inner').children().length;
	var sR = 55;
	var sG = 159;
	var sB = 21;
	var eR = 230;
	var eG = 0;
	var eB = 51;
	var dR = Math.floor((sR - eR)/amountTags);
	var dG = Math.floor((sG - eG)/amountTags);
	var dB = Math.floor((sB - eB)/amountTags);
	var curR = sR;
	var curG = sG;
	var curB = sB;
	for(var i = 0; i < amountTags; i++){
		var rgb = 'rgb('+ curR +',' + curG + ','+ curB + ')';
		if($('#tag-toggle-button').html()=='Tweets'){
		$('.tweettag' + i).css("background-color", rgb);
		}
		else{
			$('.visualtag' + i).css("background-color", rgb);
		}
		curR -= dR;
		curG -= dG;
		curB -= dB;
		//console.log(rgb);



		/*
		if (i < Math.floor(amountTags/2)){
			var bovenhelft = Math.floor(amountTags/2);
			var b = Math.floor((i*(140-70)/bovenhelft) + 70);
			var r = 140;
			var g = 70;
			var rgb = 'rgb('+ r +',' + g + ','+ b + ')';
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

		}*/
	}
}