package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class AreaObject (
        val name: String = "",
        val uniqueId: String = "",
        val action: ActionObject,
        val reactions: Array<ReactionObject>) {

    class Deserializer : ResponseDeserializable<AreaObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, AreaObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<AreaObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<AreaObject>::class.java)
    }
}