
$(document).ready(function() {
  // console.log("jquery ready");
		$(document).delegate('.open', 'click', function(event){
      // console.log("open clicked")
			$(this).addClass('opened');
			event.stopPropagation();
		})
		$(document).delegate('body', 'click', function(event) {
      // console.log("open class removed")

			$('.open').removeClass('opened');
		})
		$(document).delegate('.cls', 'click', function(event){
      // console.log("cls clicked")

			$('.open').removeClass('opened');
			event.stopPropagation();
		});
	});
