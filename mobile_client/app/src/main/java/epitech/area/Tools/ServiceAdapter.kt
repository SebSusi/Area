package epitech.area.Tools

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat.getColor
import androidx.recyclerview.widget.RecyclerView
import epitech.area.Activities.ReActionActivity
import epitech.area.R
import epitech.area.Storages.ServiceObject
import kotlinx.android.synthetic.main.view_service.view.*
import org.jetbrains.anko.backgroundColor

class ServiceAdapter(private val context: Context, private var services : ArrayList<ServiceObject> = arrayListOf(), private var selected: String = "", private val reActionActivity: ReActionActivity) : RecyclerView.Adapter<ServiceViewHolder>() {

    fun getServices(): ArrayList<ServiceObject> {
        return services
    }

    fun setServices(serviceList: ArrayList<ServiceObject>) {
        services = serviceList
        notifyDataSetChanged()
    }

    fun setServices(serviceList: Array<ServiceObject>) {
        services.clear()
        services.addAll(serviceList)
        notifyDataSetChanged()
    }

    fun setSelected(newSelected: String) {
        notifyItemChanged(getServicePosition(selected))
        selected = newSelected
        notifyItemChanged(getServicePosition(newSelected))
        reActionActivity.checkService(newSelected)
    }

    fun getSelected(): String {
        return selected
    }

    private fun getServicePosition(serviceName: String) : Int {
        for (i in 0..(services.size - 1)) {
            if (services[i].name == serviceName)
                return i
        }
        return 0
    }

    override fun getItemCount(): Int {
        return services.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ServiceViewHolder {
        return ServiceViewHolder(LayoutInflater.from(context).inflate(R.layout.view_service, parent, false))
    }

    override fun onBindViewHolder(holder: ServiceViewHolder, position: Int) {
        holder.serviceName.text = services[position].name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        holder.serviceImage.setImageResource(IconService.instance.getServiceIcon(services[position].name))
        if (selected == services[position].name)
            holder.serviceLayout.backgroundColor = getColor(context, R.color.darkColorPrimary)
        else
            holder.serviceLayout.backgroundColor = getColor(context, R.color.darkColorPrimaryDark)
        holder.itemView.setOnClickListener {
            setSelected(services[position].name)
        }
    }
}

class ServiceViewHolder (view: View) : RecyclerView.ViewHolder(view) {
    val serviceName = view.serviceName
    val serviceImage = view.serviceImage
    val serviceLayout = view.servicelayout
//    val serviceClicker = view.serviceClicker
}