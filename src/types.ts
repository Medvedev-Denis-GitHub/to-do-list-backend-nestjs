export type UUID = string;

export enum RolesUserInCompany {
  OWNER = 'owner' /* Владелец компании */,
  ADMIN = 'admin' /* Создание задач, назначение задач и тд */,
  MEMBER = 'member' /* Просто участник, трудозатраты, редактирование задачи */,
  NONE = 'none',
}
