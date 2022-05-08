// import fs from "fs";
// import path from "path";
import { Helper } from "../common/helper";
import { Logger } from "../common/logger";
// import * as RolePrivilegesList from '../../seed.data/role.privileges.json';
// import { Helper } from "../common/helper";
// import { Logger } from "../common/logger";
// import { RoleService } from '../database/repository.services/role.service';
// import { RolePrivilegeService } from '../database/repository.services/role.privilege.service';
// import { UseService } from '../database/repository.services/user.service';
// import { UserDelegate } from '../api/user/user.controller.delegate';
// import { Loader } from "./loader";

//////////////////////////////////////////////////////////////////////////////

export class Seeder {

    // _apiClientService: ApiClientService = null;

    // _userService: UserService = null;

    // _roleService: RoleService = null;

    // _fileResourceService: FileResourceService = null;

    // constructor() {
    //     this._apiClientService = Loader.container.resolve(ApiClientService);
    //     this._userService = Loader.container.resolve(UserService);
    //     this._roleService = Loader.container.resolve(RoleService);
    //     this._fileResourceService = Loader.container.resolve(FileResourceService);
    // }

    public static seed = async (): Promise<void> => {
        try {
            await Seeder.createTempFolders();
            // await this.seedDefaultRoles();
            // await this.seedRolePrivileges();
            // await this.seedInternalClients();
            // await this.seedSystemAdmin();
        } catch (error) {
            Logger.instance().log(error.message);
        }
    };

    private static createTempFolders = async () => {
        await Helper.createTempDownloadFolder();
        await Helper.createTempUploadFolder();
    };

    // private seedRolePrivileges = async () => {
    //     try {
    //         const arr = RolePrivilegesList['default'];
    //         for (let i = 0; i < arr.length; i++) {
    //             const rp = arr[i];
    //             const roleName = rp['Role'];
    //             const privileges = rp['Privileges'];

    //             const role = await this._roleRepo.getByName(roleName);
    //             if (role == null) {
    //                 continue;
    //             }
    //             for (const privilege of privileges) {
    //                 const exists = await this._rolePrivilegeRepo.hasPrivilegeForRole(role.id, privilege);
    //                 if (!exists) {
    //                     await this._rolePrivilegeRepo.create({
    //                         RoleId    : role.id,
    //                         Privilege : privilege,
    //                     });
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         Logger.instance().log('Error occurred while seeding role-privileges!');
    //     }
    //     Logger.instance().log('Seeded role-privileges successfully!');
    // };

    // private seedSystemAdmin = async () => {

    //     const exists = await this._userRepo.userNameExists('admin');
    //     if (exists) {
    //         return;
    //     }

    //     const SeededSystemAdmin = this.loadJSONSeedFile('system.admin.seed.json');

    //     const role = await this._roleRepo.getByName(Roles.SystemAdmin);
       
    //     const userDomainModel: UserDomainModel = {
    //         Person : {
    //             Phone     : SeededSystemAdmin.Phone,
    //             FirstName : SeededSystemAdmin.FirstName,
    //         },
    //         UserName        : SeededSystemAdmin.UserName,
    //         Password        : SeededSystemAdmin.Password,
    //         DefaultTimeZone : SeededSystemAdmin.DefaultTimeZone,
    //         CurrentTimeZone : SeededSystemAdmin.CurrentTimeZone,
    //         RoleId          : role.id,
    //     };

    //     const person = await this._personRepo.create(userDomainModel.Person);
    //     userDomainModel.Person.id = person.id;
    //     await this._userRepo.create(userDomainModel);
    //     await this._personRoleRepo.addPersonRole(person.id, role.id);

    //     Logger.instance().log('Seeded admin user successfully!');
    // };

    // private loadJSONSeedFile(file: string): any {
    //     var filepath = path.join(process.cwd(), 'seed.data', file);
    //     var fileBuffer = fs.readFileSync(filepath, 'utf8');
    //     const obj = JSON.parse(fileBuffer);
    //     return obj;
    // }

    // private seedInternalClients = async () => {

    //     Logger.instance().log('Seeding internal clients...');

    //     const arr = this.loadJSONSeedFile('internal.clients.seed.json');

    //     for (let i = 0; i < arr.length; i++) {
    //         var c = arr[i];
    //         let client = await this._apiClientService.getByClientCode(c.ClientCode);
    //         if (client == null) {
    //             const model: ApiClientDomainModel = {
    //                 ClientName   : c['ClientName'],
    //                 ClientCode   : c['ClientCode'],
    //                 IsPrivileged : c['IsPrivileged'],
    //                 Email        : c['Email'],
    //                 Password     : c['Password'],
    //                 ValidFrom    : new Date(),
    //                 ValidTill    : new Date(2030, 12, 31),
    //                 ApiKey       : c['ApiKey'],
    //             };
    //             client = await this._apiClientService.create(model);
    //             var str = JSON.stringify(client, null, '  ');
    //             Logger.instance().log(str);
    //         }
    //     }

    // };

    // private seedDefaultRoles = async () => {
        
    //     const existing = await RoleRepo.search();
    //     if (existing.length > 0) {
    //         return;
    //     }
        
    //     await this._roleRepo.create({
    //         RoleName    : Roles.SystemAdmin,
    //         Description : 'Admin of the system having elevated privileges.',
    //     });
    //     this._roleRepo.create({
    //         RoleName    : Roles.Patient,
    //         Description : 'Represents a patient.',
    //     });
    //     await this._roleRepo.create({
    //         RoleName    : Roles.Doctor,
    //         Description : 'Represents a doctor/physician.',
    //     });
    //     await this._roleRepo.create({
    //         RoleName    : Roles.LabUser,
    //         Description :
    //             'Represents a pathology/radiology lab representative/technician/pathologist/radiologist.',
    //     });
    //     await this._roleRepo.create({
    //         RoleName    : Roles.PharmacyUser,
    //         Description : 'Represents a pharmacy/pharmacist/pharmacy shop owner/drug dispenser.',
    //     });
    //     await this._roleRepo.create({
    //         RoleName    : Roles.Nurse,
    //         Description : 'Represents an nurse and medical care taker.',
    //     });
    //     await this._roleRepo.create({
    //         RoleName    : Roles.AmbulanceServiceUser,
    //         Description : 'Represents an ambulance service provider/driver/mobile emergency medic.',
    //     });
    //     await this._roleRepo.create({
    //         RoleName    : Roles.PatientFamilyMember,
    //         Description : 'Represents a family member of the patient.',
    //     });
    //     await this._roleRepo.create({
    //         RoleName    : Roles.PatientFriend,
    //         Description : 'Represents a friend of the patient.',
    //     });

    //     Logger.instance().log('Seeded default roles successfully!');
    // };

}
