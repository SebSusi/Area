package epitech.area.Activities

import android.content.res.ColorStateList
import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import epitech.area.R
import epitech.area.Storages.AReActionObject
import epitech.area.Storages.ActionObject
import kotlinx.android.synthetic.main.activity_re_action.*
import ernestoyaquello.com.verticalstepperform.interfaces.VerticalStepperForm
import android.view.View
import android.widget.RadioButton
import android.widget.RadioGroup
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import epitech.area.Tools.FieldAdapter
import epitech.area.Tools.InfoService
import epitech.area.Tools.ServiceAdapter
import ernestoyaquello.com.verticalstepperform.VerticalStepperFormLayout


class ReActionActivity : FragmentActivity(), VerticalStepperForm {
    private var reAction: AReActionObject = ActionObject()
    private var reActionList: Array<AReActionObject> = arrayOf()
    private lateinit var serviceView: RecyclerView
    private lateinit var reActionView: RadioGroup
    private lateinit var fieldView: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        InfoService.instance.checkAreaInfos()
        setContentView(R.layout.activity_re_action)
        reAction = intent?.extras?.getSerializable("ReActionObject") as AReActionObject
        updateTitle()
        VerticalStepperFormLayout.Builder.newInstance(reActionStepper, arrayOf("Service", reAction.type.toLowerCase().capitalize(), "Fields"), this, this)
                .primaryColor(getColor(R.color.colorLogoPrimary))
                .primaryDarkColor(getColor(R.color.colorLogoSecondary))
                .buttonBackgroundColor(getColor(R.color.colorLogoSecondary))
                .buttonTextColor(getColor(R.color.darkColorPrimaryDark))
                .buttonPressedTextColor(getColor(R.color.darkColorPrimaryDark))
                .stepTitleTextColor(getColor(R.color.darkColorAccentWhite))
                .displayBottomNavigation(false)
                .init()
    }

    private fun updateTitle() {
        var title: String = ""
        if (reAction.id.isBlank())
            title += "New "
        title += reAction.type.toLowerCase().capitalize()
        if (reAction.name.isNotBlank())
            title += " : " + reAction.name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim()
        reActionName.text = title
    }

    override fun sendData() {
    }

    override fun createStepContentView(stepNumber: Int): View? {
        var view: View? = null
        when (stepNumber) {
            0 -> view = createServiceStep()
            1 -> view = createReActionStep()
            2 -> view = createFieldStep()
        }
        return view
    }

    private fun createServiceStep() : View {
        serviceView = RecyclerView(this)
        serviceView.layoutManager = GridLayoutManager(this, 3)
        serviceView.adapter = ServiceAdapter(this, arrayListOf(), reAction.serviceName, this)
        (serviceView.adapter as ServiceAdapter).setServices(InfoService.instance.getServices())
        return serviceView
    }

    private fun createReActionStep() : View {
        reActionView = RadioGroup(this)
        reActionView.setOnCheckedChangeListener { group, checkedId ->
            checkReAction(group.findViewById<RadioButton>(checkedId).text.toString())
        }
        updateReaCtionStep()
        return reActionView
    }

    private fun createFieldStep() : View {
        fieldView = RecyclerView(this)
        fieldView.layoutManager = LinearLayoutManager(this)
        fieldView.adapter = FieldAdapter(this, arrayListOf(), this)
        (fieldView.adapter as FieldAdapter).setFields(reAction.fields)
        return fieldView
    }

    private fun updateReaCtionStep() {
        reActionView.removeAllViews()
        val colorStateList = ColorStateList(
                arrayOf(intArrayOf(-android.R.attr.state_enabled), intArrayOf(android.R.attr.state_enabled)),
                intArrayOf(getColor(R.color.colorLogoSecondary), getColor(R.color.colorLogoSecondary)))
        reActionList.forEachIndexed { index, reActionObject ->
            val radioButton: RadioButton = RadioButton(this)
            radioButton.buttonTintList = colorStateList
            radioButton.setText(reActionObject.name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim())
            reActionView.addView(radioButton)
            if (reActionObject.name == reAction.name)
                radioButton.isChecked = true
        }
    }

    override fun onStepOpening(stepNumber: Int) {
        when (stepNumber) {
            0 -> checkService(reAction.serviceName)
            1 -> checkReAction(reAction.name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim())
            2 -> checkField()
        }
    }

    fun checkService(serviceName: String) {
        reAction.serviceName = serviceName
        if (serviceName.isNotBlank()) {
            reActionStepper.setStepTitle(0, "Service : " + serviceName.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim())
            reActionStepper.setStepAsCompleted(0)
            if (reAction.type.capitalize() == "ACTION") {
                reActionList = InfoService.instance.getActions(serviceName) as Array<AReActionObject>
            } else {
                reActionList = InfoService.instance.getReactions(serviceName) as Array<AReActionObject>
            }
            updateReaCtionStep()
        } else {
            reActionStepper.setStepTitle(0, "Service")
            reActionStepper.setStepAsUncompleted(0, "You must select a service to continue")
        }
    }

    fun checkReAction(reActionName: String) {
        var index: Int = -1
        reActionList.forEachIndexed { i, reActionObject ->
            if (reActionObject.name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim() == reActionName)
                index = i
        }
        if (index >= 0) {
            reAction.name = reActionList[index].name
            reActionStepper.setStepTitle(1, reAction.type.toLowerCase().capitalize() + " : " + reAction.name.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim())
            reActionStepper.setStepAsCompleted(1)
            reAction.changeFields(InfoService.instance.getReActionFields(reAction))
            (fieldView.adapter as FieldAdapter).setFields(reAction.fields)
        } else {
            reAction.name = ""
            reActionStepper.setStepTitle(1, reAction.type.toLowerCase().capitalize())
            reActionStepper.setStepAsUncompleted(1, "You must select a " + reAction.type.toLowerCase() + " to continue")
        }
        updateTitle()
    }

    fun checkField(fieldName: String = "", fieldValue: String = "") {
        reAction.setFieldValue(fieldName, fieldValue)
        if (reAction.isValid()) {
            reActionStepper.setStepAsCompleted(2)
        } else {
            reActionStepper.setStepAsUncompleted(2, reAction.getInvalidString())
        }
    }
}
