package epitech.area.Activities

import androidx.fragment.app.FragmentActivity
import android.os.Bundle
import epitech.area.R
import epitech.area.Storages.AReActionObject
import epitech.area.Storages.ActionObject
import kotlinx.android.synthetic.main.activity_re_action.*
import ernestoyaquello.com.verticalstepperform.interfaces.VerticalStepperForm
import android.view.View
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import epitech.area.Tools.InfoService
import epitech.area.Tools.ServiceAdapter
import ernestoyaquello.com.verticalstepperform.VerticalStepperFormLayout


class ReActionActivity : FragmentActivity(), VerticalStepperForm {
    private var reAction: AReActionObject = ActionObject()
    private lateinit var serviceView: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_re_action)
        reAction = intent?.extras?.getSerializable("ReActionObject") as AReActionObject
        updateTitle()
        VerticalStepperFormLayout.Builder.newInstance(reActionStepper, arrayOf("Service"/*, reAction.type.toLowerCase().capitalize()*/), this, this)
                .primaryColor(getColor(R.color.colorLogoPrimary))
                .primaryDarkColor(getColor(R.color.colorLogoSecondary))
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
//            1 -> view = createServiceStep()
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

    override fun onStepOpening(stepNumber: Int) {
        when (stepNumber) {
            0 -> checkService(reAction.serviceName)
//            1 -> checkEmail()
        }
    }

    fun checkService(serviceName: String) {
        reAction.serviceName = serviceName
        if (serviceName.isNotBlank()) {
            reActionStepper.setStepTitle(0, "Service : " + serviceName.capitalize().replace(Regex("(.)([A-Z])"), "$1 $2").trim())
            reActionStepper.setStepAsCompleted(0)
        } else {
            reActionStepper.setStepTitle(0, "Service")
            reActionStepper.setActiveStepAsUncompleted("You must select a service to continue")
        }
    }
}
