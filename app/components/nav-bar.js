import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
  @action
  toggleTheme() {
    alert(1);
    if (!document.body.classList.contains('dark-theme')) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
