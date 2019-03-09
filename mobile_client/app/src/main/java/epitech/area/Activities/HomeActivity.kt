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
import epitech.area.Tools.InfoService
import kotlinx.android.synthetic.main.view_area.view.*
import kotlinx.android.synthetic.main.activity_home.*

class HomeActivity : FragmentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        InfoService.instance.checkAreaInfos()
        setContentView(R.layout.activity_home)
        initNewAreaButton()
        areaList.layoutManager = LinearLayoutManager(this)
        areaList.adapter = AreaAdapter(this)
        AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
        var adapter = areaList.adapter as AreaAdapter
        managerbutton.setOnClickListener {
            adapter.changeVisibility()
        }
        accountsButton.setOnClickListener {
            val intent = Intent(this, AccountActivity::class.java)
            startActivity(intent)
        }
        areasRefresh.setOnRefreshListener {
            AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
            areasRefresh.isRefreshing = false
        }
    }

    override fun onResume() {
        super.onResume()
        AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
    }

    private fun initNewAreaButton() {
        areaNew.areaName.text = "Create new area"
        areaNew.actionImage.setImageResource(R.drawable.ic_basic)
        areaNew.arrowImage.visibility = View.INVISIBLE
        areaNew.areaClicker.setOnClickListener {
            AreaService.instance.createArea()
            AreaService.instance.getAreas(areaList.adapter as AreaAdapter)
        }
    }
}
