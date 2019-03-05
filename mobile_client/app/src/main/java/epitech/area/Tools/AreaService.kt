package epitech.area.Tools

import android.content.Context
import android.util.Log
import android.widget.TextView
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpDelete
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.httpPost
import epitech.area.Managers.AreaAuthorization
import epitech.area.Storages.AReActionObject
import epitech.area.Storages.AccountObject
import epitech.area.Storages.AreaObject

class AreaService {

    private object Holder { val INSTANCE = AreaService() }

    companion object {
        val instance: AreaService by lazy { AreaService.Holder.INSTANCE }
    }

    fun getAreas(areaAdapter: AreaAdapter) {
        FuelManager.instance.basePath = "" //remove this when using real server
        FuelManager.instance.baseHeaders = mapOf() //remove this when using real server
        try {
            "https://next.json-generator.com/api/json/get/EkdygAcV8".httpGet()
                    .responseObject(AreaObject.ArrayDeserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            areaAdapter.setAreas(res!!)
                        }
                    }
        } catch (e: Exception) {
            Log.d("getAreas Exception", e.toString())
        }
        FuelManager.instance.basePath = "http://10.0.2.2:8080/" //remove this when using real server
    }

    fun getArea(areaAdapter: AreaAdapter, position: Int, uniqueId: String) {
        FuelManager.instance.basePath = "" //remove this when using real server
        FuelManager.instance.baseHeaders = mapOf() //remove this when using real server
        try {
            "https://next.json-generator.com/api/json/get/4JboGC5VU".httpGet()
                    .responseObject(AreaObject.Deserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            areaAdapter.setArea(res!!, position)
                        }
                    }
        } catch (e: Exception) {
            Log.d("getArea Exception", e.toString())
        }
        FuelManager.instance.basePath = "http://10.0.2.2:8080/" //remove this when using real server
    }

    fun getArea(reActionAdapter: ReActionAdapter, textView: TextView,  uniqueId: String) {
        FuelManager.instance.basePath = "" //remove this when using real server
        FuelManager.instance.baseHeaders = mapOf() //remove this when using real server
        try {
            "https://next.json-generator.com/api/json/get/4JboGC5VU".httpGet()
                    .responseObject(AreaObject.Deserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            textView.text = res?.name
                            reActionAdapter.setReActions(res!!)
                        }
                    }
        } catch (e: Exception) {
            Log.d("getArea Exception", e.toString())
        }
        FuelManager.instance.basePath = "http://10.0.2.2:8080/" //remove this when using real server
    }

    fun changeAreaState(areaId: String, state: Boolean) {
        return
        "".httpPost()
    }

    fun changeAreaName(areaId: String, name: String) {
        return
        "".httpPost()
    }

    fun deleteArea(areaId: String) {
        return
        "".httpDelete()
    }

    fun postReAction(reAction: AReActionObject) {
        return
        if (reAction.id.isNotBlank())
            "".httpPost()
        else
            "".httpPost()
    }

    fun deleteReaction(areaId: String) {
        return
        "".httpPost()
    }

    fun getAccounts(accountAdapter: AccountAdapter) {
        FuelManager.instance.basePath = "" //remove this when using real server
        FuelManager.instance.baseHeaders = mapOf() //remove this when using real server
        try {
            "https://next.json-generator.com/api/json/get/Vk_WtKgrU".httpGet()
                    .responseObject(AccountObject.ArrayDeserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            accountAdapter.setAccounts(res!!)
                        }
                    }
        } catch (e: Exception) {
            Log.d("getAreas Exception", e.toString())
        }
        FuelManager.instance.basePath = "http://10.0.2.2:8080/" //remove this when using real server
    }

    fun deleteAccount(acountId: String) {
        return
        "".httpDelete()
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
