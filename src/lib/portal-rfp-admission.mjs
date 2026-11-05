const IMPLEMENTED_ATOMIC_ADMISSION_VERSION = null;

const REQUIRED_CONFIGURATION = Object.freeze({
  backendVersion: "RFP_ADMISSION_ATOMIC_BACKEND_VERSION",
  dailyUserRequestLimit: "RFP_DAILY_USER_REQUEST_LIMIT",
  dailyGlobalRequestLimit: "RFP_DAILY_GLOBAL_REQUEST_LIMIT",
  dailyUserCostCapUsd: "RFP_DAILY_USER_COST_CAP_USD",
  dailyGlobalCostCapUsd: "RFP_DAILY_GLOBAL_COST_CAP_USD",
});

function positiveInteger(value) {
  if (typeof value !== "string" || !/^\d+$/.test(value.trim())) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function positiveUsd(value) {
  if (typeof value !== "string" || !/^\d+(?:\.\d{1,4})?$/.test(value.trim())) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function parsePortalRfpAdmissionConfiguration(env = process.env) {
  const dailyUserRequestLimit = positiveInteger(
    env[REQUIRED_CONFIGURATION.dailyUserRequestLimit],
  );
  const dailyGlobalRequestLimit = positiveInteger(
    env[REQUIRED_CONFIGURATION.dailyGlobalRequestLimit],
  );
  const dailyUserCostCapUsd = positiveUsd(
    env[REQUIRED_CONFIGURATION.dailyUserCostCapUsd],
  );
  const dailyGlobalCostCapUsd = positiveUsd(
    env[REQUIRED_CONFIGURATION.dailyGlobalCostCapUsd],
  );

  if (
    !dailyUserRequestLimit ||
    !dailyGlobalRequestLimit ||
    !dailyUserCostCapUsd ||
    !dailyGlobalCostCapUsd
  ) {
    return { configured: false, reason: "missing_or_invalid_limits" };
  }

  return {
    configured: true,
    backendVersion: String(
      env[REQUIRED_CONFIGURATION.backendVersion] || "",
    ).trim(),
    dailyUserRequestLimit,
    dailyGlobalRequestLimit,
    dailyUserCostCapUsd,
    dailyGlobalCostCapUsd,
  };
}

export function isPortalRfpAdmissionReady(env = process.env) {
  const configuration = parsePortalRfpAdmissionConfiguration(env);
  return Boolean(
    configuration.configured &&
      IMPLEMENTED_ATOMIC_ADMISSION_VERSION &&
      configuration.backendVersion === IMPLEMENTED_ATOMIC_ADMISSION_VERSION,
  );
}
