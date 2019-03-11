package epitech.area.Storages

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonWriter
import java.io.Serializable

class SocialToken (
        var provider: String = "",
        var token: String = "",
        var name: String = "") : Serializable

class SocialTokenAdapter : TypeAdapter<SocialToken>() {

    override fun write(writer: JsonWriter?, socialToken: SocialToken?) {
        writer?.beginObject()
        writer?.name("name")?.value(socialToken?.name)
        writer?.name("type")?.value(socialToken?.provider)
        writer?.name("data")?.beginObject()?.name("access_token")?.value(socialToken?.token)?.endObject()
        writer?.endObject()
    }

    override fun read(reader: JsonReader?): SocialToken {
        return SocialToken()
    }
}