import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

import { getClinic } from "@/actions/get-clinic"; // ajuste o caminho

export function useClinic() {
  const { result, isPending, execute } = useAction(getClinic);

  useEffect(() => {
    execute(); // Executa automaticamente quando o componente monta
  }, [execute]);

  return {
    clinic: result?.data?.clinic ?? null,
    isLoading: isPending,
  };
}
