import { lazy } from "react"
import { ChangePasswordForm } from "./ChangePasswordForm"

export const ChangePasswordFormAsync = lazy(() => import("./ChangePasswordForm"))
