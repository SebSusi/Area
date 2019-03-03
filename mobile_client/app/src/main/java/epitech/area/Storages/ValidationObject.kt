package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable
import java.lang.Exception

data class ValidationObject (
        val type: String = "",
        val message: String = "",
        val value: Int = 0,
        val pattern: String = "") : Serializable {

    class Deserializer : ResponseDeserializable<ValidationObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, ValidationObject::class.java)
    }

    class ArrayDeserializer : ResponseDeserializable<Array<ValidationObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<ValidationObject>::class.java)
    }

    fun isValid(content: String) : Boolean {
        when (type) {
            "required" -> return requiredValidation(content)
            "pattern" -> return patternValidation(content)
            "maxLength" -> return maxLengthValidation(content)
            "minLength" -> return minLengthValidation(content)
            "max" -> return maxValidation(content)
            "min" -> return minValidation(content)
        }
        return false
    }

    private fun requiredValidation(content: String) : Boolean {
        return content.isNotEmpty()
    }

    private fun patternValidation(content: String) : Boolean {
        return pattern.toRegex().matches(content)
    }

    private fun maxLengthValidation(content: String) : Boolean {
        return content.length <= value
    }

    private fun minLengthValidation(content: String) : Boolean {
        return content.length >= value
    }

    private fun maxValidation(content: String) : Boolean {
        try {
            return content.toInt() <= value
        } catch (e: Exception) {
        }
        return false
    }

    private fun minValidation(content: String) : Boolean {
        try {
            return content.toInt() >= value
        } catch (e: Exception) {
        }
        return false
    }
}