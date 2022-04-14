import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | block/application', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders body content', async function (assert) {
    this.set('text', 'hello world');

    await render(hbs`
      <Block::Application>
        <:body>
          {{this.text}}
        </:body>
      </Block::Application>
    `);

    assert.dom(this.element).hasText(this.text);
  });
});
