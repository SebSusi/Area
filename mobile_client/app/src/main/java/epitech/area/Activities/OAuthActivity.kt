package epitech.area.Activities

import android.annotation.TargetApi
import android.app.Activity
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.Toast
import androidx.fragment.app.FragmentActivity
import epitech.area.R
import epitech.area.Storages.OAuthInfo
import epitech.area.Storages.SocialToken
import java.util.regex.Pattern

class OAuthActivity : FragmentActivity() {

    private val accessTokenPattern = Pattern.compile("access_token=([^&]*)")
//    private val refreshTokenPattern = Pattern.compile("refresh_token=([^&]*)")
//    private val tokenExpiresInPattern = Pattern.compile("expires_in=(\\d+)")
    private val errorPattern = Pattern.compile("error=([^&]*)")

    private var oAuthInfo : OAuthInfo = OAuthInfo()
    private var socialToken : SocialToken = SocialToken()
    private var loginWebView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        oAuthInfo = intent?.extras?.getSerializable("OAuthInfo") as OAuthInfo
        val root = FrameLayout(this)
        loginWebView = WebView(this)
        root.addView(loginWebView)
        setContentView(root)
        setupWebView()
        loginWebView!!.loadUrl(oAuthInfo.url + "?client_id=" + getString(R.string.imgur_client_id) + "&response_type=token")
    }

    private fun setupWebView() {
        loginWebView!!.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url: String = request?.url.toString()
                return urlLoading(url)
            }

            @TargetApi(Build.VERSION_CODES.LOLLIPOP)
            override fun shouldOverrideUrlLoading(view: WebView?, url: String): Boolean {
                return urlLoading(url)
            }
        }
    }

    fun urlLoading(url: String): Boolean {
        var tokensURL = false

        if (url.startsWith(oAuthInfo.redirectUrl)) {
            val errorMatcher = errorPattern.matcher(url)
            if (errorMatcher.find()) {
                val error = errorMatcher.group(1)
                runOnUiThread {
                    Toast.makeText(this@OAuthActivity, error, Toast.LENGTH_SHORT).show()
                    finish()
                }
                return tokensURL
            }
            tokensURL = true
//            val refreshTokenMatcher = refreshTokenPattern.matcher(url)
//            refreshTokenMatcher.find()
//            val refreshToken = refreshTokenMatcher.group(1)
            val accessTokenMatcher = accessTokenPattern.matcher(url)
            accessTokenMatcher.find()
            val accessToken = accessTokenMatcher.group(1)
//            val tokenExpiresInMatcher = tokenExpiresInPattern.matcher(url)
//            tokenExpiresInMatcher.find()
//            val expiresIn = java.lang.Long.valueOf(tokenExpiresInMatcher.group(1))!!
            runOnUiThread {
                socialToken.provider = oAuthInfo.provider
                socialToken.token = accessToken
                finish()
            }
        }
        return tokensURL
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