package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ActionObject (
        val name: String = "",
        val serviceName: String = "",
        val id: String = "",
        val accountId: String = "",
        val fields: Array<FieldObject>) {

    class Deserializer : ResponseDeserializable<ActionObject>{
        override fun deserialize(content: String) = Gson().fromJson(content, ActionObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ActionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ActionObject>::class.java)
    }

    fun isValid() : Boolean {
        fields.forEach {
            if (!(it.isValid())) {
                return false
            }
        }
        return true
    }
}