package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ServiceObject (
        val name: String = "",
        val actions: Array<ActionObject> = arrayOf(),
        val reactions: Array<ReactionObject> = arrayOf()) {

    class Deserializer : ResponseDeserializable<ServiceObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, ServiceObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ServiceObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ServiceObject>::class.java)
    }
}