package epitech.area.Storages

import java.io.Serializable

class OAuthInfo (
        var provider: String = "",
        var url: String = "",
        var redirectUrl: String = "",
        var clientId: String = "",
        var clientSecret: String = "") : Serializable