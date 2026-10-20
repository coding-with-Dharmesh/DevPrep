import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { JOB_STATUSES } from '../data/mockJobs';
import {
  Briefcase,
  Plus,
  LayoutGrid,
  List,
  Search,
  ExternalLink,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  MoreVertical,
  Trash2,
  Edit,
  AlertCircle
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { SearchBar } from '../components/common/SearchBar';

export const JobTrackerPage = () => {
  const {
    jobApplications,
    addJobApplication,
    updateJobApplication,
    updateJobStatus,
    deleteJobApplication
  } = useData();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    jobUrl: '',
    appliedDate: new Date().toISOString().slice(0, 10),
    status: 'Applied',
    followUpDate: '',
    notes: ''
  });

  const openAddModal = () => {
    setEditingJob(null);
    setFormData({
      company: '',
      role: '',
      location: 'Remote',
      salary: '',
      jobUrl: '',
      appliedDate: new Date().toISOString().slice(0, 10),
      status: 'Applied',
      followUpDate: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      company: job.company,
      role: job.role,
      location: job.location || '',
      salary: job.salary || '',
      jobUrl: job.jobUrl || '',
      appliedDate: job.appliedDate,
      status: job.status,
      followUpDate: job.followUpDate || '',
      notes: job.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) return;

    if (editingJob) {
      updateJobApplication(editingJob.id, formData);
    } else {
      addJobApplication(formData);
    }
    setIsModalOpen(false);
  };

  // Filter jobs
  const filteredJobs = jobApplications.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.notes && job.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatusFilter === 'All' || job.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Offer':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Technical Interview':
      case 'Final Interview':
        return 'purple';
      case 'Screening':
        return 'primary';
      case 'Applied':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-brand-500" />
            Software Job Application Tracker
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize job pipelines, technical interview stages, salary estimates, and follow-up deadlines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Kanban Board View"
              aria-label="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Table List View"
              aria-label="Table List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="gradient"
            size="sm"
            onClick={openAddModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Application
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Filter by company, role title, or notes..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <span className="font-semibold text-slate-400">Status:</span>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
          >
            <option value="All">All Statuses ({jobApplications.length})</option>
            {JOB_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st} ({jobApplications.filter((j) => j.status === st).length})
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Views: Kanban vs List */}
      {viewMode === 'kanban' ? (
        /* KANBAN BOARD VIEW */
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar items-start min-h-[600px]">
          {JOB_STATUSES.map((status) => {
            const statusJobs = filteredJobs.filter((j) => j.status === status);

            return (
              <div
                key={status}
                className="w-80 flex-shrink-0 bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 flex flex-col max-h-[80vh]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {status}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {statusJobs.length}
                    </span>
                  </div>
                </div>

                {/* Job Cards in Column */}
                <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                  {statusJobs.length === 0 ? (
                    <div className="p-4 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                      No applications
                    </div>
                  ) : (
                    statusJobs.map((job) => (
                      <Card
                        key={job.id}
                        className="p-4 space-y-3 hover:border-brand-500/40 transition-all bg-white dark:bg-[#111827] shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                              {job.company}
                            </h4>
                            <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-0.5">
                              {job.role}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(job)}
                              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-md"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteJobApplication(job.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded-md"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Location & Salary */}
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                          {job.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{job.location}</span>
                            </div>
                          )}
                          {job.salary && (
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="w-3 h-3 text-emerald-500" />
                              <span>{job.salary}</span>
                            </div>
                          )}
                        </div>

                        {/* Follow up reminder */}
                        {job.followUpDate && (
                          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Follow up: {job.followUpDate}</span>
                          </div>
                        )}

                        {/* Notes */}
                        {job.notes && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg leading-relaxed">
                            {job.notes}
                          </p>
                        )}

                        {/* Move Status Selector & Job link */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                          <select
                            value={job.status}
                            onChange={(e) => updateJobStatus(job.id, e.target.value)}
                            className="text-[11px] bg-slate-100 dark:bg-slate-800 border-none rounded-md px-2 py-1 text-slate-700 dark:text-slate-300 font-medium"
                          >
                            {JOB_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>

                          {job.jobUrl && (
                            <a
                              href={job.jobUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-brand-500 p-1"
                              title="Open job listing"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE LIST VIEW */
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-3">Role</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3 hidden md:table-cell">Location & Salary</th>
                  <th className="py-3.5 px-3 hidden lg:table-cell">Applied Date</th>
                  <th className="py-3.5 px-3 hidden lg:table-cell">Follow-up Date</th>
                  <th className="py-3.5 pr-4 pl-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {job.company}
                    </td>
                    <td className="py-3.5 px-3 text-brand-600 dark:text-brand-400 font-medium text-xs">
                      {job.role}
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant={getStatusBadgeVariant(job.status)} size="xs">
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell">
                      {job.location} • {job.salary || 'N/A'}
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-500 hidden lg:table-cell font-mono">
                      {job.appliedDate}
                    </td>
                    <td className="py-3.5 px-3 text-xs text-amber-600 dark:text-amber-400 hidden lg:table-cell font-mono">
                      {job.followUpDate || 'None'}
                    </td>
                    <td className="py-3.5 pr-4 pl-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteJobApplication(job.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add / Edit Application Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? 'Edit Application' : 'Add New Job Application'}
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={handleFormSubmit}
            >
              {editingJob ? 'Save Changes' : 'Create Application'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Stripe"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Job Role / Title *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Full Stack Engineer"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              >
                {JOB_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Remote / Seattle, WA"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Salary Range
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g. $160k - $185k"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Job Posting URL
              </label>
              <input
                type="url"
                value={formData.jobUrl}
                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Applied Date
              </label>
              <input
                type="date"
                value={formData.appliedDate}
                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Follow-up Deadline
              </label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Interview Notes & Details
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Recruiter phone screen completed. Focus on distributed caching for next round."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
