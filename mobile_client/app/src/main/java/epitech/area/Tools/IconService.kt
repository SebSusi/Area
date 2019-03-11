package epitech.area.Tools

import epitech.area.R

class IconService {

    private object Holder { val INSTANCE = IconService() }

    companion object {
        val instance: IconService by lazy { IconService.Holder.INSTANCE }
    }

    fun getActionIcon(serviceName: String = "ACTION") : Int {
        return getIcon(serviceName, "ACTION")
    }

    fun getReactionIcon(serviceName: String = "REACTION") : Int {
        return getIcon(serviceName, "REACTION")

    }

    fun getServiceIcon(serviceName: String = "BASIC") : Int {
        return getIcon(serviceName)
    }

    private fun getIcon(serviceName: String, default: String = "BASIC") : Int {
        when (serviceName.toUpperCase()) {
            "MULTIPLE" -> return R.drawable.ic_more_horiz
            "CALENDAR" -> return R.drawable.ic_calendar
            "FACEBOOK" -> return R.drawable.ic_facebook
            "GOOGLE" -> return R.drawable.ic_google
            "GOOGLE+" -> return R.drawable.ic_google_plus
            "GMAIL" -> return R.drawable.ic_gmail
            "OUTLOOK" -> return R.drawable.ic_outlook
            "TWITTER" -> return R.drawable.ic_twitter
            "WEATHER" -> return R.drawable.ic_weather
            "YOUTUBE" -> return R.drawable.ic_youtube
        }
        when (default.toUpperCase()) {
            "ACTION" -> return R.drawable.ic_action
            "REACTION" -> return R.drawable.ic_reaction
        }
        return R.drawable.ic_basic
    }

}
