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
	var themenTiles = $('#page_themen').find('.teaser-tile');
	$(themenTiles).click(function() {
		var url = "DeinGLF_Themen_Detail.html";
		$(location).attr('href', url);
	});

	var submitBtn = [];
	var overlayForm = $('.overlay-form-content');
	var overlaySubmitContent = $('.overlay-form-submitted-content');
	submitBtn.push($('input[type="submit"]'));
	submitBtn.push($('.reload-form'));
	$(submitBtn).each(function() {
		$(this).click(function() {
			$(overlayForm).toggleClass('visible').toggleClass('hidden');
			$(overlaySubmitContent).toggleClass('visible').toggleClass('hidden');

		});
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
	/*************Detail Pages Info-Wrapper Functions*********/
	var infoWrapper = $('.info-wrapper');
	var infoContent = $(infoWrapper).find('.info-content');
	var infoWrapperH = $(infoWrapper).height();
	var infoContentH = $(infoContent).height();
	if (infoWrapperH < infoContentH) {
		infoWrapper.css('height', '407px');
	}
	/*************Detail Pages Info-Wrapper Functions End*********/
	/*************Overlay Functions *****************/
	var addTopicTile = $("#add_topic_tile");
	var addTopicOverlay = $('#add_topic_overlay');
	$(addTopicTile).click(function() {
		overlayToggle(addTopicOverlay);
	});
	/*************Overlay Functions End*****************/
	/*************Search Page Functions *****************/
	var filterBtn = [];
	filterBtn.push($('#filter_clips_btn'));
	filterBtn.push($('#filter_broadcasts_btn'));
	filterBtn.push($('#filter_all_btn'));
	$(filterBtn).each(function() {
		$(this).click(function() {
			toggleSearchFilters(this);
		});
	});
	/*************Search Page Functions End*****************/
	/*call functions */
	sliderSize();
	resizeInfoWrapper();
});
/*document.ready end */

/**************** WINDOW RESIZE *********************/
$(window).resize(function() {
	/*call functions */
	sliderSize();
	resizeInfoWrapper();
});
/***********************WINDOW RESIZE END ********************/
/*************Search Page Functions *****************/
function toggleSearchFilters(filterBtn) {
	var filterType = $(filterBtn).attr('id');
	filterType = filterType.split('_');
	var filterWrapperId = '#filter_' + filterType[1] + '_wrapper';
	if ($(filterWrapperId)) {
		var filterWrapper = $(filterWrapperId);
		$('.filter-toggle').addClass('hidden');
		$(filterWrapper).removeClass('hidden');
	}
	$('.filter-type-wrapper').find('.filter-btn').removeClass('active');
	$(filterBtn).addClass('active');
}

/*************Search Page Functions End*****************/
/***********************overlay functions********************/
function overlayToggle(overlay) {
	var overlayContent = overlay.find('.overlay-content');
	var overlayCloseIcon = overlayContent.find('.overlay-close-btn');
	var overlayCloseBtn = overlayContent.find('.close-overlay-btn');
	var closeOverlay = [];
	closeOverlay.push($(overlay));
	closeOverlay.push($(overlayCloseIcon));
	closeOverlay.push($(overlayCloseBtn));
	$(overlay).fadeIn(300);
	$(overlay).addClass('active');
	$('body').css('overflow', 'hidden');
	$(closeOverlay).each(function() {
		$(this).click(function() {
			$(overlay).fadeOut(200);
			$('body').css('overflow', 'auto');
		});
	});
	$(overlayContent).click(function(event) {
		event.stopPropagation();
	});
}

/***********************overlay functions END ********************/
/*************Detail Pages Info-Wrapper Functions*********/
function resizeInfoWrapper() {
	var infoWrapper = $('.info-wrapper');
	var infoContent = $(infoWrapper).find('.info-content');
	var infoWrapperH = $(infoWrapper).height();
	var infoContentH = $(infoContent).height();
	if (infoWrapperH < infoContentH) {
		infoWrapper.css('height', '407px');
	} else if (infoContentH < '200') {
		infoWrapper.css('height', '200px');
	}
}

/*************Detail Pages Info-Wrapper Functions End*********/
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
