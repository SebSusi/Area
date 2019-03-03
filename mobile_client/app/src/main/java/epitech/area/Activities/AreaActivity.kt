package epitech.area.Activities

import android.content.Intent
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import epitech.area.R
import epitech.area.Storages.ActionObject
import epitech.area.Storages.AreaObject
import epitech.area.Storages.ReactionObject
import epitech.area.Tools.AreaService
import epitech.area.Tools.ReActionAdapter
import kotlinx.android.synthetic.main.activity_area.*
import kotlinx.android.synthetic.main.view_re_action.view.*

class AreaActivity : FragmentActivity() {
    private var area: AreaObject = AreaObject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_area)
        area = intent?.extras?.getSerializable("AreaObject") as AreaObject
        reActionList.layoutManager = LinearLayoutManager(this)
        reActionList.adapter = ReActionAdapter(this)
        updateDisplay(false)
        areaRefresh.setOnRefreshListener {
            updateDisplay(true)
            areaRefresh.isRefreshing = false
        }
    }

    override fun onResume() {
        super.onResume()
        updateDisplay(true)
    }

    private fun updateDisplay(fromInternet: Boolean = false) {
        if (fromInternet) {
            if (area.uniqueId.isNotBlank())
                AreaService.instance.getArea(reActionList.adapter as ReActionAdapter, areaName, area.uniqueId)
        } else {
            if (area.uniqueId.isNotBlank()) {
                areaName.text = area.name
                (reActionList.adapter as ReActionAdapter).setReActions(area)
            } else {
                areaName.text = "New Area"
            }
        }
        updateNewReActionButton((reActionList.adapter as ReActionAdapter).getReActions().size)
    }

    private fun updateNewReActionButton(nb: Int = 0) {
        if (nb > 0) {
            reActionNew.reActionName.text = "Create new reaction"
            reActionNew.reActionImage.setImageResource(R.drawable.ic_reaction)
            reActionNew.reActionClicker.setOnClickListener {
                val intent = Intent(this, ReActionActivity::class.java)
                intent.putExtra("ReActionObject", ReactionObject())
                startActivity(intent)
            }
        } else {
            reActionNew.reActionName.text = "Create new action"
            reActionNew.reActionImage.setImageResource(R.drawable.ic_action)
            reActionNew.reActionClicker.setOnClickListener {
                val intent = Intent(this, ReActionActivity::class.java)
                intent.putExtra("ReActionObject", ActionObject())
                startActivity(intent)
            }
        }
    }
}
