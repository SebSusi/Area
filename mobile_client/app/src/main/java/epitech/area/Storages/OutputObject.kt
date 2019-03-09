package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable

data class OutputObject (
        val type: String = "",
        val name: String = "") : Serializable {

    class Deserializer : ResponseDeserializable<OutputObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, OutputObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<OutputObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<OutputObject>::class.java)
    }
}