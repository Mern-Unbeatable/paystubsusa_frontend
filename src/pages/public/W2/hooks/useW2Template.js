import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicTemplates } from "../../../../features/public/template/publicTemplateThunks";
import { selectPublicTemplatesByType } from "../../../../features/public/template/publicTemplateSelectors";

/**
 * Active W-2 catalog template (`id` = UUID for create-order).
 * Falls back to null while loading or if the catalog is empty.
 */
export function useW2Template() {
  const dispatch = useDispatch();
  const { templates: rows, status } = useSelector((state) =>
    selectPublicTemplatesByType(state, "w2"),
  );

  useEffect(() => {
    dispatch(fetchPublicTemplates("w2"));
  }, [dispatch]);

  return useMemo(() => {
    const ready = status === "succeeded" || status === "failed";
    const row = rows.find((t) => t.isDefault) ?? rows[0] ?? null;
    if (!row) return { template: null, ready };
    return {
      template: {
        catalogId: row.id,
        code: row.code,
        title: row.title || `W-2 Template ${row.code}`,
      },
      ready,
    };
  }, [rows, status]);
}
