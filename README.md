# Changelog
- 1.0.0
  * Initial release

- 1.1.0
  * Big improvement in usability. No real functionality required in the controller anymore. Just two models. One filled and one empty.



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
 <script type='text/javascript' src='path/to/angular.min.js'></script>
 <script type='text/javascript' src='path/to/su-endless-scroll.min.js'></script>
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
 <section ng-controller="yourCtrl">
   <div class="wrapper" 
      su-endless-scroll="dataModel"
      su-endless-scroll-output="scrollModel"
      su-endless-scroll-items="20"
      su-endless-scroll-offset="30" 
      su-endless-scroll-auto-check="true">
     <div ng-repeat="item in scrollModel track by $index">
       {{$index}}: {{item}}
     </div>
    </div>
 </section>
 ```

- CSS
```css
.wrapper {
  height: 350px;
  overlow-y: auto;
}

.wrapper > div {
  line-heigth: 24px;
  border-bottom: 1px solid #AAA;
}
```

 
- Controller

 Create the two models in your controller. One containing the data and one to be used in you ng-repeat. The latter will automatically filled with the appropriate amount of entries by su-endless-scroll:
 ```js
 yourApp.controller('yourCtrl', ['$scope', 
    function($scope) {
      $scope.scrollModel = [];
      $scope.dataModel = [];

      for(var i=0; i<100; i++) {
        $scope.dataModel.push(i);
      }
    }
]);
 ```

# Options
- `su-endless-scroll` *Array* (required)

 This is the main attribute, takes the model that contains all the data and needs to be an Array.

- `su-endless-scroll-output` *empty Array* (required)

 This model will provide the actual partial display, depending on the scroll position, of the items from the `dataModel`. Use this model as the source for your ng-repeat.

- `su-endless-scroll-items` *integer* (default: `20`; optional)

 Set the amount of items to display at every load of items

- `su-endless-scroll-offset` *integer* (default `30`; optional)

 The number off pixels offset from the bottom of your wrapper from which the callback method will be triggered.

- `su-endless-scroll-auto-check` *boolean* (default `true`; optional)

 If the height of the initial content coincedentally is exactly the height of the container scrolling will not be possible, 
even if more content is available. Enabling this option will solve this within one second. Don't set this to false unless you're sure you need to.
