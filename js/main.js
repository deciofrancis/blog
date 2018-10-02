'use strict';



/*------------------
	Navigation
--------------------*/
function responsive() {
	// Responsive 
	$('.responsive').on('click', function(event) {
		$('.menu-list').slideToggle(400);
		event.preventDefault();
	});
}

(function($) {
	// Call all functions
	responsive();

})(jQuery);