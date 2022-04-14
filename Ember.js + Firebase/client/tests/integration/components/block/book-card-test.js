import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | block/book-card', function (hooks) {
  setupRenderingTest(hooks);

  test('always shows image, title, publisher', async function (assert) {
    assert.expect(4);

    this.set('book', {
      src: 'example.com/image.png',
      title: 'The Bench',
      publisher: 'Meghan The Duchess of Sussex',
    });

    await render(hbs`
      <Block::BookCard
        @src={{this.book.src}}
        @title={{this.book.title}}
        @publisher={{this.book.publisher}}
      />
    `);

    assert
      .dom('[data-test-image]')
      .hasAttribute('src', this.book.src)
      .hasAttribute('alt', this.book.title);

    assert.dom('[data-test-title]').containsText(this.book.title);

    assert.dom('[data-test-publisher]').containsText(this.book.publisher);
  });

  test('not show rating if @stars is undefined', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Block::BookCard />
    `);

    assert.dom('[data-test-rating]').doesNotExist();
  });

  test('show rating if @stars is provided', async function (assert) {
    assert.expect(1);

    this.set('book', { stars: 4 });

    await render(hbs`
      <Block::BookCard
        @stars={{this.book.stars}}
      />
    `);

    assert.dom('[data-test-rating]').exists();
  });
});
