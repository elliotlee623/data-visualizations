
function gmap_api_loaded() {
  $(function() {
    var requests = [
      $.getJSON("res/gmatrix.json")
    ];

    $.when.apply($, requests).done(function(data) {
      showGoogleMap(data);
    });
  });
};


var showGoogleMap = function(data) {
  
};
