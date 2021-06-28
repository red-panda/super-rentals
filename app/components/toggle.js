import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ToggleComponent extends Component {
  @tracked toggled = false;

  @action toggle() {
    this.toggled = !this.toggled;
  }

  @action
  async submitToggle() {
    if (this.args.onToggle) {
      await this.args.onToggle(this.confirmValue);
    }

    this.toggled = false;
  }
}
