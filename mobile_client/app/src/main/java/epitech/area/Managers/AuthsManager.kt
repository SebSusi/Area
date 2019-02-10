package epitech.area.Managers

import android.annotation.SuppressLint
import android.content.Context

@Suppress("NULLABILITY_MISMATCH_BASED_ON_JAVA_ANNOTATIONS")
class AreaAuthorization private constructor() {

    private object Holder { val INSTANCE = AreaAuthorization() }

    companion object {
        val instance: AreaAuthorization by lazy { Holder.INSTANCE }
    }

    @SuppressLint("ApplySharedPref")
    fun saveAccessToken(context: Context, accessToken: String?) {
        context.getSharedPreferences("area_auth", 0)
                .edit().putString("access_token", accessToken).commit()
    }

    fun getAccessToken(context: Context): String {
        return context.getSharedPreferences("area_auth", 0)
                .getString("access_token", "")
    }

    @SuppressLint("ApplySharedPref")
    fun removeAccessToken(context: Context) {
        context.getSharedPreferences("area_auth", 0).edit().clear().commit()
    }

}