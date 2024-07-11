/* eslint-disable no-unused-vars */
import { Navbar } from "./components/Navbar.jsx";
import { Box1 } from "./components/Box1.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { Box2 } from "./components/Box2.jsx";


export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <main className="main">
        <Box1 />
        <Box2 />
      </main>
    </AppProvider>
  );
}
