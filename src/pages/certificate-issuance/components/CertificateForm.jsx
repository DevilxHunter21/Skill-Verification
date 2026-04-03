import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CertificateForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.studentName?.trim()) {
      newErrors.studentName = 'Student name is required';
    } else if (formData?.studentName?.trim()?.length < 2) {
      newErrors.studentName = 'Student name must be at least 2 characters';
    }
    
    if (!formData?.courseName?.trim()) {
      newErrors.courseName = 'Course name is required';
    } else if (formData?.courseName?.trim()?.length < 3) {
      newErrors.courseName = 'Course name must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-medium border border-border p-6 lg:p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Award" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Issue New Certificate</h2>
        <p className="text-muted-foreground">Create a verifiable digital certificate with blockchain security</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Student Name"
          type="text"
          name="studentName"
          placeholder="Enter student's full name"
          value={formData?.studentName}
          onChange={handleInputChange}
          error={errors?.studentName}
          required
          disabled={isLoading}
        />

        <Input
          label="Course Name"
          type="text"
          name="courseName"
          placeholder="Enter course or certification name"
          value={formData?.courseName}
          onChange={handleInputChange}
          error={errors?.courseName}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="Award"
          iconPosition="left"
          disabled={isLoading}
        >
          {isLoading ? 'Generating Certificate...' : 'Generate Certificate'}
        </Button>
      </form>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Certificate Generation Process:</p>
            <ul className="space-y-1">
              <li>• SHA-256 hash will be generated for verification</li>
              <li>• QR code will be embedded in the PDF certificate</li>
              <li>• Certificate will be automatically downloaded</li>
              <li>• Verification URL will be created for public access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;