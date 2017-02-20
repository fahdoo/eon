# Eon Lightbox

## Setup
Place the eon.css stylesheet in your html's head
```
<link rel="stylesheet" href="path_to_stylesheets/eon.css">
```

Place the eon.js script at the end of your html's body and before any custom script that might call it
```
<script src="path_to_js/eon.js"></script>
```


## Thumbnails html
Your thumbnails should be nested in an element with data-eon-container attribute. 
The thumbnail images themselves should have the following attributes: 
- data-eon-lightbox-action="open" - open this in the lightbox
- data-eon-title="Image title" - what the title is for this image
- data-eon-thumbnail="_path_to_thumbnail.jpg" - what the thumbnail image path is
- data-eon-image="_path_to_image_for_lightbox.jpg" - what the high-res image path is to display in the lightbox
```
    <ul id="custom-id-name" data-eon-container="custom-container-name">
      <li>
        <a href="#"><img src="_path_to_thumbnail.jpg" data-eon-lightbox-action="open" data-eon-title="Image title" data-eon-thumbnail="_path_to_thumbnail.jpg" data-eon-image="_path_to_image_for_lightbox.jpg">
        </a>
       </li>
      ...
    </ul>
```

## Lightbox html
Add the follow html for the lightbox modal:
```
    <div id="eon-lightbox" class="eon-lightbox">
      <div class="eon-lightbox-dialog">
        <a class="eon-lightbox-left">
          <img class="eon-lightbox-image-prev" data-eon-lightbox-action="prev" />
        </a>
        <div class="eon-lightbox-body">
          <a class="eon-lightbox-close" data-eon-lightbox-action="close">&times;</a>
          <img class="eon-lightbox-image" data-eon-lightbox-action="next" />
          <div class="eon-lightbox-title"></div>
        </div>
        <a class="eon-lightbox-right">
          <img class="eon-lightbox-image-next" data-eon-lightbox-action="next" />
        </a>
      </div>
    </div>
```
