/**
  * Eon Lightbox Demo
  *
  */
var Demo = (function() {
  var options = {};

  // Define Flickr API configuration
  var Flickr = {
    endpoint: "https://api.flickr.com/services/rest/",
    key: "c31e5c6e1292ad1ebb2dec72263dc6ed",
    photoset: "72157626579923453",
    method: "flickr.photosets.getPhotos",
    // Define custom callback since its not attached to global window object
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

    api: function() {
      jsonp(Flickr.endpoint +
        '?method=' + Flickr.method +
        '&api_key=' + Flickr.key +
        '&photoset_id=' + Flickr.photoset +
        '&jsoncallback=' + Flickr.callback_name +
        '&format=json'
      );
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
    var photoAnchor = document.createElement('a');
    var photoIMG = document.createElement('img');

    var thumbnailPath = Flickr.photoPath(photoData, 'q');
    var imagePath = Flickr.photoPath(photoData, 'c');

    preloadImage(imagePath);

    photoAnchor.href = imagePath;
    photoIMG.src = thumbnailPath;
    photoIMG.classList.add('eon-item');
    photoIMG.setAttribute('data-eon-lightbox-action', 'open');
    photoIMG.setAttribute('data-eon-title', photoData.title);
    photoIMG.setAttribute('data-eon-thumbnail', thumbnailPath);
    photoIMG.setAttribute('data-eon-image', imagePath);

    photoAnchor.appendChild(photoIMG);
    photoHTML.appendChild(photoAnchor);
  }

  function preloadImage(path) {
    img = new Image();
    img.src = path;
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

    Flickr.api();

    Eon.init({
      lightBoxId: '#eon-lightbox'
    });
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
    container: document.querySelector("#images-list")
  });
});
