function scrollTop() {
  window.onscroll = function() {
    var pageOffset = document.documentElement.scrollTop;
    if (pageOffset >= 300) {
      document.getElementsByClassName('scroll-top')[0].style.display = 'block';
    } else {
      document.getElementsByClassName('scroll-top')[0].style.display = 'none';
    }
  }
}

export default scrollTop;