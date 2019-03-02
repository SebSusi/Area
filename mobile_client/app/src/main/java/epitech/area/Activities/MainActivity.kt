package epitech.area.Activities

import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.FragmentActivity
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpPost
import epitech.area.Managers.AreaAuthorization
import epitech.area.R
import epitech.area.Storages.SocialToken
import epitech.area.Storages.TokenResponse
import epitech.area.Tools.AreaService
import epitech.area.Tools.InfoService
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.view_server_url.view.*
import org.jetbrains.anko.longToast

class MainActivity : FragmentActivity() {
    private val RC_SOCIAL_SIGN_IN: Int = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        FuelManager.instance.basePath = getString(R.string.area_api_baseurl)
        AreaAuthorization.instance.removeAccessToken(applicationContext)
        AreaService.instance.changeFuelHeaders(applicationContext)
        InfoService.instance.getInfos()
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
        socialLoginButton.setOnClickListener {
            val intent = Intent(this, SocialActivity::class.java)
            startActivityForResult(intent, RC_SOCIAL_SIGN_IN)
        }
        serverUrlButton.setOnClickListener {
            val view = layoutInflater.inflate(R.layout.view_server_url, null)
            view.serverUrl.setText(FuelManager.instance.basePath)
            val alert = AlertDialog.Builder(this, R.style.CustomDialogTheme).setTitle("Server URL").setView(view)
            alert.setPositiveButton(android.R.string.ok) { dialog, _ ->
                FuelManager.instance.basePath = view.serverUrl.text.toString()
            }
            alert.setNegativeButton(android.R.string.cancel) { dialog, _ ->
                dialog.cancel()
            }
            alert.show()
        }
    }

    override fun onResume() {
        super.onResume()
        AreaAuthorization.instance.removeAccessToken(applicationContext)
        AreaService.instance.changeFuelHeaders(applicationContext)
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
                            AreaService.instance.changeFuelHeaders(applicationContext)
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
                            AreaService.instance.changeFuelHeaders(applicationContext)
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

    private fun socialLogin(socialToken: SocialToken) {
        try {
            ("auth/" + socialToken.provider).httpPost()
                    .body("{\"access_token\": \"" + socialToken.token + "\"}")
                    .responseObject(TokenResponse.Deserializer()) { _, _, result ->
                        val(res, err) = result
                        if (res?.success == true) {
                            AreaAuthorization.instance.saveAccessToken(applicationContext, res.token)
                            AreaService.instance.changeFuelHeaders(applicationContext)
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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == RC_SOCIAL_SIGN_IN) {
                socialLogin(data?.getSerializableExtra("SocialToken") as SocialToken)
            }
        }
    }
}