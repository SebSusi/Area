package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable

data class OptionObject (
        val value: Int = -1,
        val name: String = "") : Serializable {

    class Deserializer : ResponseDeserializable<OptionObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, OptionObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<OptionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<OptionObject>::class.java)
    }
}