const imageUrl = imgId => {
  const urlImg = `https://image.tmdb.org/t/p/original${imgId}`;
  const emptyUrl = `https://image.tmdb.org/t/p/original/`;
  if (imgId === null) {
    return emptyUrl;
  }
  return urlImg;
};

export default imageUrl;
