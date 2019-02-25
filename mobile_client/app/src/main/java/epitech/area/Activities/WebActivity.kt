package epitech.area.Activities

import android.os.Bundle
import android.webkit.WebView
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import epitech.area.R

class WebActivity : FragmentActivity() {

    private var loginWebView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val root = FrameLayout(this)
        loginWebView = WebView(this)
        root.addView(loginWebView)
        setContentView(root)
        loginWebView!!.loadUrl(getString(R.string.area_site_baseurl))
    }
}
