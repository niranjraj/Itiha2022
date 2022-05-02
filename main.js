AOS.init({
 	duration: 800,
 	easing: 'ease',
 	once: true,
 	offset: -100
});

jQuery(function($) {
	
	'use strict';
	loader();
	siteMenuClone();
	mobileToggleClick();
	onePageNavigation();
	siteIstotope();
	floatingLabel();
	scrollWindow();

	jarallaxPlugin();
	contactForm();
	stickyFillPlugin();
	animateReveal();

});

var siteIstotope = function() {
	var $container = $('#posts').isotope({
    itemSelector : '.item',
    isFitWidth: true
  });

  $(window).resize(function(){
    $container.isotope({
      columnWidth: '.col-sm-3'
    });
  });
  
  $container.isotope({ filter: '*' });

  $('#filters').on( 'click', 'a', function(e) {
  	e.preventDefault();
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
    $('#filters a').removeClass('active');
    $(this).addClass('active');
  });

  $container.imagesLoaded()
  .progress( function() {
    $container.isotope('layout');
  })
  .done(function() {
  	$('.gsap-reveal-img').each(function() {
			var html = $(this).html();
			$(this).html('<div class="reveal-wrap"><span class="cover"></span><div class="reveal-content">'+html+'</div></div>');
		});

  	var controller = new ScrollMagic.Controller();

  	var revealImg = $('.gsap-reveal-img');

  	if ( revealImg.length ) {
  		var i = 0;
			revealImg.each(function() {

				var cover = $(this).find('.cover'),
					revealContent = $(this).find('.reveal-content'),
					img = $(this).find('.reveal-content img');


				var tl2 = new TimelineMax();


				setTimeout(function() {

					tl2
						tl2.set(img, {  scale: '2.0', autoAlpha: 1, })
						.to(cover, 1, { marginLeft: '0', ease:Expo.easeInOut, onComplete() {
							tl2.set(revealContent, { autoAlpha: 1 });
							tl2.to(cover, 1, { marginLeft: '102%', ease:Expo.easeInOut });
							tl2.to(img, 2, { scale: '1.0', ease:Expo.easeOut }, '-=1.5');
						} } )

				}, i * 700);

				

				var scene = new ScrollMagic.Scene({
					triggerElement: this,
					duration: "0%",
					reverse: false,
					offset: "-300%",
				})
				.setTween(tl2)
				.addTo(controller);

				i++;

			});
		}
  })

  $('.js-filter').on('click', function(e) {
  	e.preventDefault();
  	$('#filters').toggleClass('active');
  });

}

var loader = function() {
	setTimeout(function() {
		TweenMax.to('.site-loader-wrap', 1, { marginTop: 50, autoAlpha: 0, ease: Power4.easeInOut });
  }, 10);
  $(".site-loader-wrap").delay(200).fadeOut("slow");
	$("#unslate_co--overlayer").delay(200).fadeOut("slow");	
}

var siteMenuClone = function() {

	setTimeout(function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-inner');
		});
		
		var counter = 0;
    $('.unslate_co--site-mobile-menu .has-children').each(function(){
      var $this = $(this);
      
      $this.prepend('<span class="arrow-collapse collapsed">');

      $this.find('.arrow-collapse').attr({
        'data-toggle' : 'collapse',
        'data-target' : '#collapseItem' + counter,
      });

      $this.find('> ul').attr({
        'class' : 'collapse',
        'id' : 'collapseItem' + counter,
      });

      counter++;

    });

  }, 1000);

	$('body').on('click', '.arrow-collapse', function(e) {
    var $this = $(this);
    if ( $this.closest('li').find('.collapse').hasClass('show') ) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }
    e.preventDefault();  
    
  });

	$(window).resize(function() {
		var $this = $(this),
			w = $this.width();

		if ( w > 768 ) {
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
			}
		}
	});

	$('.js-burger-toggle-menu').click(function(e){
		e.preventDefault();
		if ( $('body').hasClass('offcanvas') ) {
  		$('body').removeClass('offcanvas');
  		$('.js-burger-toggle-menu').removeClass('open');
  	} else {
  		$('body').addClass('offcanvas');	
  		$('.js-burger-toggle-menu').addClass('open');
  	}
  });

}; 




// var siteIstotope = function() {


	  
	
// }



var floatingLabel = function () {
	$('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});
};



// scroll
var scrollWindow = function() {
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.unslate_co--site-nav');
				// sd = $('.js-scroll-wrap');

		if (st > 150) {
			if ( !navbar.hasClass('scrolled') ) {
				navbar.addClass('scrolled');	
			}
		} 
		if (st < 150) {
			if ( navbar.hasClass('scrolled') ) {
				navbar.removeClass('scrolled sleep');
			}
		} 
		if ( st > 350 ) {
			if ( !navbar.hasClass('awake') ) {
				navbar.addClass('awake');	
			} 

			// hide / show on scroll
			if (st > lastScrollTop){
	      // downscroll code
	      navbar.removeClass('awake');	
	      navbar.addClass('sleep');	
	   	} else {
	      // upscroll code
	      navbar.addClass('awake');	
	   	}
	   	lastScrollTop = st;
			

		}
		if ( st < 350 ) {
			if ( navbar.hasClass('awake') ) {
				navbar.removeClass('awake');
				navbar.addClass('sleep');
			}
		}

   

	});

};
// countdown event


const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const eventTime = new Date('May 19 2022 10:00:00');

 

var  updateCountdown= function(){
	const currentTime=new Date();
	const diff=eventTime-currentTime;
	const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
	


	days.innerHTML=`${d}`;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s; 


}
setInterval(updateCountdown,1000);









var mobileToggleClick = function() {
	$('.js-menu-toggle').click(function(e) {

		e.preventDefault();

  	if ( $('body').hasClass('offcanvas') ) {
  		$('body').removeClass('offcanvas');
  		$('.js-menu-toggle').removeClass('active');
  		if ( $('.js-burger-toggle-menu').length ) {
  			$('.js-burger-toggle-menu').removeClass('open');
  		}
  	} else {
  		$('body').addClass('offcanvas');	
  		$('.js-menu-toggle').addClass('active');
  		if ( $('.js-burger-toggle-menu').length ) {
  			$('.js-burger-toggle-menu').addClass('open');
  		}
  	}


  });

  // click outisde offcanvas
	$(document).mouseup(function(e) {
    var container = $(".unslate_co--site-mobile-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('body').find('.js-menu-toggle').removeClass('active');

				$('body').find('.js-burger-toggle-menu').removeClass('open');
			}
    }
	}); 
};



// navigation
var onePageNavigation = function() {
  var navToggler = $('.site-menu-toggle');
 	$("body").on("click", ".unslate_co--site-nav .site-nav-ul li a[href^='#'], .smoothscroll[href^='#'], .unslate_co--site-mobile-menu .site-nav-wrap li a[href^='#']", function(e) {
    
    e.preventDefault();

    var $body = $('body');
    if ( $body.hasClass('offcanvas')  ) {
    	$body.removeClass('offcanvas');
    	$('body').find('.js-burger-toggle-menu').removeClass('open');
    }

    var hash = this.hash;
    
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, 'easeInOutExpo');

  });

};





var jarallaxPlugin = function() {
	$('.jarallax').jarallax({
    speed: 0.2
	});
	jarallax(document.querySelectorAll('.jarallax-video'), {
    speed: 0.2,
    videoSrc: 'https://www.youtube.com/watch?v=mwtbEGNABWU',
    videoStartTime: 8,
    videoEndTime: 70,
	});
};

var contactForm = function() {
	if ($('#contactForm').length > 0 ) {
		$( "#contactForm" ).validate( {
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				},
				message: {
					required: true,
					minlength: 5
				}
			},
			messages: {
				name: "Please enter your name",
				email: "Please enter a valid email address",
				message: "Please enter a message"
			},
			errorElement: 'span',
			errorLabelContainer: '.form-error',
			/* submit via ajax */
			submitHandler: function(form) {		
				var $submit = $('.submitting'),
					waitText = 'Submitting...';

				$.ajax({   	
			      type: "POST",
			      url: "php/send-email.php",
			      data: $(form).serialize(),

			      beforeSend: function() { 
			      	$submit.css('display', 'block').text(waitText);
			      },
			      success: function(msg) {
	               if (msg == 'OK') {
	               	$('#form-message-warning').hide();
			            setTimeout(function(){
	               		$('#contactForm').fadeOut();
	               	}, 1000);
			            setTimeout(function(){
			               $('#form-message-success').fadeIn();   
	               	}, 1400);
		               
		            } else {
		               $('#form-message-warning').html(msg);
			            $('#form-message-warning').fadeIn();
			            $submit.css('display', 'none');
		            }
			      },
			      error: function() {
			      	$('#form-message-warning').html("Something went wrong. Please try again.");
			         $('#form-message-warning').fadeIn();
			         $submit.css('display', 'none');
			      }
		      });    		
	  		}
			
		} );
	}
};

var stickyFillPlugin = function() {
	var elements = document.querySelectorAll('.unslate_co--sticky');
	Stickyfill.add(elements);
};

var animateReveal = function() {



	// var controller = new ScrollMagic.Controller();
	// var sectionHeading = $('.section-heading');


	// if ( sectionHeading.length ) {

	// sectionHeading.each(function() {

	// 		var sectionData=$(this);
	// 		sectionData[0].dataset.emergence="visible"
			
	// 		// sectionData.dataset.emergence="visible"

	// 		// var tl2 = new TimelineMax();

	// 	;
	// })
	


	// 	var scene =new ScrollMagic.Scene({
	// 	triggerElement: this,
	// 	duration: "0%", // the scene should last for a scroll distance of 100px
	// 	offset:-50 ,
	// 	reverse: false,
		
	// })
	// 	.setPin('.section-heading') // pins the element for the the scene's duration
	// 	.addTo(controller); 
	// }
	
	// var greveal = $('.gsap-reveal');

	// // gsap reveal
	// $('.gsap-reveal').each(function() {
	// 	$(this).append('<span class="cover"></span>');
	// });
	// if ( greveal.length ) {
	// 	var revealNum = 0;
	// 	greveal.each(function() {
	// 		var cover = $(this).find('.cover');

	// 		var tl = new TimelineMax();

	// 		setTimeout(function() {
	// 			tl
	// 				.fromTo(cover, 2, { skewX: 0 }, { xPercent: 101, transformOrigin: "0% 100%", ease:Expo.easeInOut })
	// 		}, revealNum * 0);
			
	// 		var scene = new ScrollMagic.Scene({
	// 			triggerElement: this,
	// 			duration: "0%",
	// 			reverse: false,
	// 			offset: "-300%",
	// 		})
	// 		.setTween(tl)
	// 		.addTo(controller);

	// 		revealNum++;

	// 	});
	// }

	// gsap reveal hero
	$('.gsap-reveal-hero').each(function() {
		var html = $(this).html();
		$(this).html('<span class="reveal-wrap"><span class="cover"></span><span class="reveal-content">'+html+'</span></span>');
	});
	var grevealhero = $('.gsap-reveal-hero');

	if ( grevealhero.length ) {
		var heroNum = 0;
		grevealhero.each(function() {

			var cover = $(this).find('.cover'),
				revealContent = $(this).find('.reveal-content');

			var tl2 = new TimelineMax();

			setTimeout(function() {

				tl2
					.to(cover, 1, { marginLeft: '0', ease:Expo.easeInOut, onComplete() {
						tl2.set(revealContent, { x: 0 });
						tl2.to(cover, 1, { marginLeft: '102%', ease:Expo.easeInOut });
					} } )
			}, heroNum * 0 );

			var scene = new ScrollMagic.Scene({
				triggerElement: this,
				duration: "0%",
				reverse: false,
				offset: "-300%",
			})
			.setTween(tl2)
			.addTo(controller);

			heroNum++;
		});
	}

}

