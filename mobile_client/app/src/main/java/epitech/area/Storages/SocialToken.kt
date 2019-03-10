package epitech.area.Storages

import java.io.Serializable

class SocialToken (
        var provider: String = "",
        var token: String = "",
        var name: String = "") : Serializable