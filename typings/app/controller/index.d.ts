// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminer from '../../../app/controller/adminer';
import ExportAuth from '../../../app/controller/auth';
import ExportDecision from '../../../app/controller/decision';
import ExportDepartment from '../../../app/controller/department';
import ExportDisease from '../../../app/controller/disease';
import ExportHospital from '../../../app/controller/hospital';
import ExportPart from '../../../app/controller/part';
import ExportQuestion from '../../../app/controller/question';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    adminer: ExportAdminer;
    auth: ExportAuth;
    decision: ExportDecision;
    department: ExportDepartment;
    disease: ExportDisease;
    hospital: ExportHospital;
    part: ExportPart;
    question: ExportQuestion;
    user: ExportUser;
  }
}
