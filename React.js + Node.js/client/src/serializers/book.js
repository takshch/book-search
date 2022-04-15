import { pick } from '../utils/object';

const { assign } = Object;

export const normalizeResponse = (data) => {
  const { volumeInfo, id } = data;

  const normalizedData = { id };

  assign(
    normalizedData,
    pick(volumeInfo, [
      'title',
      'subtitle',
      'authors',
      'publisher',
      'publishedDate',
      'printType',
      'language',
      'averageRating',
      'description',
      'imageLinks'
    ])
  );

  {
    const { language } = normalizedData;
    if (language) {
      assign(normalizedData, { language: language.toUpperCase() });
    }
  }

  return normalizedData;
};
