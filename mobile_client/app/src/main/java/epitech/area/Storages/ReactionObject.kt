package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ReactionObject (
        override var name: String = "",
        override val serviceName: String = "",
        override val id: String = "",
        override val accountId: String = "",
        override val fields: Array<FieldObject> = arrayOf(),
        override val type: String = "REACTION") : AReActionObject() {

    class Deserializer : ResponseDeserializable<ReactionObject>{
        override fun deserialize(content: String) = Gson().fromJson(content, ReactionObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ReactionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ReactionObject>::class.java)
    }
}