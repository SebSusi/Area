package epitech.area.Activities

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.FragmentActivity
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.login.LoginResult
import com.google.android.gms.auth.api.Auth
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.GoogleApiClient
import com.twitter.sdk.android.core.Result
import com.twitter.sdk.android.core.TwitterException
import com.twitter.sdk.android.core.TwitterSession
import epitech.area.R
import epitech.area.Storages.SocialToken
import kotlinx.android.synthetic.main.activity_social.*
import okhttp3.*
import org.jetbrains.anko.longToast
import org.json.JSONException
import org.json.JSONObject
import java.io.IOException


class SocialActivity : FragmentActivity() {
    private val RC_GOOGLE_SIGN_IN: Int = 1
    private val RC_OAUTH_SIGN_IN: Int = 2
    private var socialToken: SocialToken = SocialToken()
    private lateinit var mGoogleApiClient: GoogleApiClient
    private lateinit var mGoogleSignInOptions: GoogleSignInOptions
    private lateinit var mCallbackManager: CallbackManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initGoogleLogin()
        mCallbackManager = CallbackManager.Factory.create()
        setContentView(R.layout.activity_social)
        buttonGoogle.setOnClickListener {
            val intent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient)
            startActivityForResult(intent, RC_GOOGLE_SIGN_IN)
        }
        buttonFacebook.setReadPermissions("email", "public_profile")
        buttonFacebook.registerCallback(mCallbackManager, object : FacebookCallback<LoginResult> {
            override fun onSuccess(loginResult: LoginResult) {
                socialToken.provider = "facebook"
                socialToken.token = loginResult.accessToken.token
            }

            override fun onCancel() {
                Log.d("Facebook Login", "Canceled by user")
            }

            override fun onError(error: FacebookException) {
                Log.d("Facebook Login Error", error.message)
                applicationContext.longToast("Cannot connect to Facebook server")
            }
        })

/*        buttonTwitter.callback = object : com.twitter.sdk.android.core.Callback<TwitterSession>() {
            override fun success(result: Result<TwitterSession>) {
                socialToken.provider = "twitter"
                socialToken.token = result.data.authToken.token
            }

            override fun failure(exception: TwitterException) {
                Log.d("Facebook Login Error", exception.message)
                applicationContext.longToast("Cannot connect to Twitter server")
            }
        }*/
        /*buttonImgur.setOnClickListener {
            val imageIntent = Intent(this, OAuthActivity::class.java)
            imageIntent.putExtra("OAuthInfo", OAuthInfo("imgur",
                    getString(R.string.imgur_oauth_url),
                    getString(R.string.imgur_redirect_url),
                    getString(R.string.imgur_client_id),
                    getString(R.string.imgur_client_secret)))
            startActivityForResult(imageIntent, RC_OAUTH_SIGN_IN)
        }*/
    }

    fun initGoogleLogin() {
        mGoogleSignInOptions = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestServerAuthCode(getString(R.string.google_client_id), true)
                .requestIdToken(getString(R.string.google_client_id))
                .requestEmail()
                .requestProfile()
                .build()
        mGoogleApiClient = GoogleApiClient.Builder(this)
                .enableAutoManage(this /* FragmentActivity */, null /* OnConnectionFailedListener */)
                .addApi(Auth.GOOGLE_SIGN_IN_API, mGoogleSignInOptions)
                .build()
    }

    private fun getGoogleAccessToken(code: String) {
        val client = OkHttpClient()
        val requestBody = FormBody.Builder()
                .add("grant_type", "authorization_code")
                .add("client_id", getString(R.string.google_client_id))
                .add("client_secret", getString(R.string.google_client_secret))
                .add("redirect_uri", "")
                .add("code", code)
                .build()
        val request = Request.Builder()
                .url("https://www.googleapis.com/oauth2/v4/token")
                .post(requestBody)
                .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.d("Login Exception", e.toString())
                applicationContext.longToast("Cannot connect to Google server")
            }
            override fun onResponse(call: Call, response: Response) {
                try {
                    val jsonObject = JSONObject(response.body()?.string())
                    socialToken.provider = "google"
                    socialToken.token = jsonObject.getString("access_token")
                    finish()
                } catch (e: JSONException) {
                    applicationContext.longToast("Could not get access token from Google server")
                    e.printStackTrace()
                }
            }
        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        mCallbackManager.onActivityResult(requestCode, resultCode, data)
//        buttonTwitter.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == RC_GOOGLE_SIGN_IN) {
                val result = Auth.GoogleSignInApi.getSignInResultFromIntent(data)
                if (result.isSuccess) {
                    val account = result.signInAccount
                    getGoogleAccessToken(account?.serverAuthCode!!)
                }
            }
            else if (requestCode == RC_OAUTH_SIGN_IN) {
                val token: SocialToken = data?.getSerializableExtra("SocialToken") as SocialToken
                if (token.token.isNotBlank()) {
                    socialToken = token
                    finish()
                }
            }
        }
    }

    override fun finish() {
        val returnIntent = Intent()
        if (socialToken.token.isNotBlank()) {
            returnIntent.putExtra("SocialToken", socialToken)
            setResult(Activity.RESULT_OK, returnIntent)
        } else {
            setResult(Activity.RESULT_CANCELED, returnIntent)
        }
        super.finish()
    }

}