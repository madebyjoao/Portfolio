import { useLocation } from "react-router";
import Navbar from "../../components/Navbar";

export default function AccessDeniedPage({ alertMessage: propAlertMessage }) {
    const location = useLocation();
    const alertMessage = propAlertMessage ?? location.state?.alertMessage;

    return (
        <div>
            <Navbar />

            <div>
                {alertMessage && (
                    <p className="mt-3 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-200">
                        {alertMessage}
                    </p>
                )}
            </div>
        </div>
    );
}
