// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportGzipResponse from '../../../app/middleware/gzip_response';
import ExportJwt from '../../../app/middleware/jwt';
import ExportNotfoundHandler from '../../../app/middleware/notfound_handler';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    gzipResponse: typeof ExportGzipResponse;
    jwt: typeof ExportJwt;
    notfoundHandler: typeof ExportNotfoundHandler;
  }
}
