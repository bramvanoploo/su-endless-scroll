# Changelog
- 1.0.0
  * Initial release

- 1.1.0
  * Big improvement in usability. No real functionality required in the controller anymore. Just two models. One filled and one empty.

- 1.3.1
  * Removed requirement for output model. This is being added to the controller by the directive itself now; Added CSS for easier implementation; Fixed issues with scrollHeight detection.



# angular-su-endless-scroll
Endless scrolling for AngularJs

An AngularJs directive by Bram van Oploo -> http://sudo-systems.com

# About
This module has been inspired by [sroze](https://github.com/sroze) his [ngInfiniteScroll module](http://sroze.github.com/ngInfiniteScroll/). It wasn't working in my project and I found his code a bit over complicated for the task. Less code == less issues. 
That's why I've created my own version. No code from his project has been used, whatsoever.

# Installation
- Just download the project via [Download ZIP](https://github.com/Bram77/su-endless-scroll/archive/master.zip) button or use Bower:
 ```
 bower install angular-su-endless-scroll --save
 ```

- Now add the script tag to your page. My module's only dependency is AngularJS itself (where ngInfiniteScroll also requires jQuery):
 ```html
 <link rel="css" href="path/to/su-endless-scroll.min.css" />

 <script type="text/javascript" src="path/to/angular.min.js"></script>
 <script type="text/javascript" src="path/to/su-endless-scroll.min.js"></script>
 ```

# Usage
- App
 
 Inject suEndlessScroll dependency into your AngularJs application:
 ```js
 var yourApp = angular.module('yourApp', [
   'suEndlessScroll'
 ]);
 ```

- HTML 

 Add the directive to your HTML element:
 ```js
 <section class="listContainer" ng-controller="YourCtrl">
   <div su-endless-scroll="yourDataModel"
      su-endless-scroll-items="30"
      su-endless-scroll-offset="50" 
      su-endless-scroll-auto-check="true">
     <div ng-repeat="item in suEndlessScrollItems track by $index">
       {{$index}}: {{item}}
     </div>
    </div>
 </section>
 ```

- CSS
```css
section.listContainer {
  position: relative;
  height: 600px;
}
```

 
- Controller

 ```js
 yourApp.controller('YourCtrl', ['$scope', 
    function($scope) {
      $scope.yourDataModel = [];

      for(var i=0; i<100; i++) {
        $scope.yourDataModel.push(i);
      }
    }
]);
 ```

# Options
- `su-endless-scroll` *Array* (required)

 This is the main attribute, takes the model that contains all the data and needs to be an Array.

- `su-endless-scroll-items` *integer* (default: `20`; optional)

 Set the amount of items to display at every load of items

- `su-endless-scroll-offset` *integer* (default `100`; optional)

 The number off pixels offset from the bottom of your wrapper from which the callback method will be triggered.

- `su-endless-scroll-auto-check` *boolean* (default `true`; optional)

 If the height of the initial content coincedentally is exactly the height of the container scrolling will not be possible, 
even if more content is available. Enabling this option will solve this within one second. Don't set this to false unless you're sure you need to.
