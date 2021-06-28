import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class LinkToRouteComponent extends Component {
  @service router;

  get classes() {
    let { route, classes } = this.args;

    let cssClass = classes;

    if (route === this.activeRoute) {
      cssClass = cssClass + ' active';
    }
    return cssClass;
  }

  get activeRoute() {
    return this.router.currentRouteName;
  }
}
