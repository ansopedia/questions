interface AccessControl {
  collaborators?: string[];
  roles?: string[];
}

export function isAuthorizedToPerformAction(
  resource: { accessControl: AccessControl },
  userId: string,
  role: string,
) {
  return (
    new Set(resource.accessControl.collaborators).has(userId) ||
    new Set(resource.accessControl.roles).has(role)
  );
}
