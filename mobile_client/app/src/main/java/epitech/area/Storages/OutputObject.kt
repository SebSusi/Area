package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable

data class OutputObject (
        val name: String = "",
        val description: String = "") : Serializable {

    class Deserializer : ResponseDeserializable<OutputObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, OutputObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<OutputObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<OutputObject>::class.java)
    }

    fun getOutputName() : String {
        if (name.isNotBlank())
            return name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        return ""
    }

    fun getFormattedName() : String {
        return "{{" + name + "}}"
    }
}