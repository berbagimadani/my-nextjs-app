import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Definisikan tipe data
interface Item {
  id: number;
  name: string;
}

interface DataContextState {
  items: Item[];
  addItem: (item: Item) => void;
}

// 2. Default value untuk context
const defaultValue: DataContextState = {
  items: [],
  addItem: () => {},
};

// 3. Buat context
const DataContext = createContext<DataContextState>(defaultValue);

// 4. Provider untuk membungkus aplikasi
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <DataContext.Provider value={{ items, addItem }}>
      {children}
    </DataContext.Provider>
  );
};

// 5. Custom hook untuk menggunakan context
export const useDataContext = () => useContext(DataContext);
