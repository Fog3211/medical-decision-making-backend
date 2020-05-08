// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdminer from '../../../app/service/adminer';
import ExportAuth from '../../../app/service/auth';
import ExportDecision from '../../../app/service/decision';
import ExportDepartment from '../../../app/service/department';
import ExportDisease from '../../../app/service/disease';
import ExportHospital from '../../../app/service/hospital';
import ExportPart from '../../../app/service/part';
import ExportQuestion from '../../../app/service/question';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    adminer: AutoInstanceType<typeof ExportAdminer>;
    auth: AutoInstanceType<typeof ExportAuth>;
    decision: AutoInstanceType<typeof ExportDecision>;
    department: AutoInstanceType<typeof ExportDepartment>;
    disease: AutoInstanceType<typeof ExportDisease>;
    hospital: AutoInstanceType<typeof ExportHospital>;
    part: AutoInstanceType<typeof ExportPart>;
    question: AutoInstanceType<typeof ExportQuestion>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
