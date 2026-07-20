import React, { useState, useRef } from 'react';
import { User, Award, FileText, ExternalLink, Trophy, GraduationCap, Globe, Code, CheckCircle2, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const ProfilePage: React.FC = () => {
  const { user, updateUserResume } = useApp();
  const [resumeFileName, setResumeFileName] = useState('Alex_Vance_SDE_Resume_2026.pdf');
  const [resumeUrl, setResumeUrl] = useState('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleResumeFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedResumeFile(file);
    }
  };

  const handleResumeUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResumeFile) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const newUrl = URL.createObjectURL(selectedResumeFile);
          setResumeFileName(selectedResumeFile.name);
          setResumeUrl(newUrl);
          updateUserResume(selectedResumeFile.name, newUrl);
          setIsUploading(false);
          setIsUploadModalOpen(false);
          setSelectedResumeFile(null);
          setUploadProgress(0);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          return 100;
        }
        return prev + 35;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Toast */}
      {showToast && (
        <div className="p-4 rounded-ch bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Resume document uploaded & updated successfully! Placement cell will use this version.</span>
        </div>
      )}

      {/* Profile Banner */}
      <Card className="relative overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar src={user.avatar} name={user.name} size="xl" />
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100">
                  {user.name}
                </h1>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold font-mono">
                  {user.studentId} • {user.department}
                </p>
              </div>
              <Button size="sm" variant="outline">
                Edit Student Profile
              </Button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {user.bio}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
              {user.skills?.map((skill, idx) => (
                <Badge key={idx} variant="primary" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic & Certificates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Stats */}
          <Card>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary-500" /> Academic Credentials
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-ch bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Cumulative GPA</span>
                <span className="text-xl font-extrabold font-numbers text-primary-600">{user.gpa} / 10.0</span>
              </div>
              <div className="p-3 rounded-ch bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Current Semester</span>
                <span className="text-xl font-extrabold font-numbers text-slate-800 dark:text-slate-200">Sem {user.semester}</span>
              </div>
              <div className="p-3 rounded-ch bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Section</span>
                <span className="text-xl font-extrabold font-numbers text-slate-800 dark:text-slate-200">{user.section}</span>
              </div>
              <div className="p-3 rounded-ch bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Backlogs</span>
                <span className="text-xl font-extrabold font-numbers text-emerald-500">0</span>
              </div>
            </div>
          </Card>

          {/* Achievements & Awards */}
          <Card>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Honors & Achievements
            </h3>
            <div className="space-y-3">
              {user.achievements?.map((ach) => (
                <div key={ach.id} className="p-3.5 rounded-ch bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{ach.title}</h4>
                      <p className="text-[11px] text-slate-500">{ach.issuer} • {ach.date}</p>
                    </div>
                  </div>
                  <Badge variant="accent" size="sm">Verified</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Social Links & Resume */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary-500" /> Student Resume & Portfolio
            </h3>
            <div className="p-4 rounded-ch border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate font-mono">{resumeFileName}</p>
              <div className="flex flex-col gap-2">
                <a href={resumeUrl} download={resumeFileName} target="_blank" rel="noreferrer">
                  <Button size="sm" className="w-full" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Download Verified PDF
                  </Button>
                </a>
                <Button size="sm" variant="outline" onClick={() => setIsUploadModalOpen(true)} leftIcon={<Upload className="w-3.5 h-3.5" />}>
                  Upload New Resume
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 mb-3">
              Connected Social Profiles
            </h3>
            <div className="space-y-2 text-xs">
              <a href={user.socials?.github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-ch bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors">
                <span className="flex items-center gap-2 font-semibold"><Code className="w-4 h-4 text-slate-800 dark:text-slate-200" /> GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a href={user.socials?.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-ch bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors">
                <span className="flex items-center gap-2 font-semibold"><Globe className="w-4 h-4 text-sky-600" /> LinkedIn Network</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Upload Resume Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          if (!isUploading) setIsUploadModalOpen(false);
        }}
        title="Upload Student Resume Document"
        description="Select a PDF resume to attach to your placement profile"
      >
        <form onSubmit={handleResumeUploadSubmit} className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleResumeFileSelect}
            accept=".pdf"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-6 border-2 border-dashed border-primary-300 dark:border-primary-800 hover:border-primary-500 rounded-ch text-center bg-primary-50/30 dark:bg-primary-950/20 cursor-pointer transition-all duration-200"
          >
            <Upload className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {selectedResumeFile ? `Selected: ${selectedResumeFile.name}` : 'Click here to pick PDF Resume'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Accepts PDF file format up to 10MB</p>
          </div>

          {isUploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>Uploading to Placement Locker...</span>
                <span className="font-mono text-primary-600">{uploadProgress}%</span>
              </div>
              <ProgressBar value={uploadProgress} showValue={false} color="primary" size="sm" />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="ghost" disabled={isUploading} onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isUploading} disabled={!selectedResumeFile}>
              Upload & Update
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
