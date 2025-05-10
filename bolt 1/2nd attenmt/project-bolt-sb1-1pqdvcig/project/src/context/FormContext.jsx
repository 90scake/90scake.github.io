import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const defaultFormState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  deliveryDate: '',
  selectedDesign: 'design1',
  selectedFlavor: 'vanilla',
  selectedSize: '1lb',
  message: ''
};

const FormContext = createContext({
  basicOrderForm: defaultFormState,
  updateBasicOrderForm: () => {},
  clearBasicOrderForm: () => {}
});

export function FormProvider({ children }) {
  const [basicOrderForm, setBasicOrderForm] = useState(defaultFormState);

  useEffect(() => {
    const savedForm = localStorage.getItem('basicOrderForm');
    if (savedForm) {
      setBasicOrderForm(JSON.parse(savedForm));
    }
  }, []);

  const updateBasicOrderForm = (data) => {
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
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFormContext = () => useContext(FormContext);