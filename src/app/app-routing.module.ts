import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {CompleteSolutionsComponent} from './dealership-fe/complete-solutions/complete-solutions.component';
import {HomeComponent} from './dealership-fe/home/home.component';
import {ManageInventoryComponent} from './dealership-fe/manage-inventory/manage-inventory.component';
import {DealershipComponent} from './dealership-page/dealership/dealership.component';
import {DealershipsComponent} from "./dealerships/dealerships.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {MarketplaceComponent} from './marketplace/marketplace.component';
import {RequestDemoPageComponent} from './request-demo-page/request-demo-page.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {UserOffersComponent} from './user-offers-page/user-offers/user-offers.component';
import {ApplyOnlineFormComponent} from "./apply-online-form/apply-online-form.component";
import {GetQualifiedComponent} from "./steps/get-qualified/get-qualified.component";
import {ReviewAndCompleteComponent} from "./steps/review-and-complete/review-and-complete.component";
import {SelectOfferComponent} from "./steps/select-offer/select-offer.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./auth/change-password/change-password.component";
import { SavedVehiclesComponent } from './saved-vehicles/saved-vehicles.component';
import { MessagePageComponent } from './message-page/message-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {CreatePasswordComponent} from "./auth/create-password/create-password.component";
import { AdsComponent } from './ads/ads.component';
import {AboutComponent} from "./about/about.component";
import {TermsConditionComponent} from "./terms-condition/terms-condition.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {DealerIframeComponent} from "./dealer-iframe/dealer-iframe.component";
import {ApplyOnlineIframeComponent} from "./apply-online-iframe/apply-online-iframe.component";


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'offers', component: UserOffersComponent},
  {path: 'request-demo', component: RequestDemoPageComponent},
  {path: 'dealer-iframe/:UID', component: DealerIframeComponent},
  {path: 'apply-online/:dealershipSlug/:vehicleSlug', component: ApplyOnlineFormComponent},
  {path: 'apply-online-iframe/:dealershipSlug', component: ApplyOnlineIframeComponent},
  {path: 'apply-online/:dealershipSlug', component: ApplyOnlineFormComponent},
  {path: 'marketplace', component: MarketplaceComponent},
  {path: 'dealership/:dealershipSlug', component: DealershipComponent},
  {path: 'dealerships', component: DealershipsComponent},
  {path: 'marketplace/details', component: CarDetailComponent},
  {path: 'dealership/details', component: CarDetailComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'create-password', component: CreatePasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'dealership/home', component: HomeComponent},
  {path: 'dealership/complete-solution', component: CompleteSolutionsComponent},
  {path: 'dealership/manage-inventory', component: ManageInventoryComponent},
  {path: 'get-qualified/:id', component: GetQualifiedComponent},
  {path: 'select-offer/:id', component: SelectOfferComponent},
  {path: 'review/:id', component: ReviewAndCompleteComponent},
  {path: 'thank-you-for-submiting/:id', component: ThankYouPageComponent},
  {path: 'thank-you-for-applying/:id', component: ThankYouPageComponent},
  {path: 'saved-vehicles', component: SavedVehiclesComponent},
  {path: 'ads/:id', component: AdsComponent},
  {path: ':dealershipSlug/:vehicleSlug', component: CarDetailComponent},
  {path: 'inbox', component: MessagePageComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'about', component: AboutComponent},
  {path: 'terms-of-service', component: TermsConditionComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
