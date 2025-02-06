'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, Pencil, XCircle, Loader, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { profileConstants } from '../../data';
import ProfileInfoItem from './ProfileInfoItem';
import { getAvatarUrl } from '../../../../../utils/avatar';
const EditDialog = ({ isOpen, onClose, field, value, type = 'text', onSave }) => {
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef(null);
  const validateField = (value, type) => {
    if (!value.trim()) return 'Field cannot be empty';
    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Invalid email format';
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
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      data-oid=":y9q59-"
    >
      <div
        className="animate-scaleIn w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
        data-oid="jspkkpa"
      >
        <div
          className="flex items-center justify-between border-b p-6 dark:border-gray-800"
          data-oid="kvt69ou"
        >
          <h3 className="text-xl font-semibold dark:text-white" data-oid="nbqb7.a">
            Edit {field}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:text-red-500"
            aria-label="Close dialog"
            data-oid="a6d8_tt"
          >
            <XCircle className="h-6 w-6" data-oid="b_g_xwx" />
          </button>
        </div>

        <div className="space-y-4 p-6" data-oid="ro_egzc">
          <input
            ref={inputRef}
            type={type}
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              setError('');
            }}
            className={`w-full rounded-lg border px-4 py-3 ${error ? 'border-red-500' : 'dark:border-gray-700'} outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
            placeholder={`Enter ${field.toLowerCase()}`}
            data-oid="9d9jl_n"
          />

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500" data-oid="p_arnug">
              <XCircle className="h-4 w-4" data-oid="0uxxbmm" />
              <span data-oid="a3h35sc">{error}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t p-6 dark:border-gray-800" data-oid="3-vbi1d">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50"
            data-oid="ewm8bu5"
          >
            {isSaving ? (
              <>
                <Loader className="h-5 w-5 animate-spin" data-oid="q1a1v5b" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" data-oid="6hko9fo" />
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-3 font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            data-oid="c6a7cmo"
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
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      data-oid="k4xyzk9"
    >
      <div
        className="animate-scaleIn w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
        data-oid="9ybk7dh"
      >
        <div
          className="flex items-center justify-between border-b p-6 dark:border-gray-800"
          data-oid="g44cldz"
        >
          <h3 className="text-xl font-semibold dark:text-white" data-oid="o18lx2v">
            Update Profile Photo
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:text-red-500"
            aria-label="Close dialog"
            data-oid="179d_yv"
          >
            <XCircle className="h-6 w-6" data-oid="ya_09re" />
          </button>
        </div>

        <div className="space-y-6 p-6" data-oid="9i2joov">
          <div
            className={`flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'cursor-pointer border-gray-300 hover:border-blue-500 dark:border-gray-700'}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            data-oid="fbxn2s9"
          >
            {preview ? (
              <div className="relative h-full w-full" data-oid="oblvk4t">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="rounded-lg object-cover"
                  data-oid="p7tpbz0"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                  }}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 shadow-lg transition-colors hover:bg-red-600"
                  data-oid="vgryr.v"
                >
                  <XCircle className="h-5 w-5 text-white" data-oid="_yrt-cf" />
                </button>
              </div>
            ) : (
              <div className="p-6 text-center" data-oid="o_93yqv">
                <Camera className="mx-auto mb-4 h-12 w-12 text-gray-400" data-oid=".weutw2" />
                <p className="text-gray-600 dark:text-gray-400" data-oid="q3z2aw5">
                  Drag & drop image here
                  <br data-oid="l.4hgo3" />
                  or click to browse
                </p>
                <p className="mt-2 text-sm text-gray-500" data-oid="pmhdsj.">
                  Recommended size: 500x500px
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            data-oid="g7l_6qs"
          />
        </div>

        <div className="flex gap-3 border-t p-6 dark:border-gray-800" data-oid="6ry22ee">
          <button
            onClick={handleSave}
            disabled={!preview}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            data-oid="eno1fz0"
          >
            Update Photo
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-3 font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            data-oid="uclwt9v"
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
    setEditField({
      field,
      value,
      type,
    });
  };
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
      data-oid="8_7x6ky"
    >
      <div className="flex flex-col gap-6 p-6 md:flex-row" data-oid="-kjc2xr">
        <div className="group relative flex-shrink-0" data-oid="0:-fw4q">
          <div
            className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-900"
            data-oid="icpkm7f"
          >
            <Image
              src={getAvatarUrl(studentData.name, studentData.image)}
              alt={`${studentData.name}'s profile picture`}
              width={128}
              height={128}
              className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
              priority
              data-oid="..r3e9l"
            />
            <div
              onClick={() => setIsPhotoDialogOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
              data-oid="56y6:su"
            >
              <Camera className="h-6 w-6 text-white" data-oid="qh4buuo" />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4" data-oid="r-6mpu.">
          <div className="flex items-center gap-3" data-oid="x6n6spw">
            <h2
              className="cursor-pointer text-2xl font-bold hover:underline dark:text-white"
              data-oid="o2egvoz"
            >
              <span onClick={() => handleFieldClick('Name', studentData.name)} data-oid="aylf902">
                {studentData.name}
              </span>
            </h2>
            <button
              onClick={() => handleFieldClick('Name', studentData.name)}
              className="text-gray-500 transition-colors hover:text-blue-600"
              aria-label="Edit name"
              data-oid="o.:kup5"
            >
              <Pencil className="h-5 w-5" data-oid="vpxb7xv" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2" data-oid="-n_p9nt">
            <ProfileInfoItem
              icon="🎫"
              label="Student ID"
              value={studentData.id}
              onEdit={() => handleFieldClick('Student ID', studentData.id)}
              data-oid="d:8qd58"
            />
            <ProfileInfoItem
              icon="📚"
              label="Grade"
              value={studentData.grade}
              onEdit={() => handleFieldClick('Grade', studentData.grade)}
              data-oid="vw9k4j_"
            />
            <ProfileInfoItem
              icon="📧"
              label="Email"
              value={studentData.email}
              type="email"
              onEdit={() => handleFieldClick('Email', studentData.email, 'email')}
              data-oid="ka6c3:s"
            />
            <ProfileInfoItem
              icon="📱"
              label="Phone"
              value={studentData.phone}
              type="tel"
              onEdit={() => handleFieldClick('Phone', studentData.phone, 'tel')}
              data-oid="b.:o8:m"
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
            onUpdateProfile?.({
              ...studentData,
              [key]: value,
            });
          }}
          data-oid="q6z3lch"
        />
      )}

      <PhotoDialog
        isOpen={isPhotoDialogOpen}
        onClose={() => setIsPhotoDialogOpen(false)}
        onSave={(image) =>
          onUpdateProfile?.({
            ...studentData,
            image,
          })
        }
        data-oid=".zzt:il"
      />
    </div>
  );
};
export default ProfileHeader;
