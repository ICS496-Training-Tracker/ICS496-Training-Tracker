import { Selector, t } from 'testcafe';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { dashboardPage} from './dashboard.page';
import { profilesPage } from './profiles.page';
import { reportsPage} from './reports.page';
import { navBar } from './navbar.component';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const trainerCredentials = { username: 'trainer1@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

/* Test for signup page */

/* Test for signin page */
test('Test that signin page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.isDisplayed();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.ensureLogout();
});

/* Test for navbar */
test('Test that all navbar buttons work for Unit_Member', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.gotoDashboardPage();
  await dashboardPage.isDisplayed();
  await navBar.gotoProfilesPage();
  await profilesPage.isDisplayed();
  await navBar.ensureLogout();
});

test('Test that all navbar buttons work for Unit_Trainer', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(trainerCredentials.username, trainerCredentials.password);
  await navBar.gotoDashboardPage();
  await dashboardPage.isDisplayed();
  await navBar.gotoProfilesPage();
  await profilesPage.isDisplayed();
  await navBar.gotoReportsPage();
  await reportsPage.isDisplayed();
  await navBar.ensureLogout();
});

test('Test that all navbar buttons work for Admin', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.gotoDashboardPage();
  await dashboardPage.isDisplayed();
  await navBar.gotoProfilesPage();
  await profilesPage.isDisplayed();
  await navBar.gotoReportsPage();
  await reportsPage.isDisplayed();
  await navBar.ensureLogout();
});

/* Test for dashboard page */
test('Test that dashboard page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await t.navigateTo('http://localhost:3000/dashboard');
  await dashboardPage.isDisplayed();
  await navBar.ensureLogout();
});

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
