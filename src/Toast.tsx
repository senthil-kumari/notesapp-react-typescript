import { createContext, useContext, useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

type ToastOptions = {
  message: string;
  variant?: "success" | "danger" | "warning" | "info" | "primary" | "secondary";
};

type ToastContextType = {
  showToast: (opts: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastOptions & { show: boolean }>({
    message: "",
    variant: "primary",
    show: false,
  });

  const showToast = ({ message, variant = "primary" }: ToastOptions) => {
    setToast({ message, variant, show: true });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer position="middle-center" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        >
          <Toast.Header>
            <strong className="me-auto"> Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useAppToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useAppToast must be used inside <ToastProvider>");
  }
  return ctx;
}
