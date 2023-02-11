export const fetchGallery = async (searchParams, page) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=31755618-c569c5727c417e8772568fe10&q=${searchParams}&page=${page}`
  );

  if (!response.status) throw new Error(response.status);

  const galleryData = await response.json();

  return galleryData.hits;
};
