package epitech.area.Tools

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import epitech.area.R
import epitech.area.Storages.AreaObject
import kotlinx.android.synthetic.main.view_area.view.*

class AreaAdapter(private val context: Context, private var areas : ArrayList<AreaObject> = arrayListOf(AreaObject("Test 1"), AreaObject("Test 2"), AreaObject("Test 3"))) : RecyclerView.Adapter<ViewHolder>() {

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

    override fun getItemCount(): Int {
        return areas.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(context).inflate(R.layout.view_area, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.arrowImage.visibility = View.VISIBLE
        holder.areaName.text = areas[position].name
        holder.actionImage.setImageResource(IconService.instance.getActionIcon(areas[position].action.serviceName))
        if (areas[position].reactions.size > 1) {
            holder.reactionImage.setImageResource(IconService.instance.getActionIcon("MULTIPLE"))
        } else if (areas[position].reactions.size > 0) {
            holder.reactionImage.setImageResource(IconService.instance.getActionIcon(areas[position].action.serviceName))
        } else {
            holder.arrowImage.visibility = View.INVISIBLE
        }
    }
}

class ViewHolder (view: View) : RecyclerView.ViewHolder(view) {
    val areaName = view.areaName
    val actionImage = view.actionImage
    val reactionImage = view.reactionImage
    val arrowImage = view.arrowImage
}