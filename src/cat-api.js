export function fetchBreeds() {
  //
  return fetch(
    'https://api.thecatapi.com/v1/breeds?api_key=live_X6XMJZdWVTAdUS61jT0rlHA51VpO6V6AtMugMZfUUgb96QFwELNaqccMPovwgFZn'
  ).then(response => {
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=live_X6XMJZdWVTAdUS61jT0rlHA51VpO6V6AtMugMZfUUgb96QFwELNaqccMPovwgFZn&breed_ids=${breedId}`
  ).then(response => {
    return response.json();
  });
}
