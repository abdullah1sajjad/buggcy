import { useState } from "react";
import { AxiosError } from "axios";

export function useFormErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearErrors = () => setErrors({});

  const handleApiError = (error: unknown) => {
    const err = error as AxiosError<{ message?: string | string[] }>;
    const messages = err.response?.data?.message;

    if (Array.isArray(messages)) {
      const fieldErrors: Record<string, string> = {};
      const generalMessages: string[] = [];

      messages.forEach((msg) => {
        const splitIndex = msg.indexOf(": ");
        if (splitIndex !== -1) {
          const field = msg.slice(0, splitIndex).trim();
          fieldErrors[field] = msg.slice(splitIndex + 2).trim();
        } else {
          generalMessages.push(msg);
        }
      });

      if (generalMessages.length) fieldErrors.general = generalMessages.join(", ");
      setErrors(fieldErrors);
    } else {
      setErrors({ general: err.message || "An error occurred" });
    }
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return {
    errors,
    setErrors,
    handleApiError,
    clearErrors,
    clearFieldError
  };
}
