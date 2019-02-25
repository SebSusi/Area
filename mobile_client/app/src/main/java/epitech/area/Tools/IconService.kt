package epitech.area.Tools

import android.app.Service
import android.content.Context
import android.util.Log
import androidx.recyclerview.widget.RecyclerView
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.httpPost
import epitech.area.Managers.AreaAuthorization
import epitech.area.R
import epitech.area.Storages.AreaObject

class IconService {

    private object Holder { val INSTANCE = IconService() }

    companion object {
        val instance: IconService by lazy { IconService.Holder.INSTANCE }
    }

    fun getActionIcon(serviceName: String = "ACTION") : Int {
        return getIcon(serviceName, "ACTION")
    }

    fun getReactionIcon(serviceName: String = "REACTION") : Int {
        return getIcon(serviceName, "REACTION")

    }

    fun getServiceIcon(serviceName: String = "BASIC") : Int {
        return getIcon(serviceName)
    }

    private fun getIcon(serviceName: String, default: String = "BASIC") : Int {
        when (serviceName.toUpperCase()) {
            "FACEBOOK" -> return R.drawable.ic_facebook
            "GMAIL" -> return R.drawable.ic_gmail
            "OUTLOOK" -> return R.drawable.ic_outlook
            "TWITTER" -> return R.drawable.ic_twitter
            "YOUTUBE" -> return R.drawable.ic_youtube
        }
        when (default.toUpperCase()) {
            "ACTION" -> return R.drawable.ic_action
            "REACTION" -> return R.drawable.ic_reaction
        }
        return R.drawable.ic_basic
    }

}
