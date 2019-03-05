package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable

data class AccountObject (
        val id: String = "",
        val name: String = "",
        val type: String = "") : Serializable {

    class Deserializer : ResponseDeserializable<AccountObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, AccountObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<AccountObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<AccountObject>::class.java)
    }

    fun getServiceName() : String {
        if (type.isNotBlank())
            return type.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        return ""
    }
}