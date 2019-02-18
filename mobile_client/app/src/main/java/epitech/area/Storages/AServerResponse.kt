package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import org.json.JSONObject

abstract class AServerResponse(
        val success: Boolean = false,
        val message: String = "")