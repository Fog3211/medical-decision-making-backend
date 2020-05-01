// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminer from '../../../app/controller/adminer';
import ExportDisease from '../../../app/controller/disease';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    adminer: ExportAdminer;
    disease: ExportDisease;
    home: ExportHome;
    user: ExportUser;
  }
}
