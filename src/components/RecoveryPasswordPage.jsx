import { useState } from "react";
import RecoverForm from "./RecoveryForm";
import RecoverVerifyForm from "./RecoveryVerifyForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function RecoveryPasswordPage() {
  const [step, setStep] = useState(1); 
  const [usuario, setUsuario] = useState("");

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "100%", maxWidth: "420px" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Recuperar contraseña</h2>

        {step === 1 && (
          <RecoverForm
            onEmailSent={(usuarioIngresado) => {
              setUsuario(usuarioIngresado);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <RecoverVerifyForm
            usuario={usuario}
            onVerified={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <ResetPasswordForm
            usuario={usuario}           // <--- CORRECTO
            onReset={() => setStep(4)}  // <--- NECESARIO
          />
        )}

        {step === 4 && (
          <div className="alert alert-success text-center">
            Contraseña actualizada ✔<br />
            Ahora puedes iniciar sesión.
          </div>
        )}
      </div>
    </div>
  );
}
