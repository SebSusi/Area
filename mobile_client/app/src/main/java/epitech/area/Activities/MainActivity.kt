package epitech.area.Activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.FragmentActivity
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpPost
import com.google.android.gms.auth.api.Auth
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.GoogleApiClient
import epitech.area.Managers.AreaAuthorization
import epitech.area.R
import epitech.area.Storages.TokenResponse
import epitech.area.Tools.AreaService
import kotlinx.android.synthetic.main.activity_main.*
import okhttp3.*
import org.jetbrains.anko.longToast
import org.json.JSONException
import org.json.JSONObject
import java.io.IOException

class MainActivity : FragmentActivity() {
    private val areaService: AreaService = AreaService()
    val GOOGLE_SIGN_IN: Int = 1
    lateinit var mGoogleApiClient: GoogleApiClient
    lateinit var mGoogleSignInOptions: GoogleSignInOptions

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        FuelManager.instance.basePath = getString(R.string.area_api_baseurl)
        AreaAuthorization.instance.removeAccessToken(applicationContext)
        areaService.changeFuelHeaders(applicationContext)
        initGoogleLogin()
        setContentView(R.layout.activity_main)
        signUpChangeButton.setOnClickListener {
            changeLayout()
        }
        loginChangeButton.setOnClickListener {

            changeLayout()
        }
        signUpConnectButton.setOnClickListener {
            if (signUpPassword.text.toString().equals(signUpPasswordConfirm.text.toString())) {
                signUp(signUpUsername.text.toString(), signUpEmail.text.toString(), signUpPassword.text.toString())
            } else {
                applicationContext.longToast("Password don't match")
            }

        }
        loginConnectButton.setOnClickListener {
            login(loginEmail.text.toString(), loginPassword.text.toString())
        }
        socialGoogle.setOnClickListener {
            val intent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient)
            startActivityForResult(intent, GOOGLE_SIGN_IN)
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

    override fun onResume() {
        super.onResume()
        AreaAuthorization.instance.removeAccessToken(applicationContext)
        areaService.changeFuelHeaders(applicationContext)
    }

    private fun changeLayout() {
        val signInVisibility = loginLayout.visibility
        loginLayout.visibility = signUpLayout.visibility
        signUpLayout.visibility = signInVisibility
    }

    private fun login(email: String, password: String) {
        try {
            "auth/local/in".httpPost()
                    .body("{\"email\": \"" + email + "\", \"password\": \"" + password + "\"}")
                    .responseObject(TokenResponse.Deserializer()) { _, _, result ->
                        val(res, err) = result
                        if (res?.success == true) {
                            AreaAuthorization.instance.saveAccessToken(applicationContext, res.token)
                            areaService.changeFuelHeaders(applicationContext)
                            val intent = Intent(this, HomeActivity::class.java)
                            startActivity(intent)
                        } else {
                            if (res?.message.toString().isNotEmpty())
                                applicationContext.longToast(res?.message.toString())
                            else
                                applicationContext.longToast("Cannot connect to the server")
                        }
                    }
        } catch (e: Exception) {
            Log.d("Login Exception", e.toString())
            applicationContext.longToast("Cannot connect to the server")
        }
    }

    private fun signUp(username: String, email: String, password: String) {
        try {
            "auth/local/up".httpPost()
                    .body("{\"username\": \"" + username + "\", \"email\": \"" + email + "\", \"password\": \"" + password + "\"}")
                    .responseObject(TokenResponse.Deserializer()) { _, _, result ->
                        val(res, err) = result
                        if (res?.success == true) {
                            AreaAuthorization.instance.saveAccessToken(applicationContext, res.token)
                            areaService.changeFuelHeaders(applicationContext)
                            val intent = Intent(this, HomeActivity::class.java)
                            startActivity(intent)
                        } else {
                            if (res?.message.toString().isNotEmpty())
                                applicationContext.longToast(res?.message.toString())
                            else
                                applicationContext.longToast("Cannot connect to the server")
                        }
                    }
        } catch (e: Exception) {
            Log.d("Login Exception", e.toString())
            applicationContext.longToast("Cannot connect to the server")
        }
    }

    private fun sociaLogin(provider: String, token: String) {
        try {
            ("auth/" + provider).httpPost()
                    .body("{\"access_token\": \"" + token + "\"}")
                    .responseObject(TokenResponse.Deserializer()) { _, _, result ->
                        val(res, err) = result
                        if (res?.success == true) {
                            AreaAuthorization.instance.saveAccessToken(applicationContext, res.token)
                            areaService.changeFuelHeaders(applicationContext)
                            val intent = Intent(this, HomeActivity::class.java)
                            startActivity(intent)
                        } else {
                            if (res?.message.toString().isNotEmpty())
                                applicationContext.longToast(res?.message.toString())
                            else
                                applicationContext.longToast("Cannot connect to the server")
                        }
                    }
        } catch (e: Exception) {
            Log.d("Login Exception", e.toString())
            applicationContext.longToast("Cannot connect to the server")
        }
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
                    sociaLogin("google", jsonObject.getString("access_token"))
                } catch (e: JSONException) {
                    e.printStackTrace()
                }
            }
        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == GOOGLE_SIGN_IN) {
            val result = Auth.GoogleSignInApi.getSignInResultFromIntent(data)
            if (result.isSuccess) {
                val account = result.signInAccount
                getGoogleAccessToken(account?.serverAuthCode!!)
            }
        }
    }

}