import { htmlSafe } from '@ember/template';
import { pick } from '../utils/object';

const { assign } = Object;

export default class BookSerializer {
  normalizeResponse(data) {
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
      ])
    );

    {
      const { language } = normalizedData;
      if (language) {
        assign(normalizedData, { language: language.toUpperCase() });
      }
    }

    let { description } = volumeInfo;
    description = htmlSafe(description);

    assign(normalizedData, { description });

    const { imageLinks } = volumeInfo;
    if (imageLinks) {
      assign(normalizedData, { imageLinks });
    }

    return normalizedData;
  }
}
