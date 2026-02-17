import { z } from "zod";

/**
 * 문의 폼 스키마
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "이름은 필수입니다")
    .min(2, "이름은 최소 2자 이상이어야 합니다"),
  email: z
    .string()
    .min(1, "이메일은 필수입니다")
    .email("올바른 이메일 형식이 아닙니다"),
  subject: z
    .string()
    .min(1, "제목은 필수입니다")
    .min(5, "제목은 최소 5자 이상이어야 합니다"),
  message: z
    .string()
    .min(1, "메시지는 필수입니다")
    .min(10, "메시지는 최소 10자 이상이어야 합니다"),
});

export type ContactInput = z.infer<typeof contactSchema>;
