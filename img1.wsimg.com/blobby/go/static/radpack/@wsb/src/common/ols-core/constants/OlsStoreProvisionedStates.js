const provisionedStatusMap = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  ABUSE_SUSPENDED: 'ABUSE-SUSPENDED',
  CANCELLED: 'CANCELLED',
  DB_SEEDED: 'DB-SEEDED'
};

export function isAccountProvisioned(accountStatus) {
  const provisionedStatuses = Object.values(provisionedStatusMap);
  return provisionedStatuses.indexOf(accountStatus) !== -1;
}

export default provisionedStatusMap;
