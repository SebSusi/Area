package epitech.area.Tools

import android.content.Context
import android.util.Log
import android.widget.TextView
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpDelete
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.fuel.httpPut
import com.google.gson.GsonBuilder
import epitech.area.Activities.ReActionActivity
import epitech.area.Managers.AreaAuthorization
import epitech.area.Storages.*

class AreaService {

    val gson = GsonBuilder().create()
    val reActionGson = GsonBuilder().registerTypeAdapter(Array<FieldObject>::class.java, FieldsAdapter()).create()


    private object Holder { val INSTANCE = AreaService() }

    companion object {
        val instance: AreaService by lazy { AreaService.Holder.INSTANCE }
    }

    fun getAreas(areaAdapter: AreaAdapter) {
        try {
            "area/".httpGet()
                    .responseObject(AreaObject.ArrayDeserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            areaAdapter.setAreas(res!!)
                        }
                    }
        } catch (e: Exception) {
            Log.d("Get Areas Exception", e.toString())
        }
    }

    fun getArea(areaAdapter: AreaAdapter, position: Int, uniqueId: String) {
        try {
            ("area/" + uniqueId).httpGet()
                    .responseObject(AreaObject.Deserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            areaAdapter.setArea(res!!, position)
                        }
                    }
        } catch (e: Exception) {
            Log.d("Get Area Exception", e.toString())
        }
        FuelManager.instance.basePath = "http://10.0.2.2:8080/" //remove this when using real server
    }

    fun getArea(reActionAdapter: ReActionAdapter, textView: TextView,  area: AreaObject) {
        try {
            ("area/" + area.uniqueId).httpGet()
                    .responseObject(AreaObject.Deserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            textView.text = res!!.name
                            area.name = res.name
                            area.timer = res.timer
                            area.activated = res.activated
                            reActionAdapter.setReActions(res)
                        }
                    }
        } catch (e: Exception) {
            Log.d("Get Area Exception", e.toString())
        }
    }

    fun changeAreaInfos(area: AreaObject) {
        try {
            ("area/" + area.uniqueId).httpPut()
                    .body(gson.toJson(area))
                    .response { _, _, result ->
                        val (res, err) = result
                        if (err != null) {
                            Log.d("Change Area Infos Err", err.toString())
                            Log.d("Change Area Infos Res", res.toString())
                        }
                    }
        } catch (e: Exception) {
            Log.d("Change Area Infos", e.toString())
        }
    }

    fun createArea(name: String = "New Area", activated: Boolean = true, timer: Int = 60) {
        try {
            "area/".httpPost()
                    .body("{\"name\": \"" + name + "\", \"activated\": \"" + activated + "\", \"timer\": \"" + timer + "\"}")
                    .response { _, _, result ->
                        val (res, err) = result
                        if (err != null) {
                            Log.d("Create Area Err", err.toString())
                            Log.d("Create Area Res", res.toString())
                        }
                    }
        } catch (e: Exception) {
            Log.d("Create Area Exception", e.toString())
        }
    }

    fun deleteArea(areaId: String) {
        try {
            ("area/" + areaId).httpDelete()
                    .response { _, _, result ->
                        val (res, err) = result
                        if (err != null) {
                            Log.d("Delete Area Err", err.toString())
                            Log.d("Delete Area Res", res.toString())
                        }
                    }
        } catch (e: Exception) {
            Log.d("Delete Area Exception", e.toString())
        }
    }

    fun postReAction(reAction: AReActionObject) {
        try {
            if (reAction.id.isNotBlank())
                ("area/" + reAction.areaId  + "/" + reAction.type.toLowerCase() + "/" + reAction.id).httpPut()
                        .body(reActionGson.toJson(reAction))
                        .response { _, _, result ->
                            val (res, err) = result
                            if (err != null) {
                                Log.d("Post Area Err", err.toString())
                                Log.d("Post Area Res", res.toString())
                            }
                        }
            else
                ("area/" + reAction.areaId  + "/" + reAction.type.toLowerCase() + "/").httpPost()
                        .body(reActionGson.toJson(reAction))
                        .response { _, _, result ->
                            val (res, err) = result
                            if (err != null) {
                                Log.d("Put Area Err", err.toString())
                                Log.d("Put Area Res", res.toString())
                            }
                        }
        } catch (e: Exception) {
            Log.d("Create Area Exception", e.toString())
        }
    }

    fun deleteReaction(reaction: ReactionObject) {
        try {
            ("area/" + reaction.areaId  + "/" + reaction.id).httpDelete()
                    .response { _, _, result ->
                        val (res, err) = result
                        if (err != null) {
                            Log.d("Put Area Err", err.toString())
                            Log.d("Put Area Res", res.toString())
                        }
                    }
        } catch (e: Exception) {
            Log.d("Create Area Exception", e.toString())
        }
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

    fun getServiceAccounts(serviceName: String, reActionActivity: ReActionActivity) {
        FuelManager.instance.basePath = "" //remove this when using real server
        FuelManager.instance.baseHeaders = mapOf() //remove this when using real server
        try {
            "https://next.json-generator.com/api/json/get/Vk_WtKgrU".httpGet()
                    .responseObject(AccountObject.ArrayDeserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            reActionActivity.setAccounts(res!!)
                            reActionActivity.updateAccountStep()
                        }
                    }
        } catch (e: Exception) {
            Log.d("getAreas Exception", e.toString())
        }
        FuelManager.instance.basePath = "http://10.0.2.2:8080/" //remove this when using real server
    }

    fun deleteAccount(acountId: String) {
        "".httpDelete()
                .response { _, _, result ->
                    val (res, err) = result
                    if (err != null) {
                        Log.d("Delete Account Err", err.toString())
                        Log.d("Delete Account Res", res.toString())
                    }
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
