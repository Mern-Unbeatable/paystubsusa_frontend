import React, { useEffect } from "react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { systemTableIcon } from "../data/systemTableIcons";
import { useAdminSystemTable } from "../hooks/useAdminSystemTable";
import { recordIdOf } from "../utils/systemTableFormat";
import SystemPropertyTree from "./SystemPropertyTree";

const SystemRecordDetailsModal = ({ table, recordId, title, onClose }) => {
  const {
    detailRecord,
    detailLoading,
    detailError,
    loadRecord,
    clearDetail,
  } = useAdminSystemTable();
  const Icon = systemTableIcon(table);

  useEffect(() => {
    if (!table || !recordId) return undefined;
    const request = loadRecord(table, recordId);
    return () => {
      request.abort?.();
      clearDetail();
    };
  }, [table, recordId, loadRecord, clearDetail]);

  const footer = (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClose}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
      >
        Close
      </button>
    </div>
  );

  return (
    <ProfileModal
      open={Boolean(recordId)}
      onClose={onClose}
      title="Record details"
      description={title ? `${title} · ${recordId}` : recordId}
      icon={Icon}
      size="lg"
      footer={footer}
    >
      {detailLoading && (
        <div className="space-y-3 py-2" aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      )}

      {!detailLoading && detailError && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-6 text-center">
          <p className="text-sm font-semibold text-rose-700">
            {describeRequestError(detailError, "Couldn't load this record.")}
          </p>
        </div>
      )}

      {!detailLoading && !detailError && detailRecord && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            Showing every property on this database object
            {recordIdOf(detailRecord)
              ? ` (id: ${recordIdOf(detailRecord)})`
              : ""}
            .
          </p>
          <SystemPropertyTree record={detailRecord} />
        </div>
      )}
    </ProfileModal>
  );
};

export default SystemRecordDetailsModal;
