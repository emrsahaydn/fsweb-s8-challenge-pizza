import "./OrderForm.css";
import logo from "../assets/logo.svg";
import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


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
        <p>Ana Sayfa   Sipariş Oluştur</p>
      </header>

      <main className="content">
        <form className="form-col" onSubmit={handleSubmit}>
          <h2>Position Absolute Acı Pizza</h2>
          <p className="price">85.50₺</p>
          <p>
            Frontend dev olarak hâlâ <code>position:absolute</code> kullanıyorsan
            bu çok acı pizza tam sana göre...
          </p>

          <div className="size-dough">
            <div>
              <strong>Boyut Seç *</strong>
              {["Küçük", "Orta", "Büyük"].map((b) => (
                <label key={b} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name="boyut"
                    value={b}
                    checked={boyut === b}
                    onChange={handleChangeBoyut}
                  />
                  {b}
                </label>
              ))}
            </div>

            <div>
              <strong>Hamur Seç *</strong>
              <select value={hamur} onChange={handleChangeHamur} required>
                <option value="">Hamur Kalınlığı</option>
                <option value="İnce">İnce</option>
                <option value="Orta">Orta</option>
                <option value="Kalın">Kalın</option>
              </select>
            </div>
          </div>

          <div>
            <strong>Ek Malzemeler</strong>
            <p>En fazla 10 malzeme seçebilirsiniz. (5₺/adet)</p>
            <div className="extras-list">
              {MALZEME_LISTESI.map((x) => (
                <label key={x} style={{ display: "inline-block", width: 150 }}>
                  <input
                    type="checkbox"
                    value={x}
                    checked={malzemeler.includes(x)}
                    onChange={handleChangeMalzeme}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div>
            <strong>İsim *</strong>
            <input
              type="text"
              value={isim}
              onChange={handleChangeIsim}
              placeholder="Adınızı girin"
              required
            />
          </div>

          <div>
            <textarea
              className="not"
              value={not}
              onChange={handleChangeNot}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              rows={3}
            />
          </div>

          <div className="bottom-row">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <button type="button" onClick={() => setAdet((a) => Math.max(1, a - 1))}>-</button>
              <span>{adet}</span>
              <button type="button" onClick={() => setAdet((a) => a + 1)}>+</button>
            </div>

             <div className="summary-col">
              <div>
                <h3>Sipariş Toplamı</h3>
                <div>
                  <span>Seçimler</span>
                  <span>{malzemeToplami}₺</span>
                </div>
                <div>
                  <span>Toplam</span>
                  <span>{toplam.toFixed(2)}₺</span>
                </div>
                <button
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
    </div>
  );
}
