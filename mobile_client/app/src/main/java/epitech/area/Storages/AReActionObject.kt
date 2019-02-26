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
        fields.forEach {
            if (!(it.isValid())) {
                return false
            }
        }
        return true
    }
}