/*Define global vars */
var activeItem;
var navMain = $('#navMain');
var navAccordion = $('#navAccordion');
var hasActiveBtn = true;
var expandItem;
var expandTimeout;

$(window).load(function() {
	$('#teaser_slider').nivoSlider({
		effect : 'slideInLeft', // Specify sets like: 'fold,fade,sliceDown'
		animSpeed : 200, // Slide transition speed
		pauseTime : 35000, // How long each slide will show
		startSlide : 0, // Set starting Slide (0 index)
		directionNav : true, // Next & Prev navigation
		controlNav : true, // 1,2,3... navigation
		controlNavThumbs : false, // Use thumbnails for Control Nav
		pauseOnHover : true, // Stop animation while hovering
		manualAdvance : false, // Force manual transitions
		prevText : '', // Prev directionNav text
		nextText : '', // Next directionNav text
		randomStart : false, // Start on a random slide
		beforeChange : function() {
		}, // Triggers before a slide transition
		afterChange : function() {
		}, // Triggers after a slide transition
		slideshowEnd : function() {
		}, // Triggers after all slides have been shown
		lastSlide : function() {
		}, // Triggers when last slide is shown
		afterLoad : function() {
		} // Triggers when slider has loaded
	});
});

$(document).ready(function() {
	/*************Video Player Functions *********/
	var contentWdth = $('.content').width();
	$('video').css('width', contentWdth + 'px');
	projekktor('video', {
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
	/************ Nav Functions *************/
	/* Call accordionToggle function if .collapsible is hovered for 300 millisecs */
	$(navMain).find('ul > .collapsible').hover(function() {
		expandItem = $(this);
		expandTimeout = setTimeout(accordionToggle, 300);
	}, stopAnimation);
	/* Collapse active Item with some timeout on mouseleave*/
	$(navMain).mouseleave(function() {
		if ($(navMain).hasClass('no-active-btn')) {
			hasActiveBtn = false;
		}
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
	/*************Home Page Functions*********/
	var slider = $('.teaser-slider');
	setTimeout(function() {
		var contrlElem = $('.nivo-control');
		$(contrlElem).text('');
	}, 400);

	/*************Home Page Functions End*********/
	/*************Detail Pages Info-Wrapper Functions*********/
	var infoWrapper = $('.info-wrapper');
	var infoContent = $(infoWrapper).find('.info-content');
	var infoWrapperH = $(infoWrapper).height();
	var infoContentH = $(infoContent).height();
	if (infoWrapperH < infoContentH) {
		infoWrapper.css('height', '407px');
	}
	/*************Detail Pages Info-Wrapper Functions End*********/
	/*************Topic Page Functions *****************/
	/*************Overlay Functions *****************/
	var addTopicTile = $("#add_topic_tile");
	var addTopicOverlay = $('#add_topic_overlay');
	$(addTopicTile).click(function() {
		overlayToggle(addTopicOverlay);
	});
	/*************Overlay Functions End*****************/
	/*************Topic Page Functions End*****************/
	/*************Live Page Functions*****************/
	/*************Overlay Functions *****************/
	var pageLive = $('#page_live');
	var showClipTeaserTiles = $(pageLive).find(".live-rel-teaser-tile");
	//Toggle Overlay depending on id of clicked tile and open the matching overlay by comparing the IDs
	$(showClipTeaserTiles).each(function() {
		$(this).click(function() {
			var topicId = $(this).attr('id');
			var clipTeaserOverlay = $('#' + topicId + '_overlay');
			overlayToggle(clipTeaserOverlay);
		});
	});
	/*************Overlay Functions End*****************/
	/*************Live Page Functions End*****************/
	/*************Jobs Page Functions*****************/
	/*************Overlay Functions *****************/
	var showInfoTile = $("#show_jobs_info");
	var jobsInfoOverlay = $('#jobs_info_overlay');
	$(showInfoTile).click(function() {
		overlayToggle(jobsInfoOverlay);
	});
	var jobTiles = $('.jobs-teaser-tile');
	//Toggle Overlay depending on id of clicked tile and open the matching overlay by comparing the IDs
	$(jobTiles).each(function() {
		$(this).click(function() {
			var jobId = $(this).attr('id');
			var jobApplyOverlay = $('#' + jobId + '_overlay');
			overlayToggle(jobApplyOverlay);
		});
	});
	/*************Overlay Functions End*****************/
	/*************Jobs Page Functions End*****************/
	/*************Search Page Functions *****************/
	var filterBtn = [];
	filterBtn.push($('#filter_clips_btn'));
	filterBtn.push($('#filter_broadcasts_btn'));
	$(filterBtn).each(function() {
		$(this).click(function() {
			toggleSearchFilters(this);
		});
	});
	/*************Search Page Functions End*****************/
	/*call functions */
	resizeInfoWrapper();
});
/*document.ready end */

/**************** WINDOW RESIZE *********************/
$(window).resize(function() {
	/*resize video player*/
	var contentWdth = $('.content').width();
	$('.projekktor').css('width', contentWdth + 'px');
	/*call functions */
	resizeInfoWrapper();
});
/***********************WINDOW RESIZE END ********************/
/*************Nav Accordion Toggle Functions *****************/
/* expand hovered Item and collapse former activeItem */
function accordionToggle() {
	activeItem = $(navMain).find('ul > .active');
	if ($(activeItem).hasClass('search-btn')) {
		var searchResLayer = $('#search_results_layer');
		$(searchResLayer).removeClass('has-results').addClass('no-results');
		$(navAccordion).css('overflow', 'hidden');
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
	if (hasActiveBtn == true) {
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
	}

	$(activeItem).removeClass('active');
	activeItem = expandItem;
	$(activeItem).addClass('active');
	hasActiveBtn = true;
	/*set focus on search input if search is active element*/
	if ($(activeItem).hasClass('search-btn')) {
		var searchInput = $(activeItem).find('#search_input');
		$(searchInput).focus();
		searchLayerToggle(searchInput);
	}
}

function stopAnimation() {
	clearTimeout(expandTimeout);
}

/*************Nav Accordion Toggle Functions End *****************/
/*************Search Layer Functions *****************/
function searchLayerToggle(searchInput) {
	var searchResLayer = $('#search_results_layer');
	$(searchInput).bind("change paste keyup", function() {
		if ($(searchInput).val() == '') {
			if ($(searchResLayer).hasClass('has-results')) {
				$(searchResLayer).removeClass('has-results').addClass('no-results');
				$(navAccordion).css('overflow', 'hidden');
			}
		} else {
			if ($(searchResLayer).hasClass('no-results')) {
				$(searchResLayer).removeClass('no-results').addClass('has-results');
				$(navAccordion).css('overflow', 'visible');
			}
		}
	});
}

/*************Search Layer Functions End *****************/
/*************Search Page Functions *****************/
function toggleSearchFilters(filterBtn) {
	var filterType = $(filterBtn).attr('id');
	filterType = filterType.split('_');
}

/*************Search Page Functions End*****************/
/***********************overlay functions********************/
function overlayToggle(overlay) {
	var closeOverlay = [];
	var overlayContent = overlay.find('.overlay-content');
	var overlayCloseIcon = overlayContent.find('.overlay-close-btn');
	if (overlayContent.find('.close-overlay-btn')) {
		var overlayCloseBtn = overlayContent.find('.close-overlay-btn');
		closeOverlay.push($(overlayCloseBtn));
	}
	closeOverlay.push($(overlay));
	closeOverlay.push($(overlayCloseIcon));
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
