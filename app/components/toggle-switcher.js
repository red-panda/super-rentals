import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ToggleSwitcherComponent extends Component {
  @tracked toggled = false;

  @action
  async submitToggle() {
    if (this.args.onToggle) {
      await this.args.onToggle();
    }

    this.toggled = !this.toggled;
  }

  // Gets current label
  get label() {
    // LabelOff - toggle-switcher off, LabelOn - toggle-switcher on
    let { labelOff, labelOn } = this.args;

    let currentLabel = '';
    if (this.toggled) {
      currentLabel = labelOn;
    } else {
      currentLabel = labelOff;
    }

    return currentLabel;
  }
}
