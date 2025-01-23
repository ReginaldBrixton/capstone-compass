'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, Pencil, XCircle, Loader, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { profileConstants } from '../../data';
import ProfileInfoItem from './ProfileInfoItem';

const EditDialog = ({ isOpen, onClose, field, value, type = 'text', onSave }) => {
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef(null);

  const validateField = (value, type) => {
    if (!value.trim()) return 'Field cannot be empty';
    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    if (type === 'tel' && !/^\+?[\d\s()-]{7,}$/.test(value)) return 'Invalid phone format';
    return '';
  };

  const handleSave = async () => {
    const validationError = validateField(editValue, type);
    if (validationError) return setError(validationError);
    
    setIsSaving(true);
    try {
      await onSave(editValue);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-scaleIn">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold dark:text-white">Edit {field}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 p-2 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <input
            ref={inputRef}
            type={type}
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              setError('');
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              error ? 'border-red-500' : 'dark:border-gray-700'
            } dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            placeholder={`Enter ${field.toLowerCase()}`}
          />
          
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <XCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t dark:border-gray-800">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const PhotoDialog = ({ isOpen, onClose, onSave }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!preview) return;
    try {
      await onSave(preview);
      onClose();
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-scaleIn">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold dark:text-white">Update Profile Photo</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 p-2 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div
            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center aspect-square transition-all ${
              isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-500 cursor-pointer'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="relative w-full h-full">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            ) : (
              <div className="text-center p-6">
                <Camera className="w-12 h-12 text-gray-400 mb-4 mx-auto" />
                <p className="text-gray-600 dark:text-gray-400">
                  Drag & drop image here<br />
                  or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-2">Recommended size: 500x500px</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          />
        </div>

        <div className="flex gap-3 p-6 border-t dark:border-gray-800">
          <button
            onClick={handleSave}
            disabled={!preview}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Update Photo
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileHeader = ({ studentData, onUpdateProfile }) => {
  const [editField, setEditField] = useState(null);
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);

  const handleFieldClick = (field, value, type) => {
    setEditField({ field, value, type });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-800 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="relative group flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-lg cursor-pointer relative">
            <Image
              src={studentData.image || profileConstants.defaultImage}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full transition-opacity group-hover:opacity-75"
            />
            <div 
              onClick={() => setIsPhotoDialogOpen(true)}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold dark:text-white cursor-pointer hover:underline">
              <span onClick={() => handleFieldClick('Name', studentData.name)}>
                {studentData.name}
              </span>
            </h2>
            <button
              onClick={() => handleFieldClick('Name', studentData.name)}
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Edit name"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ProfileInfoItem 
              icon="🎫"
              label="Student ID"
              value={studentData.id}
              onEdit={() => handleFieldClick('Student ID', studentData.id)}
            />
            <ProfileInfoItem 
              icon="📚"
              label="Grade"
              value={studentData.grade}
              onEdit={() => handleFieldClick('Grade', studentData.grade)}
            />
            <ProfileInfoItem 
              icon="📧"
              label="Email"
              value={studentData.email}
              type="email"
              onEdit={() => handleFieldClick('Email', studentData.email, 'email')}
            />
            <ProfileInfoItem 
              icon="📱"
              label="Phone"
              value={studentData.phone}
              type="tel"
              onEdit={() => handleFieldClick('Phone', studentData.phone, 'tel')}
            />
          </div>
        </div>
      </div>

      {editField && (
        <EditDialog
          isOpen={!!editField}
          onClose={() => setEditField(null)}
          {...editField}
          onSave={(value) => {
            const key = editField.field.toLowerCase().replace(/\s+/g, '');
            onUpdateProfile?.({ ...studentData, [key]: value });
          }}
        />
      )}

      <PhotoDialog
        isOpen={isPhotoDialogOpen}
        onClose={() => setIsPhotoDialogOpen(false)}
        onSave={(image) => onUpdateProfile?.({ ...studentData, image })}
      />
    </div>
  );
};

export default ProfileHeader;