package epitech.area.Tools

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CompoundButton
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import epitech.area.Activities.AreaActivity
import epitech.area.R
import epitech.area.Storages.AreaObject
import kotlinx.android.synthetic.main.view_area.view.*

class AreaAdapter(private val context: Context, private var areas : ArrayList<AreaObject> = arrayListOf()) : RecyclerView.Adapter<AreaViewHolder>() {

    var visible = View.INVISIBLE;
    var widthButton = 65

    fun changeVisible(){
        visible = if(View.INVISIBLE == visible)View.VISIBLE else View.INVISIBLE
        widthButton = if(0 == widthButton)65 else 0
    }

    fun getAreas(): ArrayList<AreaObject> {
        return areas
    }

    fun setAreas(areaList: ArrayList<AreaObject>) {
        areas = areaList
        notifyDataSetChanged()
    }

    fun setAreas(areaList: Array<AreaObject>) {
        areas.clear()
        areas.addAll(areaList)
        notifyDataSetChanged()
    }

    fun setArea(area: AreaObject, position: Int) {
        areas[position] = area
        notifyItemChanged(position)
    }

    fun removeAreaAt(position: Int) {
        areas.removeAt(position)
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int {
        return areas.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AreaViewHolder {
        return AreaViewHolder(LayoutInflater.from(context).inflate(R.layout.view_area, parent, false))
    }

    override fun onBindViewHolder(holder: AreaViewHolder, position: Int) {
        holder.arrowImage.visibility = View.VISIBLE
        holder.areaSwitch.visibility = View.VISIBLE
        holder.areaDelete.visibility = visible
        holder.areaDelete.layoutParams.width = widthButton
        holder.areaName.text = areas[position].name
        holder.actionImage.setImageResource(IconService.instance.getActionIcon(areas[position].action.serviceName))
        if (areas[position].reactions.size > 1) {
            holder.reactionImage.setImageResource(IconService.instance.getActionIcon("MULTIPLE"))
        } else if (areas[position].reactions.isNotEmpty()) {
            holder.reactionImage.setImageResource(IconService.instance.getActionIcon(areas[position].action.serviceName))
        } else {
            holder.reactionImage.setImageDrawable(null)
            holder.arrowImage.visibility = View.INVISIBLE
        }
        holder.areaSwitch.setOnClickListener(null)
        holder.areaSwitch.isChecked = areas[position].activated
        holder.areaSwitch.setOnCheckedChangeListener(object : CompoundButton.OnCheckedChangeListener {
            override fun onCheckedChanged(buttonView: CompoundButton?, isChecked: Boolean) {
                areas[position].activated = isChecked
                AreaService.instance.changeAreaState(areas[position].uniqueId, isChecked)
            }
        })
        holder.areaClicker.setOnClickListener {
            val intent = Intent(context, AreaActivity::class.java)
            intent.putExtra("AreaObject", areas[position])
            startActivity(context, intent, null)
        }
        holder.areaDelete.setOnClickListener {
            val alert = AlertDialog.Builder(context, R.style.CustomDialogTheme)
                    .setTitle("Delete area")
                    .setMessage("Do you really want to delete the area '" + areas[position].name + "' ?")
            alert.setPositiveButton(android.R.string.ok) { _, _ ->
                AreaService.instance.deleteArea(areas[position].uniqueId)
                removeAreaAt(position)
            }
            alert.setNegativeButton(android.R.string.cancel) { dialog, _ ->
                dialog.cancel()
            }
            alert.show()
        }
    }
}

class AreaViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val areaName = view.areaName
    val actionImage = view.actionImage
    val reactionImage = view.reactionImage
    val arrowImage = view.arrowImage
    val areaClicker = view.areaClicker
    val areaSwitch = view.areaSwitch
    val areaDelete = view.areaDelete
}