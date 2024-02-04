interface AccessControl {
  individualUsers?: string[];
  roles?: string[];
}

export function isAuthorizedToPerformAction(
  category: { accessControl: AccessControl },
  userId: string,
  role: string,
) {
  return (
    new Set(category.accessControl.individualUsers).has(userId) ||
    new Set(category.accessControl.roles).has(role)
  );
}
