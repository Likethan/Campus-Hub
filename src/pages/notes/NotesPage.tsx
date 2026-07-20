import React, { useState, useRef } from 'react';
import { BookOpen, Search, Download, Bookmark, Eye, FileText, Upload, Plus, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProgressBar } from '../../components/ui/ProgressBar';
import type { NoteItem } from '../../types';

export const NotesPage: React.FC = () => {
  const { notes, addNote, user } = useApp();
  const [search, setSearch] = useState('');
  const [selectedPdf, setSelectedPdf] = useState<NoteItem | null>(null);

  // New Note Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('CS601');
  const [newSubjectName, setNewSubjectName] = useState('Advanced Data Structures & Algorithms');
  const [newTagInput, setNewTagInput] = useState('Cheatsheet, FinalExams');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subjectName.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      if (!newTitle) {
        setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUploadNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);

          const pdfBlobUrl = uploadedFile
            ? URL.createObjectURL(uploadedFile)
            : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

          const createdNote: NoteItem = {
            id: `note_${Date.now()}`,
            title: newTitle,
            subjectCode: newSubjectCode,
            subjectName: newSubjectName,
            uploaderName: user.name,
            uploadDate: 'Just now',
            fileSize: uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB` : '3.5 MB',
            pages: Math.floor(10 + Math.random() * 25),
            pdfUrl: pdfBlobUrl,
            isBookmarked: false,
            downloads: 1,
            tags: newTagInput.split(',').map(t => t.trim()).filter(Boolean)
          };

          addNote(createdNote);
          setIsUploading(false);
          setIsUploadModalOpen(false);
          setUploadedFile(null);
          setNewTitle('');
          setUploadProgress(0);
          setShowSuccessToast(true);
          setTimeout(() => setShowSuccessToast(false), 4000);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-primary-500" /> Academic Notes & Document Repository
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified professor handouts, exam cheatsheets, and student study notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search notes or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-ch bg-slate-100 dark:bg-slate-800 border-0 text-xs text-slate-900 dark:text-slate-100"
            />
          </div>

          <Button
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Upload Study Document
          </Button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {showSuccessToast && (
        <div className="p-4 rounded-ch bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>New document uploaded to CampusHub Library! It is now accessible to your peers.</span>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} hoverable className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold font-mono text-primary-600 dark:text-primary-400">{note.subjectCode}</span>
                <Bookmark className="w-4 h-4 text-slate-400 hover:text-amber-500 cursor-pointer" />
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-2">{note.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Uploaded by {note.uploaderName} • {note.uploadDate}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {note.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <span className="font-mono">{note.pages} Pages • {note.fileSize}</span>
              <Button size="sm" variant="outline" onClick={() => setSelectedPdf(note)} leftIcon={<Eye className="w-4 h-4" />}>
                Preview PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload New Document Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          if (!isUploading) setIsUploadModalOpen(false);
        }}
        title="Upload Study Material / PDF Note"
        description="Share course materials, handwritten notes, or exam solutions with your batch"
      >
        <form onSubmit={handleUploadNoteSubmit} className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.zip,.pptx"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-6 border-2 border-dashed border-primary-300 dark:border-primary-800 hover:border-primary-500 rounded-ch text-center bg-primary-50/30 dark:bg-primary-950/20 cursor-pointer transition-all duration-200"
          >
            <Upload className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {uploadedFile ? `Selected: ${uploadedFile.name}` : 'Click here to pick PDF or DOCX file'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Supports PDF, DOCX, ZIP up to 50MB</p>
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Document Title</label>
            <input
              type="text"
              placeholder="e.g. Distributed Systems Raft Algorithm Cheatsheet"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-ch bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject Code</label>
              <input
                type="text"
                value={newSubjectCode}
                onChange={(e) => setNewSubjectCode(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-ch bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="Exams, Raft, Quiz"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-ch bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {isUploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>Uploading to CampusHub Library...</span>
                <span className="font-mono text-primary-600">{uploadProgress}%</span>
              </div>
              <ProgressBar value={uploadProgress} showValue={false} color="primary" size="sm" />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="ghost" disabled={isUploading} onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isUploading} disabled={!newTitle}>
              Upload Document
            </Button>
          </div>
        </form>
      </Modal>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <Modal
          isOpen={!!selectedPdf}
          onClose={() => setSelectedPdf(null)}
          title={`PDF Preview: ${selectedPdf.title}`}
          maxWidth="xl"
        >
          <div className="space-y-4">
            <div className="w-full h-96 bg-slate-100 dark:bg-slate-800 rounded-ch flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <div className="text-center p-6 space-y-3">
                <FileText className="w-16 h-16 text-primary-500 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{selectedPdf.title}</h4>
                <p className="text-xs text-slate-500">
                  Document ready for viewing. Total {selectedPdf.pages} pages ({selectedPdf.fileSize}).
                </p>
                <a href={selectedPdf.pdfUrl} download={selectedPdf.title} target="_blank" rel="noreferrer">
                  <Button size="sm" leftIcon={<Download className="w-4 h-4" />}>
                    Download Document File
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
