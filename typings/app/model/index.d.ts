// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminer from '../../../app/model/adminer';
import ExportDisease from '../../../app/model/disease';
import ExportHospital from '../../../app/model/hospital';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Adminer: ReturnType<typeof ExportAdminer>;
    Disease: ReturnType<typeof ExportDisease>;
    Hospital: ReturnType<typeof ExportHospital>;
    User: ReturnType<typeof ExportUser>;
  }
}
