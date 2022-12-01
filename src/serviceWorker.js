if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('worker.js').then(function(registration) {
    }, function(err) {
    }).catch(function(err) {
    });
  });
}