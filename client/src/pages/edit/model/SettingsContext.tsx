import { createContext, useContext, useState, ReactNode } from 'react';

type SettingsState = {
  draftName: string;
  autoUpdate: boolean;
  collabMode: boolean;
};

type SettingsContextValue = {
  settingsValues: SettingsState;
  setSettingsValue: <K extends keyof SettingsState>(
    field: K,
    value: SettingsState[K]
  ) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settingsValues, setSettingsValues] = useState<SettingsState>({
    draftName: 'Untitled',
    autoUpdate: false,
    collabMode: false,
  });

  const setSettingsValue = <K extends keyof SettingsState>(
    field: K,
    value: SettingsState[K]
  ) => {
    setSettingsValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settingsValues,
        setSettingsValue,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within an SettingsProvider');
  }

  return context;
};
