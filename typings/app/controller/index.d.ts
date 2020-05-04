// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminer from '../../../app/controller/adminer';
import ExportAuth from '../../../app/controller/auth';
import ExportDecision from '../../../app/controller/decision';
import ExportDisease from '../../../app/controller/disease';
import ExportHome from '../../../app/controller/home';
import ExportHospital from '../../../app/controller/hospital';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    adminer: ExportAdminer;
    auth: ExportAuth;
    decision: ExportDecision;
    disease: ExportDisease;
    home: ExportHome;
    hospital: ExportHospital;
    user: ExportUser;
  }
}
