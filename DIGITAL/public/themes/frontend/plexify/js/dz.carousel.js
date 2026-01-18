const plexifyCarousel = function(){
	
  const handleServiceSwiper = function () {
    const swiper = new Swiper(".services-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        700: {
          slidesPerView: 2,
        },
        1150: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    });
  };

  const handleBrandSwiper = () => {
    new Swiper(".brand-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        360: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 5,
        },
      },
    });
  };

  const handleBrandSwiper2 = () => {
    const swiper = new Swiper(".brand-swiper2", {
      speed: 1500,
      parallax: true,
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        360: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
      },
    });
  };

  const handleBlogSwiper = () => {
    const swiper = new Swiper(".blog-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 35,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        567: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 35,
        },
      },
    });
  };

  function productGallerySwiper1() {
    const gallerySwiperEl = document.querySelector(".product-gallery-swiper");
    if (gallerySwiperEl) {
      const swiper = new Swiper(".product-gallery-swiper", {
        spaceBetween: 10,
        slidesPerView: 2,
        pagination: {
          el: ".swiper-pagination-trading",
        },
      });

      const swiper2 = new Swiper(".product-gallery-swiper2", {
        spaceBetween: 0,
        updateOnWindowResize: true,
        navigation: {
          nextEl: ".gallery-button-next",
          prevEl: ".gallery-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });
    }
  }

  const productDetails = () => {
    const thumbsSwiper = new Swiper(".product-detail-thumbs", {
      spaceBetween: 0,
      slidesPerView: 1,
      freeMode: true,
      effect: "fade",
      loop: true,
      watchSlidesProgress: true,
    });

    const mainSwiper = new Swiper(".product-detail", {
      spaceBetween: 10,
      slidesPerView: 1,
      breakpoints: {
        567: {
          spaceBetween: 10,
          slidesPerView: 1,
        },
        767: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
        1025: {
          spaceBetween: 54,
          slidesPerView: 3,
        },
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  };
  
  const teamSwiper = () => {
    const swiper = new Swiper(".team-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        567: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1025: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      },
    });
  };
  
  const handleBlogSwiper2 = () => {
    const swiper = new Swiper(".blog-swiper-2", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 35,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        567: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      },
    });
  };

  const handleTestimonialSwiper = function () {
    const wrapper = document.querySelector(".testimonial-swiper-wrapper");
    if (!wrapper) return;

    const testimonialThumbs = new Swiper(".testimonial-thumbs", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
      },
    });

    new Swiper(".testimonial-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      thumbs: {
        swiper: testimonialThumbs,
      },
    });
  };

  const servicesDetails = () => {
		const servicesDetails = new Swiper(".services-details", {
		  spaceBetween: 20,
		  slidesPerView: 1,
		  breakpoints: {
			567: {
			  slidesPerView: 1,
			},
			767: {
			  slidesPerView: 2,
			},
			1200: {
			  slidesPerView: 3,
			},
			1400: {
			  slidesPerView: 4,
			},
			1800: {
			  slidesPerView: 5,
			},
		  },
		  loop: true,
		  pagination: {
			el: ".swiper-pagination",
		  },
		 
		});
		
	};

  const teamDetails = () => {
		const teamDetails = new Swiper(".tema-details", {
		  spaceBetween: 20,
		  slidesPerView: 1,
		  breakpoints: {
			567: {
			  slidesPerView: 1,
			},
			767: {
			  slidesPerView: 3,
			},
		  },
		  loop: true,
		  pagination: {
			el: ".swiper-pagination",
		  },
		 
		});
		
	};

  const tipsDetails = () => {
		const tipsDetails = new Swiper(".tips-details", {
		  spaceBetween: 20,
		  slidesPerView: 1,
		  breakpoints: {
        567: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 1,
        },
        1200: {
          slidesPerView: 1,
        },
		  },
		  loop: true,
		  pagination: {
			  el: ".swiper-pagination",
		  },
		});
	};
	
	

  return {
    load() {
      handleServiceSwiper();
      handleBrandSwiper();
      handleBrandSwiper2();
      handleBlogSwiper();
      productGallerySwiper1();
      productDetails();
      teamSwiper();
      handleBlogSwiper2();
      handleTestimonialSwiper();
      servicesDetails();
      teamDetails();
      tipsDetails();
    },
  };
};

window.addEventListener("load", function () {
  plexifyCarousel().load();
});
