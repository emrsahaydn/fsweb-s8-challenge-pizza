import "./OrderForm.css";
import logo from "../assets/logo.svg";
import { useState, useEffect, useMemo } from "react";
import { useHistory,NavLink } from "react-router-dom";
import axios from "axios";
import banner from "../assets/form-banner.png";


export default function OrderForm() {
  const history = useHistory();

  const [isim, setIsim] = useState("");
  const [boyut, setBoyut] = useState("");
  const [hamur, setHamur] = useState("");
  const [malzemeler, setMalzemeler] = useState([]);
  const [not, setNot] = useState("");
  const [adet, setAdet] = useState(1);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderilecek, setGonderilecek] = useState(false);

  const pizzaFiyat = 85.5;
  const malzemeFiyat = 5;

  const MALZEME_LISTESI = [
    "Pepperoni", "Domates", "Biber", "Sosis", "Mısır", "Sucuk", "Ananas",
    "Kanada Jambonu", "Tavuk Parça", "Jalapeno", "Kabak", "Soğan", "Sarımsak"
  ];

  const malzemeToplami = useMemo(() => malzemeler.length * malzemeFiyat, [malzemeler]);
  const toplam = useMemo(() => (pizzaFiyat + malzemeToplami) * adet, [pizzaFiyat, malzemeToplami, adet]);

  const gecerliMi = useMemo(() => {
    const isimUygun = isim.trim().length >= 3;
    const boyutUygun = !!boyut;
    const hamurUygun = !!hamur;
    const malzemeUygun = malzemeler.length >= 4 && malzemeler.length <= 10;
    return isimUygun && boyutUygun && hamurUygun && malzemeUygun;
  }, [isim, boyut, hamur, malzemeler]);

  const gonderi = useMemo(() => ({
    isim: isim.trim(),
    boyut,
    hamur,
    malzemeler,
    not: not.trim(),
    adet,
    toplam: Number(((pizzaFiyat + malzemeler.length * malzemeFiyat) * adet).toFixed(2)),
  }), [isim, boyut, hamur, malzemeler, not, adet]);

  function handleChangeIsim(e) {
    setIsim(e.target.value);
  }

  function handleChangeBoyut(e) {
    setBoyut(e.target.value);
  }

  function handleChangeHamur(e) {
    setHamur(e.target.value);
  }

  function handleChangeNot(e) {
    setNot(e.target.value);
  }

  function handleChangeMalzeme(e) {
    const deger = e.target.value;
    if (malzemeler.includes(deger)) {
      setMalzemeler(malzemeler.filter((x) => x !== deger));
    } else if (malzemeler.length < 10) {
      setMalzemeler([...malzemeler, deger]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!gecerliMi || gonderiliyor) return;
    setGonderilecek(true);
  }

  useEffect(() => {
    if (!gonderilecek) return;
    let iptal = false;

    const siparisGonder = async () => {
      try {
        setGonderiliyor(true);

        const bodyToSend = {
          name: isim,
          order: { boyut, hamur, malzemeler, not, adet, toplam },
        };

        const yanit = await axios.post("https://reqres.in/api/pizza", bodyToSend, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1"
          },
        });

        if (iptal) return;

        console.log("✅ API yanıtı:", yanit.data);
        console.log("📦 Sipariş Özeti:", gonderi);

        history.push("/success", { siparis: gonderi });
      } catch (err) {
        if (!iptal) console.error("❌ Gönderim hatası:", err);
      } finally {
        if (!iptal) {
          setGonderiliyor(false);
          setGonderilecek(false);
        }
      }
    };

    siparisGonder();
    return () => { iptal = true; };
  }, [gonderilecek]);

  return (
    <div className="order-page">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
      </header>

      <main className="content">
        <div className="pizza-info">
            <img src={banner} alt="" />
            <ul>
              <li>
                <NavLink exact to="/" activeClassName="active-link">
                  Anasayfa
                </NavLink>
              </li>
              <li>
                <NavLink to="/order" activeClassName="active-link">
                  Sipariş Oluştur
                </NavLink>
              </li>
            </ul>
          <h2>Position Absolute Acı Pizza</h2>
          <div className="degerlendirme-tamamı">
          <p className="price">85.50₺</p>
          
          <p>4.9</p>
          <p>(200)</p>
          
          </div>
          <p>
            Frontend Dev olarak hala position:absolute kullaniyorsan bu çok acı pizza tam <br />  sana gore.Pizza, domates, peynir ve genellik çesitli diğer malzemelerle <br /> kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek <br /> sıcaklıkta pişirilen, genellikle yuvarlak, düzlestirilmiş mayalı buğday bazlı <br /> hamurdan olusan italyan kökeni lezzetli bir yemektir. Küçük bir pizzaya <br /> bazen pizzetta denir.
          </p>
          </div>
        <form className="form-col" onSubmit={handleSubmit} data-cy="order-form">
          

          <div className="size-dough">
            <div data-cy="size-group">
              <strong>Boyut Seç *</strong>
              <div className="boyut-secenekler">
                {["S", "M", "B"].map((b) => (
                  <label key={b} data-cy={`size-${b}`}>
                    <input
                      type="radio"
                      name="boyut"
                      value={b}
                      checked={boyut === b}
                      onChange={handleChangeBoyut}
                    />
                    <span>{b.charAt(0)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div data-cy="dough-group">
              <strong>Hamur Seç *</strong>

              <div className="select-wrap">
                <select
                  className="select-input"
                  value={hamur}
                  onChange={handleChangeHamur}
                  required
                  data-cy="dough"
                >
                  <option value="" disabled>
                    —Hamur Kalınlığı Seç—
                  </option>
                  <option value="İnce">İnce</option>
                  <option value="Orta">Orta</option>
                  <option value="Kalın">Kalın</option>
                </select>
              </div>
            </div>

          </div>


          <div data-cy="toppings">
            <strong>Ek Malzemeler</strong>
            <p>En fazla 10 malzeme seçebilirsiniz. (5₺/adet)</p>

            <div className="extras-list">
              {MALZEME_LISTESI.map((x) => (
                <label className="extra" key={x} data-cy={`topping-${x}`}>
                  <input
                    className="extra-input"
                    type="checkbox"
                    value={x}
                    checked={malzemeler.includes(x)}
                    onChange={handleChangeMalzeme}
                  />
                  <span className="extra-box" aria-hidden="true"></span>
                  <span className="extra-text">{x}</span>
                </label>
              ))}
            </div>
          </div>


          <div >
            <strong>İsim *</strong>
            <input
              data-cy="name"
              className="isim-input"
              type="text"
              value={isim}
              onChange={handleChangeIsim}
              placeholder="Adınızı girin"
              required
            />
          </div>

          <div>
            <textarea
              data-cy="notes"
              className="not"
              value={not}
              onChange={handleChangeNot}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              rows={3}
            />
          </div>

          <div className="bottom-row">
            <div data-cy="count-row" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <button data-cy="decrease-btn" style={{backgroundColor:"#FDC913"}} type="button" onClick={() => setAdet((a) => Math.max(1, a - 1))}>-</button>
              <span data-cy="quantity">{adet}</span>
              <button data-cy="increase-btn" style={{backgroundColor:"#FDC913"}} type="button" onClick={() => setAdet((a) => a + 1)}>+</button>
            </div>

             <div className="summary-col" data-cy="summary">
              <div>
                <h3>Sipariş Toplamı</h3>
                <div data-cy="summary-selections">
                  <span>Seçimler</span>
                  <span>{malzemeToplami}₺</span>
                </div>
                <div data-cy="summary-total">
                  <span>Toplam</span>
                  <span>{toplam.toFixed(2)}₺</span>
                </div>
                <button
                  data-cy="submit"
                  type="submit"
                  disabled={!gecerliMi || gonderiliyor}
                >
                  {gonderiliyor ? "Gönderiliyor..." : "SİPARİŞ VER"}
                </button>
              </div>
            </div>
          </div>
        </form>
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
    </div>
  );
}
