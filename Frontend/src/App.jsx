import AppRoutes from "./routes/AppRoutes";
import BottomNavigation from "./components/BottomNavigation";
import Sidebar from "./components/Home/Sidebar.home";
function App() {
  return (
    <>
      <div className="Home">
        <Sidebar />

        <AppRoutes />
        <BottomNavigation />

        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default App;
