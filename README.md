# suEndlessScroll
Endless scrolling for AngularJs

This module has been inspired by [sroze](https://github.com/sroze) his [ngInfiniteScroll module](http://sroze.github.com/ngInfiniteScroll/). It wasn't working in my project and I found his code a bit over complicated for the task. Less code == less issues. 
That's why I've created my own version. No code from his project has been used, whatsoever.

# Installation
- Just download the project via [Download ZIP](https://github.com/Bram77/su-endless-scroll/archive/master.zip) button or use Bower:
 ```
 bower install suEndlessScroll
 ```

- Now add the script tag to your page. My module's only dependency is AngularJs itself (where ngInfiniteScroll also required jQuery):
 ```
 <script type='text/javascript' src='path/to/angular.min.js'></script>
 <script type='text/javascript' src='path/to/su-endless-scroll.min.js'></script>
 ```

# Usage
- Inject suEndlessScroll dependency into your AngularJs application:
 ```
 angular.module('yourApp', [
   'suEndlessScroll'
 ]);
 ```

- Add the directive to your HTML element:
 ```
 <section ng-controller="yourController">
  <div class="wrapper" su-endless-scroll="callback()" su-endless-scroll-offset="30" su-endless-scroll-auto-check="true">
   <div ng-repeat="item in items">
    {{$index}}
   </div>
  </div>
 </section>
 ```
 The wrapper needs a css property `overflow: auto;` or `overflow-y: auto;` and a `height` or `max-height` specified.
 
 - Create the `callabck()` method in your controller (let's call it `loadMore()`):
 ```
 
 ```

# Options
- `su-endless-scroll` *function* (required)

 This is the main attribute and takes the callback method from your controller as a value
- `su-endless-scroll-offset` *integer* (default `30`; optional)

 The number off pixels offset from the bottom of your wrapper from which the callback method will be triggered.
- `su-endless-scroll-auto-check` *boolean* (default `true`; optional)

 If the height of the initial content coincedentally is exactly the height of the container scrolling will not be possible, even if more content is available. Enableling this option will solve this within one second.
