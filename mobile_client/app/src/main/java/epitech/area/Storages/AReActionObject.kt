package epitech.area.Storages

import java.io.Serializable

abstract class AReActionObject : Serializable {
    abstract val name: String
    abstract val serviceName: String
    abstract val id: String
    abstract val accountId: String
    abstract val fields: Array<FieldObject>
    abstract val type: String

    fun isValid() : Boolean {
        fields.forEach {
            if (!(it.isValid())) {
                return false
            }
        }
        return true
    }
}