import PermissionRange from "../entities/PermissionRange.entity";

export type TPermissionRangeCreation = Required<Omit<PermissionRange, "id" | "doorPermission">>;