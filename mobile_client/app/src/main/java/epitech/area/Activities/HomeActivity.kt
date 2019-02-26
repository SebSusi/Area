package epitech.area.Activities

import android.content.Intent
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import epitech.area.R
import epitech.area.Storages.AreaObject
import epitech.area.Tools.AreaAdapter
import epitech.area.Tools.AreaService
import kotlinx.android.synthetic.main.view_area.view.*
import kotlinx.android.synthetic.main.activity_home.*

class HomeActivity : FragmentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        initNewAreaButton()
        areaList.layoutManager = LinearLayoutManager(this)
        areaList.adapter = AreaAdapter(this)
        AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
    }

    override fun onResume() {
        super.onResume()
        AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
    }

    private fun initNewAreaButton() {
        areaNew.areaName.text = "Create new area"
        areaNew.actionImage.setImageResource(R.drawable.ic_basic)
        areaNew.arrowImage.visibility = View.INVISIBLE
        areaNew.setOnClickListener {
            val intent = Intent(this, AreaActivity::class.java)
            intent.putExtra("AreaObject", AreaObject())
            startActivity(intent, null)
            AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
        }
    }
}
