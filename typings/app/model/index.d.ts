// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRole from '../../../app/model/role';

declare module 'egg' {
  interface IModel {
    Role: ReturnType<typeof ExportRole>;
  }
}
