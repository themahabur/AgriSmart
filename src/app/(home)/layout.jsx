import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";


export default function HomeLayout({ children }) {
  return <>
       <Navbar/>
        {children}
        <Footer/>
        </>
}