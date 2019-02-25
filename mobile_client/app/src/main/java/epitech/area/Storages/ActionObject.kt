package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ActionObject (
        override var name: String = "",
        override val serviceName: String = "",
        override val id: String = "",
        override val accountId: String = "",
        override val fields: Array<FieldObject> = arrayOf(),
        override val type: String = "ACTION") : AReActionObject() {

    class Deserializer : ResponseDeserializable<ActionObject>{
        override fun deserialize(content: String) = Gson().fromJson(content, ActionObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ActionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ActionObject>::class.java)
    }
}