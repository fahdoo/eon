/**
  * Eon Lightbox Demo
  *
  */
var Demo = (function() {
  var container;

  /**
    * Initialize demo
    *
    */
  function init(options) {
    container = options.container;

    if (typeof container == "undefined") {
      alert("You forgot to define a container for Demo.init()");
    }

    PhotoAPI.init({
      apiSource: 'flickr',
      callbackFn: renderPhotos,
      getAPIPath: function(jsonCallbackName) {
        var endpoint = "https://api.flickr.com/services/rest/";
        var key = "c31e5c6e1292ad1ebb2dec72263dc6ed";
        var photoset = "72157626579923453";
        var method = "flickr.photosets.getPhotos";
        return endpoint +
          '?method=' + method +
          '&api_key=' + key +
          '&photoset_id=' + photoset +
          '&jsoncallback=' + jsonCallbackName +
          '&format=json';
      },
      jsonAPICallbackFn: function(data, apiSource, callbackFn) {
        if (data.stat != "ok") {
          console.error(data);
          alert("Error " + data.code + ': ' + data.message);
        } else if (typeof data.photoset != "undefined" && typeof data.photoset.photo != "undefined") {
          callbackFn(apiSource, data.photoset);
        } else {
          console.error(data);
          alert("Error: an unknown problem occured, please try again.");
        }
      }
    });

    Eon.init({
      lightBoxId: '#eon-lightbox'
    });
  }

  /**
    * Appends photos to pre-defined container
    *
    */
  function renderPhotos(source, photosData) {
    var photos;
    switch (source) {
      case 'flickr':
        photos = photosData.photo;
        break;
    }

    for (var i = 0; i < photos.length; i++) {
      var photoHTML = document.createElement('li');
      container.appendChild(photoHTML);
      renderPhoto(photos[i], photoHTML);
    }
  }

  /**
    * Render single photo HTML
    *
    */
  function renderPhoto(photoData, photoHTML) {
    var photoAnchor = document.createElement('a');
    var photoIMG = document.createElement('img');

    var thumbnailPath = PhotoAPI.getPhotoPath(photoData, 'q');
    var imagePath = PhotoAPI.getPhotoPath(photoData, 'c');

    preloadImage(imagePath);

    photoAnchor.href = imagePath;
    photoAnchor.classList.add('demo-image');

    photoIMG.src = thumbnailPath;
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
    * Reveal public properties/functions
    *
    */
  return {
    init: init
  };
})();

document.addEventListener("DOMContentLoaded", function(event) {
  Demo.init({
    container: document.querySelector("#images-list")
  });
});
