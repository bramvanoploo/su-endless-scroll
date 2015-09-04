/* su-endless-scroll - v1.0.0 - 2015-08-20 */
var mod = angular.module('suEndlessScroll', []);

mod.directive('suEndlessScroll', ['$window',
  function($window) {
  	return {
      restrict: 'A',
      scope: {
        suEndlessScroll: '=',
        suEndlessScrollOutput: '=',
        suEndlessScrollOffset: '=',
        suEndlessScrollLimit: '=',
        suEndlessScrollAutoCheck: '='
      },
      link: function(scope, element, attrs) {
        var elementHeight, currentScrollHeight, triggerPoint;
        var currentScrollHeight = angular.element(element).scrollHeight;
        var eventFired = false;
        var offset = (scope.suEndlessScrollOffset === undefined)? 30 : parseInt(scope.suEndlessScrollOffset);
        var autoCheckInterval = 1000;
        var autoCheck = (!scope.suEndlessScrollAutoCheck)? true : scope.suEndlessScrollAutoCheck;
        var displayLimit = (scope.suEndlessScrollLimit === undefined || parseInt(scope.suEndlessScrollLimit) < 1)? 20 : parseInt(scope.suEndlessScrollLimit);

        function setHeightRelatedVariables() {
          elementHeight = element.outerHeight();
          triggerPoint = (parseInt(elementHeight) + parseInt(offset));
          currentScrollHeight = angular.element(element).scrollHeight;
        }
        
        function testConditions(eventElement) {
          var scrollPosition = (eventElement.scrollHeight - eventElement.scrollTop);

          if(currentScrollHeight !== eventElement.scrollHeight) {
            currentScrollHeight = eventElement.scrollHeight;
            eventFired = false;
          }

          if(scrollPosition <= triggerPoint && !eventFired) {
            processData();
            eventFired = true;
          }
        }
        
        function processData(clear) {
          if(clear) {
            scope.suEndlessScrollOutput = [];
            angular.element(element)[0].scrollTop = 0;
          }

          if(!scope.suEndlessScroll || !scope.suEndlessScroll[scope.suEndlessScrollOutput.length]) {
            return;
          }
          
          var _scrollItemsCount = scope.suEndlessScrollOutput.length;

          for(var x = 0; x < displayLimit; x++) {
            var nextIndex = ((_scrollItemsCount)+x);

            if(scope.suEndlessScroll[nextIndex]) {
              scope.suEndlessScrollOutput.push(scope.suEndlessScroll[nextIndex]);
            }
          }

          if(!scope.$parent.$$phase){
            scope.$parent.$digest();
          }
        }
        
        function initAutoCheck() {
          if(autoCheck) {
            setInterval(function() {
              testConditions(angular.element(element));
            }, autoCheckInterval);
          }
        }
       
        function init() {
          setHeightRelatedVariables();
          initAutoCheck();

          angular.element(element).bind('scroll', function() {
            testConditions(this);
          });
          
          angular.element($window).bind('resize', function() {
            setHeightRelatedVariables();
            testConditions(angular.element(element));
          });
          
          scope.$watch('suEndlessScroll', function(newData, oldData) {
            if(newData) {
              processData(true);
            }
          }, true);
        }
        
        init();
      }
  	};
  }
]);
