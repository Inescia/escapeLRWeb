const TRANSLATE_DOWN = {
  beforeEnter(el) {
    el.style.transform = 'translateY(-100%)';
    el.style.opacity = '0';
    el.style.transition = 'none';
  },

  enter(el) {
    void el.offsetHeight;

    el.style.transition = 'all 1s ease';
    el.style.transform = 'translateY(0)';
    el.style.opacity = '1';
  },

  beforeLeave(el) {
    el.style.transition = 'all 1s ease';
    el.style.transform = 'translateY(100%)';
    el.style.opacity = '0';
  },
};

const FADE_IN = {
  beforeEnter(el) {
    el.style.opacity = '0';
  },

  enter(el, done) {
    setTimeout(() => {
      el.style.transition = 'all 0.5s ease';
      el.style.opacity = '1';
      done();
    });
  },

  beforeLeave(el) {
    el.style.transition = 'all 0.5s ease';
    el.style.opacity = '0';
  },
};

export { FADE_IN, TRANSLATE_DOWN };
