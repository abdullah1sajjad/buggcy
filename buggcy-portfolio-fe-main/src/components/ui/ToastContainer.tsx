import { AnimatePresence, motion } from "framer-motion";
import { useToastStore, ToastTypeEnum } from "../../store/toastStore";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-20 right-0 z-50 flex flex-col gap-3 max-h-[100vh] w-full px-4 sm:right-4 sm:px-0 sm:w-96 overflow-y-auto pointer-events-none custom-scrollbar pb-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md text-sm font-medium ${toast.type === ToastTypeEnum.SUCCESS
              ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
              : toast.type === ToastTypeEnum.ERROR
                ? "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
                : toast.type === ToastTypeEnum.WARNING
                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400"
              }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === ToastTypeEnum.SUCCESS && <CheckCircle className="w-5 h-5" />}
              {toast.type === ToastTypeEnum.ERROR && <AlertCircle className="w-5 h-5" />}
              {toast.type === ToastTypeEnum.WARNING && <AlertTriangle className="w-5 h-5" />}
              {toast.type === ToastTypeEnum.INFO && <Info className="w-5 h-5" />}
            </div>

            <div className="flex-1 whitespace-pre-wrap break-words">{toast.message}</div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 ml-2 opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
