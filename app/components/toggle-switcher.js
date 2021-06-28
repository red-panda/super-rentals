import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ToggleSwitcherComponent extends Component {
  @tracked toggled = false;
  @tracked textVal = '';
  @tracked text;
  @tracked textToggled;

  @action
  async submitToggle(val) {
    console.log(val);
    this.textVal = val;
    if (this.args.onToggle) {
      await this.args.onToggle();
    }

    this.toggled = !this.toggled;

    if (this.toggled) {
      console.log(this.text);
    } else {
      console.log(this.textToggled);
    }
  }

  get label() {
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
