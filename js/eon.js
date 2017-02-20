/**
  * TODO: These are some potential future feature improvements:
  * - Prevent body scrolling
  * - Animations/transitions
  * - Responsive design
  * - Keybindings
  */

/**
  * Eon Lightbox Library
  *
  */
var Eon = (function() {
  var lightbox;
  var lightBoxId;
  var currentEl;

  /**
    * Initializes library with a lightBoxId option
    * Binds to containers that will list thumbnails
    */
  function init(options) {
    // Points to an element id that contains our lightbox html, e.g. '#eon-lightbox'
    lightBoxId = options.lightBoxId;

    if (typeof lightBoxId == "undefined") {
      alert("You forgot to define a lightBoxId (e.g. '#eon-lightbox') for Eon.init()");
    }

    lightBox = document.querySelector(lightBoxId);

    if (lightBox === null) {
      alert("Eon could not find this element id for lightBoxId: " + lightBoxId);
    }

    // Eon binds click events to containers that wrap around thumbnail lists
    var containers = document.querySelectorAll('[data-eon-container]');

    for (var i = 0; i < containers.length; i++) {
      // A single event listener on whole container instead of each thumbnail
      containers[i].addEventListener('click', containerClicked);
    }

    // Event listener for our actual lightbox
    lightBox.addEventListener('click', dispatcher);
  }

  /**
    * Routes events to appropriate functions
    */
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
        // TODO: We could enable dismiss on background click,
        // or better create an option to enable or disable this
        // Because image widths aren't fixed, its easy to accidently
        // escape the lightbox
        // close(e);
        break;
    }
  }

  /**
    * Close the lightbox
    */
  function close(e) {
    lightBox.classList.remove('active');
  }

  /**
    * Navigate to previous image if exists
    */
  function prev(e) {
    var el = getPrevEl();
    if (el !== null) {
      el.click();
    }
  }

  /**
    * Navigate to next image if exists
    */
  function next(e) {
    var el = getNextEl();
    if (el !== null) {
      el.click();
    }
  }

  /**
    * Open an image in the lightbox and set next/prev thumbnails
    */
  function open(e) {
    e.preventDefault();
    e.stopPropagation();

    // Set Current
    currentEl = e.target;
    setCurrent();

    // Set Prev
    setPrev();

    // Set Next
    setNext();

    // Make lightbox visible
    lightBox.classList.add('active');
  }

  function setCurrent() {
    var el = getCurrentEl();
    var lightBoxCurrentEl = lightBox.querySelector('.eon-lightbox-image');
    setImageSrc(lightBoxCurrentEl, el.getAttribute('data-eon-image'));

    // Set current title
    lightBox.querySelector('.eon-lightbox-title').innerHTML = el.getAttribute('data-eon-title');
  }

  function setPrev() {
    var el = getPrevEl();
    var lightBoxPrevEl = lightBox.querySelector('.eon-lightbox-image-prev');
    if (el !== null) {
      setImageSrc(lightBoxPrevEl, el.getAttribute('data-eon-thumbnail'));
    } else {
      lightBoxPrevEl.classList.remove('loaded');
    }
  }

  function setNext() {
    var el = getNextEl();
    var lightBoxNextEl = lightBox.querySelector('.eon-lightbox-image-next');
    if (el !== null) {
      setImageSrc(lightBoxNextEl, el.getAttribute('data-eon-thumbnail'));
    } else {
      lightBoxNextEl.classList.remove('loaded');
    }
  }

  /**
    * Returns the current active thumbnail
    */
  function getCurrentEl() {
    return currentEl;
  }

  /**
    * Returns the previous thumbnail element if it exists
    */
  function getPrevEl() {
    var sibling = currentEl.closest('li').previousElementSibling;
    if (sibling === null) {
      return null;
    }
    return sibling.querySelector('[data-eon-image]');
  }

  /**
    * Returns the next thumbnail element if it exists
    */
  function getNextEl() {
    var sibling = currentEl.closest('li').nextElementSibling;
    if (sibling === null) {
      return null;
    }
    return sibling.querySelector('[data-eon-image]');
  }

  /**
    * Sets an image source
    */
  function setImageSrc(imageEl, path) {
    // Using 'loaded' class so that previous image is made invisible
    // and only after the new image is loaded does it get displayed
    imageEl.classList.remove('loaded');
    imageEl.src = path;
    imageEl.onload = function() {
      imageEl.classList.add('loaded');
    };

    return imageEl;
  }

  /**
    *  Re-route to dispatcher if there is an action
    */
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
