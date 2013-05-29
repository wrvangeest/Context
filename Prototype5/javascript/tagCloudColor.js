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
		var rgb = '#' + curR.toString(16) + curG.toString(16) + curB.toString(16);
		if($('#tag-toggle-button').html()=='Tweets'){
			$('.tweettag' + i).css("background-color", rgb);
		}
		else{
			$('.visualtag' + i).css("background-color", rgb);
		}
		curR -= dR;
		curG -= dG;
		curB -= dB;
	}
}