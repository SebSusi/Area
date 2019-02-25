package epitech.area.Tools

import android.content.Context
import android.util.Log
import androidx.recyclerview.widget.RecyclerView
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.httpPost
import epitech.area.Managers.AreaAuthorization
import epitech.area.Storages.AreaObject

class AreaService {

    private object Holder { val INSTANCE = AreaService() }

    companion object {
        val instance: AreaService by lazy { AreaService.Holder.INSTANCE }
    }

    fun getAreas(recyclerView: RecyclerView) {
        FuelManager.instance.baseHeaders = mapOf() //remove this when using real server
        try {
            "https://next.json-generator.com/api/json/get/EkdygAcV8".httpGet()
                    .responseObject(AreaObject.ArrayDeserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            (recyclerView.adapter as AreaAdapter).setAreas(res!!)
                        }
                    }
        } catch (e: Exception) {
            Log.d("getAreas Exception", e.toString())
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
