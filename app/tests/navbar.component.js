import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class NavBar {

  /* If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout() {
    const loggedInUser = await Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists;
    if (loggedInUser) {
      await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
      await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT}`);
    }
  }

  async gotoSignInPage() {
    await this.ensureLogout(t);
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN}`);
  }

  /* Check that the specified user is currently logged in. */
  async isLoggedIn(username) {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    const loggedInUser = Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).innerText;
    await t.expect(loggedInUser).eql(username);
  }

  /* Check that someone is logged in, then click items to logout. */
  async logout() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT}`);
  }

  /* Pull down login menu, go to sign up page. */
  async gotoSignUpPage() {
    await this.ensureLogout(t);
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP}`);
  }

  async gotoDashboardPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_DASHBOARD}`);
  }

  async gotoProfilesPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_PROFILES}`);
  }

  async gotoReportsPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_REPORTS}`);
  }
}

export const navBar = new NavBar();
