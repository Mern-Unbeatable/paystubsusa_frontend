import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicTemplates } from "../../../../features/public/template/publicTemplateThunks";
import { selectPublicTemplatesByType } from "../../../../features/public/template/publicTemplateSelectors";

export function useDirectDepositTemplate() {
  const dispatch = useDispatch();
  const { templates: rows, status } = useSelector((state) =>
    selectPublicTemplatesByType(state, "direct_deposit"),
  );

  useEffect(() => {
    dispatch(fetchPublicTemplates("direct_deposit"));
  }, [dispatch]);

  return useMemo(() => {
    const ready = status === "succeeded" || status === "failed";
    const row = rows.find((t) => t.isDefault) ?? rows[0] ?? null;
    if (!row) return { template: null, ready };
    return {
      template: {
        catalogId: row.id,
        code: row.code,
        title: row.title || `Direct Deposit Template ${row.code}`,
      },
      ready,
    };
  }, [rows, status]);
}
