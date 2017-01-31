import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('accelerometer-display', 'Integration | Component | accelerometer display', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{accelerometer-display}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#accelerometer-display}}
      template block text
    {{/accelerometer-display}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
