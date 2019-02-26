package epitech.area.Tools

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import epitech.area.Activities.ReActionActivity
import epitech.area.R
import epitech.area.Storages.AReActionObject
import epitech.area.Storages.ActionObject
import epitech.area.Storages.AreaObject
import epitech.area.Storages.ReactionObject

import kotlinx.android.synthetic.main.view_re_action.view.*

class ReActionAdapter(private val context: Context, private var reActions : ArrayList<AReActionObject> = arrayListOf()) : RecyclerView.Adapter<ReActionViewHolder>() {

    fun getReActions(): ArrayList<AReActionObject> {
        return reActions
    }

    fun setReActions(reActionList: ArrayList<AReActionObject>) {
        reActions = reActionList
        notifyDataSetChanged()
    }

    fun setReActions(areaObject: AreaObject) {
        reActions.clear()
        reActions.add(areaObject.action)
        areaObject.reactions.forEach { reaction ->
            reActions.add(reaction)
        }
        notifyDataSetChanged()
    }

    fun setReAction(reActionList: Array<AReActionObject>) {
        reActions.clear()
        reActions.addAll(reActionList)
        notifyDataSetChanged()
    }

    fun setReAction(reAction: AReActionObject, position: Int) {
        reActions[position] = reAction
        notifyItemChanged(position)
    }

    fun addReAction(reAction: AReActionObject) {
        reActions.add(reAction)
        notifyItemInserted(reActions.size - 1)
    }

    override fun getItemCount(): Int {
        return reActions.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReActionViewHolder {
        return ReActionViewHolder(LayoutInflater.from(context).inflate(R.layout.view_re_action, parent, false))
    }

    override fun onBindViewHolder(holder: ReActionViewHolder, position: Int) {
        holder.reActionName.text = reActions[position].name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        holder.reActionType.text = reActions[position].type.toLowerCase().capitalize()
        if (reActions[position].type.toUpperCase() == "ACTION") {
            holder.reActionImage.setImageResource(IconService.instance.getActionIcon(reActions[position].serviceName))
        } else {
            holder.reActionImage.setImageResource(IconService.instance.getReactionIcon(reActions[position].serviceName))
        }

        holder.itemView.setOnClickListener {
            val intent = Intent(context, ReActionActivity::class.java)
            intent.putExtra("ReActionObject", reActions[position])
            startActivity(context, intent, null)
        }
    }
}

class ReActionViewHolder (view: View) : RecyclerView.ViewHolder(view) {
    val reActionName = view.reActionName
    val reActionType = view.reActionType
    val reActionImage = view.reActionImage
}