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
import epitech.area.Storages.AccountObject
import epitech.area.Tools.AreaService
import epitech.area.Tools.FieldAdapter
import epitech.area.Tools.InfoService
import epitech.area.Tools.ServiceAdapter
import ernestoyaquello.com.verticalstepperform.VerticalStepperFormLayout


class ReActionActivity : FragmentActivity(), VerticalStepperForm {
    private var reAction: AReActionObject = ActionObject()
    private var reActionList: Array<AReActionObject> = arrayOf()
    private var accountList: Array<AccountObject> = arrayOf()
    private lateinit var serviceView: RecyclerView
    private lateinit var reActionView: RadioGroup
    private lateinit var fieldView: RecyclerView
    private lateinit var accountView: RadioGroup

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        InfoService.instance.checkAreaInfos()
        setContentView(R.layout.activity_re_action)
        reAction = intent?.extras?.getSerializable("ReActionObject") as AReActionObject
        updateTitle()
        VerticalStepperFormLayout.Builder.newInstance(reActionStepper, arrayOf("Service", reAction.type.toLowerCase().capitalize(), "Fields", "Account"), this, this)
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
            title += " : " + reAction.getReActionName()
        reActionName.text = title
    }

    fun setAccounts(accounts: Array<AccountObject>) {
        accountList = accounts
    }

    private fun getAccountById(accountId: String) : AccountObject {
        accountList.forEach { accountObject ->
            if (accountObject.id == accountId)
                return accountObject
        }
        return AccountObject()
    }

    private fun getAccountByName(accountName: String) : AccountObject {
        accountList.forEach { accountObject ->
            if (accountObject.name == accountName)
                return accountObject
        }
        return AccountObject()
    }

    override fun sendData() {
        AreaService.instance.postReAction(reAction)
        finish()
    }

    override fun createStepContentView(stepNumber: Int): View? {
        var view: View? = null
        when (stepNumber) {
            0 -> view = createServiceStep()
            1 -> view = createReActionStep()
            2 -> view = createFieldStep()
            3 -> view = createAccountStep()
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
        updateReActionStep()
        return reActionView
    }

    private fun createFieldStep() : View {
        fieldView = RecyclerView(this)
        fieldView.layoutManager = LinearLayoutManager(this)
        fieldView.adapter = FieldAdapter(this, arrayListOf(), this)
        (fieldView.adapter as FieldAdapter).setFields(reAction.fields)
        return fieldView
    }

    private fun createAccountStep() : View {
        accountView = RadioGroup(this)
        accountView.setOnCheckedChangeListener { group, checkedId ->
            checkAccount(getAccountByName(group.findViewById<RadioButton>(checkedId).text.toString()))
        }
        updateAccountStep()
        return accountView
    }

    private fun updateReActionStep() {
        reActionView.removeAllViews()
        val colorStateList = ColorStateList(
                arrayOf(intArrayOf(-android.R.attr.state_enabled), intArrayOf(android.R.attr.state_enabled)),
                intArrayOf(getColor(R.color.colorLogoSecondary), getColor(R.color.colorLogoSecondary)))
        reActionList.forEach { reActionObject ->
            val radioButton: RadioButton = RadioButton(this)
            radioButton.buttonTintList = colorStateList
            radioButton.text = reActionObject.getReActionName()
            reActionView.addView(radioButton)
            if (reActionObject.name == reAction.name)
                radioButton.isChecked = true
        }
    }

    fun updateAccountStep() {
        accountView.removeAllViews()
        val colorStateList = ColorStateList(
                arrayOf(intArrayOf(-android.R.attr.state_enabled), intArrayOf(android.R.attr.state_enabled)),
                intArrayOf(getColor(R.color.colorLogoSecondary), getColor(R.color.colorLogoSecondary)))
        accountList.forEach { accountObject ->
            val radioButton: RadioButton = RadioButton(this)
            radioButton.buttonTintList = colorStateList
            radioButton.text = accountObject.name
            accountView.addView(radioButton)
            if (accountObject.id == reAction.accountId)
                radioButton.isChecked = true
        }
    }

    override fun onStepOpening(stepNumber: Int) {
        when (stepNumber) {
            0 -> checkService(reAction.serviceName)
            1 -> checkReAction(reAction.getReActionName())
            2 -> checkField()
            3 -> checkAccount(getAccountById(reAction.accountId))
        }
    }

    fun checkService(serviceName: String) {
        reAction.serviceName = serviceName
        if (reAction.serviceName.isNotBlank()) {
            reActionStepper.setStepTitle(0, "Service : " + reAction.getService())
            reActionStepper.setStepAsCompleted(0)
            if (reAction.type.capitalize() == "ACTION") {
                reActionList = InfoService.instance.getActions(serviceName) as Array<AReActionObject>
            } else {
                reActionList = InfoService.instance.getReactions(serviceName) as Array<AReActionObject>
            }
            AreaService.instance.getServiceAccounts(reAction.serviceName, this)
            updateReActionStep()
        } else {
            reActionStepper.setStepTitle(0, "Service")
            reActionStepper.setStepAsUncompleted(0, "You must select a service to continue.")
        }
    }

    fun checkReAction(reActionName: String) {
        var index: Int = -1
        reActionList.forEachIndexed { i, reActionObject ->
            if (reActionObject.getReActionName() == reActionName)
                index = i
        }
        if (index >= 0) {
            reAction.name = reActionList[index].name
            reActionStepper.setStepTitle(1, reAction.type.toLowerCase().capitalize() + " : " + reAction.getReActionName())
            reActionStepper.setStepAsCompleted(1)
            reAction.changeFields(InfoService.instance.getReActionFields(reAction))
            (fieldView.adapter as FieldAdapter).setFields(reAction.fields)
        } else {
            reAction.name = ""
            reActionStepper.setStepTitle(1, reAction.type.toLowerCase().capitalize())
            if (reAction.type == "ACTION")
                reActionStepper.setStepAsUncompleted(1, "You must select an action to continue.")
            else
                reActionStepper.setStepAsUncompleted(1, "You must select a reaction to continue.")
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

    fun checkAccount(account: AccountObject) {
        if (account.id.isNotBlank()) {
            reAction.accountId = account.id
            reActionStepper.setStepAsCompleted(3)
        } else {
            reActionStepper.setStepAsUncompleted(3, "You must select an account to continue.")
        }
    }
}
