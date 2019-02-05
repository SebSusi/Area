import {AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LoginOpt} from 'angularx-social-login';

export function getAuthServiceConfigs() {
    const facebookId = '397242161046289'; // Julian Facebook OAuth
//    const googleId = '1045572143715-nul1s2t7ddfgpa50k04t7rk7khq2rl5a.apps.googleusercontent.com'; // Julian Google OAuth
    const googleId = '1078734813685-aomhaobh12lm6lha2f38iq6f9vaunoc2.apps.googleusercontent.com'; // Gregory Google OAuth
    const facebookOptions: LoginOpt = {
        scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
        return_scopes: true,
        enable_profile_selector: true
    };
    const googleOptions: LoginOpt = {
        scope: 'profile email'
    };
    return new AuthServiceConfig([
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(facebookId, facebookOptions)
        },
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleId, googleOptions)
        }
    ]);
}


