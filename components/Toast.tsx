"use client";

import { Toaster, toast } from "react-hot-toast";
import { useEffect, useCallback } from "react";

interface ToastProps {
  message?: string;
}

export default function Toast({ message }: ToastProps) {
    const notify = useCallback((message: string) => {
        toast.error(message, {
          icon: "🔒",
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }, []);
      
  useEffect(() => {
    if (message) {
      notify(message);
    }
  }, [message, notify]);

  return <Toaster />;
}