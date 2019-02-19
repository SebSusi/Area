package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class ValidationObject (
        val type: String = "",
        val pattern: String = "",
        val message: String = "") {

    class ArrayDeserializer : ResponseDeserializable<Array<ValidationObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ValidationObject>::class.java)
    }

    fun isValid(value: String) : Boolean {
        when (type) {
            "required" -> return requiredValidation(value)
            "pattern" -> return patternValidation(value)
        }
        return false
    }

    private fun requiredValidation(value: String) : Boolean {
        return value.isNotEmpty()
    }

    private fun patternValidation(value: String) : Boolean {
        return pattern.toRegex().matches(value)
    }
}