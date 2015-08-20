/* su-endless-scroll - v1.0.0 - 2015-08-20 */

var mod = angular.module('suEndlessScroll', []);

mod.directive('suEndlessScroll', ['$window',
  function($window) {
  	return {
      restrict: 'A',
      scope: {
        suEndlessScroll: '&',
        suEndlessScrollOffset: '@offset',
        suEndlessScrollAutoCheck: '@autoCheck'
      },
      link: function(scope, element, attrs) {
        var elementHeight, currentScrollHeight, triggerPoint;
        var _element = angular.element(element);
        var _window = angular.element($window);
        var currentScrollHeight = _element.scrollHeight;
        var eventFired = false;
        var defaultOffset = 30;
        var offset = (!scope.offset)? defaultOffset : scope.offset;
        var autoCheckInterval = 1000;
        var autoCheck = (!scope.autoCheck)? true : scope.autoCheck;

        function setHeightRelatedVariables() {
          elementHeight = element.outerHeight();
          triggerPoint = (parseInt(elementHeight) + parseInt(offset));
          currentScrollHeight = _element.scrollHeight;
        }
        
        function testConditions(eventElement) {
          var scrollPosition = (eventElement.scrollHeight - eventElement.scrollTop);

          if(currentScrollHeight !== eventElement.scrollHeight) {
            currentScrollHeight = eventElement.scrollHeight;
            eventFired = false;
          }

          if(scrollPosition <= triggerPoint && !eventFired) {
            scope.suEndlessScroll();
            eventFired = true;
          }
        }
        
        function initAutoCheck() {
          if(autoCheck) {
            setInterval(function() {
              console.log();
              testConditions(_element);
            }, autoCheckInterval);
          }
        }
       
        function init() {
          setHeightRelatedVariables();
          initAutoCheck();

          _element.bind('scroll', function() {
            testConditions(this);
          });
          
          _window.bind('resize', function() {
            setHeightRelatedVariables();
            testConditions(_element);
          });
        }
        
        init();
      }
  	};
  }
]);
