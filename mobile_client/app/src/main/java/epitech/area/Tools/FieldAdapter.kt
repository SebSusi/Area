package epitech.area.Tools

import android.content.Context
import android.icu.text.IDNA
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import epitech.area.Activities.ReActionActivity
import epitech.area.R
import epitech.area.Storages.FieldObject
import kotlinx.android.synthetic.main.view_field.view.*
import android.text.Editable
import android.text.TextWatcher
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.CompoundButton
import org.jetbrains.anko.sdk27.coroutines.onItemSelectedListener


class FieldAdapter(private val context: Context, private var fields : ArrayList<FieldObject> = arrayListOf(), private val reActionActivity: ReActionActivity) : RecyclerView.Adapter<FieldViewHolder>() {

    fun getFields(): ArrayList<FieldObject> {
        return fields
    }

    fun setFields(fieldList: ArrayList<FieldObject>) {
        fields = fieldList
        notifyDataSetChanged()
    }

    fun setFields(fieldList: Array<FieldObject>) {
        fields.clear()
        fields.addAll(fieldList)
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int {
        return fields.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FieldViewHolder {
        return FieldViewHolder(LayoutInflater.from(context).inflate(R.layout.view_field, parent, false))
    }

    override fun onBindViewHolder(holder: FieldViewHolder, position: Int) {
        holder.setEverythingInvisible()
        when (fields[position].type) {
            "boolean" -> initSwitch(holder, position)
            "list" -> initList(holder, position)
            "text" -> initText(holder, position)
        }
    }

    private fun initSwitch(holder: FieldViewHolder, position: Int) {
        holder.fieldSwitch.visibility = View.VISIBLE
        holder.fieldSwitch.text = fields[position].label
        holder.fieldSwitch.isChecked = (fields[position].value == "true")
        holder.fieldSwitch.setOnCheckedChangeListener(object : CompoundButton.OnCheckedChangeListener {
            override fun onCheckedChanged(buttonView: CompoundButton?, isChecked: Boolean) {
                if (isChecked)
                    fields[position].value = "true"
                else
                    fields[position].value = "false"
                reActionActivity.checkField(fields[position].name, fields[position].value)
            }
        })
    }

    private fun initText(holder: FieldViewHolder, position: Int) {
        holder.fieldLabel.visibility = View.VISIBLE
        holder.fieldLabel.text = fields[position].label
        holder.fieldText.visibility = View.VISIBLE
        holder.fieldText.hint = fields[position].placeHolder
        holder.fieldText.setText(fields[position].value)
        holder.fieldText.addTextChangedListener (object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                fields[position].value = s.toString()
                reActionActivity.checkField(fields[position].name, fields[position].value)
            }

            override fun beforeTextChanged(s: CharSequence, start: Int,
                                           count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence, start: Int,
                                       before: Int, count: Int) {}
        })
    }

    private fun initList(holder: FieldViewHolder, position: Int) {
        holder.fieldLabel.visibility = View.VISIBLE
        holder.fieldLabel.text = fields[position].label
        holder.fieldList.visibility = View.VISIBLE
        holder.fieldList.visibility = View.VISIBLE
        holder.fieldList.adapter = ArrayAdapter(context, R.layout.support_simple_spinner_dropdown_item, fields[position].getOptionArray())
        holder.fieldList.setSelection(fields[position].getOptionPosition())
        holder.fieldList.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(parent: AdapterView<*>?) {
                fields[position].value = ""
                reActionActivity.checkField(fields[position].name, fields[position].value)
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, pos: Int, id: Long) {
                fields[position].value = fields[position].getOptionValueByPosition(pos)
                reActionActivity.checkField(fields[position].name, fields[position].value)
            }
        }
    }
}

class FieldViewHolder (view: View) : RecyclerView.ViewHolder(view) {
    val fieldLabel = view.fieldLabel
    val fieldText = view.fieldText
    val fieldSwitch = view.fieldSwitch
    val fieldList = view.fieldList

    fun setEverythingInvisible() {
        fieldLabel.visibility = View.INVISIBLE
        fieldText.visibility = View.INVISIBLE
        fieldSwitch.visibility = View.INVISIBLE
        fieldList.visibility = View.INVISIBLE
    }
}