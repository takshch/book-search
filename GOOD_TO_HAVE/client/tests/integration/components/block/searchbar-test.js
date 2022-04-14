import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | block/searchbar', function (hooks) {
  setupRenderingTest(hooks);

  test('input should have type text', async function (assert) {
    await render(hbs`
      <Block::Searchbar />
    `);

    assert.dom('[data-test-input]').hasAttribute('type', 'text');
  });

  test('toggle placeholder', async function (assert) {
    this.set('placeholder', 'Harry Potter');

    await render(hbs`
      <Block::Searchbar
        @placeholder={{this.placeholder}}
      />
    `);

    assert
      .dom('[data-test-input]')
      .hasAttribute('placeholder', this.placeholder);

    this.set('placeholder', undefined);
    assert.dom('[data-test-input]').hasNoAttribute('placeholder');
  });

  test('toggle input placeholder', async function (assert) {
    this.set('placeholder', 'Harry Potter');

    await render(hbs`
      <Block::Searchbar
        @placeholder={{this.placeholder}}
      />
    `);

    assert
      .dom('[data-test-input]')
      .hasAttribute('placeholder', this.placeholder);

    this.set('placeholder', undefined);
    assert.dom('[data-test-input]').hasNoAttribute('placeholder');
  });

  test('on typing, @onInput should be called', async function (assert) {
    this.set('onInput', (e) => {
      this.set('inputValue', e.target.value);
    });

    await render(hbs`
      <Block::Searchbar
        @onInput={{this.onInput}}
      />
    `);

    await fillIn('[data-test-input]', 'Harry Potter');
    assert.strictEqual(this.inputValue, 'Harry Potter');
  });
});
