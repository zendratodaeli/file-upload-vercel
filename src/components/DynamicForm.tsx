"use client"

import React from 'react';
import { z } from 'zod';

type Column = {
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  description?: string;
  required?: boolean;
};

export type Columns = {
  [key: string]: Column;
};

type DynamicFormProps = {
  columns: Columns;
  callback?: Function;
};

const validateInput = (type: Column['type'], value: any, required: boolean = false) => {
  if (type === 'string') {
    value = value.trim();
  }

  if (required && !value && value !== false && type !== 'boolean') {
    return 'This field is required.';
  }

  let zodType: z.ZodTypeAny = z.string();
  let convertedValue: any = value;

  switch (type) {
    case 'number':
      if (required && value === '') {
        return 'This field is required.';
      }
      convertedValue = value !== '' ? Number(value) : NaN;
      if (isNaN(convertedValue)) {
        return 'Please enter a valid number.';
      }
      zodType = z.number();
      break;
    case 'date':
      if (required && value === '') {
        return 'This field is required.';
      }
      convertedValue = new Date(value);
      if (isNaN(convertedValue.getTime())) {
        return 'Please enter a valid date.';
      }
      zodType = z.date();
      break;
    case 'boolean':
      if (required && (value === '' || value === undefined)) {
        return 'Please select an option.';
      }
      if (value === 'true') {
        convertedValue = true;
      } else if (value === 'false') {
        convertedValue = false;
      } else {
        return 'Please select a valid option.';
      }
      zodType = z.boolean();
      break;
    case 'string':
      default:
        if (required && (value === '' || value === null || value === undefined)) {
          return 'This field is required.';
        }

        zodType = z.string();
        console.log("🚀 ~ validateInput ~ zodType:", zodType) // ctrl alt L
        break;
  }

  const validationResult = zodType.safeParse(convertedValue);
  if (!validationResult.success) {
    const firstErrorMessage = validationResult.error.errors[0]?.message || 'Invalid input';
    return firstErrorMessage;
  }

  return '';
};

const DynamicForm: React.FC<DynamicFormProps> = ({ columns, callback }) => {
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data: Record<string, any> = {};
    let errors: Record<string, string> = {};

    Object.entries(columns).forEach(([key, column]) => {
      const value = new FormData(event.currentTarget).get(key);
      data[key] = value;
    });

    Object.entries(columns).forEach(([key, { type, required }]) => {
      const errorMessage = validateInput(type, data[key], required);
      if (errorMessage) {
        errors[key] = errorMessage;
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    if(callback) {
      callback(data);
      alert("success")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(columns).map(([key, { label, type, description, required }]) => (
        <div key={key}>
          <label htmlFor={key}>{label}</label>
          {type !== 'boolean' ? (
            <input 
              id={key} 
              name={key} 
              type={type} 
              required={required}
              placeholder='' 
              className={`mt-1 block w-full ${validationErrors[key] ? 'border-red-500' : ''}`}
            />
          ) : (
            <select 
              id={key} 
              name={key} 
              required={required}
              className={`mt-1 block w-full ${validationErrors[key] ? 'border-red-500' : ''}`}
            >
              <option value="">Please select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
          {validationErrors[key] && <p className="text-red-500">{validationErrors[key]}</p>}
        </div>
      ))}
      
      <button type="submit" className="mt-4 bg-green-500 text-black border border-green-700 hover:bg-green-600 hover:text-white">
        Save
      </button>
    </form>
  );
};

export default DynamicForm;