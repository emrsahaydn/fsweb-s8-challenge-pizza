
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
                        <h3 className="yazi-slogan">lezzetin yolda</h3>
                        <h1>TEBRİKLER SİPARİŞİNİZ ALINDI</h1>
                        <hr style={{ border: '0.2px solid white' , width: "600px" }} />
                        <p className="position" style={{fontSize:"20px"}}>Position Absolute Acı Pizza</p>
                        <div className="order-details">
                        <p><span className="ozellik">Boyut:</span> {siparis.boyut}</p>
                        <p><span className="ozellik">Hamur:</span> {siparis.hamur}</p>
                        <p><span className="ozellik">Ek Malzemeler:</span> {siparis.malzemeler.join(", ")}</p>
                        </div>
                    <div className="order-summary">
                        <h3>Sipariş Toplamı</h3>
                        <div><span>Seçimler </span><span>{siparis.malzemeler.length * 5}₺</span></div>
                        <div><span>Toplam   </span><span>{siparis.toplam.toFixed(2)}₺</span></div>
                    </div>
                </main>

                <footer>
        <div className="footer-container">
          <div className="footer-left">
            <h2>
              Teknolojik <br /> Yemekler
            </h2>
            <ul className="contact-info">
              <li>
                <img
                  src="images/iteration-2-images/footer/icons/icon-1.png"
                  alt="Adres"
                />
                <p style={{fontSize:"13px"}}>
                  341 Londonderry Road,Istanbul Türkiye
                </p>
              </li>
              <li>
                <img
                  src="images/iteration-2-images/footer/icons/icon-2.png"
                  alt="Mail"
                />
                <a style={{color:"white"}} href="mailto:aciktim@teknolojikyemekler.com">
                  aciktim@teknolojikyemekler.com
                </a>
              </li>
              <li>
                <img
                  src="images/iteration-2-images/footer/icons/icon-3.png"
                  alt="Telefon"
                />
                <a style={{color:"white"}} href="tel:+902161234567">+90 216 123 45 67</a>
              </li>
            </ul>
          </div>

          <div className="footer-middle">
            <h3>Hot Menu</h3>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>

          <div className="footer-right">
            <h3>Instagram</h3>
            <div className="instagram-grid">
              <img
                src="images/iteration-2-images/footer/insta/li-0.png"
                alt="insta1"
              />
              <img
               src="images/iteration-2-images/footer/insta/li-1.png"
                alt="insta2"
              />
              <img
                src="images/iteration-2-images/footer/insta/li-2.png"
                alt="insta3"
              />
              <img
                src="images/iteration-2-images/footer/insta/li-3.png"
                alt="insta4"
              />
              <img
                src="images/iteration-2-images/footer/insta/li-4.png"
                alt="insta5"
              />
              <img
                src="images/iteration-2-images/footer/insta/li-5.png"
                alt="insta6"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2023 Teknolojik Yemekler.</p>
          <div className="social-icons">
            <a href="#" className="fa fa-twitter"></a>
          </div>
        </div>
      </footer>


            </div>
    )
}