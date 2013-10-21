$(document).ready(function() {

	/************ Nav Functions *************/
	/*Define global vars */
	var activeItem;
	var navMain = $('#navMain');
	var expandItem;
	var expandTimeout;

	/* Call accordionToggle function if .collapsible is hovered for 300 millisecs */
	$(navMain).find('ul > .collapsible').hover(function() {
		expandItem = $(this);
		expandTimeout = setTimeout(accordionToggle, 300);
	}, stopAnimation);

	/* expand hovered Item and collapse former activeItem */
	function accordionToggle() {
		activeItem = $(navMain).find('ul > .active');
		if ($(activeItem).hasClass('search-btn')) {
			$(activeItem).animate({
				width : "73px"
			}, {
				duration : 300,
				queue : false
			});
		} else {
			$(activeItem).animate({
				width : "126px"
			}, {
				duration : 300,
				queue : false
			});
		}
		if ($(expandItem).hasClass('search-btn')) {
			$(expandItem).animate({
				width : "326px"
			}, {
				duration : 300,
				queue : false
			});
		} else {
			$(expandItem).animate({
				width : "379px"
			}, {
				duration : 300,
				queue : false
			});
		}
		$(activeItem).removeClass('active');
		activeItem = expandItem;
		$(activeItem).addClass('active');
		/*set focus on search input if search is active element*/
		if ($(activeItem).hasClass('search-btn')) {
			$(activeItem).find('#searchInput').focus();
		}
	}

	function stopAnimation() {
		clearTimeout(expandTimeout);
	}

	/* Collapse active Item with some timeout on mouseleave*/
	$(navMain).mouseleave(function() {
		$('.nav-btn-wrapper').each(function(index, elem) {
			if ($(elem).hasClass('visited')) {
				expandItem = elem;
			}
		});
		setTimeout(function() {
			accordionToggle();
		}, 400);
	});
	/************* Nav Functions End ***********/
	/************** Only for Testing Functions *****************/
	var mediathekBTiles = $('#page_mediathekB').find('.teaser-tile');
	$(mediathekBTiles).click(function() {
		var url = "Videoplayer_Beitraege.html";
		$(location).attr('href', url);
	});
	var mediathekSTiles = $('#page_mediathekS').find('.teaser-tile');
	$(mediathekSTiles).click(function() {
		var url = "Videoplayer_Sendungen.html";
		$(location).attr('href', url);
	});
	/************** Only for Testing Functions End*****************/
	/*************Video Player Functions *********/
	projekktor('.video-clip', {
		volume : 0.8,
		controls : true,
		autoplay : false,
		thereCanBeOnlyOne : true, //stop all other player instances but the one the user clicked play
		ratio : 16 / 9,
		leaveFullscreen : true, //player will try to leave fullscreen once the "done" event has been fired
		disallowSkip : false,
		showOnStart : true,
		addplugins : ['controlbar'],
		playerFlashMP4 : 'http://www.glftv.de:8080/video-player/jarisplayer.swf',
		playerFlashMP3 : 'http://www.glftv.de:8080/video-player/jarisplayer.swf'
	});
	/*************Video Player Functions End*********/
	/*************Overlay Functions *****************/
	var addTopicTile = $("#add_topic_tile");
	var addTopicOverlay = $('#add_topic_overlay');
	$(addTopicTile).click(function() {
		overlayToggle(addTopicOverlay);
	});
	/*************Overlay Functions End*****************/

	/*call functions */
	sliderSize();
});
/*document.ready end */

/**************** WINDOW RESIZE *********************/
$(window).resize(function() {
	/*call functions */
	sliderSize();
});
/***********************WINDOW RESIZE END ********************/

/***********************overlay functions********************/
function overlayToggle(overlay) {
	var overlayContent = overlay.find('.overlay-content');
	$(overlay).fadeIn(300);
	$(overlay).addClass('active');
	$('body').css('overflow', 'hidden');

	$(overlay).click(function() {
		$(this).fadeOut(200);
		$('body').css('overflow', 'auto');
	});
	$(overlayContent).click(function(event) {
		event.stopPropagation();
	});
}

/***********************overlay functions END ********************/
/****************slider functions ********************/
function sliderSize() {
	// keep slider ratio depending on relative width (slider-wrapper )
	var sliderWrapper = $('.slider-wrapper');
	var sliderWrapperWdth = sliderWrapper.width();
	var ratio = 16 / 9;
	var sliderWrapperHgt = sliderWrapperWdth / ratio;
	sliderWrapper.css({
		'height' : sliderHgt + 'px'
	});

	// keep slider ratio depending on relative width (slider )
	var slider = $('.slider');
	var sliderWdth = slider.width();
	var sliderHgt = sliderWdth / ratio;
	slider.css({
		'height' : sliderHgt + 'px'
	});
}

/****************slider functions end********************/
