/* su-endless-scroll - v1.1.0 - 2015-09-04 */
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
        var isDataAdded = false;
        var autoCheckInterval = 1000;
        
        scope.suEndlessScroll = (!scope.suEndlessScroll)? [] : scope.suEndlessScroll;
        scope.suEndlessScrollOutput = (!scope.suEndlessScrollOutput)? [] : scope.suEndlessScrollOutput;
        scope.suEndlessScrollOffset = (!scope.suEndlessScrollOffset)? 30 : scope.suEndlessScrollOffset;
        scope.suEndlessScrollLimit = (!scope.suEndlessScrollLimit)? 20 : scope.suEndlessScrollLimit;
        scope.suEndlessScrollAutoCheck = (scope.suEndlessScrollAutoCheck === undefined)? true : scope.suEndlessScrollAutoCheck;

        function setHeightRelatedVariables() {
          elementHeight = element.outerHeight();
          triggerPoint = (parseInt(elementHeight) + parseInt(scope.suEndlessScrollOffset));
          currentScrollHeight = angular.element(element).scrollHeight;
        }
        
        function testConditions(eventElement) {
          var scrollPosition = (eventElement.scrollHeight - eventElement.scrollTop);

          if(currentScrollHeight !== eventElement.scrollHeight) {
            currentScrollHeight = eventElement.scrollHeight;
            isDataAdded = false;
          }

          if(scrollPosition <= triggerPoint && !isDataAdded) {
            processData();
            isDataAdded = true;
          }
        }
        
        function processData(clear) {
          if(clear) {
            angular.element(element)[0].scrollTop = 0;
            scope.suEndlessScrollOutput = [];
          }

          if(!scope.suEndlessScroll || !scope.suEndlessScroll[scope.suEndlessScrollOutput.length]) {
            return;
          }
          
          var _scrollItemsCount = scope.suEndlessScrollOutput.length;

          for(var x = 0; x < scope.suEndlessScrollLimit; x++) {
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
          if(scope.suEndlessScrollAutoCheck) {
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