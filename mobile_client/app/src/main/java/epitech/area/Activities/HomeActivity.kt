package epitech.area.Activities

import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
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
        AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
    }
}
