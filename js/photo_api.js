// Define Photo API configuration
var PhotoAPI = (function() {
  // Define custom json callback since its not attached to global window object
  var jsonCallbackName = "PhotoAPI.jsonAPI";
  var apiSource;
  var getAPIPath;
  var callbackFn;
  var jsonAPICallbackFn;

  function init(options) {
    apiSource = options.apiSource;
    getAPIPath = options.getAPIPath;
    callbackFn = options.callbackFn;
    jsonAPICallbackFn = options.jsonAPICallbackFn;

    if (typeof apiSource !== "string") {
      alert("You forgot to define an apiSource string param for PhotoAPI.init()");
    }

    if (typeof callbackFn !== "function") {
      alert("You forgot to define a callbackFn function param for PhotoAPI.init()");
    }

    if (typeof getAPIPath !== "function") {
      alert("You forgot to define an getAPIPath function param for PhotoAPI.init()");
    }

    if (typeof jsonAPICallbackFn !== "function") {
      alert("You forgot to define an jsonAPICallbackFn function param for PhotoAPI.init()");
    }

    jsonp(getAPIPath(jsonCallbackName));
  }

  /**
    * API callback
    *
    */
  function jsonAPI(data) {
    jsonAPICallbackFn(data, apiSource, callbackFn);
  }

  /**
    * Define image src paths based on API photo data
    *
    * @data
    * @size
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
    *
    */
  function jsonp(path) {
    var script = document.createElement('script');
    script.src = path;
    document.head.appendChild(script);
  }


  return {
    init: init,
    jsonAPI: jsonAPI,
    getPhotoPath: getPhotoPath
  };
})();
