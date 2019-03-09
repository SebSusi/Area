package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ActionObject (
        override var name: String = "",
        override var serviceName: String = "",
        override var id: String = "",
        override var accountId: String = "",
        override var fields: Array<FieldObject> = arrayOf(),
        //var output: Array<OutputObject> = arrayOf(),
        override var type: String = "ACTION",
        override var areaId: String = "") : AReActionObject() {

    class Deserializer : ResponseDeserializable<ActionObject>{
        override fun deserialize(content: String) = Gson().fromJson(content, ActionObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ActionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ActionObject>::class.java)
    }
}