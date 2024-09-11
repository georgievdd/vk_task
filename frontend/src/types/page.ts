import { CSSProperties, FC } from "react";

export enum Permission {
    ALL, AUTHORIZED, ADMIN, UNAUTHORIZED_ONLY
}

export interface PageComponent<T = {}> extends FC<T> {
    permission: Permission
}

export type PageWrapper = FC<{children: JSX.Element}>

export type ComponentProps<T> = React.HTMLAttributes<T>