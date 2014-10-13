angular.module('st.clickOutside', []).
directive('stClickOutside', ['$document', '$parse', function($document, $parse) {
  return {
    link: function(scope, el, attr) {
      var ignore;
      if (attr.ignoreIf) {
        ignore = $parse(attr.ignoreIf);
      }

      var nakedEl = el[0];

      var handler = function(e) {
        if (nakedEl === e.target || nakedEl.contains(e.target) || (ignore && ignore(scope))) {
          return;
        }

        if (el.is(':visible')) {
          el.hide(); 
        }
      };

      $document.on('click', handler);

      scope.$on('$destroy', function(e) {
        $document.off('click', handler);
      });
    }
  };
}]);
