import { Outlet } from "react-router";
import {Facebook} from "lucide-react"
import {Instagram} from "lucide-react"
import {Youtube} from "lucide-react"
import {Twitter} from "lucide-react"

export default function PublicLayout() {

    return (
        <>

            <Outlet />

        </>
    );
}
