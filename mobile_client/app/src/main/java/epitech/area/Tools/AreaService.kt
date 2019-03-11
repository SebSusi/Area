package epitech.area.Tools

import android.accounts.Account
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
    val customGson = GsonBuilder()
            .registerTypeAdapter(Array<FieldObject>::class.java, FieldsAdapter())
            .registerTypeAdapter(SocialToken::class.java, SocialTokenAdapter())
            .registerTypeAdapter(AccountObject::class.java, AccountObjectAdapter())
            .create()

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
                            area.action.id = res.action.id
                            area.action.serviceName = res.action.serviceName
                            area.action.name = res.action.name
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
                        .body(customGson.toJson(reAction))
                        .response { _, _, result ->
                            val (res, err) = result
                            if (err != null) {
                                Log.d("Post Area Err", err.toString())
                                Log.d("Post Area Res", res.toString())
                            }
                        }
            else
                ("area/" + reAction.areaId  + "/" + reAction.type.toLowerCase() + "/").httpPost()
                        .body(customGson.toJson(reAction))
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
        try {
            "area_account/".httpGet()
                    .responseObject(AccountObject.ArrayDeserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            accountAdapter.setAccounts(res!!)
                        }
                    }
        } catch (e: Exception) {
            Log.d("getAreas Exception", e.toString())
        }
    }

    fun getServiceAccounts(serviceName: String, reActionActivity: ReActionActivity) {
        try {
            if (serviceName == "") {
                reActionActivity.setAccounts(arrayOf(AccountObject("", "None")))
                reActionActivity.updateAccountStep()
            } else {
                ("area_account/" + serviceName + "/").httpGet()
                        .responseObject(AccountObject.ArrayDeserializer()) { _, _, result ->
                            val (res, err) = result
                            if (err == null) {
                                reActionActivity.setAccounts(res!!)
                                reActionActivity.updateAccountStep()
                            }
                        }
            }
        } catch (e: Exception) {
            Log.d("getAreas Exception", e.toString())
        }
    }

    fun createAccount(socialToken: SocialToken) {
        try {
            "area_account/".httpPost()
                    .body(customGson.toJson(socialToken))
                    .response { _, _, result ->
                        val (res, err) = result
                        if (err != null) {
                            Log.d("Create Account Err", err.toString())
                            Log.d("Create Account Res", res.toString())
                        }
                    }
        } catch (e: Exception) {
            Log.d("Change Area Infos", e.toString())
        }
    }

    fun deleteAccount(account: AccountObject) {
        ("area_account/" + account.type + "/" + account.id).httpDelete()
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
