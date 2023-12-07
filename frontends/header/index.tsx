import { Cemjsx, front, Func, Static, Fn } from "cemjs-all"
import Navigation from "./navigation"


front.listener.finish = () => {
    return
}

front.func.test = () => {
    return
}

front.loader = () => {
    front.Variable.activeMenu = "";
    if (!front.Variable.userAuth) {
        window.location.href = "/";
    }
    return
}

front.display = () => {
    return (
        <header class="header">
            <div class="wrapper">
                <Navigation />
            </div>
        </header>
    )
}

export { front }