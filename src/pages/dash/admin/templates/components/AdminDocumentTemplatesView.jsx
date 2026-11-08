import React, { useState, useRef } from 'react';
import { Eye, Upload, X, Check, FileUp, Sparkles } from 'lucide-react';
import {
  PaystubThumbnail,
  TEMPLATES,
} from "../../../../public/Generator/components/sections/TemplateSelectionSection";

const AdminDocumentTemplatesView = () => {
  // Active/selected template for each category
  const [selectedPaystubTpl, setSelectedPaystubTpl] = useState('01');
  const [selectedW2Tpl, setSelectedW2Tpl] = useState('01');
  const [selected1099Tpl, setSelected1099Tpl] = useState('01');
  const [selectedDdTpl, setSelectedDdTpl] = useState('01');

  // Preview modal state
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('Paystub');
  const [uploadTplName, setUploadTplName] = useState('');
  const [uploadTplSubtitle, setUploadTplSubtitle] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadSuccessToast, setUploadSuccessToast] = useState('');

  const fileInputRef = useRef(null);

  // Paystub templates list (can be augmented by uploads)
  const [paystubTemplates, setPaystubTemplates] = useState(TEMPLATES);

  // W-2 templates
  const [w2Templates, setW2Templates] = useState([
    {
      id: '01',
      title: 'Template 01',
      subtitle: 'Classic layout',
      headerVariant: 'dark-full',
      netPayVariant: 'dark',
      tableVariant: 'light-blue',
      category: 'W-2',
    },
  ]);

  // 1099 templates
  const [necTemplates, setNecTemplates] = useState([
    {
      id: '01',
      title: 'Template 01',
      subtitle: 'Classic layout',
      headerVariant: 'dark-full',
      netPayVariant: 'dark',
      tableVariant: 'light-blue',
      category: '1099',
    },
  ]);

  // Direct Deposit templates
  const [ddTemplates, setDdTemplates] = useState([
    {
      id: '01',
      title: 'Template 01',
      subtitle: 'Classic layout',
      headerVariant: 'dark-full',
      netPayVariant: 'dark',
      tableVariant: 'light-blue',
      category: 'Direct Deposit',
    },
  ]);

  const handleOpenUpload = (category) => {
    setUploadCategory(category);
    setUploadTplName(`New ${category} Template`);
    setUploadTplSubtitle('Custom layout');
    setUploadFileName('');
    setUploadModalOpen(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newId = String(Date.now()).slice(-2);
    const newTpl = {
      id: newId,
      title: uploadTplName || `Template ${newId}`,
      subtitle: uploadTplSubtitle || 'Custom layout',
      headerVariant: 'blue-full',
      netPayVariant: 'blue',
      tableVariant: 'solid-blue',
      category: uploadCategory,
    };

    if (uploadCategory === 'Paystub') {
      setPaystubTemplates((prev) => [...prev, newTpl]);
      setSelectedPaystubTpl(newId);
    } else if (uploadCategory === 'W-2') {
      setW2Templates((prev) => [...prev, newTpl]);
      setSelectedW2Tpl(newId);
    } else if (uploadCategory === '1099') {
      setNecTemplates((prev) => [...prev, newTpl]);
      setSelected1099Tpl(newId);
    } else {
      setDdTemplates((prev) => [...prev, newTpl]);
      setSelectedDdTpl(newId);
    }

    setUploadModalOpen(false);
    setUploadSuccessToast(`${uploadTplName || 'Template'} uploaded successfully!`);
    setTimeout(() => setUploadSuccessToast(''), 3500);
  };

  const renderTemplateCard = (tmpl, isSelected, onSelect, categoryLabel) => {
    return (
      <div
        key={tmpl.id}
        onClick={() => onSelect(tmpl.id)}
        className={`bg-white rounded-xl p-3 sm:p-4 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
          isSelected
            ? 'border-2 border-[#009BFB] shadow-[0_2px_12px_rgba(0,155,251,0.12)]'
            : 'border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs'
        }`}
      >
        {/* Thumbnail area */}
        <div className="w-full mb-3 overflow-hidden rounded bg-slate-50/50">
          <PaystubThumbnail template={tmpl} />
        </div>

        {/* Title, Subtitle & Preview Link */}
        <div>
          <div className="flex items-center justify-between mb-3 pt-1">
            <div className="min-w-0 pr-2">
              <h4 className="font-bold text-slate-900 text-sm sm:text-[13px] leading-tight truncate">
                {tmpl.title}
              </h4>
              <p className="text-slate-400 text-sm font-normal mt-0.5 truncate">
                {tmpl.subtitle}
              </p>
            </div>

            {/* Preview Trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewTemplate({ ...tmpl, category: categoryLabel });
              }}
              className="inline-flex items-center gap-1 text-[#009BFB] hover:text-[#0080d0] text-sm font-medium transition cursor-pointer py-1 px-1.5 rounded hover:bg-sky-50 flex-shrink-0"
              aria-label={`Preview ${tmpl.title}`}
            >
              <Eye className="w-3.5 h-3.5 stroke-[2]" />
              <span>Preview</span>
            </button>
          </div>

          {/* Upload New Template Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(tmpl.id);
              handleOpenUpload(categoryLabel);
            }}
            className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-150 cursor-pointer text-center ${
              isSelected
                ? 'bg-[#009BFB] text-white hover:bg-[#0089e0] active:scale-98 shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-98'
            }`}
          >
            Upload New Template
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 select-none">
      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{uploadSuccessToast}</span>
        </div>
      )}

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Document Templates
        </h1>
        <p className="text-base text-slate-400 mt-1.5">
          Manage the document templates available to customers.
        </p>
      </div>

      {/* 1. Paystub Template Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Paystub Template
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {paystubTemplates.map((tmpl) =>
            renderTemplateCard(
              tmpl,
              selectedPaystubTpl === tmpl.id,
              setSelectedPaystubTpl,
              'Paystub'
            )
          )}
        </div>
      </section>

      {/* 2. W-2 Template Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            W-2 Template
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {w2Templates.map((tmpl) =>
            renderTemplateCard(
              tmpl,
              selectedW2Tpl === tmpl.id,
              setSelectedW2Tpl,
              'W-2'
            )
          )}
        </div>
      </section>

      {/* 3. 1099 Template Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            1099 Template
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {necTemplates.map((tmpl) =>
            renderTemplateCard(
              tmpl,
              selected1099Tpl === tmpl.id,
              setSelected1099Tpl,
              '1099'
            )
          )}
        </div>
      </section>

      {/* 4. Direct Diposite Template Section */}
      <section className="pb-8">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Direct Diposite Template
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ddTemplates.map((tmpl) =>
            renderTemplateCard(
              tmpl,
              selectedDdTpl === tmpl.id,
              setSelectedDdTpl,
              'Direct Deposit'
            )
          )}
        </div>
      </section>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setPreviewTemplate(null)}
          />

          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-sm font-bold text-[#009BFB] uppercase tracking-wider block">
                  {previewTemplate.category || 'TEMPLATE'} PREVIEW
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {previewTemplate.title} · {previewTemplate.subtitle}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 max-h-[70vh] overflow-y-auto">
              <div className="max-w-md mx-auto shadow-md rounded-lg overflow-hidden border border-slate-200">
                <PaystubThumbnail template={previewTemplate} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  if (previewTemplate.category === 'Paystub') setSelectedPaystubTpl(previewTemplate.id);
                  else if (previewTemplate.category === 'W-2') setSelectedW2Tpl(previewTemplate.id);
                  else if (previewTemplate.category === '1099') setSelected1099Tpl(previewTemplate.id);
                  else setSelectedDdTpl(previewTemplate.id);
                  setPreviewTemplate(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white text-sm font-semibold transition cursor-pointer"
              >
                Set as Default Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload New Template Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setUploadModalOpen(false)}
          />

          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-sm font-bold text-[#009BFB] uppercase tracking-wider block">
                  TEMPLATE MANAGER
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Upload {uploadCategory} Template
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
              {/* File Dropzone */}
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Template File (.pdf, .html, .svg, .png)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.html,.svg,.png,.jpg"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-[#009BFB] rounded-xl p-5 text-center cursor-pointer transition bg-slate-50/50 hover:bg-[#EAF5FF]/30 group"
                >
                  <FileUp className="w-8 h-8 text-slate-400 group-hover:text-[#009BFB] mx-auto mb-2 transition" />
                  <p className="text-sm font-semibold text-slate-700">
                    {uploadFileName ? uploadFileName : 'Click or drag template file here'}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Supports high-resolution vector and document template layouts
                  </p>
                </div>
              </div>

              {/* Template Name */}
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Template Name
                </label>
                <input
                  type="text"
                  required
                  value={uploadTplName}
                  onChange={(e) => setUploadTplName(e.target.value)}
                  placeholder="e.g. Template 09"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-[#009BFB]"
                />
              </div>

              {/* Subtitle / Layout Type */}
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Layout Subtitle
                </label>
                <input
                  type="text"
                  required
                  value={uploadTplSubtitle}
                  onChange={(e) => setUploadTplSubtitle(e.target.value)}
                  placeholder="e.g. Modern Executive layout"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-[#009BFB]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Document Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-[#009BFB] bg-white cursor-pointer"
                >
                  <option value="Paystub">Paystub Template</option>
                  <option value="W-2">W-2 Template</option>
                  <option value="1099">1099 Template</option>
                  <option value="Direct Deposit">Direct Deposit Template</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white text-sm font-semibold shadow-xs transition cursor-pointer active:scale-98"
                >
                  Save & Apply Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocumentTemplatesView;
