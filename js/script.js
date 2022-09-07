let mainSwiper = new Swiper('.items', {
  slidesPerView: 1,
  allowTouchMove: false,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  pagination: {
    el: ".items__pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },

  navigation: {
    nextEl: '.items__btn--next',
    prevEl: '.items__btn--prev',
  },
});
// #########################################
mainSwiper.on('slideChangeTransitionEnd', function () {
  addSliderFraction();
});
// #########################################
mainSwiper.on('slideChange', function () {
  if (document.body.clientWidth > 768) {
    let activeSlideIndex = mainSwiper.activeIndex;
    let rotationBulletAngle = activeSlideIndex * startAngle;
    let rotationBoxAngle = 360 - (activeSlideIndex * startAngle);
    gsap.to('.items__pagination',
      {
        rotation: rotationBoxAngle,
      });
    sliderPaginationBullets.forEach((el) => {
      gsap.to(el, {
        rotation: rotationBulletAngle,
      })
    })
  }
});
// #########################################
const subSwiper = new Swiper('.events', {
  slidesPerView: 1,
  spaceBetween: 25,
  autoHeight: true,
  freeMode: true,

  breakpoints: {
    769: {
      slidesPerView: 3,
      spaceBetween: 80,
      freeMode: false,
      allowTouchMove: true,
    }
  },

  navigation: {
    nextEl: '.events__btn--next',
    prevEl: '.events__btn--prev',
  },
});
// #########################################
let addSliderFraction = () => {
  document.querySelector('.items__fraction').textContent = document.querySelector('.items__slide.swiper-slide-active').ariaLabel;
};
addSliderFraction();
// #########################################
let sliderPaginationBullets = document.querySelectorAll('.swiper-pagination-bullet');
let startAngle = 360 / sliderPaginationBullets.length;

let changeBulletsPosition = () => {
  if (document.body.clientWidth > 768) {
    let count = 0;
    sliderPaginationBullets.forEach((el) => {
      el.style.transform = 'rotate(' + (-60 + startAngle * count) + 'deg) translateX(265px) rotate(' + -(-60 + startAngle * count) + 'deg)';
      count++;
    });
  } else return;
};
changeBulletsPosition();
// #########################################
let firstDate = { value: +document.querySelector('.swiper-slide-active .date__first').textContent };
let secondDate = { value: +document.querySelector('.swiper-slide-active .date__second').textContent };

let changingFirstDate = document.querySelector('.date-changing__first');
let changingSecondDate = document.querySelector('.date-changing__second');

changingFirstDate.textContent = firstDate.value;
changingSecondDate.textContent = secondDate.value;

mainSwiper.on('slideChangeTransitionEnd', function () {

  let newFirstDate = +document.querySelector('.swiper-slide-active .date__first').textContent;

  let newSecondDate = +document.querySelector('.swiper-slide-active .date__second').textContent;

  gsap.to(firstDate, {
    duration: 0.5,
    value: newFirstDate,
    roundProps: 'value',
    onUpdate: () => {
      changingFirstDate.textContent = firstDate.value;
    },
  });

  gsap.to(secondDate, {
    duration: 0.5,
    value: newSecondDate,
    roundProps: 'value',
    onUpdate: () => {
      changingSecondDate.textContent = secondDate.value;
    },
  });
});
// #########################################