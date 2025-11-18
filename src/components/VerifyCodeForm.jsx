import { useState } from "react";

export default function VerifyCodeForm({ usuario }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, code })   // 🔥 IMPORTANTE
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Verificado correctamente");
      // Aquí puedes redirigir o levantar sesión
    } else {
      setMsg(data.error || "Error al verificar");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h4 className="text-center mb-3">Ingresa el código</h4>

      <input
        className="form-control mb-3"
        placeholder="Código de 6 dígitos"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      <button className="btn btn-primary w-100">Confirmar</button>

      {msg && <div className="alert alert-info mt-3 text-center">{msg}</div>}
    </form>
  );
}
