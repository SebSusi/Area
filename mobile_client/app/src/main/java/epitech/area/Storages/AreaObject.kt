package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable

data class AreaObject(
        var name: String = "",
        var uniqueId: String = "",
        var activated: Boolean = false,
        val action: ActionObject = ActionObject(),
        val reactions: Array<ReactionObject> = arrayOf()) : Serializable {

    class Deserializer : ResponseDeserializable<AreaObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, AreaObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<AreaObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<AreaObject>::class.java)
    }
}