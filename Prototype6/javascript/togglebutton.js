//Defines toggle button behaviour
$(document).ready(function(){
	$('#tag-toggle').click(function(){
        if($('#tag-toggle-button').html() == 'Tweets'){
        	$('#tag-toggle-button').animate({
             	marginLeft: '50%'
        	},0.1);
        	$('#tag-toggle-button').html('Visual');
            $('#tagSearch').val('');
            $('#tagSearch').attr('placeholder','Search Visual Tags');
            var type = 'visual';
        }else{
        	$('#tag-toggle-button').animate({
                marginLeft: '0px'
            },0.1);
            $('#tag-toggle-button').html('Tweets');  
            $('#tagSearch').val('');
            $('#tagSearch').attr('placeholder','Search Twitter Tags');
            var type = 'tweet';
        }
        getNewTags(type);
    });

});