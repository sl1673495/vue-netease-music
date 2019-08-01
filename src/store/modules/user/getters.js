import { isDef } from "@/utils/common";

export const isLogin = (state) => isDef(state.user.userId)