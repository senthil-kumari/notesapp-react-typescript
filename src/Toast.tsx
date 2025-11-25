import { createContext, useContext, useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

type ToastOptions = {
  message: string;
  title?: string;
  variant?: "success" | "danger" | "warning" | "info" | "primary" | "secondary";
};

type ToastContextType = {
  showToast: (opts: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastOptions & { show: boolean }>({
    message: "",
    title: "",
    variant: "primary",
    show: false,
  });

  const showToast = ({ message, variant = "primary", title }: ToastOptions) => {
    setToast({ message, variant, show: true, title });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer position="top-center" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
          autohide
          delay={3000}
        >
          {toast.title && (
            <Toast.Header>
              <strong className="me-auto"> {toast.title}</strong>
            </Toast.Header>
          )}

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
