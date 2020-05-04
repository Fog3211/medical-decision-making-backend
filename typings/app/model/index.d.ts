// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminer from '../../../app/model/adminer';
import ExportAuth from '../../../app/model/auth';
import ExportDecision from '../../../app/model/decision';
import ExportDisease from '../../../app/model/disease';
import ExportHospital from '../../../app/model/hospital';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Adminer: ReturnType<typeof ExportAdminer>;
    Auth: ReturnType<typeof ExportAuth>;
    Decision: ReturnType<typeof ExportDecision>;
    Disease: ReturnType<typeof ExportDisease>;
    Hospital: ReturnType<typeof ExportHospital>;
    User: ReturnType<typeof ExportUser>;
  }
}
