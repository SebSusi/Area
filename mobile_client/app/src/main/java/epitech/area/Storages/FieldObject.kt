package epitech.area.Storages

import com.github.kittinunf.fuel.core.ResponseDeserializable
import com.google.gson.Gson
import java.io.Serializable
import java.lang.Exception

data class FieldObject (
        val type: String = "",
        val name: String = "",
        val label: String = "",
        val placeHolder: String = "",
        val options: Array<OptionObject> = arrayOf(),
        val validations: Array<ValidationObject> = arrayOf(),
        var value: String = "") : Serializable {

    class Deserializer : ResponseDeserializable<FieldObject> {
        override fun deserialize(content: String) = Gson().fromJson(content, FieldObject::class.java)
    }

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

    fun getOptionArray(): Array<String> {
        var array: Array<String> = arrayOf(placeHolder)
        options.forEach { option ->
            array = array.plus(option.label)
        }
        return array
    }

    fun getOptionValue(name: String): String {
        options.forEach {option ->
            if (option.label == name)
                return option.value.toString()
        }
        return ""
    }

    fun getOptionValueByPosition(position: Int): String {
        if (position <= 0 || position > options.size)
            return ""
        return options[position - 1].value.toString()
    }

    fun getOptionPosition(optionValue: Int = getValueAsInt()) : Int {
        options.forEachIndexed {index, option ->
            if (option.value == optionValue)
                return index + 1
        }
        return 0
    }

    private fun getValueAsInt() : Int {
        try {
            return value.toInt()
        } catch (e: Exception) {
        }
        return -1
    }
}