import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type SettingsContextValue = {
  privateMode: boolean;
  setPrivateMode: Dispatch<SetStateAction<boolean>>;

  collabMode: boolean;
  setCollabMode: Dispatch<SetStateAction<boolean>>;

  autoUpdate: boolean;
  setAutoUpdate: Dispatch<SetStateAction<boolean>>;

  autoSave: boolean;
  setAutoSave: Dispatch<SetStateAction<boolean>>;
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
