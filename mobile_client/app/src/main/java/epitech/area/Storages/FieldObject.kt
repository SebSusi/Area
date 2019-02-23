package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson

data class FieldObject (
        val type: String = "",
        val name: String = "",
        val label: String = "",
        val placeHolder: String = "",
        val options: Array<OptionObject>,
        val validations: Array<ValidationObject>,
        val value: String = "") {

    class ArrayDeserializer : ResponseDeserializable<Array<FieldObject>> {
        override fun deserialize(content: String) = Gson().fromJson(content, Array<FieldObject>::class.java)
    }

    fun isValid() : Boolean {
        validations.forEach {
            if (!(it.isValid(value))) {
                return false
            }
        }
        return true
    }
}