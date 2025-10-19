import { Link } from "react-router-dom";

export default function Home(){
    return (
        <main className="hero">
            <h1>Position Absolute Acı Pizza</h1>
      <p>Özel malzemelerle hazırlanır, anında teslim.</p>
      <Link to="/order" className="btn-primary">Sipariş Oluştur</Link>
        </main>
    )
};