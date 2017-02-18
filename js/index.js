/**
  * Eon Lightbox Demo
  *
  */
var Demo = (function() {
  var options = {};

  // Define Flickr API configuration
  var Flickr = {
    endpoint: "https://api.flickr.com/services/rest/",
    key: "221dfbb54c3220d5e802c65e73be0f59",
    photoset: "72157626579923453",
    method: "flickr.photosets.getPhotos",
    // Define custom callback since its not attach to global window object
    callback_name: "Demo.Flickr.jsonFlickrApi",

    /**
      * Define image src paths based on API photo data and:
      *   https://www.flickr.com/services/api/misc.urls.html
      * @data
      * @size
      */
    photoPath: function(data, size) {
      return "https://farm" + data.farm + ".staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_" + size + ".jpg";
    },

    /**
      * Flickr API callback
      *
      */
    jsonFlickrApi: function(data) {
      if (data.stat != "ok") {
        console.error(data);
        alert("Error " + data.code + ': ' + data.message);
      } else if (typeof data.photoset != "undefined" && typeof data.photoset.photo != "undefined") {
        renderPhotos(data.photoset.photo);
      } else {
        console.error(data);
        alert("Error: an unknown problem occured, please try again.");
      }
    }
  };

  /**
    * Appends photos to pre-defined container
    *
    */
  function renderPhotos(photosData) {
    for (var i = 0; i < photosData.length; i++) {
      var photoHTML = document.createElement('li');
      options.container.appendChild(photoHTML);
      renderPhoto(photosData[i], photoHTML);
    }
  }

  /**
    * Render single photo HTML
    *
    */
  function renderPhoto(photoData, photoHTML) {
    var photoIMG = document.createElement('img');
    photoIMG.src = Flickr.photoPath(photoData, 'm');
    photoHTML.appendChild(photoIMG);
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

  /**
    * Initialize demo
    *
    */
  function init(opts) {
    options = {
      container: opts.container
    };

    jsonp(Flickr.endpoint +
      '?method=' + Flickr.method +
      '&api_key=' + Flickr.key +
      '&photoset_id=' + Flickr.photoset +
      '&jsoncallback=' + Flickr.callback_name +
      '&format=json'
    );

    // Init Eon
    Eon.init();
  }

  /**
    * Reveal public properties/functions
    *
    */
  return {
    init: init,
    // Expose callback for Flickr Api
    Flickr: {
      jsonFlickrApi: Flickr.jsonFlickrApi
    }
  };
})();

document.addEventListener("DOMContentLoaded", function(event) {
  Demo.init({
    container: document.getElementById("images-list")
  });
});
