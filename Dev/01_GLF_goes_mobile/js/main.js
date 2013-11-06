/*Define global vars */
var activeItem;
var navMain = $('.nav-main');
var deskNav = $('#navDeskMain');
var mobNav = $('#navMobileMain');
var navAccordion = $('.nav-accordion');
var hasActiveBtn = true;
var expandItem;
var expandTimeout;
var mobileNav = false;
var navDInitialized = false;
var navMInitialized = false;
var tabsInitialized = false;
var filterInitialized = false;
var filterHeight;

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
	// Initialise noUiSlider
	$("#filter-range-slider").noUiSlider({
		start : [20, 80],
		range : [0, 100],
		connect : true,
		handles : 2
	});
	/*************Video Player Functions End*********/

	/*************Footer Functions *************/
	$('#show_contact_layer').click(function() {
		var contactLayer = $('#contact_layer');
		overlayToggle(contactLayer);
	});
	/*************Footer Functions End*************/

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

	/************** Only for Testing Functions End*****************/
	/*************Home Page Functions*********/
	$('.nivo-control').livequery(function() {
		$(this).text('');
	});
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
	$("#add_topic_tile").click(function() {
		var addTopicOverlay = $('#add_topic_overlay');
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
	$("#show_jobs_info").click(function() {
		var jobsInfoOverlay = $('#jobs_info_overlay');
		overlayToggle(jobsInfoOverlay);
	});
	//Toggle Overlay depending on id of clicked tile and open the matching overlay by comparing the IDs
	$('.jobs-teaser-tile').each(function() {
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
	filterBtn.push($('#filter_all_btn'));
	$(filterBtn).each(function() {
		$(this).click(function() {
			toggleSearchFilters(this);
		});
	});
	/*************Search Page Functions End*****************/
	/*call functions */
	resizeInfoWrapper();
	detectWidth();
});
/*document.ready end */

/**************** WINDOW RESIZE *********************/
$(window).bind('resize', function(e) {
	/*resize video player*/
	var contentWdth = $('.content').width();
	$('.projekktor').css('width', contentWdth + 'px');
	/*Set Timeout to wait for resize End*/
	if (window.RT)
		clearTimeout(window.RT);
	window.RT = setTimeout(function() {
		resizeInfoWrapper();
		detectWidth();
	}, 300);
});
/***********************WINDOW RESIZE END ********************/
function detectWidth() {
	var initNav = false;
	var searchBtn = $('.search-btn');
	$(navMain).removeAttr('style');
	$('.nav-btn-wrapper').removeAttr('style');
	if ($(window).width() <= 1035) {
		$(deskNav).addClass('hidden');
		$(mobNav).removeClass('hidden');
		mobileNav = true;
	} else {
		$(deskNav).removeClass('hidden');
		$(mobNav).addClass('hidden');
		mobileNav = false;
	}
	if (navMInitialized == false || navDInitialized == false) {
		navFunctions();
	}
	if ($(window).width() <= 640) {
		if (tabsInitialized == false) {
			tabsFunction();
		}
		if (filterInitialized == false) {
			filterToggle();
		}
	}
	if ($(window).width() > 640 && tabsInitialized == true) {
		removeTabsFunction();
	}
}

function navFunctions() {
	var DeskNavBtnWrapper = $(deskNav).find('.nav-btn-wrapper');
	if (mobileNav == false) {
		navDInitialized = true;
		/* Call accordionToggle function if .collapsible is hovered for 300 millisecs */
		$(deskNav).find('.collapsible').hover(function() {
			expandItem = $(this);
			//Call function if duration of hover state is more than 300ms
			expandTimeout = setTimeout(NavDesktopToggle, 300);
		}, stopAnimation);
		/* Collapse active Item with some timeout on mouseleave*/
		$(deskNav).mouseleave(function() {
			//if nav item of visited page isn't collapsible, it should be toggled to single width
			if ($(deskNav).hasClass('no-active-btn')) {
				hasActiveBtn = false;
			}
			//Expand nav item of visited page
			$(DeskNavBtnWrapper).each(function(index, elem) {
				if ($(elem).hasClass('visited')) {
					expandItem = elem;
				}
			});
			setTimeout(function() {
				NavDesktopToggle();
			}, 400);
		});
	}
	if (mobileNav == true) {
		navMInitialized = true;
		var navWidth = '310px';
		var menuBtn = $('#nav_menu_btn');
		//Slide Nav in on click on Menu Button
		$(menuBtn).click(function() {
			var rightVal = '0px';
			if ($(mobNav).hasClass('off')) {
				rightVal = '0px';
				$(menuBtn).animate({
					right : navWidth
				}, {
					duration : 400,
					queue : false
				});
				$(mobNav).toggleClass('off');
			} else {
				rightVal = '-310px';
				$(menuBtn).animate({
					right : '0px'
				}, {
					duration : 400,
					queue : false,
					complete : function() {
						$(mobNav).toggleClass('off');
					}
				});
			}
			$(mobNav).animate({
				right : rightVal
			}, {
				duration : 400,
				queue : false
			});
		});
		$(mobNav).find('.collapsible').click(function() {
			expandItem = $(this);
			NavMobileToggle();
		});
		searchLayerToggle();
	}
}

/*************Nav Accordion Toggle Functions *****************/

/* expand hovered Item and collapse former activeItem */
function NavMobileToggle() {
	//active Item is the Nav Item which is expanded at the moment the nav clicked
	activeItem = $(mobNav).find('.collapsible.active');
	var collapseAll = false;
	if ($(activeItem).is(expandItem)) {
		collapseAll = true;
	}
	$(activeItem).animate({
		height : "41px"
	}, {
		duration : 300,
		queue : false
	});
	if (collapseAll == false) {
		$(expandItem).animate({
			height : "127px"
		}, {
			duration : 300,
			queue : false,
		});
	}
	$(activeItem).removeClass('active');
	activeItem = expandItem;
	if (collapseAll == false) {
		$(activeItem).addClass('active');
	}
	collapseAll = false;
}

/* expand hovered Item and collapse former activeItem */
function NavDesktopToggle() {
	//active Item is the Nav Item which is expanded at the moment the nav hovered
	activeItem = $(deskNav).find('.collapsible.active');
	if ($(activeItem).hasClass('search-btn')) {
		$(activeItem).css('overflow', 'hidden');
		$(activeItem).animate({
			width : "72px"
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
				queue : false,
			});
		} else {
			$(expandItem).animate({
				width : "379px"
			}, {
				duration : 300,
				queue : false,
			});
		}
	}
	$(activeItem).removeClass('active');
	activeItem = expandItem;
	$(activeItem).addClass('active');
	hasActiveBtn = true;
	searchLayerToggle();
}

function stopAnimation() {
	clearTimeout(expandTimeout);
}

/*************Nav Accordion Toggle Functions End *****************/
/*************Search Layer Functions *****************/
function searchLayerToggle() {
	var activeNav;
	if (mobileNav == true) {
		var activeNav = $(mobNav);
	}
	if (mobileNav == false) {
		var activeNav = $(deskNav);
	}
	var searchInput = $(activeNav).find('.search-input');
	var searchResLayer = $(activeNav).find('.search-results-layer');
	var navBtnSearch = $(activeNav).find('.search-btn');
	if ($(navBtnSearch).hasClass('active') || mobileNav == true) {
		$(searchInput).focus();
		$(searchInput).bind("change paste keyup", function() {
			if ($(searchInput).val() == '') {
				if ($(searchResLayer).hasClass('has-results')) {
					$(searchResLayer).removeClass('has-results').addClass('no-results');
				}
			} else {
				if ($(searchResLayer).hasClass('no-results')) {
					$(searchResLayer).removeClass('no-results').addClass('has-results');
				}
			}
		});
		setTimeout(function() {
			$(navAccordion).css('overflow', 'visible');
			$(navBtnSearch).css('overflow', 'visible');
			$(searchResLayer).removeClass('hidden');
		}, 300);
	} else {
		$(navAccordion).css('overflow', 'hidden');
		$(navBtnSearch).css('overflow', 'hidden !important');
		$(searchResLayer).addClass('hidden');
		$(searchInput).blur();
	}

}

/*************Search Layer Functions End *****************/
/*************Search Page Functions *****************/
function toggleSearchFilters(filterBtn) {
	var filterType = $(filterBtn).attr('id');
	filterType = filterType.split('_');
	var filterToggleId = '#filter_' + filterType[1] + '_wrapper';
	var filterTypeWrapper = $('.filter-type-wrapper');
	if ($(filterToggleId)) {
		var filterToggle = $(filterToggleId);
		var filterMargin = 100;
		var filterWrapper = $('.filter-wrapper');
		$('.filter-toggle').addClass('hidden');
		$(filterToggle).removeClass('hidden');
		filterHeight = $(filterToggle).height() + $(filterTypeWrapper).height() + filterMargin;
		//100 px margin bottom
		$(filterWrapper).animate({
			height :filterHeight
		}, 200);
	}
	$(filterTypeWrapper).find('.filter-btn').removeClass('active');
	$(filterBtn).addClass('active');
}

/*************Search Page Functions End*****************/

/***********************overlay functions********************/
function overlayToggle(overlay) {
	var submitBtn = [];
	var overlayForm = overlay.find('.overlay-form-content');
	var overlaySubmitContent = overlay.find('.overlay-form-submitted-content');
	submitBtn.push(overlay.find('input[type="submit"]'));
	submitBtn.push(overlay.find('.reload-form'));
	$(submitBtn).each(function() {
		$(this).click(function() {
			$(overlayForm).toggleClass('visible').toggleClass('hidden');
			$(overlaySubmitContent).toggleClass('visible').toggleClass('hidden');
		});
	});

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
		$(this).click(200, function() {
			$(overlay).fadeOut(function() {
				$('body').css('overflow', 'auto');
				$(overlay).removeClass('active');
				$(overlayForm).toggleClass('visible').toggleClass('hidden');
				$(overlaySubmitContent).toggleClass('visible').toggleClass('hidden');
			});
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
/*************Tabs on small Screen Functions*********/
function tabsFunction() {
	tabsInitialized = true;
	var tabs = $('.tab-btn');
	var tabActive = $('.tab-btn.active');
	var tabTxt = $(tabs).find('.tab-text');
	$(tabTxt).each(function() {
		var refTo = $(this).attr('href');
		$(refTo).addClass('hidden');
	});
	var tabContentActive = $(tabActive).find('.tab-text').attr('href');
	$(tabContentActive).removeClass('hidden').addClass('active');
	$(tabs).click(function(e) {
		if ($(this).is(tabActive)) {
			return;
		} else {
			$(tabActive).removeClass('active');
			$(tabContentActive).removeClass('active').addClass('hidden');
			tabActive = $(this);
			$(tabActive).addClass('active');
			var tabContent = $(tabActive).find('.tab-text').attr('href');
			tabContentActive = $(tabContent);
			$(tabContentActive).addClass('active').removeClass('hidden');
			//Prevent scrolling on click
			return false;
		}
	});
}

function removeTabsFunction() {
	tabsInitialized = false;
	var tabs = $('.tab-btn');
	var tabTxt = $(tabs).find('.tab-text');
	$(tabTxt).each(function() {
		var refTo = $(this).attr('href');
		$(refTo).removeClass('hidden');
	});
}

/*************Tabs on small Screen Functions End*********/
/*************Filter Toggle small Screen Functions End*********/
function filterToggle() {
	filterInitialized = true;
	var toggleTo;
	var filterWrapper = $('.filter-wrapper');
	var filterToggleBtn = $('.filter-toggle-btn');
	filterHeight = $(filterWrapper).height();
	$(filterWrapper).addClass('expanded');
	$(filterToggleBtn).click(function() {
		if ($(filterWrapper).hasClass('expanded')) {
			console.log('expa');
			toggleTo = '20px';
		} else if ($(filterWrapper).not('.expanded')) {
			console.log('not expa');
			toggleTo = filterHeight;
		}
		$(filterWrapper).animate({
			height : toggleTo
		}, 200).toggleClass('expanded');
	});

}

/*************Filter Toggle small Screen Functions End*********/

