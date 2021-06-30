import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | toggle-switcher', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ToggleSwitcher
      @labelOff="Off"
      @labelOn="On">
    </ToggleSwitcher>`);

    assert.dom('.toggle-switcher').exists();
    assert.dom('.toggle-switcher').hasText('Off');
  });

  test('clicking on the component', async function (assert) {
    await render(hbs`<ToggleSwitcher
      @labelOff="Off"
      @labelOn="On">
    </ToggleSwitcher>`);

    assert.dom('.toggle-switcher').exists();
    assert.dom('.toggle-switcher').hasText('Off');

    await click('.toggle-switcher');

    assert.dom('.toggle-switcher').hasClass('toggle-switcher--active');
    assert.dom('.toggle-switcher').hasText('On');

    await click('.toggle-switcher');

    assert.dom('.toggle-switcher').doesNotHaveClass('toggle-switcher--active');
    assert.dom('.toggle-switcher').hasText('Off');
  });
});
