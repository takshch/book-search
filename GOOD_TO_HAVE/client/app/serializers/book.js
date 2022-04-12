import { htmlSafe } from '@ember/template';
import { pick } from '../utils/object';

const { assign } = Object;

export default class BookSerializer {
  normalizeResponse(data) {
    const { volumeInfo } = data;

    const normalizedData = pick(volumeInfo, [
      'title',
      'subtitle',
      'authors',
      'publisher',
      'publishedDate',
      'printType',
      'language',
      'averageRating',
    ]);

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
      const { thumbnail } = imageLinks;
      assign(normalizedData, { thumbnail });
    }

    return normalizedData;
  }
}
