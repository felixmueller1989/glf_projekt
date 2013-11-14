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
var tileHeightChanged = false;
var label_left = $(document.createElement('span'));
var label_right= $(document.createElement('span'));
var semRangeValue = new Array();
var semRangeText =['WS1','SoSe1','WS2','SoSe2','WS3','SoSe3','WS4','SoSe4','WS5','SoSe5','WS6','SoSe6'];

$(window).load(function() {
	$('.flexslider').flexslider({
		animation : "fade",
		slideshowSpeed : 7000,
		animationSpeed : 600,
		prevText : " ",
		nextText : " ",
	});

	/*Set Filter Range Slider*/
	$('#filter-range-slider').noUiSlider({
		start: [5, 10]
		,range: [0, 11]
		,step: 1
		,connect: true
		,handles: 2
		,slide: function(){
			semRangeValue = $(this).val();
			createLabels(semRangeValue);
		}
	});
	filterRangeInit();
	/*Set Filter Range Slider End*/
});

$(document).ready(function() {
	/*************Video Player Functions *********/
	var contentWdth = $('.content').width();
	//set width of video = width of content area
	$('video').css('width', contentWdth + 'px');
	//init video player plugin
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

	/*************Detail Pages Info-Wrapper Functions*********/
	var infoWrapper = $('.info-wrapper');
	var infoContent = $(infoWrapper).find('.info-content');
	var infoWrapperH = $(infoWrapper).height();
	var infoContentH = $(infoContent).height();
	//set height of contentwrapper depending on the amount of content
	if (infoWrapperH < infoContentH) {
		infoWrapper.css('height', '407px');
	}
	/*************Detail Pages Info-Wrapper Functions End*********/
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

	$('.call-modal').click(function() {
		console.log('click');
	});
	/*************Search Page Functions End*****************/
	/*call functions */
	resizeInfoWrapper();
	detectWidth();
	testing();
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
	var winW = $(window).width();
	var searchBtn = $('.search-btn');
	var pageWrapper = $('.page-wrapper');
	$(navMain).removeAttr('style');
	$('.nav-btn-wrapper').removeAttr('style');
	if (winW <= 1035) {
		$(deskNav).addClass('hidden');
		$(mobNav).removeClass('hidden');
		$(pageWrapper).addClass('mobile');
		mobileNav = true;
	} else if (winW > 1035) {
		$(deskNav).removeClass('hidden');
		$(mobNav).addClass('hidden').removeClass('pushy-open').addClass('pushy-left').removeAttr('style');
		$(pageWrapper).removeClass('mobile');
		$('body').removeClass('pushy-active').removeAttr('style');
		$('.content-wrapper').removeClass('container-push').removeAttr('style');
		$('header').removeClass('push-push').removeAttr('style');
		mobileNav = false;
	}
	if (!navMInitialized || !navDInitialized) {
		navFunctions();
	}
	if (winW <= 640) {
		if (!tabsInitialized) {
			tabsFunction();
		}
		if (!filterInitialized) {
			filterToggle();
		}
	}
	if (winW > 640 && tabsInitialized) {
		removeTabsFunction();
	}
	if (winW > 440 && tileHeightChanged) {
		$('.tile').removeAttr('style');
	}
	if (winW <= 440) {
		resizeTiles();
	}
}

function navFunctions() {
	//if nav item of visited page isn't collapsible, it should be toggled to single width
	if ($(navMain).hasClass('no-active-btn')) {
		hasActiveBtn = false;
	}
	if (!mobileNav) {
		navDInitialized = true;
		var DeskNavBtnWrapper = $(deskNav).find('.nav-btn-wrapper');
		/* Call accordionToggle function if .collapsible is hovered for 300 millisecs */
		$(deskNav).find('.collapsible').hover(function() {
			expandItem = $(this);
			//Call function if duration of hover state is more than 300ms
			expandTimeout = setTimeout(NavDesktopToggle, 300);
		}, stopAnimation);
		/* Collapse active Item with some timeout on mouseleave*/
		$(deskNav).mouseleave(function() {
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
	if (mobileNav) {
		navMInitialized = true;
		$(mobNav).find('.collapsible').click(function() {
			expandItem = $(this);
			NavMobileToggle();
		});
		searchLayerToggle();
	}
}

/*************Nav Accordion Toggle Functions *****************/

/* expand hovered Item and collapse former activeItem*/
function NavMobileToggle() {
	//active Item is the Nav Item which is expanded at the moment the nav clicked
	activeItem = $(mobNav).find('.collapsible.active');
	$(activeItem).animate({
		height : "50px"
	}, {
		duration : 300,
		queue : false
	});
	$(expandItem).animate({
		height : "146px"
	}, {
		duration : 300,
		queue : false,
	});
	$(activeItem).removeClass('active');
	activeItem = expandItem;
	$(activeItem).addClass('active');
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
	if (hasActiveBtn) {
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
	if (mobileNav) {
		var activeNav = $(mobNav);
	}
	if (!mobileNav) {
		var activeNav = $(deskNav);
	}
	var searchInput = $(activeNav).find('.search-input');
	var searchResLayer = $(activeNav).find('.search-results-layer');
	var navBtnSearch = $(activeNav).find('.search-btn');
	if ($(navBtnSearch).hasClass('active') || mobileNav) {
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
			height : filterHeight
		}, 200);
	}
	$(filterTypeWrapper).find('.filter-btn').removeClass('active');
	$(filterBtn).addClass('active');
}

/*************Search Page Functions End*****************/

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
			if ($(window).width() <= 440 && $(tabContentActive).is('.related-tile-wrapper')) {
				resizeTiles();
			}
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
			toggleTo = '39px';
		} else if ($(filterWrapper).not('.expanded')) {
			toggleTo = filterHeight;
		}
		$(filterWrapper).animate({
			height : toggleTo
		}, 200).toggleClass('expanded');
	});

}

/*************Filter Toggle small Screen Functions End*********/
/*************Resize Tile small Screen Functions*********/
function resizeTiles() {
	tileHeightChanged = true;
	var tile = $('.tile.teaser-tile');
	var tileWdth = $(tile).width();
	var tileHght = tileWdth / 2;
	$(tile).css('height', tileHght);
}

/*************Resize Tile small Screen Functions End*********/
/************** Only for Testing Functions *****************/
function testing() {
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
}

/************** Only for Testing Functions End*****************/
/*************Filter Range Slider Functions *****************/
function createLabels(semRangeValue){
        
        $(label_left).appendTo('#filter-range-slider');
        $(label_right).appendTo('#filter-range-slider');

        for (var i=0; i <= semRangeText.length;i++){
                console.log(semRangeValue[0]);
                console.log(semRangeText[i]);
                if(semRangeValue[0] == i){
                        $(label_left).text(semRangeText[i]);
                }
                if(semRangeValue[1] == i){
                        $(label_right).text(semRangeText[i]);
                }
        }
}
function filterRangeInit(){
        semRangeValue = $('#filter-range-slider').val();
        
        $(label_left).addClass('noUi-handle-lower-label');
        $(label_right).addClass('noUi-handle-upper-label');

        $(label_left).addClass('noUi-handle-label');
        $(label_right).addClass('noUi-handle-label');

        $(label_left).appendTo('#filter-range-slider');
        $(label_right).appendTo('#filter-range-slider');

        for (var i=0; i <= semRangeText.length;i++){
                console.log(semRangeValue[0]);
                console.log(semRangeText[i]);
                if(semRangeValue[0] == i){
                        $(label_left).text(semRangeText[i]);
                }
                if(semRangeValue[1] == i){
                        $(label_right).text(semRangeText[i]);
                }
        }
}
/************Filter Range Slider Functions End*********/