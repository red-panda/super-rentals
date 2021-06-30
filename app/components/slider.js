import Component from '@glimmer/component';

function Slider(setting) {
  if (document.querySelector(setting.wrap) === null) {
    console.error('No slider');
    return;
  }

  /* Options and properties */
  let options = {},
    xDown,
    yDown,
    xUp,
    yUp,
    xDiff,
    yDiff;

  /* Public methods */
  // Prev slide
  this.prevSlide = () => {
    if (!options.isAnimationEnd) {
      return;
    }

    options.isAnimationEnd = false;

    --options.opt.position;

    if (options.opt.position < 0) {
      options.sel.wrap.classList.add('no-transition');
      options.sel.wrap.style[
        'transform'
      ] = `translateX(-${options.opt.maxPosition}00%)`;
      options.opt.position = options.opt.maxPosition - 1;
    }

    setTimeout(() => {
      options.sel.wrap.classList.remove('no-transition');
      options.sel.wrap.style[
        'transform'
      ] = `translateX(-${options.opt.position}00%)`;
    }, 10);

    options.sel.wrap.addEventListener('transitionend', () => {
      options.isAnimationEnd = true;
    });

    if (options.setting.autoplay === true) {
      options.timer.become();
    }
  };

  // Next slide
  this.nextSlide = () => {
    if (!options.isAnimationEnd) {
      return;
    }

    options.isAnimationEnd = false;

    if (options.opt.position < options.opt.maxPosition) {
      ++options.opt.position;
    }

    options.sel.wrap.classList.remove('no-transition');
    options.sel.wrap.style[
      'transform'
    ] = `translateX(-${options.opt.position}00%)`;

    options.sel.wrap.addEventListener('transitionend', () => {
      if (options.opt.position >= options.opt.maxPosition) {
        options.sel.wrap.style['transform'] = 'translateX(0)';
        options.sel.wrap.classList.add('no-transition');
        options.opt.position = 0;
      }

      options.isAnimationEnd = true;
    });

    if (options.setting.autoplay === true) {
      options.timer.become();
    }
  };

  // Pause time slider
  this.pause = () => {
    if (options.setting.autoplay === true) {
      options.timer.pause();
    }
  };

  // Become timer slider
  this.become = (autoplayDelay = options.setting.autoplayDelay) => {
    if (options.setting.autoplay === true) {
      options.setting.autoplayDelay = autoplayDelay;
      options.timer.become();
    }
  };

  // Goto
  this.goto = (index) => {
    options.opt.position = index - 1;
    this.nextSlide();
  };

  // Item
  this.index = () => {
    return options.opt.position;
  };

  /* Methods */
  options.hts = (e) => {
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
  };

  options.htm = (e) => {
    if (!xDown || !yDown) {
      return;
    }

    xUp = e.touches[0].clientX;
    yUp = e.touches[0].clientY;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }

    xDown = 0;
    yDown = 0;
  };

  /* Options default */
  options.default = {
    touch: true,
    autoplay: false,
    autoplayDelay: 3000,
    pauseOnFocus: true,
    pauseOnHover: true,
  };

  options.setting = Object.assign(options.default, setting);

  options.isAnimationEnd = true;

  options.sel = {
    wrap: document.querySelector(options.setting.wrap),
    children: document.querySelector(options.setting.wrap).children,
    prev: document.querySelector(options.setting.prev),
    next: document.querySelector(options.setting.next),
  };

  options.opt = {
    position: 0,
    maxPosition: document.querySelector(options.setting.wrap).children.length,
  };

  // Cloning first elem
  if (options.sel.children && options.sel.children.length) {
    options.sel.wrap.appendChild(options.sel.children[0].cloneNode(true));
  }

  // Autoplay
  if (options.setting.autoplay === true) {
    options.timer = new Timer(this.nextSlide, options.setting.autoplayDelay);
  }

  if (options.sel.prev !== null) {
    options.sel.prev.addEventListener('click', () => {
      this.prevSlide();
    });
  }

  if (options.sel.next !== null) {
    options.sel.next.addEventListener('click', () => {
      this.nextSlide();
    });
  }

  // Touch events
  if (options.setting.touch === true) {
    options.sel.wrap.addEventListener('touchstart', options.hts, false);
    options.sel.wrap.addEventListener('touchmove', options.htm, false);
  }

  // Pause on hover
  if (
    options.setting.autoplay === true &&
    options.setting.pauseOnHover === true
  ) {
    options.sel.wrap.addEventListener('mouseenter', () => {
      options.timer.pause();
    });

    options.sel.wrap.addEventListener('mouseleave', () => {
      options.timer.become();
    });
  }
}

function Timer(callback, delay) {
  let timerId,
    start,
    remaining = delay;

  this.resume = () => {
    start = new Date();
    timerId = setTimeout(() => {
      remaining = delay;
      this.resume();
      callback();
    }, remaining);
  };

  this.pause = () => {
    clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  this.become = () => {
    clearTimeout(timerId);
    remaining = delay;

    this.resume();
  };

  this.resume();
}

export default class SliderComponent extends Component {
  loadSlider() {
    //init
    let rentalSlider = new Slider({
      wrap: '.js-slider-wrap',
      prev: '.js-slider-prev',
      next: '.js-slider-next',
      touch: true,
      autoplay: true,
      autoplayDelay: 3000,
    });
  }
}
