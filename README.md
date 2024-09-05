# mdev-musicOverlay
 
## Code Snippets

### Add CSS File to head section
```js
var linkElement = this.document.createElement('link');
linkElement.setAttribute('rel', 'stylesheet');
linkElement.setAttribute('type', 'text/css');
linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(myStringOfstyles));
```