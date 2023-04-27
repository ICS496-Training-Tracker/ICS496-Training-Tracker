import { Selector, t } from 'testcafe';
import { addStuffPage, listStuffAdminPage, listStuffPage, editStuffPage, /* manageDatabasePage, */ signOutPage } from './simple.page';
import { landingPage } from './landing.page';
import { dashboard } from "./dashboard.page";
import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { profilesPage } from './profiles.page';
import { reportsPage} from './reports.page';
import { navBar } from './navbar.component';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');


/* Test for dashboard display */
test('Test that dashboard page shows up', async () => {
  await dashboard.isDisplayed();
});


/* Test that signin and signout work for regular user */
test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

/* Admin page sign in and logged in test */
test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
});

/* Test for signup page */
/* Test for signin page */

/* Test for navbar page */

/* Test for dashboard page */

/* Test for profiles page */
test('Test that profiles page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await t.navigateTo('http://localhost:3000/profiles');
  await profilesPage.isDisplayed();
  await navBar.ensureLogout();
});

/* Test for reports page */
test('Test that reports page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await t.navigateTo('http://localhost:3000/reports');
  await reportsPage.isDisplayed();
  await navBar.ensureLogout();
});
