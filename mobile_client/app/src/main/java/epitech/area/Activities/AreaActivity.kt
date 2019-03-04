package epitech.area.Activities

import android.content.Intent
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import epitech.area.R
import epitech.area.Storages.ActionObject
import epitech.area.Storages.AreaObject
import epitech.area.Storages.ReactionObject
import epitech.area.Tools.AreaService
import epitech.area.Tools.InfoService
import epitech.area.Tools.ReActionAdapter
import kotlinx.android.synthetic.main.activity_area.*
import kotlinx.android.synthetic.main.view_re_action.view.*

class AreaActivity : FragmentActivity() {
    private var area: AreaObject = AreaObject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        InfoService.instance.checkAreaInfos()
        setContentView(R.layout.activity_area)
        area = intent?.extras?.getSerializable("AreaObject") as AreaObject
        reActionList.layoutManager = LinearLayoutManager(this)
        reActionList.adapter = ReActionAdapter(this)
        updateDisplay(false)
        areaRefresh.setOnRefreshListener {
            updateDisplay(true)
            areaRefresh.isRefreshing = false
        }
        areaNameButton.setOnClickListener {
            areaNameButton.visibility = View.INVISIBLE
            area.name = areaName.text.toString()
            AreaService.instance.changeAreaName(area.uniqueId, area.name)
        }
        areaName.addTextChangedListener (object : TextWatcher {
            override fun afterTextChanged(s: Editable) {}

            override fun beforeTextChanged(s: CharSequence, start: Int,
                                           count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence, start: Int,
                                       before: Int, count: Int) {
                if (s.toString() == area.name)
                    areaNameButton.visibility = View.INVISIBLE
                else
                    areaNameButton.visibility = View.VISIBLE
            }
        })
    }

    override fun onResume() {
        super.onResume()
        updateDisplay(true)
    }

    private fun updateDisplay(fromInternet: Boolean = false) {
        if (fromInternet) {
            if (area.uniqueId.isNotBlank()) {
                AreaService.instance.getArea(reActionList.adapter as ReActionAdapter, areaName, area.uniqueId)
            }
        } else {
            if (area.uniqueId.isNotBlank()) {
                areaName.setText(area.name)
                (reActionList.adapter as ReActionAdapter).setReActions(area)
            } else if (areaName.text!!.isBlank()) {
                areaName.setText("New Area")
                areaNameButton.visibility = View.VISIBLE
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
