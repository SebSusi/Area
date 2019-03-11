package epitech.area.Tools

import android.app.AlertDialog
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import epitech.area.R
import epitech.area.Storages.AccountObject
import kotlinx.android.synthetic.main.view_account.view.*

class AccountAdapter(private val context: Context, private var accounts : ArrayList<AccountObject> = arrayListOf()) : RecyclerView.Adapter<AccountViewHolder>() {

    fun getAccounts(): ArrayList<AccountObject> {
        return accounts
    }

    fun setAccounts(accountList: ArrayList<AccountObject>) {
        accounts = accountList
        notifyDataSetChanged()
    }

    fun setAccounts(accountList: Array<AccountObject>) {
        accounts.clear()
        accounts.addAll(accountList)
        notifyDataSetChanged()
    }

    fun setAccount(account: AccountObject, position: Int) {
        accounts[position] = account
        notifyItemChanged(position)
    }

    fun removeAccountAt(position: Int) {
        accounts.removeAt(position)
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int {
        return accounts.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AccountViewHolder {
        return AccountViewHolder(LayoutInflater.from(context).inflate(R.layout.view_account, parent, false))
    }

    override fun onBindViewHolder(holder: AccountViewHolder, position: Int) {
        holder.accountDelete.visibility = View.VISIBLE
        holder.accountName.text = accounts[position].name
        holder.serviceName.text = accounts[position].getServiceName()
        holder.accountImage.setImageResource(IconService.instance.getServiceIcon(accounts[position].type))
        holder.accountDelete.setOnClickListener {
            val alert = AlertDialog.Builder(context, R.style.CustomDialogTheme)
                    .setTitle("Delete " + accounts[position].getServiceName() + " account")
                    .setMessage("Do you really want to delete the " + accounts[position].getServiceName() + " account '" + accounts[position].name + "' ?")
            alert.setPositiveButton(android.R.string.ok) { _, _ ->
                AreaService.instance.deleteAccount(accounts[position])
                removeAccountAt(position)
            }
            alert.setNegativeButton(android.R.string.cancel) { dialog, _ ->
                dialog.cancel()
            }
            alert.show()
        }
    }
}

class AccountViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val accountName = view.accountName
    val serviceName = view.accountService
    val accountImage = view.accountImage
    val accountDelete = view.accountDelete
}