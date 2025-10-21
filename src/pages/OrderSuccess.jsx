
import "./OrderSuccess.css";
import logo from "../assets/logo.svg";
import { useLocation } from "react-router-dom";


export default function OrderSuccess() {
    const location = useLocation();
    const siparis = location.state?.siparis;

    if (!siparis) {
    return (
        <main className="success-content">
            <h1>Hata</h1>
            <h2>Sipariş verisi bulunamadı. Lütfen yeniden deneyin.</h2>
        </main>
    );
}

    return(
            <div className="success-page">
                <header className="success-header">
                    <img src={logo} className="success-logo" />
                </header>

                <main className="success-content">
                    <h1>TEBRIKLER!</h1>
                    <h2>SİPARİŞİNİZ ALINDI</h2>
                </main>

            </div>
    )
}