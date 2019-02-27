package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable

data class FieldObject (
        val type: String = "",
        val name: String = "",
        val label: String = "",
        val placeHolder: String = "",
        val options: Array<OptionObject> = arrayOf(),
        val validations: Array<ValidationObject> = arrayOf(),
        var value: String = "") : Serializable {

    class ArrayDeserializer : ResponseDeserializable<Array<FieldObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<FieldObject>::class.java)
    }

    fun isValid() : Boolean {
        validations.forEach { validation ->
            if (!(validation.isValid(value))) {
                return false
            }
        }
        return true
    }

    fun getInvalidString() : String {
        validations.forEach { validation ->
            if (!(validation.isValid(value))) {
                return validation.message
            }
        }
        return ""
    }
}