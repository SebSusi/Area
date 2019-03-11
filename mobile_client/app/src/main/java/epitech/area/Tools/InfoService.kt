package epitech.area.Tools

import android.util.Log
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.httpGet
import epitech.area.Storages.*

class InfoService {

    private object Holder { val INSTANCE = InfoService() }

    companion object {
        val instance: InfoService by lazy { InfoService.Holder.INSTANCE }
    }

    private var areaInfos: Array<ServiceObject> = arrayOf()

    private fun getInfos() {
        try {
            "area_info".httpGet()
                    .responseObject(ServiceObject.ArrayDeserializer()) { _, _, result ->
                        val (res, err) = result
                        if (err == null) {
                            areaInfos = res!!
                        }
                    }
        } catch (e: Exception) {
            Log.d("getInfos Exception", e.toString())
        }
    }

    fun checkAreaInfos() {
        if (areaInfos.isEmpty())
            getInfos()
    }

    fun getServices(): Array<ServiceObject> {
        return areaInfos
    }

    fun getService(serviceName: String): ServiceObject {
        areaInfos.forEach { service ->
            if (service.name.toUpperCase() == serviceName.toUpperCase()) {
                return service
            }
        }
        return ServiceObject()
    }

    fun getReAction(reActions: Array<AReActionObject>, reActionName: String): AReActionObject {
        reActions.forEach { reAction ->
            if (reAction.name.toUpperCase() == reActionName.toUpperCase()) {
                return reAction
            }
        }
        return ActionObject()
    }

    fun getActions(serviceName: String): Array<ActionObject> {
        return getService(serviceName).actions
    }
    fun getReactions(serviceName: String): Array<ReactionObject> {
        return getService(serviceName).reactions
    }

    fun getReActionFields(reActionObject: AReActionObject): Array<FieldObject> {
        if (reActionObject.type.toUpperCase() == "ACTION")
            return getActionFields(getService(reActionObject.serviceName), reActionObject.name)
        return getReactionFields(getService(reActionObject.serviceName), reActionObject.name)
    }

    fun getActionFields(service: ServiceObject, actionName: String): Array<FieldObject> {
        return getReAction(service.actions as Array<AReActionObject>, actionName).fields.clone()
    }

    fun getReactionFields(service: ServiceObject, reactionName: String): Array<FieldObject> {
        return getReAction(service.reactions as Array<AReActionObject>, reactionName).fields.clone()
    }

    fun getActionOutputs(serviceName: String, actionName: String): Array<OutputObject> {
        return (getReAction(getService(serviceName).actions as Array<AReActionObject>, actionName) as ActionObject).output.clone()
    }

    fun getReActionAccountType(reAction: AReActionObject): String {
        if (reAction.type.toUpperCase() == "ACTION")
            return getActionAccountType(getService(reAction.serviceName), reAction.name)
        return getReactionAccountType(getService(reAction.serviceName), reAction.name)
    }

    fun getReactionAccountType(service: ServiceObject, reactionName: String): String {
        val accountType = getReAction(service.reactions as Array<AReActionObject>, reactionName).accountType
        if (accountType == null)
            return ""
        return accountType
    }

    fun getActionAccountType(service: ServiceObject, actionName: String): String {
        val accountType = getReAction(service.actions as Array<AReActionObject>, actionName).accountType
        if (accountType == null)
            return ""
        return accountType
    }
}
