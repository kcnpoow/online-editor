import { createContext, useContext, useState, ReactNode } from 'react';

type SettingsContextValue = {
  privateMode: boolean;
  setPrivateMode: (value: boolean) => void;

  collabMode: boolean;
  setCollabMode: (value: boolean) => void;

  autoUpdate: boolean;
  setAutoUpdate: (value: boolean) => void;

  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextValue>(
  {} as SettingsContextValue
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [privateMode, setPrivateMode] = useState(false);
  const [collabMode, setCollabMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [autoSave, setAutoSave] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        privateMode,
        setPrivateMode,
        collabMode,
        setCollabMode,
        autoUpdate,
        setAutoUpdate,
        autoSave,
        setAutoSave,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
