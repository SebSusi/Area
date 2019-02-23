package epitech.area.Tools

import android.content.Context
import android.util.Log
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpPost
import epitech.area.Managers.AreaAuthorization
import epitech.area.Storages.TokenResponse
import org.jetbrains.anko.toast

class AreaService {

    fun signUp(applicationContext: Context, username: String, email: String, password: String) {
        try {
            "auth/local/up".httpPost()
                    .body("{\"username\": \"" + username + "\", \"email\": \"" + email + "\", \"password\": \"" + password + "\"}")
                    .responseObject(TokenResponse.Deserializer()) { _, _, result ->
                        val(res, err) = result
                        if (res?.success == true) {
                            AreaAuthorization.instance.saveAccessToken(applicationContext, res.token)
                            changeFuelHeaders(applicationContext)
                        } else {
                            applicationContext.toast(res?.message.toString())
                        }
                    }
        } catch (e: Exception) {
            Log.d("SignUp Exception", e.toString())
        }
    }

    fun login(applicationContext: Context, email: String, password: String) {
        try {
            "auth/local/in".httpPost()
                    .body("{\"email\": \"" + email + "\", \"password\": \"" + password + "\"}")
                    .responseObject(TokenResponse.Deserializer()) { _, _, result ->
                        val(res, err) = result
                        if (res?.success == true) {
                            AreaAuthorization.instance.saveAccessToken(applicationContext, res.token)
                            changeFuelHeaders(applicationContext)
                        } else {
                            applicationContext.toast(res?.message.toString())
                        }
                    }
        } catch (e: Exception) {
            Log.d("Login Exception", e.toString())
        }
    }

    fun changeFuelHeaders(applicationContext: Context) {
        val token : String = AreaAuthorization.instance.getAccessToken(applicationContext)
        if (token.isNotEmpty()) {
            FuelManager.instance.baseHeaders = mapOf(
                    "Content-Type" to "application/json; charset=UTF-8",
                    "Authorization" to token)
        } else {
            FuelManager.instance.baseHeaders = mapOf(
                    "Content-Type" to "application/json; charset=UTF-8")
        }
    }
}