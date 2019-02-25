package epitech.area.Activities


import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import epitech.area.R
import epitech.area.Tools.AreaService
import epitech.area.Tools.ReActionAdapter
import kotlinx.android.synthetic.main.activity_area.*

class AreaActivity : FragmentActivity() {
    private var areaId: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_area)
        areaId = intent?.extras?.getString("AreaId")!!
        reActionList.layoutManager = LinearLayoutManager(this)
        reActionList.adapter = ReActionAdapter(this)
        AreaService.instance.getArea(reActionList.adapter as ReActionAdapter, areaName, areaId)
    }
}
