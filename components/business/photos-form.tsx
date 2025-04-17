"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BusinessPhotosFormProps {
  formData: {
    photos: string[]
  }
  updateFormData: (data: Partial<{ photos: string[] }>) => void
}

export function BusinessPhotosForm({ formData, updateFormData }: BusinessPhotosFormProps) {
  const [dragActive, setDragActive] = useState(false)

  // In a real app, this would upload to a server and return URLs
  // For this demo, we'll simulate by using placeholder images
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newPhotos = [...formData.photos]

    Array.from(files).forEach((_, index) => {
      // Generate a placeholder URL for demo purposes
      const placeholderUrl = `/placeholder.svg?height=300&width=400&query=salon interior ${formData.photos.length + index + 1}`
      newPhotos.push(placeholderUrl)
    })

    updateFormData({ photos: newPhotos })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index)
    updateFormData({ photos: updatedPhotos })
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600">
          Upload photos of your salon, services, and facilities. High-quality images help attract more customers.
          Recommended: exterior view, interior views, and photos of your work.
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? "border-rose-400 bg-rose-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-600 mb-2">Drag and drop your photos here, or click to browse</p>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Browse Files
            </Button>
          </label>
        </div>
      </div>

      {formData.photos.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Uploaded Photos ({formData.photos.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Salon photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemovePhoto(index)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.photos.length === 0 && (
        <div className="text-center py-4">
          <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No photos uploaded yet</p>
        </div>
      )}
    </div>
  )
}
