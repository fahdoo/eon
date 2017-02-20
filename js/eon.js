// TODO
// Prevent body scrolling
// Animations/transitions
// Option to disable background-click escape
// Responsive

/**
  * Eon Lightbox Library
  *
  */
var Eon = (function() {
  var lightbox;
  var lightBoxId;
  var currentEl;

  function init(options) {
    lightBoxId = options.lightBoxId;

    if (typeof lightBoxId == "undefined") {
      alert("You forgot to define a lightBoxId (e.g. '#images-list') for Eon.init()");
    }

    lightBox = document.querySelector(lightBoxId);

    var containers = document.querySelectorAll('[data-eon-container]');

    // Bind single event listener on whole container instead of each thumbnail
    for (var i = 0; i < containers.length; i++) {
      containers[i].addEventListener('click', containerClicked);
    }

    lightBox.addEventListener('click', dispatcher);
  }

  function dispatcher(e) {
    var action = e.target.getAttribute('data-eon-lightbox-action');
    switch(action) {
      case "open":
        open(e);
        break;
      case "close":
        close(e);
        break;
      case "prev":
        prev(e);
        break;
      case "next":
        next(e);
        break;
      default:
        close(e);
        break;
    }
  }

  function close(e) {
    lightBox.classList.remove('active');
  }

  function prev(e) {
    var el = getPrevEl();
    if (el !== null) {
      el.click();
    }
  }

  function next(e) {
    var el = getNextEl();
    if (el !== null) {
      el.click();
    }
  }

  function open(e) {
    e.preventDefault();
    e.stopPropagation();

    // Set Current
    currentEl = e.target;
    setImageSrc('.eon-lightbox-image', currentEl.getAttribute('data-eon-image'));
    lightBox.querySelector('.eon-lightbox-title').innerHTML = currentEl.getAttribute('data-eon-title');

    // Set Prev
    var prevEl = getPrevEl();
    if (prevEl !== null) {
      setImageSrc('.eon-lightbox-image-prev', prevEl.getAttribute('data-eon-thumbnail'));
    } else {
      lightBox.querySelector('.eon-lightbox-image-prev').classList.remove('active');
    }

    // Set Next
    var nextEl = getNextEl();
    if (nextEl !== null) {
      setImageSrc('.eon-lightbox-image-next', nextEl.getAttribute('data-eon-thumbnail'));
    } else {
      lightBox.querySelector('.eon-lightbox-image-next').classList.remove('active');
    }

    lightBox.classList.add('active');
  }

  function getPrevEl() {
    var sibling = currentEl.closest('li').previousElementSibling;
    if (sibling === null) {
      return null;
    }
    return sibling.querySelector('[data-eon-image]');
  }

  function getNextEl() {
    var sibling = currentEl.closest('li').nextElementSibling;
    if (sibling === null) {
      return null;
    }
    return sibling.querySelector('[data-eon-image]');
  }

  function setImageSrc(selector, path) {
    var imageEl = lightBox.querySelector(selector);
    imageEl.src = path;
    imageEl.classList.add('active');
  }

  // Re-route to dispatcher if there is an action
  function containerClicked(e) {
    if (e.target.hasAttribute('data-eon-lightbox-action')) {
      dispatcher(e);
    }
  }

  /**
    * Eon Public API
    */
  return {
    init: init
  };
})();
