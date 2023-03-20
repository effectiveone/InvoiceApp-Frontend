import { createContext, useContext, ReactElement } from "react";
import { useKontrahent, KontrahentProps } from "../Hook/useKontrahent";

type KontrahentContextType = ReturnType<typeof useKontrahent>;

const KontrahentContext = createContext<KontrahentContextType | null>(null);

export function useKontrahentContext() {
  const kontrahent = useContext(KontrahentContext);
  if (!kontrahent) {
    throw new Error(
      "useKontrahentContext must be used within a KontrahentProvider"
    );
  }
  return kontrahent;
}

type KontrahentProviderProps = {
  children: React.ReactNode;
};

const KontrahentProvider = ({
  children,
}: KontrahentProviderProps): ReactElement | null => {
  const kontrahent = useKontrahent() as KontrahentProps;

  if (!kontrahent) {
    return null;
  }

  return (
    <KontrahentContext.Provider value={kontrahent}>
      {children || null}
    </KontrahentContext.Provider>
  );
};

export default KontrahentProvider;
