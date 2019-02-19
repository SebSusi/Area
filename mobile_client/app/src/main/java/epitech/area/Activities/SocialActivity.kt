package epitech.area.Activities

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.FragmentActivity
import com.google.android.gms.auth.api.Auth
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.GoogleApiClient
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
    private var socialToken: SocialToken = SocialToken()
    private lateinit var mGoogleApiClient: GoogleApiClient
    private lateinit var mGoogleSignInOptions: GoogleSignInOptions

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initGoogleLogin()
        setContentView(R.layout.activity_social)
        buttonGoogle.setOnClickListener {
            val intent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient)
            startActivityForResult(intent, RC_GOOGLE_SIGN_IN)
        }
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
                    e.printStackTrace()
                }
            }
        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == RC_GOOGLE_SIGN_IN) {
            val result = Auth.GoogleSignInApi.getSignInResultFromIntent(data)
            if (result.isSuccess) {
                val account = result.signInAccount
                getGoogleAccessToken(account?.serverAuthCode!!)
            }
        }
    }

    override fun finish() {
        val returnIntent = Intent()
        if (socialToken.provider.isNotEmpty()) {
            returnIntent.putExtra("SocialToken", socialToken)
            setResult(Activity.RESULT_OK, returnIntent)
        } else {
            setResult(Activity.RESULT_CANCELED, returnIntent)
        }
        super.finish()
    }

}