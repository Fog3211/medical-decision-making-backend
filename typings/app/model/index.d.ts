// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminer from '../../../app/model/adminer';
import ExportAuth from '../../../app/model/auth';
import ExportDecision from '../../../app/model/decision';
import ExportDepartment from '../../../app/model/department';
import ExportDisease from '../../../app/model/disease';
import ExportHospital from '../../../app/model/hospital';
import ExportPart from '../../../app/model/part';
import ExportQuestion from '../../../app/model/question';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Adminer: ReturnType<typeof ExportAdminer>;
    Auth: ReturnType<typeof ExportAuth>;
    Decision: ReturnType<typeof ExportDecision>;
    Department: ReturnType<typeof ExportDepartment>;
    Disease: ReturnType<typeof ExportDisease>;
    Hospital: ReturnType<typeof ExportHospital>;
    Part: ReturnType<typeof ExportPart>;
    Question: ReturnType<typeof ExportQuestion>;
    User: ReturnType<typeof ExportUser>;
  }
}
