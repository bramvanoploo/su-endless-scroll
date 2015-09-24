/* su-endless-scroll - v1.3.1 - 2015-09-24 */
var mod = angular.module('suEndlessScroll', []);

mod.directive('suEndlessScroll', ['$window', '$timeout',
  function($window, $timeout) {
  	return {
      restrict: 'A',
      scope: {
        suEndlessScroll: '=',
        suEndlessScrollOffset: '=',
        suEndlessScrollLimit: '=',
        suEndlessScrollAutoCheck: '='
      },
      link: function(scope, element, attrs) {
        var elementHeight, currentScrollHeight, triggerPoint;
        var _element = angular.element(element);
        var currentScrollHeight = _element[0].scrollHeight;
        var isDataAdded = false;
        var autoCheckInterval = 1000;
        scope.$parent.suEndlessScrollItems = [];

        scope.suEndlessScroll = (!scope.suEndlessScroll)? [] : scope.suEndlessScroll;
        scope.suEndlessScrollOffset = (!scope.suEndlessScrollOffset)? 100 : scope.suEndlessScrollOffset;
        scope.suEndlessScrollLimit = (!scope.suEndlessScrollLimit)? 20 : scope.suEndlessScrollLimit;
        scope.suEndlessScrollAutoCheck = (scope.suEndlessScrollAutoCheck === undefined)? true : scope.suEndlessScrollAutoCheck;

        function setHeightRelatedVariables() {
          elementHeight = _element[0].clientHeight;
          currentScrollHeight = _element[0].scrollHeight;
          triggerPoint = (elementHeight + parseInt(scope.suEndlessScrollOffset));
        }
        
        function testConditions(eventElement) {
          setHeightRelatedVariables();
          var scrollPosition = (_element[0].scrollHeight - _element[0].scrollTop);

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
            _element[0].scrollTop = 0;
            scope.$parent.suEndlessScrollItems = [];
          }

          if(!scope.suEndlessScroll || !scope.suEndlessScroll[scope.$parent.suEndlessScrollItems.length]) {
            return;
          }
          
          var _scrollItemsCount = scope.$parent.suEndlessScrollItems.length;

          for(var x = 0; x < scope.suEndlessScrollLimit; x++) {
            var nextIndex = ((_scrollItemsCount)+x);

            if(scope.suEndlessScroll[nextIndex]) {
              scope.$parent.suEndlessScrollItems.push(scope.suEndlessScroll[nextIndex]);
            }
          }

          if(!scope.$parent.$$phase){
            scope.$parent.$digest();
          }
        }
        
        function initAutoCheck() {
          testConditions(_element);
          
          if(scope.suEndlessScrollAutoCheck) {
            setInterval(function() {
              testConditions(_element);
            }, autoCheckInterval);
          }
        }
       
        function init() {
          initAutoCheck();

          _element.bind('scroll', function() {
            testConditions(this);
          });
          
          angular.element($window).bind('resize', function() {
            testConditions(_element);
          });
          
          scope.$watch('suEndlessScroll', function(newData, oldData) {
            if(newData) {
              processData(true);
            }
          }, true);
        }
        
        $timeout(init);
      }
  	};
  }
]);