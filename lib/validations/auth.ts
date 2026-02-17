import { z } from "zod";

/**
 * 로그인 폼 스키마
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일은 필수입니다")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * 회원가입 폼 스키마
 */
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 최소 2자 이상이어야 합니다"),
    email: z
      .string()
      .min(1, "이메일은 필수입니다")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
    confirmPassword: z
      .string()
      .min(1, "비밀번호 확인은 필수입니다"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;
