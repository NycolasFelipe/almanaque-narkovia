function handlePhotoview() {
  let photoviewItems = document.getElementsByClassName('photoview');
  for (let i = 0; i < photoviewItems.length; i++) {
    document.getElementsByClassName('photoview-item')[i]
      .parentNode.append(document.getElementsByClassName('photoview')[i]);
  }
}

export default handlePhotoview;