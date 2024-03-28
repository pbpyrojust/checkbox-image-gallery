// JavaScript for Selection
document.addEventListener('DOMContentLoaded', function() {
  const imageItems = document.querySelectorAll('.image');

  imageItems.forEach(function(item) {
      item.addEventListener('click', function() {
          this.classList.toggle('selected');
          if (this.classList.contains('selected')) {
              console.log('Selected:', this.id);
          } else {
              console.log('Deselected:', this.id);
          }
      });
  });

  // Lazy Loading
  const lazyLoadDivs = document.querySelectorAll('.lazy-load');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const src = entry.target.dataset.src;
        entry.target.style.backgroundImage = `url('${src}')`;
        entry.target.classList.add('loaded'); // Add 'loaded' class to trigger fade-in effect
        observer.unobserve(entry.target);
      }
    });
  });

  lazyLoadDivs.forEach(div => {
    observer.observe(div);
  });


  // Lazy load with images in the CSS file
  // Not ideal, but leaving it here so you can see my JS work
  var lazyLoadElements = document.querySelectorAll('.lazy-load-css-only');
  
  lazyLoadElements.forEach(function(element) {
    var cssBackgroundImage = window.getComputedStyle(element).getPropertyValue('background-image');
    if (cssBackgroundImage) {
      var imgSrc = cssBackgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/, '$1');
      if (imgSrc) {
        var img = new Image();
        img.src = imgSrc;
        img.onload = function() {
          element.style.backgroundImage = 'url(' + imgSrc + ')';
        };
      }
    }
  });
});