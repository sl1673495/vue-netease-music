import { isDef } from "@/utils";

export const isLogin = (state) => isDef(state.user.userId)