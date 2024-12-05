import React, { useState } from 'react';
import { Button, Input } from '@repo/ui-components';
import { isValidEmail } from '@repo/utils';

interface FormData {
  email: string;
  name: string;
}

interface FormErrors {
  [x: string]: unknown;
  email?: string;
  name?: string;
}

export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.VITE_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setFormData({ email: '', name: '' });
      setErrors({});
      alert('User created successfully!');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to create user. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        disabled={isSubmitting}
      />
      <Input
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter your name"
        disabled={isSubmitting}
      />
      {String(errors.submit) && (
        <p className="text-red-500 text-sm">{String(errors.submit)}</p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
};
