package epitech.area.Storages

import java.io.Serializable

abstract class AReActionObject : Serializable {
    abstract var name: String
    abstract var serviceName: String
    abstract var accountType: String
    abstract var id: String
    abstract var account: AccountObject
    abstract var fields: Array<FieldObject>
    abstract var type: String
    abstract var areaId: String

    fun getReActionName() : String {
        if (name.isNotBlank())
            return name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        return ""
    }

    fun getService() : String {
        if (serviceName.isNotBlank())
            return serviceName.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        return ""
    }


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