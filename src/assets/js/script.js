$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    $(".site-header").addClass("active");
  } else {
    //remove the background property so it comes transparent again (defined in your css)
    $(".site-header").removeClass("active");
  }
});


$(window).on('load',function () {
  $("#chat_trigger_btn").on("click", function () {
    $("#chat_window").toggle({effect: "scale", direction: "vertical"});
  });
});


// Testimonials
$('.testimonials-main').slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

// Testimonials
$('.testimonials-main2').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


// Range Slider 2
$('input[type="range"]').rangeslider({
  polyfill: false
});

$('#showing-result-slider').on('change input', function () {
  $('#showing-result-output').text($(this).val());
});

// Range Slider 3
$('input[type="range"]').rangeslider({
  polyfill: false
});

$('#showing-result-slider-two').on('change input', function () {
  $('#showing-result-output-two').text($(this).val());
});


// Range Slider 1
const slider = document.getElementById('sliderPrice');
const rangeMin = parseInt(slider.dataset.min);
const rangeMax = parseInt(slider.dataset.max);
const step = parseInt(slider.dataset.step);
const filterInputs = document.querySelectorAll('input.filter__input');

noUiSlider.create(slider, {
  start: [rangeMin, rangeMax],
  connect: true,
  step: step,
  range: {
    'min': rangeMin,
    'max': rangeMax
  },

  // make numbers whole
  format: {
    to: value => value,
    from: value => value
  }
});

// bind inputs with noUiSlider
slider.noUiSlider.on('update', (values, handle) => {
  filterInputs[handle].value = values[handle];
});

filterInputs.forEach((input, indexInput) => {
  input.addEventListener('change', () => {
    slider.noUiSlider.setHandle(indexInput, input.value);
  })
});
