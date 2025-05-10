import React, { createContext, useContext, useEffect, useState } from 'react';

interface FormContextType {
  basicOrderForm: {
    name: string;
    phone: string;
    address: string;
    selectedDesign: string;
    selectedFlavor: string;
    selectedSize: string;
    message: string;
  };
  updateBasicOrderForm: (data: Partial<FormContextType['basicOrderForm']>) => void;
  clearBasicOrderForm: () => void;
}

const defaultFormState = {
  name: '',
  phone: '',
  address: '',
  selectedDesign: 'design1',
  selectedFlavor: 'vanilla',
  selectedSize: '1lb',
  message: '',
};

const FormContext = createContext<FormContextType>({
  basicOrderForm: defaultFormState,
  updateBasicOrderForm: () => {},
  clearBasicOrderForm: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [basicOrderForm, setBasicOrderForm] = useState(defaultFormState);

  useEffect(() => {
    const savedForm = localStorage.getItem('basicOrderForm');
    if (savedForm) {
      setBasicOrderForm(JSON.parse(savedForm));
    }
  }, []);

  const updateBasicOrderForm = (data: Partial<FormContextType['basicOrderForm']>) => {
    const updatedForm = { ...basicOrderForm, ...data };
    setBasicOrderForm(updatedForm);
    localStorage.setItem('basicOrderForm', JSON.stringify(updatedForm));
  };

  const clearBasicOrderForm = () => {
    setBasicOrderForm(defaultFormState);
    localStorage.removeItem('basicOrderForm');
  };

  return (
    <FormContext.Provider value={{ basicOrderForm, updateBasicOrderForm, clearBasicOrderForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);