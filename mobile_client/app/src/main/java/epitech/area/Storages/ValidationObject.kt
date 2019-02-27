package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable

data class ValidationObject (
        val type: String = "",
        val value: Int = 0,
        val pattern: String = "",
        val message: String = "") : Serializable {

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
        return content.toInt() <= value
    }

    private fun minValidation(content: String) : Boolean {
        return content.toInt() >= value
    }
}