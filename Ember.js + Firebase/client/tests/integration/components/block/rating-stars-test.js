import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | block/rating-stars', function (hooks) {
  setupRenderingTest(hooks);

  test('show 3 unfilled and 2 filled stars', async function (assert) {
    this.set('stars', 3.5);

    await render(hbs`<Block::RatingStars @stars={{this.stars}} />`);

    assert.dom('[data-test-filled-star]').exists({ count: 3 });
    assert.dom('[data-test-unfilled-star]').exists({ count: 2 });
  });
});
