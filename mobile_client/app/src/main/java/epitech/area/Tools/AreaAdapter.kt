package epitech.area.Tools

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import epitech.area.Activities.AreaActivity
import epitech.area.R
import epitech.area.Storages.AreaObject
import kotlinx.android.synthetic.main.view_area.view.*

class AreaAdapter(private val context: Context, private var areas : ArrayList<AreaObject> = arrayListOf()) : RecyclerView.Adapter<AreaViewHolder>() {

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

    override fun getItemCount(): Int {
        return areas.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AreaViewHolder {
        return AreaViewHolder(LayoutInflater.from(context).inflate(R.layout.view_area, parent, false))
    }

    override fun onBindViewHolder(holder: AreaViewHolder, position: Int) {
        holder.arrowImage.visibility = View.VISIBLE
        holder.areaName.text = areas[position].name
        holder.actionImage.setImageResource(IconService.instance.getActionIcon(areas[position].action.serviceName))
        if (areas[position].reactions.size > 1) {
            holder.reactionImage.setImageResource(IconService.instance.getActionIcon("MULTIPLE"))
        } else if (areas[position].reactions.size > 0) {
            holder.reactionImage.setImageResource(IconService.instance.getActionIcon(areas[position].action.serviceName))
        } else {
            holder.reactionImage.setImageDrawable(null)
            holder.arrowImage.visibility = View.INVISIBLE
        }
        holder.itemView.setOnClickListener {
            val intent = Intent(context, AreaActivity::class.java)
            intent.putExtra("AreaObject", areas[position])
            startActivity(context, intent, null)
        }
    }
}

class AreaViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val areaName = view.areaName
    val actionImage = view.actionImage
    val reactionImage = view.reactionImage
    val arrowImage = view.arrowImage
}