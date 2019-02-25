package epitech.area.Activities

import android.content.Intent
import android.app.Activity
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.github.kittinunf.fuel.core.FuelManager
import epitech.area.R
import epitech.area.Tools.AreaAdapter
import epitech.area.Tools.AreaService
import kotlinx.android.synthetic.main.activity_home.*

class HomeActivity : FragmentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        areaList.layoutManager = LinearLayoutManager(this)
        areaList.adapter = AreaAdapter(this)

        FuelManager.instance.basePath = ""
        AreaService.instance.getAreas(areaList)
        FuelManager.instance.basePath = getString(R.string.area_api_baseurl)

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
        }
    }
}
