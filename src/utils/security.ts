// XSS 防护
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// CSRF Token 生成
export function generateCSRFToken(): string {
  return crypto.getRandomValues(new Uint8Array(32))
    .reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), '');
}

// 输入验证
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// 密码强度检查
export function checkPasswordStrength(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar;
}

// URL 安全检查
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// 文件类型验证
export function isAllowedFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

// 防止原型污染
export function safeObjectAssign<T extends object>(target: T, source: object): T {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = (source as any)[key];
      if (value && typeof value === 'object') {
        (result as any)[key] = safeObjectAssign({}, value);
      } else {
        (result as any)[key] = value;
      }
    }
  }
  return result;
} 