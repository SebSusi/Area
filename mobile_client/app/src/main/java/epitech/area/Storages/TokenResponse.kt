package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class TokenResponse (
        val token: String = "") : AServerResponse() {

    class Deserializer : ResponseDeserializable<TokenResponse> {
        override fun deserialize(content: String) = Gson().fromJson(content, TokenResponse::class.java)
    }
}