import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
  @service router;

  @action
  toggleTheme() {
    const $body = document.body;
    const __activeClass = 'dark-theme';
    if (!$body.classList.contains(__activeClass)) {
      $body.classList.add(__activeClass);
    } else {
      $body.classList.remove(__activeClass);
    }
  }

  get activeRoute() {
    return this.router.currentRouteName;
  }
}
