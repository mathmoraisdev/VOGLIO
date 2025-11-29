'use client'

import { useState } from 'react'
import { Upload, X, File } from 'lucide-react'
import { createSupabaseClient } from '@/lib/supabase/client'

interface FileUploadProps {
  projectId: string
  phaseId?: string | null
  onUploadComplete?: () => void
}

export default function FileUpload({ projectId, phaseId, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const supabase = createSupabaseClient()

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${projectId}/${phaseId || 'general'}/${Date.now()}_${file.name}`
        const filePath = `project-files/${fileName}`

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('project-files')
          .getPublicUrl(filePath)

        // Save file metadata to database
        const { error: dbError } = await supabase
          .from('project_files')
          .insert({
            project_id: projectId,
            phase_id: phaseId,
            name: file.name,
            url: publicUrl,
            size: file.size,
            mime_type: file.type,
            uploaded_by: user.id,
          })

        if (dbError) throw dbError
      }

      onUploadComplete?.()
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Erro ao fazer upload do arquivo. Tente novamente.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files)
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
        dragActive
          ? 'border-primary bg-primary/10'
          : 'border-gray-900 hover:border-gray-800'
      }`}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
        disabled={uploading}
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        {uploading ? (
          <>
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-primary animate-bounce" />
            </div>
            <p className="text-sm text-gray-400">Enviando arquivos...</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-black border border-gray-900 flex items-center justify-center mb-3">
              <File className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-sm font-medium text-white mb-1">
              Clique para fazer upload ou arraste arquivos aqui
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, PDF, DOC até 10MB
            </p>
          </>
        )}
      </label>
    </div>
  )
}

