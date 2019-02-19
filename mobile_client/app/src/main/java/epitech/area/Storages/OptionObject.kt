package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class OptionObject (
        val value: Int = 0,
        val label: String = "") {

    class ArrayDeserializer : ResponseDeserializable<Array<OptionObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<OptionObject>::class.java)
    }
}