// Define Photo API configuration
var PhotoAPI = (function() {
  // Define custom json callback since its not attached to global window object
  var apiCallbackName = "PhotoAPI.apiCallbackFn";
  var apiSource;
  var getAPIPath;
  var renderCallbackFn;

  /**
    * Initialize PhotoAPI
    *
    */
  function init(options) {
    // Name of API provider, e.g 'flickr'
    apiSource = options.apiSource;
    // Function that generates the API path
    getAPIPath = options.getAPIPath;
    // Function that will render the photos after getting data from API
    renderCallbackFn = options.renderCallbackFn;

    if (typeof apiSource !== "string") {
      alert("You forgot to define an apiSource string param for PhotoAPI.init()");
    }

    if (typeof getAPIPath !== "function") {
      alert("You forgot to define an getAPIPath function param for PhotoAPI.init()");
    }

    if (typeof renderCallbackFn !== "function") {
      alert("You forgot to define an renderCallbackFn function param for PhotoAPI.init()");
    }

    load();
  }

  /**
    * Calls the API path via jsonp
    *
    */
  function load() {
    jsonp(getAPIPath(apiCallbackName));
  }

  /**
    * Publicly exposed callback wraps around the render callback
    *
    */
  function apiCallbackFn(data) {
    renderCallbackFn(data);
  }

  /**
    * Define image src paths based on API photo data
    *
    * data: photo json data
    * size: size of photo to display
    */
  function getPhotoPath(data, size) {
    var path;
    switch(apiSource) {
      // https://www.flickr.com/services/api/misc.urls.html
      case "flickr":
        path = "https://farm" + data.farm + ".staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_" + size + ".jpg";
        break;
    }
    return path;
  }

  /**
    * Utility function to load external APIs
    * Source: http://stackoverflow.com/questions/6132796/how-to-make-a-jsonp-request-from-javascript-without-jquery
    */
  function jsonp(path) {
    var script = document.createElement('script');
    script.src = path;
    document.head.appendChild(script);
  }

  return {
    init: init,
    load: load,
    apiCallbackFn: apiCallbackFn,
    getPhotoPath: getPhotoPath
  };
})();
