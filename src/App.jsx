import Routes from "./pages/Routes"
import { useAuth } from "@/context/AuthContext";
import ScreenLoader from "@/components/Misc/ScreenLoader";
import './config/global.jsx';

const App = () => {
    const { isAppLoading } = useAuth();
    return (
        <>
            {isAppLoading ? <ScreenLoader /> : <Routes />}
        </>
    )
}

export default App