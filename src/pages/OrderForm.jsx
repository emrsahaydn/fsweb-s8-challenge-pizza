import "./OrderForm.css";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";


export default function OrderForm() {
  const [size, setSize] = useState("");
  const [dough, setDough] = useState("");
  const [extras, setExtras] = useState([]);
  const [note, setNote] = useState("");
  const [count, setCount] = useState(1);

  const BASE_PRICE = 85.5;
  const EXTRA_PRICE = 5;
  const extrasTotal = extras.length * EXTRA_PRICE;
  const total = (BASE_PRICE + extrasTotal) * count;

  const EXTRA_LIST = [
    "Pepperoni", "Domates", "Biber", "Sosis", "Mısır", "Sucuk", "Ananas",
    "Kanada Jambonu", "Tavuk Parça", "Jalapeno", "Kabak", "Soğan", "Sarımsak"
  ];

  const toggleExtra = (val) => {
    if (extras.includes(val)) {
      setExtras(extras.filter((x) => x !== val));
    } else {
      if (extras.length < 10) setExtras([...extras, val]);
    }
  };

  return (
    <div className="order-page">
      <header className="header">
        <img src={logo} alt="" className="logo" />
      </header>

      <main className="content">
        <section className="form-col">
          <h2>Position Absolute Acı Pizza</h2>
          <p className="price">85.50₺</p>
          <p>
            Frontend dev olarak hâlâ <code>position:absolute</code> kullanıyorsan
            bu çok acı pizza tam sana göre...
          </p>

          <div className="size-dough">
            <div>
              <strong>Boyut Seç *</strong>
              <div>
                {["Küçük", "Orta", "Büyük"].map((s) => (
                  <label key={s} style={{ display: "block" }}>
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <strong>Hamur Seç *</strong>
              <div>
                <select
                  value={dough}
                  onChange={(e) => setDough(e.target.value)}
                  required
                >
                  <option value="">Hamur Kalınlığı</option>
                  <option value="İnce">İnce</option>
                  <option value="Orta">Orta</option>
                  <option value="Kalın">Kalın</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <strong>Ek Malzemeler</strong>
            <p>En fazla 10 malzeme seçebilirsiniz. (5₺/adet)</p>
            <div className="extras-list">
              {EXTRA_LIST.map((x) => (
                <label key={x} style={{ display: "inline-block", width: 150 }}>
                  <input
                    type="checkbox"
                    value={x}
                    checked={extras.includes(x)}
                    onChange={() => toggleExtra(x)}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>

          <div >
            <strong>Sipariş Notu</strong>
            <input className="not" type="textarea"  placeholder="Siparişine eklemek istediğin bir not var mı " />
          </div>

         <div className="bottom-row">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))}>-</button>
                    <span>{count}</span>
                    <button type="button" onClick={() => setCount((c) => c + 1)}>+</button>
                </div>

                <div className="summary-col">
                    <div>
                    <h3>Sipariş Toplamı</h3>
                    <div >
                        <span>Seçimler</span>
                        <span>{extras.length * 5}₺</span>
                    </div>
                    <div >
                        <span>Toplam</span>
                        <span>{((85.5 + extras.length * 5) * count).toFixed(2)}₺</span>
                    </div>
                    <button type="button" disabled={!size || !dough}>SİPARİŞ VER</button>
                    </div>
                </div>
                </div>

        </section>

        
      </main>
    </div>
  );
}
