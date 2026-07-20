import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, CheckCircle2, Clock, Award, File, X, AlertCircle, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProgressBar } from '../../components/ui/ProgressBar';
import type { Assignment } from '../../types';

// Framer Motion variants
const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.25 } },
};

export const AssignmentsPage: React.FC = () => {
  const { assignments, submitAssignment } = useApp();
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState<'pending' | 'submitted' | 'graded'>('pending');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [manualFileName, setManualFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const filteredAssignments = assignments.filter(a => a.status === activeTab);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file size (25MB max)
      if (file.size > 25 * 1024 * 1024) {
        error('File exceeds the 25 MB limit. Please compress it and try again.', 'File Too Large');
        return;
      }
      setSelectedFile(file);
      setManualFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 25 * 1024 * 1024) {
        error('File exceeds the 25 MB limit.', 'File Too Large');
        return;
      }
      setSelectedFile(file);
      setManualFileName(file.name);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fileNameToSubmit = selectedFile ? selectedFile.name : manualFileName.trim();
    if (!selectedAssignment || !fileNameToSubmit) {
      error('Please select a file or enter a document name.', 'Nothing to Submit');
      return;
    }

    setIsUploading(true);
    setUploadProgress(5);

    const stages = [15, 35, 60, 80, 95, 100];
    let stageIndex = 0;

    const interval = setInterval(() => {
      if (stageIndex >= stages.length) {
        clearInterval(interval);
        submitAssignment(selectedAssignment.id, fileNameToSubmit);
        setIsUploading(false);
        setSelectedAssignment(null);
        setSelectedFile(null);
        setManualFileName('');
        setUploadProgress(0);
        success(
          `"${fileNameToSubmit}" submitted successfully! Faculty has been notified.`,
          'Assignment Submitted ✓'
        );
        return;
      }
      setUploadProgress(stages[stageIndex]);
      stageIndex++;
    }, 350);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const tabInfo = {
    pending: { color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/50', border: 'border-amber-300 dark:border-amber-800' },
    submitted: { color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-950/50', border: 'border-teal-300 dark:border-teal-800' },
    graded: { color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/50', border: 'border-emerald-300 dark:border-emerald-800' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950">
              <FileText className="w-6 h-6 text-amber-500" />
            </div>
            Assignment Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Submit coursework, track deadline countdowns, and inspect faculty grading rubrics.
          </p>
        </div>

        {/* Summary pills */}
        <div className="flex items-center gap-2 shrink-0">
          {(['pending', 'submitted', 'graded'] as const).map((tab) => {
            const count = assignments.filter(a => a.status === tab).length;
            const info = tabInfo[tab];
            return (
              <motion.div
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide cursor-pointer border ${info.bg} ${info.color} ${info.border} ${activeTab === tab ? 'ring-2 ring-offset-1 ring-current' : ''}`}
              >
                {count} {tab}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        {(['pending', 'submitted', 'graded'] as const).map((tab) => {
          const count = assignments.filter(a => a.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold capitalize transition-all relative ${
                activeTab === tab
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab} ({count})
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Assignment List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="space-y-4"
        >
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((asg) => (
              <motion.div key={asg.id} variants={itemVariants} layout>
                <Card hoverable>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold font-mono text-primary-600 dark:text-primary-400">
                          {asg.subjectCode} • {asg.subjectName}
                        </span>
                        <Badge
                          variant={asg.status === 'pending' ? 'warning' : asg.status === 'submitted' ? 'accent' : 'success'}
                          size="sm"
                        >
                          {asg.status.toUpperCase()}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{asg.title}</h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {asg.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
                        <span className="flex items-center gap-1 text-rose-500 font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          Due: {asg.dueDate} at {asg.dueTime}
                        </span>
                        <span>Marks: {asg.totalMarks} Total</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {asg.status === 'pending' && (
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedAssignment(asg);
                              setSelectedFile(null);
                              setManualFileName('');
                            }}
                            leftIcon={<Upload className="w-4 h-4" />}
                          >
                            Submit File
                          </Button>
                        </motion.div>
                      )}

                      {asg.status === 'submitted' && (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Submitted:</span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1">
                            <File className="w-3.5 h-3.5 text-primary-500" />
                            {asg.submittedFile}
                          </span>
                        </div>
                      )}

                      {asg.status === 'graded' && (
                        <div className="p-3 rounded-ch bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-right">
                          <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-wide">Final Grade</span>
                          <span className="text-lg font-extrabold font-numbers text-emerald-700 dark:text-emerald-300">
                            {asg.grade}
                          </span>
                          {asg.feedback && (
                            <p className="text-[11px] text-slate-500 italic mt-0.5 max-w-[140px]">"{asg.feedback}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="py-16 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-sm font-semibold text-slate-500">All clear!</p>
              <p className="text-xs text-slate-400 mt-1">No assignments in the <span className="font-bold">{activeTab}</span> section.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Upload Submission Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={!!selectedAssignment}
          onClose={() => {
            if (!isUploading) {
              setSelectedAssignment(null);
              setSelectedFile(null);
              setManualFileName('');
              setUploadProgress(0);
            }
          }}
          title="Upload Assignment Solution"
          description={`${selectedAssignment.subjectCode}: ${selectedAssignment.title}`}
        >
          <form onSubmit={handleUploadSubmit} className="space-y-5">
            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept={selectedAssignment.fileTypesAllowed.join(',')}
              className="hidden"
              id="assignment-file-input"
            />

            {/* Interactive Dropzone */}
            <motion.div
              animate={{
                borderColor: isDragging ? 'rgb(37, 99, 235)' : 'rgba(147, 197, 253, 0.6)',
                backgroundColor: isDragging ? 'rgba(239, 246, 255, 0.8)' : 'rgba(239, 246, 255, 0.3)',
                scale: isDragging ? 1.01 : 1,
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="p-7 border-2 border-dashed border-primary-300 dark:border-primary-800 rounded-ch text-center cursor-pointer group relative overflow-hidden"
            >
              <motion.div
                animate={{ scale: isDragging ? 1.15 : 1 }}
                className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
              >
                <Upload className="w-6 h-6" />
              </motion.div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {isDragging ? 'Drop it here!' : 'Click to browse or drag & drop'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Accepted: {selectedAssignment.fileTypesAllowed.join(', ')} · Max 25 MB
              </p>
            </motion.div>

            {/* Selected File Chip */}
            <AnimatePresence>
              {selectedFile ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="p-3.5 rounded-ch bg-slate-100 dark:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-950">
                      <File className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-xs">{selectedFile.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{formatFileSize(selectedFile.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setManualFileName('');
                    }}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full space-y-1.5"
                >
                  <label htmlFor="manual-filename" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Or enter document name manually:
                  </label>
                  <input
                    id="manual-filename"
                    type="text"
                    placeholder="e.g. CS602_Raft_Submission_Alex.pdf"
                    value={manualFileName}
                    onChange={(e) => setManualFileName(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-ch bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upload Progress */}
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                      Uploading to CampusHub Storage...
                    </span>
                    <span className="font-mono text-primary-600 font-bold">{uploadProgress}%</span>
                  </div>
                  <ProgressBar value={uploadProgress} showValue={false} color="primary" size="sm" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="ghost"
                disabled={isUploading}
                onClick={() => {
                  setSelectedAssignment(null);
                  setSelectedFile(null);
                  setManualFileName('');
                  setUploadProgress(0);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isUploading}
                disabled={(!selectedFile && !manualFileName.trim()) || isUploading}
                leftIcon={<Upload className="w-4 h-4" />}
              >
                {isUploading ? 'Submitting...' : 'Confirm & Submit PDF'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
