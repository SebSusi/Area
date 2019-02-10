package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import org.json.JSONObject

data class LoginResponse(
        val success: Boolean,
        val message: String = "",
        val token: String = "") {

    class Deserializer : ResponseDeserializable<LoginResponse> {
        override fun deserialize(content: String) = Gson().fromJson(content, LoginResponse::class.java)
    }
}