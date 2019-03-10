package epitech.area.Activities

import android.app.AlertDialog
import android.content.Intent
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import epitech.area.R
import epitech.area.Storages.ActionObject
import epitech.area.Storages.AreaObject
import epitech.area.Storages.ReactionObject
import epitech.area.Tools.AreaService
import epitech.area.Tools.InfoService
import epitech.area.Tools.ReActionAdapter
import kotlinx.android.synthetic.main.activity_area.*
import kotlinx.android.synthetic.main.view_area_info.view.*
import kotlinx.android.synthetic.main.view_re_action.view.*
import org.jetbrains.anko.longToast
import java.lang.Exception

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
        areaInfoButton.setOnClickListener {
            val view = layoutInflater.inflate(R.layout.view_area_info, null)
            view.areaEditName.setText(area.name)
            view.areaTimer.setText(area.timer.toString())
            view.areaActivated.isChecked = area.activated
            val alert = AlertDialog.Builder(this, R.style.CustomDialogTheme).setTitle("Area Settings").setView(view)
                    .setPositiveButton(android.R.string.ok, null)
                    .setNeutralButton(android.R.string.cancel) { dialog, _ -> dialog.cancel() }
                    .show()
            alert.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener {
                if (checkAreaInfos(view.areaEditName.text.toString(), view.areaTimer.text.toString())) {
                    area.name = view.areaEditName.text.toString()
                    area.timer = view.areaTimer.text.toString().toInt()
                    area.activated = view.areaActivated.isChecked
                    AreaService.instance.changeAreaInfos(area)
                    updateDisplay(true)
                    alert.dismiss()
                }
            }
        }
        actionInfoButton.setOnClickListener {
            val alert = AlertDialog.Builder(this, R.style.CustomDialogTheme).setTitle("Action Outputs")
            area.action.output = InfoService.instance.getActionOutputs(area.action.serviceName, area.action.name)
            if (area.action.id.isNotBlank())
                alert.setMessage(area.name + "'s action has " + area.action.getOutputsDescription())
            else
                alert.setMessage(area.name + " has no action.")
            alert.setPositiveButton(android.R.string.ok) { dialog, _ ->
                dialog.dismiss()
            }
            alert.show()
        }
    }

    override fun onResume() {
        super.onResume()
        updateDisplay(true)
    }

    private fun checkAreaInfos(name: String, timer: String) : Boolean {
        if (name.isBlank()) {
            longToast("Name cannot be blank.")
            return false
        }
        try {
            if (timer.toInt() < 5) {
                longToast("Timer must be at least 5 seconds.")
                return false
            }
        } catch (e: Exception) {
            longToast("Timer must be at least 5 seconds.")
            return false
        }
        return true
    }

    private fun updateDisplay(fromInternet: Boolean = false) {
        if (fromInternet) {
            if (area.uniqueId.isNotBlank()) {
                AreaService.instance.getArea(reActionList.adapter as ReActionAdapter, areaName, area)
            }
        } else {
            if (area.uniqueId.isNotBlank()) {
                areaName.setText(area.name)
                (reActionList.adapter as ReActionAdapter).setReActions(area)
            } else if (areaName.text!!.isBlank()) {
                areaName.setText("New Area")
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
