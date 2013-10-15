$(document).ready(function() {
	// height equal to dynamic width (teaser tile play icon)
	var teaserTile = $('.teaser-tile');
	var teaserTileWdth = teaserTile.width();
	teaserTile.css({
		'height' : teaserTileWdth + 'px'
	});
	// height equal to dynamic width (teaser tile play icon)
	var teaserTilePlay = $('.teaser-tile-play-icon');
	var teaserTilePlayWdth = teaserTilePlay.width();
	teaserTilePlay.css({
		'height' : teaserTilePlayWdth + 'px'
	});
});

$(window).resize(function() {

	// height equal to dynamic width (teaser tile)
	var teaserTile = $('.teaser-tile');
	var teaserTileWdth = teaserTile.width();
	teaserTile.css({
		'height' : teaserTileWdth + 'px'
	});
	// height equal to dynamic width (teaser tile play icon)
	var teaserTilePlay = $('.teaser-tile-play-icon');
	var teaserTilePlayWdth = teaserTilePlay.width();
	teaserTilePlay.css({
		'height' : teaserTilePlayWdth + 'px'
	});

});


//Slider

$(document).ready(function() {
	// height equal to dynamic width (teaser tile play icon)
	var sliderRatio= 16/9;
	var slider = $('.slider');
	var sliderWdth = slider.width();
	var sliderHeight= sliderWdth/sliderRatio;
	slider.css({
		'height' : sliderHeight + 'px'
	});
	
});

$(window).resize(function() {

	// height equal to dynamic width (teaser tile)
	var sliderRatio= 16/9;
	var slider = $('.slider');
	var sliderWdth = slider.width();
	var sliderHeight= sliderWdth/sliderRatio;
	slider.css({
		'height' : sliderHeight + 'px'
	});
	
});










// Responsive Videoplayer
_V_("example_video_1").ready(function() {

	var myPlayer = this;
	// Store the video object
	var aspectRatio = 9 / 16;
	// Make up an aspect ratio

	function resizeVideoJS() {
		// Get the parent element's actual width
		var width = document.getElementById(myPlayer.id).parentElement.offsetWidth;
		// Set width to fill parent element, Set height
		myPlayer.width(width).height(width * aspectRatio);
	}

	resizeVideoJS();
	// Initialize the function
	window.onresize = resizeVideoJS;
	// Call the function on resize
}); 