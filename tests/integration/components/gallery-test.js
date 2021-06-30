import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | slider', function (hooks) {
  setupRenderingTest(hooks);

  const testImages = [
    {
      title: 'Grand Old Mansion',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/The_Crane_Estate_at_Castle_Hill_in_Ipswich%2C_Massachusetts.jpg/2880px-The_Crane_Estate_at_Castle_Hill_in_Ipswich%2C_Massachusetts.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2a/Rose_Garden%2C_Castle_Hill%2C_Ipswich_MA.jpg',
      ],
    },
    {
      title: 'Downtown Charm',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/2/20/Seattle_-_Barnes_and_Bell_Buildings.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/db/Seattle_-_Barnes_Building.jpg',
      ],
    },
  ];

  test('it renders', async function (assert) {
    this.set('rentals', testImages);

    await render(hbs`<Gallery @images={{this.rentals}}/>`);

    assert.dom('.js-gallery').exists();
    assert.dom('.gallery__item').exists();
    assert.dom('.gallery__item:first-child .gallery__img')
      .exists()
      .hasAttribute(
        'src',
        'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
      );
    assert.dom('.gallery__item:first-child .gallery__link').hasText('Grand Old Mansion');
  });
});
