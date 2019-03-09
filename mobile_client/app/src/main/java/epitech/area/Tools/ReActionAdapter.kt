package epitech.area.Tools

import android.app.AlertDialog
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
        areaObject.setReActionAreaId()
        if (areaObject.action.id.isNotBlank())
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

    fun removeReActionAt(position: Int) {
        reActions.removeAt(position)
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int {
        return reActions.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReActionViewHolder {
        return ReActionViewHolder(LayoutInflater.from(context).inflate(R.layout.view_re_action, parent, false))
    }

    override fun onBindViewHolder(holder: ReActionViewHolder, position: Int) {
        holder.reActionName.text = reActions[position].getReActionName()
        holder.reActionType.text = reActions[position].type.toLowerCase().capitalize()
        if (reActions[position].type.toUpperCase() == "ACTION") {
            holder.reActionDelete.visibility = View.INVISIBLE
            holder.reActionImage.setImageResource(IconService.instance.getActionIcon(reActions[position].serviceName))
        } else {
            holder.reActionDelete.visibility = View.VISIBLE
            holder.reActionImage.setImageResource(IconService.instance.getReactionIcon(reActions[position].serviceName))
        }

        holder.reActionClicker.setOnClickListener {
            val intent = Intent(context, ReActionActivity::class.java)
            intent.putExtra("ReActionObject", reActions[position])
            startActivity(context, intent, null)
        }
        holder.reActionDelete.setOnClickListener {
            val alert = AlertDialog.Builder(context, R.style.CustomDialogTheme)
                    .setTitle("Delete reaction")
                    .setMessage("Do you really want to delete the reaction '" + reActions[position].getReActionName() + "' ?")
            alert.setPositiveButton(android.R.string.ok) { _, _ ->
                AreaService.instance.deleteReaction(reActions[position] as ReactionObject)
                removeReActionAt(position)
            }
            alert.setNegativeButton(android.R.string.cancel) { dialog, _ ->
                dialog.cancel()
            }
            alert.show()
        }
    }
}

class ReActionViewHolder (view: View) : RecyclerView.ViewHolder(view) {
    val reActionName = view.reActionName
    val reActionType = view.reActionType
    val reActionImage = view.reActionImage
    val reActionClicker = view.reActionClicker
    val reActionDelete = view.reActionDelete
}