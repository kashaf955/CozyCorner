import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const lastShownRef = useRef({ key: "", at: 0 });

  const show = useCallback((message, type = "info") => {
    const key = `${type}:${message}`;
    const now = Date.now();
    // React Strict Mode can run effects twice in dev — skip duplicate toasts
    if (
      lastShownRef.current.key === key &&
      now - lastShownRef.current.at < 800
    ) {
      return;
    }
    lastShownRef.current = { key, at: now };

    const id = now + Math.random();
    setAlerts((prev) => {
      if (prev.some((alert) => alert.message === message && alert.type === type)) {
        return prev;
      }
      return [...prev, { id, message, type }];
    });
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 5000);
  }, []);

  const alert = useMemo(
    () => ({
      success: (message) => show(message, "success"),
      error: (message) => show(message, "error"),
      info: (message) => show(message, "info"),
    }),
    [show]
  );

  return (
    <AlertContext.Provider value={alert}>
      {children}
      <div className="fixed top-8 left-1/2 z-100 flex w-full max-w-md -translate-x-1/2 flex-col gap-2 px-4">
        {alerts.map((item) => (
          <div
            key={item.id}
            className={`rounded-md px-4 py-3 text-center text-sm text-white shadow-lg ${
              item.type === "error"
                ? "bg-red-600"
                : item.type === "success"
                  ? "bg-[#3d6b54]"
                  : "bg-blue-600"
            }`}
          >
            {item.message}
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};
