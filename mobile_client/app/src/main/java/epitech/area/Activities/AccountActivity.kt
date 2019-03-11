package epitech.area.Activities

import android.app.Activity
import android.content.Intent
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import com.github.kittinunf.fuel.httpPost
import epitech.area.R
import epitech.area.Storages.SocialToken
import epitech.area.Storages.TokenResponse
import epitech.area.Tools.AccountAdapter
import epitech.area.Tools.AreaService
import epitech.area.Tools.InfoService
import kotlinx.android.synthetic.main.activity_account.*
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.view_account.view.*
import org.jetbrains.anko.longToast

class AccountActivity : FragmentActivity() {
    private val RC_SOCIAL_O_AUTH: Int = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        InfoService.instance.checkAreaInfos()
        setContentView(R.layout.activity_account)
        initNewAccountButton()
        accountList.layoutManager = LinearLayoutManager(this)
        accountList.adapter = AccountAdapter(this)
        AreaService.instance.getAccounts(accountList.adapter as AccountAdapter)
        accountRefresh.setOnRefreshListener {
            AreaService.instance.getAccounts(accountList.adapter as AccountAdapter)
            accountRefresh.isRefreshing = false
        }
    }

    override fun onResume() {
        super.onResume()
        AreaService.instance.getAccounts(accountList.adapter as AccountAdapter)
    }

    private fun socialAuth(socialToken: SocialToken) {
        try {
            ("area_account/").httpPost()
                    .body("{\"access_token\": \"" + socialToken.token + "\"}")
                    .responseObject(TokenResponse.Deserializer()) { _, _, result ->
                        val(res, err) = result
                        if (err == null) {
                            if (res?.success == true) {
                                AreaService.instance.getAccounts(areaList.adapter as AccountAdapter)
                            } else {
                                if (res?.message.toString().isNotEmpty())
                                    applicationContext.longToast(res?.message.toString())
                                else
                                    applicationContext.longToast("Cannot connect to the server")
                            }
                        } else {
                            Log.d("Social Auth", err.toString())
                            applicationContext.longToast("Error while connecting to the server")
                        }
                    }
        } catch (e: Exception) {
            Log.d("Social Auth Exception", e.toString())
            applicationContext.longToast("Cannot connect to the server")
        }
    }

    private fun initNewAccountButton() {
        accountNew.accountName.text = "Add new account"
        accountNew.accountImage.setImageResource(R.drawable.ic_basic)
        accountNew.accountClicker.setOnClickListener {
            val intent = Intent(this, SocialActivity::class.java)
            startActivityForResult(intent, RC_SOCIAL_O_AUTH)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == RC_SOCIAL_O_AUTH) {
                AreaService.instance.createAccount(data?.getSerializableExtra("SocialToken") as SocialToken)
                AreaService.instance.getAccounts(accountList.adapter as AccountAdapter)
            }
        }
    }
}
