import React from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();
  return (
    <>
      <section className="hero-content">
        <img src="images/iteration-1-images/home-banner.png" alt="" />
        <div className="banner">
          <p className="teknolojik">Teknolojik Yemekler</p>
          <p className="firsat">fırsatı kaçırma</p>
          <p className="aciktir">
            KOD ACIKTIRIR <br /> PİZZA, DOYURUR
          </p>
        </div>
        <button className="btn" onClick={()=>history.push("/order")}>Acıktım</button>
      </section>

      <section className="icons">
        <div>
          <img src="images/iteration-2-images/icons/1.svg" alt="" />
          <span>YENİ! kore</span>
        </div>
        <div>
          <img src="images/iteration-2-images/icons/2.svg" alt="" />
          <span>Pizza</span>
        </div>
        <div>
          <img src="images/iteration-2-images/icons/3.svg" alt="" />
          <span>Burger</span>
        </div>
        <div>
          <img src="images/iteration-2-images/icons/4.svg" alt="" />
          <span>Kızartmalar</span>
        </div>
        <div>
          <img src="images/iteration-2-images/icons/5.svg" alt="" />
          <span>Fast food</span>
        </div>
        <div>
          <img src="images/iteration-2-images/icons/6.svg" alt="" />
          <span>Gazlı İçecek</span>
        </div>
      </section>

      <main>
        <div className="main">
          <div className="main-container">
            <div className="img-1">
              <img src="images/iteration-2-images/cta/kart-1.png" alt="" />
              <p className="p1">
                Özel <br /> Lezzetus
              </p>
              <p className="p2">Position: Absolute Acı Burger</p>
              <button  onClick={()=>history.push("/order")} className="p3">SİPARİŞ VER</button>
            </div>

            <div className="right-cards">
              <div className="img-2">
                <img src="images/iteration-2-images/cta/kart-2.png" alt="" />
                <p className="p1">
                  Hackathlon <br /> Burger Menü
                </p>
                <button onClick={()=>history.push("/order")} className="p3">SİPARİŞ VER</button>
              </div>

              <div className="img-3">
                <img src="images/iteration-2-images/cta/kart-3.png" alt="" />
                <p className="p2">
                  <span style={{ color: "red", marginRight: "8px" }}>Çoooook</span>
                  <span style={{ fontWeight: "bold" }}>
                    hızlı <br /> npm gibi kurye
                  </span>
                </p>
                <button onClick={()=>history.push("/order")} className="p3">SİPARİŞ VER</button>
              </div>
            </div>
          </div>

          <div className="main-low">
            <p className="satisfy">en çok paketlenen menüler</p>
            <p>Acıktıran Kodlara Doyuran Lezzetler</p>
          </div>

          <div className="menu-ikonlar">
            <div className="menu-item">
              <img src="images/iteration-2-images/icons/1.svg" alt="Ramen" />
              <span>Ramen</span>
            </div>
            <div className="menu-item-pizza">
              <img src="images/iteration-2-images/icons/2.svg" alt="Pizza" />
              <span>Pizza</span>
            </div>
            <div className="menu-item">
              <img src="images/iteration-2-images/icons/3.svg" alt="Burger" />
              <span>Burger</span>
            </div>
            <div className="menu-item">
              <img src="images/iteration-2-images/icons/4.svg" alt="French fries" />
              <span>French fries</span>
            </div>
            <div className="menu-item">
              <img src="images/iteration-2-images/icons/5.svg" alt="Fast food" />
              <span>Fast food</span>
            </div>
            <div className="menu-item">
              <img src="images/iteration-2-images/icons/6.svg" alt="Soft drinks" />
              <span>Soft drinks</span>
            </div>
          </div>

          <div className="gorseller">
            <div className="food-card">
              <img
                src="images/iteration-2-images/pictures/food-1.png"
                alt="Terminal Pizza"
              />
              <h3>Terminal Pizza</h3>
              <p>
                <span>4.9</span> <span>(200)</span> <span>60₺</span>
              </p>
            </div>

            <div className="food-card">
              <img
                src="images/iteration-2-images/pictures/food-2.png"
                alt="Position Absolute AciPizza"
              />
              <h3>Position Absolute AciPizza</h3>
              <p>
                <span>4.9</span> <span>(200)</span> <span>60₺</span>
              </p>
            </div>

            <div className="food-card">
              <img
                src="images/iteration-2-images/pictures/food-3.png"
                alt="useEffect Tavuklu Burger"
              />
              <h3>useEffect Tavuklu Burger</h3>
              <p>
                <span>4.9</span> <span>(200)</span> <span>60₺</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <h2>
              Teknolojik <br /> Yemekler
            </h2>
            <ul className="contact-info" style={{color:"white"}}>
              <li>
                <img
                  src="images/iteration-2-images/footer/icons/icon-1.png"
                  alt="Adres"
                />
                <span style={{color:"white"}}>
                  341 Londonderry Road,
                  <br /> Istanbul Türkiye
                </span>
              </li>
              <li>
                <img
                  src="images/iteration-2-images/footer/icons/icon-2.png"
                  alt="Mail"
                />
                <a href="mailto:aciktim@teknolojikyemekler.com" style={{color:"white"}}>
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
    </>
  );
}
