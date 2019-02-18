package epitech.area.Activities

import android.content.Intent
import android.os.Build
import android.app.Activity
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import androidx.annotation.RequiresApi
import android.widget.*
import android.view.MenuItem
import epitech.area.R
import epitech.area.Managers.AreaAuthorization

class HomeActivity : FragmentActivity() {

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
        }
    }

    fun logout(item: MenuItem): Boolean
    {
        AreaAuthorization.instance.removeAccessToken(applicationContext)
        Toast.makeText(this@HomeActivity, R.string.logged_out, Toast.LENGTH_SHORT).show()
        finish()
        return true
    }

    fun goToSettings(item: MenuItem): Boolean
    {
        val intentSettings = Intent(this, SettingsActivity::class.java)
        startActivityForResult(intentSettings, 0)
        return true
    }
}
