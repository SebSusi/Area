package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ReactionObject (
        override var name: String = "",
        override var serviceName: String = "",
        override var id: String = "",
        override var accountId: String = "",
        override var fields: Array<FieldObject> = arrayOf(),
        override var type: String = "REACTION",
        override var areaId: String = "") : AReActionObject() {

    class Deserializer : ResponseDeserializable<ReactionObject>{
        override fun deserialize(content: String) = Gson().fromJson(content, ReactionObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ReactionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ReactionObject>::class.java)
    }
}