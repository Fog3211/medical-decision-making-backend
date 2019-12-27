// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRole from '../../../app/service/role';

declare module 'egg' {
  interface IService {
    role: ExportRole;
  }
}
