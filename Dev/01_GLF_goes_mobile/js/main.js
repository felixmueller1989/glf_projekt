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
		expandItem = $('.visited').parents('.nav-btn-wrapper');
		setTimeout(function() {
			accordionToggle();
			/*if ($(activeItem).hasClass('search-btn')) {
			 $(activeItem).animate({
			 width : "73px"
			 }, {
			 duration : 300,
			 queue : false
			 });
			 /*remove focus of search Input */
			/*$(activeItem).find('#searchInput').blur();
			 } else {
			 $(activeItem).animate({
			 width : "126px"
			 }, {
			 duration : 300,
			 queue : false
			 });
			 }
			 $(activeItem).removeClass('active');
			 */
		}, 400);
	});
	/************* Nav Functions End ***********/
	/*call functions */
	sliderSize();
	teaserTileSize();
});
/*document.ready end */

/**************** WINDOW RESIZE *********************/
$(window).resize(function() {
	/*call functions */
	sliderSize();
});
/***********************WINDOW RESIZE END ********************/

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
