
import "./OrderSuccess.css";
import logo from "../assets/logo.svg";
export default function OrderSuccess() {
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