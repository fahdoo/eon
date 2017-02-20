/**
  * Eon Lightbox Demo
  *
  */
var Demo = (function() {
  var container;
  var page = 1;
  var perPage = 20;
  var moreBtn = document.querySelector('#btn-more');

  /**
    * API params based on flickr; could potentially be used/extended for the other APIs
    *
    */
  var apiParams = {
    // Define the api provider name
    apiSource: 'flickr',
    // Generate the API call path
    getAPIPath: function(apiCallbackName) {
      var endpoint = "https://api.flickr.com/services/rest/";
      var key = "c31e5c6e1292ad1ebb2dec72263dc6ed";
      var photoset = "72157631282848908";
      var method = "flickr.photosets.getPhotos";
      return endpoint +
        '?method=' + method +
        '&api_key=' + key +
        '&photoset_id=' + photoset +
        '&per_page=' + perPage +
        '&page=' + page +
        '&jsoncallback=' + apiCallbackName +
        '&format=json';
    },
    // The callback that the API returns data and error messages to
    renderCallbackFn: function(data, callback) {
      if (data.stat != "ok") {
        console.error(data);
        alert("Error " + data.code + ': ' + data.message);
      } else if (typeof data.photoset != "undefined" && typeof data.photoset.photo != "undefined") {
        renderPhotos(data.photoset.photo, data.photoset.total);
      } else {
        console.error(data);
        alert("Error: an unknown problem occured, please try again.");
      }
    }
  };

  /**
    * Initialize demo
    *
    */
  function init(options) {
    // Element id that contains image thumbnails
    container = options.container;

    if (typeof container == "undefined") {
      alert("You forgot to define a container for Demo.init()");
    }

    moreBtn.addEventListener('click', loreMore);

    PhotoAPI.init(apiParams);

    Eon.init({
      lightBoxId: '#eon-lightbox'
    });
  }

  /**
    * Increments page and then calls PhotoAPI to load more photos
    *
    */
  function loreMore() {
    moreBtn.disabled = true;
    page++;
    PhotoAPI.load();
  }

  /**
    * Appends photos to pre-defined container
    *
    */
  function renderPhotos(photos, total) {
    // Hide 'more' button if no more photos to return
    if (total <= page * perPage) {
      moreBtn.classList.add('hide');
    }

    for (var i = 0; i < photos.length; i++) {
      var photoHTML = document.createElement('li');
      container.appendChild(photoHTML);
      renderPhoto(photos[i], photoHTML);
    }
    moreBtn.disabled = false;
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

  /**
    * This will preload an image in the background,
    * useful for pre-fetching high-res images
    *
    */
  function preloadImage(path) {
    img = new Image();
    img.src = path;
  }

  return {
    init: init
  };
})();

document.addEventListener("DOMContentLoaded", function(event) {
  Demo.init({
    container: document.querySelector("#images-list")
  });
});
