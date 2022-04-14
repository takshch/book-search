import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { htmlSafe } from '@ember/template';

module('Integration | Component | block/book', function (hooks) {
  setupRenderingTest(hooks);

  test('always shows image, title, authors, publisher, publish date, description', async function (assert) {
    assert.expect(9);

    this.set('book', {
      imageLinks: {
        thumbnail: 'example.com/image.png',
      },
      title: 'The Bench',
      authors: ['Meghan', 'The Duchess of Sussex'],
      publisher: 'Penguin UK',
      publishedDate: '2021-06-08',
      printType: 'Book',
      language: 'EN',
      description: htmlSafe('<b>Hello World</b>'),
    });

    await render(hbs`<Block::Book @book={{this.book}} />`);

    assert
      .dom('[data-test-image]')
      .hasAttribute('src', this.book.imageLinks.thumbnail)
      .hasAttribute('alt', this.book.title);

    assert.dom('[data-test-title]').containsText(this.book.title);

    assert
      .dom('[data-test-authors]')
      .containsText(this.book.authors.join(', '));

    assert.dom('[data-test-publisher]').containsText(this.book.publisher);

    assert
      .dom('[data-test-published-date]')
      .containsText(this.book.publishedDate);

    assert.dom('[data-test-print-type]').containsText(this.book.printType);

    assert.dom('[data-test-language]').containsText(this.book.language);

    {
      const descriptionNode = document.querySelector('[data-test-description]');
      assert.strictEqual(
        descriptionNode.innerHTML.trim(),
        this.book.description.string
      );
    }
  });

  test('show rating if averageRating is provided', async function (assert) {
    this.set('book', { averageRating: 4 });

    await render(hbs`<Block::Book @book={{this.book}} />`);

    assert.dom('[data-test-rating]').exists();
  });

  test('not show rating if averageRating is undefined', async function (assert) {
    this.set('book', {});

    await render(hbs`<Block::Book @book={{this.book}} />`);

    assert.dom('[data-test-rating]').doesNotExist();
  });

  test('show subtitle if subtitle is provided', async function (assert) {
    this.set('book', { subtitle: 'hello world' });

    await render(hbs`<Block::Book @book={{this.book}} />`);

    assert.dom('[data-test-subtitle]').exists();
  });

  test('not show subtitle if subtitle is undefined', async function (assert) {
    this.set('book', {});

    await render(hbs`<Block::Book @book={{this.book}} />`);

    assert.dom('[data-test-subtitle]').doesNotExist();
  });
});
