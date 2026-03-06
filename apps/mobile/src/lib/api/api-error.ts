export class ApiError extends Error {
  status: number;
  code: string;
  issues?: unknown;

  constructor(args: { status: number; code: string; message?: string; issues?: unknown }) {
    super(args.message ?? args.code);
    this.name = 'ApiError';
    this.status = args.status;
    this.code = args.code;
    this.issues = args.issues;
  }
}
