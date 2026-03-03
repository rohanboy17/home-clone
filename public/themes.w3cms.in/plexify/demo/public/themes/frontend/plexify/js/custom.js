const plexify = function () {
  "use strict";

  const handleSidebarMenu = () => {
		  const menuBtn = document.querySelector(".menu-btn");
		  const fullSidenav = document.querySelector(".full-sidenav");
		  const mainBar = document.querySelector(".main-bar");
		  const menuClose = document.querySelector(".menu-close");

		  const onMenuBtnClick = function () {
			this.classList.toggle("open");
			fullSidenav?.classList.toggle("show");
			mainBar?.classList.toggle("show");
			document.body.classList.toggle("menu-btn-open", this.classList.contains("open"));
		  };

		  const onMenuCloseClick = function () {
			menuBtn?.classList.remove("open");
			fullSidenav?.classList.remove("show");
			mainBar?.classList.remove("show");
			document.body.classList.remove("menu-btn-open");
		  };

		  const updateParentHeights = (submenu) => {
			let parent = submenu.parentElement;

			while (parent) {
			  if (
				parent.classList.contains("sub-menu") ||
				parent.classList.contains("mega-menu")
			  ) {
				parent.style.maxHeight = "none";
			  }
			  parent = parent.parentElement;
			}
		  };

		  const closeSiblingMenus = (link) => {
			const li = link.closest("li");
			if (!li) return;

			const parentUL = li.parentElement;
			if (!parentUL) return;

			const listItems = parentUL.children;

			for (let item of listItems) {
			  const anchor = item.querySelector(":scope > a.dz-open");
			  if (anchor && anchor !== link) {
				anchor.classList.remove("dz-open");
				const submenu = anchor.nextElementSibling;
				if (submenu) submenu.style.maxHeight = null;
			  }
			}
		  };

		  const onFullSidenavClick = function (e) {
			const link = e.target.closest("a");
			if (!link || !fullSidenav.contains(link)) return;

			const subMenu = link.nextElementSibling;

			const hasSub =
			  subMenu &&
			  (subMenu.classList.contains("sub-menu") ||
				subMenu.classList.contains("mega-menu"));

			if (!hasSub) return;

			e.preventDefault();

			const isOpen = link.classList.contains("dz-open");

			closeSiblingMenus(link);

			if (isOpen) {

			  link.classList.remove("dz-open");
			  subMenu.style.maxHeight = null;

			  requestAnimationFrame(() => updateParentHeights(subMenu));
			} else {
	
			  link.classList.add("dz-open");

			  requestAnimationFrame(() => {
				subMenu.style.maxHeight = subMenu.scrollHeight + "px";

				requestAnimationFrame(() => updateParentHeights(subMenu));
			  });
			}
		  };

		  menuBtn?.addEventListener("click", onMenuBtnClick);
		  menuClose?.addEventListener("click", onMenuCloseClick);
		  fullSidenav?.addEventListener("click", onFullSidenavClick);

		  return function removeSidebarMenuListeners() {
			menuBtn?.removeEventListener("click", onMenuBtnClick);
			menuClose?.removeEventListener("click", onMenuCloseClick);
			fullSidenav?.removeEventListener("click", onFullSidenavClick);
		  };
		};

  const handleShopSidebar = () => {
    const shopSidebar = document.querySelector(".shop-sidebar");
    if (!shopSidebar) return;

    document.addEventListener("click", (e) => {
      const target = e.target;

      if (target.closest(".sidebar-open")) {
        shopSidebar.style.left = "0";
      }

      if (target.closest(".sidebar-close")) {
        shopSidebar.style.left = "-320px";
      }
    });
  };

  const handleAccordion = (container = document) => {
	  const accordionContainers = container.querySelectorAll(".myAccordion");

	  accordionContainers.forEach((accordion) => {
		if (accordion.dataset.bound === "true") return;
		accordion.dataset.bound = "true";

		accordion.addEventListener("click", function (e) {
		  const header = e.target.closest(".accordion-header");
		  if (!header || !accordion.contains(header)) return;

		  const item = header.parentElement;
		  const content = item.querySelector(".accordion-content");
		  const arrow = header.querySelector(".arrow");
		  const isOpen = header.classList.contains("open");

		  accordion.querySelectorAll(".accordion-header").forEach((h) => {
			if (h !== header) {
			  h.classList.remove("open");
			  h.querySelector(".arrow")?.classList.remove("active");
			  const c = h.parentElement.querySelector(".accordion-content");
			  if (c) c.style.maxHeight = null;
			}
		  });

		  if (!isOpen) {
			header.classList.add("open");
			content.style.maxHeight = content.scrollHeight + "px";
			arrow?.classList.add("active");
		  } else {
			header.classList.remove("open");
			content.style.maxHeight = null;
			arrow?.classList.remove("active");
		  }
		});
	  });
	  
	  container.querySelectorAll(".accordion-header.open").forEach((header) => {
		const content = header.parentElement.querySelector(".accordion-content");
		const arrow = header.querySelector(".arrow");
		if (content) {
		  content.style.maxHeight = content.scrollHeight + "px";
		  arrow?.classList.add("active");
		}
	  });
	};


  const handlePriceSlider = () => {
    const setupSlider = (sliderId, minValueId, maxValueId) => {
      const slider = document.getElementById(sliderId);
      if (!slider) return;

      const formatForSlider = {
        from: (formattedValue) => Number(formattedValue),
        to: (numericValue) => Math.round(numericValue),
      };

      noUiSlider.create(slider, {
        start: [40, 346],
        connect: true,
        format: formatForSlider,
        tooltips: [wNumb({ decimals: 1 }), true],
        range: { min: 0, max: 400 },
      });

      const formatValues = [
        document.getElementById(minValueId),
        document.getElementById(maxValueId),
      ];

      slider.noUiSlider.on("update", (values) => {
        formatValues[0].innerHTML = "Min Price: $" + values[0];
        formatValues[1].innerHTML = "Max Price: $" + values[1];
      });
    };

    setupSlider(
      "slider-tooltips",
      "slider-margin-value-min",
      "slider-margin-value-max"
    );
    setupSlider(
      "slider-tooltips2",
      "slider-margin-value-min2",
      "slider-margin-value-max2"
    );
  };

  const handleColorFilter = () => {
    const colorsInput = document.querySelectorAll(
      ".color-filter .form-check-input"
    );

    colorsInput.forEach((item) => {
      const color = item.value;
      const formCheck = item.closest(".form-check");
      if (formCheck) {
        const span = formCheck.querySelector("span");
        if (span) {
          span.style.backgroundColor = color;
        }
      }
    });
  
  };

  const handleTabs = () => {
	  const tabContainers = document.querySelectorAll(".custom-tab");

	  tabContainers.forEach((container) => {
		const titles = container.querySelectorAll(".tab-title");
		const contents = container.querySelectorAll(".tab-content");

		titles[0]?.classList.add("active");
		contents[0]?.classList.add("active");
		handleAccordion(contents[0]);

		container.addEventListener("click", (e) => {
      e.preventDefault();
		  const clicked = e.target.closest(".tab-title");
		  if (!clicked || !container.contains(clicked)) return;

		  titles.forEach((t, i) => {
			const isActive = t === clicked;
			t.classList.toggle("active", isActive);
			contents[i].classList.toggle("active", isActive);

			if (isActive) {
			  handleAccordion(contents[i]);
			}
		  });
		});
	  });
	};
  
  const handleServiceCard = () => {
    const wrapper = document.querySelector(".services-wrapper");

    if (!wrapper) return;

    wrapper.addEventListener("mouseover", (e) => {
      const card = e.target.closest(".service-card");
      if (!card || !wrapper.contains(card)) return;

      wrapper.querySelectorAll(".service-card.active").forEach((c) =>
        c.classList.remove("active")
      );

      card.classList.add("active");
    });
  };

  const handleThemeBtn = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dataTheme = urlParams.get('data-theme');
    const btnLight = document.querySelector(".dark-theme");
    const btnDark = document.querySelector(".light-theme");
    const html = document.querySelector("html");
 
    function setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 86400000).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
 
    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    }
 
    function applyTheme(theme,btn) {
      const currentTheme = html.classList.contains("dark") ? "dark" : "light";
        if(!btn){
      if(dataTheme){
          theme = dataTheme;
      }else {
          if (theme === currentTheme) return;
      }
        }else{
            if (theme === currentTheme) return;
        }
      
      html.classList.toggle("dark", theme === "dark");
      html.classList.toggle("light", theme === "light");
      setCookie("theme", theme, 30);
    }
    if(dataTheme){
        if(dataTheme == "light"){
          applyTheme("light");
        }
        else if(dataTheme == "dark"){
          applyTheme("dark");
        }
    }else{
        const savedTheme = getCookie("theme");
        if (savedTheme === "dark" || savedTheme === "light") {
          applyTheme(savedTheme);
        } else {
          applyTheme("dark");
        }
    }
 
    if (btnLight) {
      btnLight.addEventListener("click", () => applyTheme("light","btn"));
    }
    if (btnDark) {
      btnDark.addEventListener("click", () => applyTheme("dark","btn"));
    }
 
  };

  const handleCounterJS = function () {
    const counters = document.querySelectorAll(".value");
    const speed = 200;

    counters.forEach((counter) => {
      const animate = () => {
        const value = +counter.getAttribute("data-akhi");
        const data = +counter.innerText;

        const time = value / speed;
        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value;
        }
      };

      animate();
    });
  };

  const handleVideoPopupJS = () => {
    const dialog = document.getElementById("videoDialog");
    const container = document.getElementById("videoContainer");
    const closeBtn = document.getElementById("closeBtn");
    const videoWrapper = document.body;

    if (!dialog || !container || !closeBtn) return;

    const onOpenVideo = (e) => {
      const button = e.target.closest("button[data-type]");
      if (!button) return;

      const type = button.getAttribute("data-type");
      const src = button.getAttribute("data-src");

      if (!type || !src) return;

      openVideo(type, src);
    };

    const openVideo = (type, src) => {
      let videoHTML = "";

      if (type === "youtube" || type === "vimeo") {
        const sanitizedSrc = encodeURI(src);
        videoHTML = `<iframe src="${sanitizedSrc}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
      } else if (type === "mp4") {
        videoHTML = `<video controls autoplay><source src="${src}" type="video/mp4">Your browser does not support the video tag.</video>`;
      }

      container.innerHTML = videoHTML;
      dialog.style.display = "flex";
    };

    const closeVideo = () => {
      container.innerHTML = "";
      dialog.style.display = "none";
    };

    videoWrapper.addEventListener("click", onOpenVideo);
    closeBtn.addEventListener("click", closeVideo);

    return () => {
      videoWrapper.removeEventListener("click", onOpenVideo);
      closeBtn.removeEventListener("click", closeVideo);
    };
  };

  const handleSupport = () => {
    const script = document.createElement("script");
    script.id = "DZScript";
    script.src = "https://dzassets.s3.amazonaws.com/w3-global.js";
    document.body.appendChild(script);
  };

  const handleLightgallery = () => {
    const ids = [
      "lightgallery",
      "lightgallery2",
      "lightgallery3",
      "lightgallery4",
      "lightgallery5",
    ];

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        lightGallery(element, {
          plugins: [lgThumbnail, lgZoom],
          selector: ".lg-item",
          thumbnail: true,
          exThumbImage: "data-src",
        });
      }
    });
  };

  const handleTouchSpin = () => {
    document.addEventListener("click", function (e) {
      const button = e.target.closest(".button-plus, .button-minus");
      if (!button) return;

      const fieldName = button.getAttribute("data-field");
      if (!fieldName) return;

      const parent = button.closest("div") || button.closest("td");
      const input = parent.querySelector(`input[name="${fieldName}"]`);
      if (!input) return;

      let currentVal = parseInt(input.value, 10);

      if (button.classList.contains("button-plus")) {
        input.value = !isNaN(currentVal) ? currentVal + 1 : 0;
      } else if (button.classList.contains("button-minus")) {
        input.value = !isNaN(currentVal) && currentVal > 0 ? currentVal - 1 : 0;
      }
    });
  };

  const handleShowPass = () => {
    document.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest(".show-pass");
      if (!toggleBtn) return;

      const input = toggleBtn.parentElement.querySelector(".dz-password");
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggleBtn.classList.toggle("active", isPassword);
    });
  };

  const handleRemoveTag = () => {
    document.addEventListener("click", function (e) {
      const removeBtn = e.target.closest(".remove-tag");
      if (removeBtn) {
        const tag = removeBtn.closest(".tag");
        if (tag) {
          tag.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          tag.style.opacity = "0";
          tag.style.transform = "scale(0.95)";

          setTimeout(() => tag.remove(), 300);
        }
      }
    });
  };

  const handleLoadmore = () => {
    const loadMoreBtn = document.querySelector(".dz-load-more");

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const dzLoadMoreUrl = this.getAttribute("rel");

      const loadingIcon = document.createElement("i");
      loadingIcon.className = "fa fa-refresh";
      loadMoreBtn.appendChild(loadingIcon);

      fetch(dzLoadMoreUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          const container = document.querySelector(".loadmore-content");
          if (container) {
            container.insertAdjacentHTML("beforeend", data);
          }
          loadMoreBtn.removeChild(loadingIcon);
        })
        .catch(() => {
          if (loadingIcon.parentNode === loadMoreBtn) {
            loadMoreBtn.removeChild(loadingIcon);
          }
        });
    });
  };

  const handleButtonAnimations = () => {
    const animatedButtons = new WeakSet();

    document.querySelectorAll(".btn").forEach((button) => {
      const textElement = button.querySelector(".pxl-button-text");
      if (!textElement) return;

      const originalText = textElement.textContent.trim();
      textElement.dataset.originalText = originalText;

      button.addEventListener("mouseenter", () => {
        if (animatedButtons.has(button)) return;
        animatedButtons.add(button);

        const wrappedText = [...originalText]
          .map((char) => `<span class="letter">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        textElement.innerHTML = wrappedText;

        const letters = textElement.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      });

      button.addEventListener("mouseleave", () => {
        textElement.innerHTML = textElement.dataset.originalText;
        animatedButtons.delete(button);
      });
    });

    document.querySelectorAll(".btn-third").forEach((button) => {
      const textElement = button.querySelector(".pxl-button-text");
      if (!textElement) return;

      const originalText = textElement.textContent.trim();
      const wrappedText = [...originalText]
        .map((char) => `<span class="letter">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      textElement.innerHTML = wrappedText;

      const letters = textElement.querySelectorAll(".letter");
      letters.forEach((letter, index) => {
        letter.style.transitionDelay = `${index * 0.045}s`;
      });
    });
  };

  const handleHeaderOverlay = () => {
    const overlayNavbar = document.querySelector(".overlay-navbar");
    if (!overlayNavbar) return;

    const space = window.innerWidth < 1440 ? 22 : 12;
    const clipValue = overlayNavbar.offsetWidth / 2 + space;

    overlayNavbar.style.clipPath = `inset(0px 0px 0px ${clipValue}px)`;
  };

  const handleSetCurrentYear = () => {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let elements = document.getElementsByClassName("current-year");

    for (const element of elements) {
      element.innerHTML = currentYear;
    }
  };

  const handleCustomSelects = () => {
    document.querySelectorAll(".dynamic-select").forEach((selectElement) => {
      createCustomSelectFromSelect(selectElement);
    });
  };

  const createCustomSelectFromSelect = (selectElement) => {
    const selectId = selectElement.id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const customSelectDiv = document.createElement("div");
    customSelectDiv.id = `custom-${selectId}`;
    customSelectDiv.className = "custom-select";

    const selectedDiv = document.createElement("div");
    selectedDiv.className = "select-selected";
    selectedDiv.textContent = (selectElement.querySelector("option[selected]") || selectElement.options[0]).textContent;

    const labelText = selectElement.parentElement?.dataset?.label || "";
    if (labelText) {
      const label = document.createElement("span");
      label.textContent = labelText;
      selectedDiv.appendChild(label);
    }

    customSelectDiv.appendChild(selectedDiv);

    const itemsDiv = document.createElement("div");
    itemsDiv.className = "select-items select-hide";
    customSelectDiv.appendChild(itemsDiv);

    Array.from(selectElement.options).forEach((option) => {
      const customOptionDiv = document.createElement("div");
      customOptionDiv.className = "select-item";
      customOptionDiv.setAttribute("data-value", option.value);
      customOptionDiv.textContent = option.textContent;
      if (option.selected) customOptionDiv.classList.add("active");

      customOptionDiv.addEventListener("click", function () {
        selectedDiv.childNodes[0].textContent = this.textContent;
        selectElement.value = this.getAttribute("data-value");
        selectElement.dispatchEvent(new Event("change"));
        selectElement.dispatchEvent(new Event("click"));

        itemsDiv.classList.add("select-hide");
        selectedDiv.classList.remove("select-active");

        itemsDiv.querySelectorAll(".select-item").forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
      });

      itemsDiv.appendChild(customOptionDiv);
    });

    selectElement.style.display = "none";
    selectElement.parentNode.insertBefore(customSelectDiv, selectElement.nextSibling);

    selectedDiv.addEventListener("click", function (e) {
      e.stopPropagation();
      itemsDiv.classList.toggle("select-hide");
      selectedDiv.classList.toggle("select-active");
    });

    document.addEventListener("click", function (e) {
      if (!customSelectDiv.contains(e.target)) {
        itemsDiv.classList.add("select-hide");
        selectedDiv.classList.remove("select-active");
      }
    });
  };

  const handleHoverActive = () => {

    const container = document.querySelectorAll(".hover-wrapper");
    if (!container) return;
    container.forEach((wrapper) => {
      wrapper.querySelector(".hover-active");

        wrapper.addEventListener("mouseover", (e) => {
          const target = e.target.closest(".hover-active");
          if (!target || !wrapper.contains(target)) return;

          wrapper.querySelectorAll(".hover-active.active").forEach((el) => {
            el.classList.remove("active");
          });

          target.classList.add("active");
        });
    });
  };

  const handleStarRating = () => {
    const starRatingElements = document.querySelectorAll(".star-rating-old");
    if (starRatingElements.length > 0) {
      new StarRating(".star-rating-old");
    }
  };

  const handleScrollTop = function () {
    const scrollBtn = document.getElementById("scrollProgress");
    const scrollTopBtn = document.getElementById("scrolltopbtn");
    if (!scrollBtn) return;

    const circle = scrollBtn.querySelector("circle");
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = scrollTop / docHeight;
      const offset = circumference * (1 - scrollPercent);
      circle.style.strokeDashoffset = offset;

      if (scrollTop > 200) {
        scrollBtn.classList.add("active");
      } else {
        scrollBtn.classList.remove("active");
      }
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    if (scrollTopBtn){
      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  };

  const handleImageHover = () => {
  const container = document.body;
  const hoverImgs = document.querySelectorAll(".hover-img");

  container.addEventListener("mouseover", (e) => {
    const card = e.target.closest(".card-img-hover");

    if (card) {
      const cards = [...document.querySelectorAll(".card-img-hover")];
      const index = cards.indexOf(card);

      if (index !== -1) {
        hoverImgs.forEach((img, i) => {
          img.style.opacity = i === index ? "1" : "0";
        });
      }
    }
  });
};


const handleAnimation = function () {
    window.addEventListener("load", () => {
      document.querySelectorAll(".image-zoom").forEach((el) => {
        el.classList.remove("scale-200");
      });
    });
  };

  // const handleTextChar = function () {
  //   const wordRotateElements = document.querySelectorAll(".word-rotate");

  //   wordRotateElements.forEach((element) => {
  //     const text = element.textContent.trim();
  //     const chars = text.split("");
  //     const step = 360 / chars.length;
  //     const rotateBox = element.closest(".word-rotate-box");

  //     if (!rotateBox) return;

  //     rotateBox.querySelectorAll(".text-char").forEach(span => span.remove());

  //     chars.forEach((char, i) => {
  //       const span = document.createElement("span");
  //       span.className = "text-char";
  //       span.style.setProperty("--char-rotate", `${i * step}deg`);
  //       span.textContent = char;
  //       rotateBox.appendChild(span);
  //     });

  //     element.setAttribute("aria-hidden", "true");
  //     element.style.display = "none";
  //   });
  // };
  const handleTextChar = function () {
			const wordRotateElements = document.querySelectorAll(".word-rotate");

			wordRotateElements.forEach((element) => {
			  const text = element.textContent.trim();
			  const chars = text.split("");
			  const arc = element.classList.contains("third-one") ? 60 : element.classList.contains("one-third") ? 240 : 360;

			  const step = arc / (chars.length - 1);

			  const rotateBox = element.closest(".word-rotate-box");

			  chars.forEach((char, i) => {
				const span = document.createElement("span");
				span.className = "text-char";
				span.style.setProperty("--char-rotate", `${i * step}deg`);
				span.textContent = char;
				rotateBox.appendChild(span);
			  });

			  element.remove();
			});
		};

  const handleBorderAnimation = () => {
    const target = document.querySelector(".pxl-border-animated.num-4");
    if (target) {
      target.classList.add("pxl-animated");
    }
  };

  const handleMasonry = () => {
    const masonryContainer = document.querySelector(".masonry-grid");
    if (masonryContainer) { 
      new Masonry( masonryContainer, {
        itemSelector: '.card-container',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
    }
  };

  const handlePricingHoverActive = function () {
    const container = document.querySelector(".pricing-container");
    if (!container) return;

    container.addEventListener("mouseover", (e) => {
      const target = e.target.closest(".pricing-wrapper");
      if (!target || !container.contains(target)) return;

      container.querySelectorAll(".pricing-wrapper.active").forEach((el) => {
        el.classList.remove("active");
      });

      target.classList.add("active");
    });
  };

  const handleMovingText = () => {
		  const selectors = ['.des-text-moving-top', '.des-text-moving-bottom'];

		  selectors.forEach((selector, i) => {
			const sections = document.querySelectorAll(selector);
			if (sections.length === 0) return;

			gsap.utils.toArray(sections).forEach((section, index) => {
			  const wrapper = section.querySelector('.wrapper-text');
			  if (!wrapper) return;
			  const [xStart, xEnd] =
				i % 2
				  ? [section.offsetWidth - wrapper.scrollWidth, 0]
				  : [0, section.offsetWidth - wrapper.scrollWidth];

			  gsap.fromTo(
				wrapper,
				{ x: xStart },
				{
				  x: xEnd,
				  scrollTrigger: {
					trigger: section,
					scrub: 0.1,
				  },
				}
			  );
			});
		  });
		};

  return {
    init: function () {
      handleSidebarMenu();
      handleAccordion();
      handlePriceSlider();
      handleColorFilter();
      handleImageHover();
      setTimeout(() => {
        handleTabs();
      }, 500);
      handleServiceCard();
      handleThemeBtn();
      handleCounterJS();
      handleVideoPopupJS();
      handleLightgallery();
      handleTouchSpin();
      handleShowPass();
      handleRemoveTag();
      handleLoadmore();
      handleShopSidebar();
      setTimeout(() => {
        handleHeaderOverlay();
      }, 500);
      handleButtonAnimations();
      handleSetCurrentYear();
      // handleSupport();
      handleCustomSelects();
      handleHoverActive();
      handleStarRating();
      handleScrollTop();
      handleAnimation();
      handleTextChar();
      handleBorderAnimation();
      handleMasonry();
      handlePricingHoverActive();
      handleMovingText();
    },
    resize: function () {
      handleHeaderOverlay();
    },
  };
};
window.addEventListener("load", function () {
  if (typeof plexify !== "undefined" && typeof plexify.load === "function") {
    plexify.load();
  }

  setTimeout(function () {
    const loadingArea = document.getElementById("loading-area");
    if (loadingArea) {
      loadingArea.remove();
    }
  }, 100);
  const imageZoom = document.querySelectorAll('.image-zoom');
  imageZoom.forEach((item) => item.classList.remove('scale-200'))
});

window.addEventListener("scroll", function () {
  if (typeof plexify !== "undefined" && typeof plexify.scroll === "function") {
    plexify.scroll();
  }
});

window.addEventListener("resize", function () {
  plexify().resize();
});

document.addEventListener("DOMContentLoaded", function () {
  plexify().init();
});
