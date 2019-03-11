package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonWriter
import java.io.Serializable

data class AccountObject (
        val id: String = "",
        val name: String = "",
        val type: String = "") : Serializable {

    class Deserializer : ResponseDeserializable<AccountObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, AccountObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<AccountObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<AccountObject>::class.java)
    }

    fun getServiceName() : String {
        if (type.isNotBlank())
            return type.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        return ""
    }
}

class AccountObjectAdapter : TypeAdapter<AccountObject>() {

    override fun write(writer: JsonWriter?, accountObject: AccountObject?) {
        writer?.beginObject()
        writer?.name("name")?.value(accountObject?.name)
        writer?.name("id")?.value(accountObject?.id)
        writer?.endObject()
    }

    override fun read(reader: JsonReader?): AccountObject {
        return AccountObject()
    }
}