package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ReactionObject (
        val name: String = "",
        val serviceName: String = "",
        val id: String = "",
        val accountId: String = "",
        val fields: Array<FieldObject> = arrayOf()) {

    class Deserializer : ResponseDeserializable<ReactionObject>{
        override fun deserialize(content: String) = Gson().fromJson(content, ReactionObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ReactionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ReactionObject>::class.java)
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