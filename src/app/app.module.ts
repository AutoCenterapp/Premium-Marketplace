import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {DealershipComponent} from './dealership-page/dealership/dealership.component';
import {MarketplaceComponent} from './marketplace/marketplace.component';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {UserOffersComponent} from './user-offers-page/user-offers/user-offers.component';
import {RequestDemoPageComponent} from './request-demo-page/request-demo-page.component';
import {CarCardComponent} from './shared/car-card/car-card.component';
import {CarTypesComponent} from './shared/car-types/car-types.component';
import {DealerLocationComponent} from './dealership-page/dealer-location/dealer-location.component';
import {ContactDealerComponent} from './dealership-page/contact-dealer/contact-dealer.component';
import {CarListingFilterComponent} from './shared/car-listing-filter/car-listing-filter.component';
import {CarGlobalFilterComponent} from './shared/car-global-filter/car-global-filter.component';
import {CarListingTabsComponent} from './shared/car-listing-tabs/car-listing-tabs.component';
import {SponsoredAdComponent} from './shared/sponsored-ad/sponsored-ad.component';
import {CarOfferCardComponent} from './user-offers-page/car-offer-card/car-offer-card.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';

import {SlickCarouselModule} from 'ngx-slick-carousel';
import {DealershipsComponent} from './dealerships/dealerships.component';
import {TestimonialsComponent} from './shared/testimonials/testimonials.component';
import {FeaturedCarsComponent} from './shared/featured-cars/featured-cars.component';
import {HomeComponent} from './dealership-fe/home/home.component';
import {ManageInventoryComponent} from './dealership-fe/manage-inventory/manage-inventory.component';
import {CompleteSolutionsComponent} from './dealership-fe/complete-solutions/complete-solutions.component';
import {ApplyOnlineFormComponent} from './apply-online-form/apply-online-form.component';
import {GetQualifiedComponent} from './steps/get-qualified/get-qualified.component';
import {SelectOfferComponent} from './steps/select-offer/select-offer.component';
import {ReviewAndCompleteComponent} from './steps/review-and-complete/review-and-complete.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {SavedVehiclesComponent} from './saved-vehicles/saved-vehicles.component';
import {FvrtCarCardComponent} from './shared/fvrt-car-card/fvrt-car-card.component';
import {MessagePageComponent} from './message-page/message-page.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorHeader} from './services/http.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SortingPipe} from './pipes/sorting.pipe';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { SkeletonLoaderComponent } from './shared/skeleton-loader/skeleton-loader.component';
import { GeneralLoaderComponent } from './shared/general-loader/general-loader.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoSignerComponent } from './co-signer/co-signer.component';
import { CreatePasswordComponent } from './auth/create-password/create-password.component';
import { ImageSortPipe } from './pipes/image-sort.pipe';
import { AdsComponent } from './ads/ads.component';
import { VehcileTypesComponent } from './vehcile-types/vehcile-types.component';
import { AboutComponent } from './about/about.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { SafePipe } from './pipes/safe.pipe';
import { CarDetailsRightSideComponent } from './car-details-right-side/car-details-right-side.component';
import { OnlineChatComponent } from './online-chat/online-chat.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MiniChatBoxComponent } from './mini-chat-box/mini-chat-box.component';
import { AutoCompleteComponent } from './shared/auto-complete/auto-complete.component';
import { PhoneMaskDirective } from './shared/phone-mask.directive';
import { SsnMaskDirective } from './shared/ssn-mask.directive';
import { MonthYearLengthMaskDirective } from './shared/month-year-mask.directive';
import { SignupModalComponent } from './shared/signup-modal/signup-modal.component';
import { SlugifyPipe } from './pipes/slugify.pipe';
import { DealershipCardComponent } from './shared/dealership-card/dealership-card.component';
import { SearchAgainstQueryComponent } from './shared/search-against-query/search-against-query.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { JsonPipe } from '@angular/common';
import { DealerIframeComponent } from './dealer-iframe/dealer-iframe.component';
import { ApplyOnlineIframeComponent } from './apply-online-iframe/apply-online-iframe.component';
import { Select2Module } from 'ng-select2-component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    DealershipComponent,
    MarketplaceComponent,
    CarDetailComponent,
    UserOffersComponent,
    RequestDemoPageComponent,
    CarCardComponent,
    CarOfferCardComponent,
    CarTypesComponent,
    DealerLocationComponent,
    ContactDealerComponent,
    CarListingFilterComponent,
    CarGlobalFilterComponent,
    CarListingTabsComponent,
    SponsoredAdComponent,
    CarOfferCardComponent,
    SignInComponent,
    SignUpComponent,
    DealershipsComponent,
    TestimonialsComponent,
    FeaturedCarsComponent,
    HomeComponent,
    ManageInventoryComponent,
    CompleteSolutionsComponent,
    ApplyOnlineFormComponent,
    GetQualifiedComponent,
    SelectOfferComponent,
    ReviewAndCompleteComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    SavedVehiclesComponent,
    FvrtCarCardComponent,
    MessagePageComponent,
    SortingPipe,
    CarOfferCardComponent,
    SkeletonLoaderComponent,
    GeneralLoaderComponent,
    UserProfileComponent,
    CoSignerComponent,
    CreatePasswordComponent,
    ImageSortPipe,
    AdsComponent,
    VehcileTypesComponent,
    AboutComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    ThankYouPageComponent,
    SafePipe,
    CarDetailsRightSideComponent,
    OnlineChatComponent,
    MiniChatBoxComponent,
    AutoCompleteComponent,
    PhoneMaskDirective,
    SsnMaskDirective,
    MonthYearLengthMaskDirective,
    SignupModalComponent,
    SlugifyPipe,
    DealershipCardComponent,
    SearchAgainstQueryComponent,
    ResetPasswordComponent,
    DealerIframeComponent,
    ApplyOnlineIframeComponent
    ],
  imports: [
    Select2Module,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxSliderModule,
    MatAutocompleteModule,
    BrowserAnimationsModule, // required animations module
    NgbTypeaheadModule,
    JsonPipe,

    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorHeader,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
