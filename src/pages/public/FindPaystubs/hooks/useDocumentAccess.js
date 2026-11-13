import { useCallback, useState } from "react";
import { checkoutService } from "../../../../features/public/checkout/checkout.service";

/**
 * Email + 6-digit code → a 30-minute guest token scoped to that email.
 * In memory only: the guest token must never reach localStorage/sessionStorage.
 */
export function useDocumentAccess() {
  const [challengeId, setChallengeId] = useState(null);
  const [session, setSession] = useState(null);
  const [pending, setPending] = useState(null);

  const run = async (kind, action) => {
    setPending(kind);
    try {
      return await action();
    } finally {
      setPending(null);
    }
  };

  const sendCode = useCallback(
    (email) =>
      run("send", async () => {
        const result = await checkoutService.sendCode(email, "document_access");
        setChallengeId(result.challengeId);
      }),
    [],
  );

  const verifyCode = useCallback(
    (code) =>
      run("verify", async () => {
        const result = await checkoutService.verifyCode(challengeId, code);
        setSession({ guestToken: result.guestToken, email: result.email });
        setChallengeId(null);
      }),
    [challengeId],
  );

  const reset = useCallback(() => {
    setSession(null);
    setChallengeId(null);
  }, []);

  return { codeSent: Boolean(challengeId), session, pending, sendCode, verifyCode, reset };
}
