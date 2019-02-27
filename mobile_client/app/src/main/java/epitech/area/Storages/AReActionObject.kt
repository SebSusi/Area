package epitech.area.Storages

import java.io.Serializable

abstract class AReActionObject : Serializable {
    abstract var name: String
    abstract var serviceName: String
    abstract var id: String
    abstract var accountId: String
    abstract var fields: Array<FieldObject>
    abstract var type: String

    fun isValid() : Boolean {
        fields.forEach { field ->
            if (!(field.isValid())) {
                return false
            }
        }
        return true
    }

    fun getInvalidString() : String {
        fields.forEach { field ->
            if (!(field.isValid())) {
                return field.label + " : " + field.getInvalidString()
            }
        }
        return ""
    }

    fun changeFields(newFields: Array<FieldObject>) {
        val oldFields: Array<FieldObject> = fields.clone()
        fields = newFields
        fields.forEach { field ->
            oldFields.forEach { oldField ->
                if (field.name == oldField.name)
                    field.value = oldField.value
            }
        }
    }

    fun setFieldValue(fieldName: String, fieldValue: String) {
        fields.forEach { field ->
            if (field.name == fieldName) {
                field.value = fieldValue
            }
        }
    }
}