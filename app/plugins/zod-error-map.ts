import { z } from "zod";

export default defineNuxtPlugin((nuxtApp) => {
  const errorMap: any = (issue: any) => {
    const t = (nuxtApp as any).$i18n.t;
    const field = issue.path?.[0];

    let keyBase = issue.code;
    if (issue.format) {
      keyBase += `.${issue.format}`;
    } else if (issue.code === "too_small" || issue.code === "too_big") {
      if (issue.origin === "string") keyBase += ".string";
      else if (issue.origin === "number") keyBase += ".number";
      else if (issue.origin === "array") keyBase += ".array";
    } else if (issue.code === "invalid_type") {
      if (issue.expected) keyBase += `.${issue.expected}`;
    }

    const keyWithField = field ? `${keyBase}.${field}` : keyBase;

    const map: Record<string, string> = {
      "invalid_format.email": "validation.invalidEmail",
      "invalid_format.url": "validation.invalidURL",
      "invalid_format.regex": "validation.invalidPattern",

      "too_small.password": "validation.passwordTooShort",
      "too_small.passwordRepeat": "validation.passwordRepeatTooShort",
      "too_small.username": "validation.usernameTooShort",
      "too_small.string": "validation.tooShort",
      "too_big.string": "validation.tooLong",

      "too_small.number": "validation.tooSmallNumber",
      "too_big.number": "validation.tooBigNumber",

      "too_small.array": "validation.arrayTooShort",
      "too_big.array": "validation.arrayTooLong",

      custom: "validation.customError",
    };

    const i18nKey =
      map[keyWithField] ||
      map[keyBase] ||
      map[issue.code] ||
      "validation.customError";

    const variables: Record<string, any> = {
      path: field,
    };

    if (issue.code === z.ZodIssueCode.too_small) {
      variables.min = issue.minimum;
      variables.count = issue.minimum;
    } else if (issue.code === z.ZodIssueCode.too_big) {
      variables.max = issue.maximum;
      variables.count = issue.maximum;
    } else if (issue.code === z.ZodIssueCode.invalid_type) {
      variables.expected = issue.expected;
      variables.received = issue.received;
    }

    let message = t(i18nKey, variables);

    return { message };
  };

  z.setErrorMap(errorMap);
});
