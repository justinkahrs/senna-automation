import assert from "node:assert/strict";
import test from "node:test";
import {
  isPortalRfpAdmissionReady,
  parsePortalRfpAdmissionConfiguration,
} from "../src/lib/portal-rfp-admission.mjs";

const completeConfiguration = {
  RFP_ADMISSION_ATOMIC_BACKEND_VERSION: "postgres-v1",
  RFP_DAILY_USER_REQUEST_LIMIT: "1",
  RFP_DAILY_GLOBAL_REQUEST_LIMIT: "2",
  RFP_DAILY_USER_COST_CAP_USD: "25.00",
  RFP_DAILY_GLOBAL_COST_CAP_USD: "50.00",
};

test("paid RFP admission stays closed when spend configuration is absent", () => {
  assert.equal(parsePortalRfpAdmissionConfiguration({}).configured, false);
  assert.equal(isPortalRfpAdmissionReady({}), false);
});

test("request and cost limits must be finite positive values", () => {
  for (const invalid of ["", "0", "-1", "Infinity", "1e9", "NaN"]) {
    const parsed = parsePortalRfpAdmissionConfiguration({
      ...completeConfiguration,
      RFP_DAILY_USER_COST_CAP_USD: invalid,
    });
    assert.equal(parsed.configured, false, `accepted invalid cap ${invalid}`);
  }

  const parsed = parsePortalRfpAdmissionConfiguration({
    ...completeConfiguration,
    RFP_DAILY_GLOBAL_REQUEST_LIMIT: "9007199254740992",
  });
  assert.equal(parsed.configured, false);
});

test("valid caps alone cannot open admission before atomic reservations ship", () => {
  assert.equal(
    parsePortalRfpAdmissionConfiguration(completeConfiguration).configured,
    true,
  );
  assert.equal(isPortalRfpAdmissionReady(completeConfiguration), false);
});
