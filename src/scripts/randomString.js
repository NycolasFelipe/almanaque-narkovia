function randomString() {
  let date = new Date();
  date = JSON.stringify(date);
  date = date
    .replaceAll('-', '')
    .replaceAll(':', '')
    .replaceAll('.', '');
  return date;
}

export default randomString;