import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
  @service login;

  @action
  toggleTheme(val) {
    console.log(val);
    if (!document.body.classList.contains('dark-theme')) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  @action
  deleteAccount() {
    this.login.deleteUser();
  }
}
