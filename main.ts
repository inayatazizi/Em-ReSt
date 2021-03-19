import { app, BrowserWindow, screen, ipcMain, remote } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as moment from 'moment';
import ElectronLog from 'electron-log';
import { ApplicationUser } from './src/app/core/model/applicationuser'
import { SystemDetails } from './src/app/core/model/systemdetails'
import { CompanyDetails } from './src/app/core/model/companydetails'
import { ViewModel } from './src/app/core/model/ViewModel'
import { createConnection, Like } from 'typeorm'
import { param } from 'jquery';

const upload_path: string = path.join(app.getPath("appData"), './Em-ReSt/');

let win: BrowserWindow;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

const createWindow = async () => {

  const dbPath = path.join(app.getPath('appData'), './em-rest/db.sqlite');

  const connection = await createConnection({
    type: "sqlite",
    synchronize: true,
    logging: true,
    database: dbPath,
    entities: [ApplicationUser, SystemDetails, CompanyDetails]

  }).then(async connection => {

    try {

      let _ApplicationUser = connection.getRepository(ApplicationUser);
      var users = new ApplicationUser();
      var count = await _ApplicationUser.find();
      if ((await count).length == 0) {
        users.UserRole = "admin";
        users.Password = "admin";
        users.ConfirmPassword = "admin"
        users.Email = "admin@gmail.com"
        users.FullName = "admin";
        var defaultUser = await _ApplicationUser.create(users);
        await _ApplicationUser.save(defaultUser);
      }

    }
    catch (Exception) {
      console.log("Exception", Exception.toString())
    }

    const _ApplicationUserRepo = connection.getRepository(ApplicationUser);
    const _SystemDetailsRepo = connection.getRepository(SystemDetails);
    const _CompanyDetailsRepo = connection.getRepository(CompanyDetails);


    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      title: "EM-REST",

    });

    if (serve) {
      require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
      });
      win.loadURL('http://localhost:4200');
    } else {
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      }));
    }

    if (serve) {
      win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win.destroy();

    });

    
    const appPath = serve? __dirname : process.resourcesPath.replace('resources', '');

    /////////Application User///////////
  
    ipcMain.on('get-user-details', async (e: any, Id ) => {
 
      try {
       
       var singleApplicationUserDetail = await _ApplicationUserRepo.findOne(Id);
       
       if(singleApplicationUserDetail)
       e.returnValue = await JSON.stringify({_UserDetails : singleApplicationUserDetail, Status : true, Message : 'Found'});
   
       else
       e.returnValue = await JSON.stringify({_UserDetails : null, Status : false, Message:'Not Found'});
   
     }
   
     catch (ee) {
       e.returnValue =  await JSON.stringify({_UserDetails : null, Status : false, Message:ee.toString()});
     }
   
   });


   ipcMain.on('get-all-user-details', async (e: any) => {
 
    try {
      
      var allUserDetails = await  _ApplicationUserRepo.find();
      
      if(allUserDetails)
      e.returnValue = await JSON.stringify({_UserDetails : allUserDetails, Status : true, Message : 'Found'});
   
      else
      e.returnValue = await JSON.stringify({ Status : false, Message:'Not Found'});
   
    }
    catch (ee) {
      e.returnValue =  await JSON.stringify({Status : false, Message:ee.toString()});
    }
   
   });


   ipcMain.on('authorize-user', async (e: any, model:ViewModel) => {
    var authStatus = false;
     try {
        
       var authorize = await  _ApplicationUserRepo.query("select * from ApplicationUser where UserName='"+model.para1 +"' AND "+"Password='"+model.para2+"'");
     
       if(authorize.length>0){ 
         authStatus = true;     
       }
   
       if(authStatus)
       e.returnValue = await JSON.stringify({_signInStatus : authStatus, Status : true, Message : 'Success'});
    
       else
       e.returnValue = await JSON.stringify({ Status : authStatus, Message:'Not Found'});
    
     }
     catch (ee) {
       e.returnValue =  await JSON.stringify({Status : authStatus, Message:ee.toString()});
       console.log(ee.toString());
     }
    
    });


    ipcMain.on('delete-user-details', async (e: any, Id ) => {
 
      try {
        
        var singleUserDetail = await _ApplicationUserRepo.findOne(Id);
    
        if(!singleUserDetail)
        e.returnValue = await JSON.stringify({ Status : false, Message : 'User Not Found'});
    
        else
        {
           await _ApplicationUserRepo.query("delete from applicationuser where  id='"+Id+"'");
         e.returnValue = await JSON.stringify({ Status : true, Message : 'Deleted successfully!!'});
        }
    
      }
      catch (ee) {
        e.returnValue =  await JSON.stringify({ Status : false, Message:ee.toString()});
      }
    
    });

    ipcMain.on('set-application-user-details', async (e: any, model:ApplicationUser) => {
  
      try {
    
        if(model.UserId>0){
          await _ApplicationUserRepo.save(model);
          e.returnValue = await JSON.stringify({Status : true, Message : 'Updated'});
        }
        else{
          var newApplicationUserEntity = await _ApplicationUserRepo.create(model);
          await _ApplicationUserRepo.save(newApplicationUserEntity);
          e.returnValue =  await JSON.stringify({ Status : true, Message:'User Added'});
        }
      }
      catch (ee) {
        e.returnValue =  await JSON.stringify({Status : false, Message:ee.toString()});
      }
    
    });
   

  /////////////Application User///////////////////


  ////Company And System Details/////

  ipcMain.on('set-user-information', async (e: any, model:ViewModel) => {
  
    try {
     var existingCompany =  await _CompanyDetailsRepo.query("select * from user where ='application_user"+model.para1 +"'");
      if(existingCompany.length==0){
        await _CompanyDetailsRepo.save(model.para2);
        await _SystemDetailsRepo.save(model.para3);
        e.returnValue = await JSON.stringify({Status : true, Message : 'Updated'});
   
      }
      else{

        var newCompanyEntity = await _CompanyDetailsRepo.create(model.para2);
        await _CompanyDetailsRepo.save(newCompanyEntity);
       
        var newSystem = await _SystemDetailsRepo.create(model.para3);
        await _SystemDetailsRepo.save(newSystem);
        
        await _ApplicationUserRepo.save(model.para1);


        e.returnValue =  await JSON.stringify({ Status : true, Message:'Success'});
      }
    }
    catch (ee) {
      e.returnValue =  await JSON.stringify({Status : false, Message:ee.toString()});
    }
  
  });


  ipcMain.on('get-complete-information', async (e: any, model:ViewModel) => {
  
    try {
  
       var userdet = _ApplicationUserRepo.find(model.para1);
   
        e.returnValue =  await JSON.stringify({ _UserDetails : userdet, Message:'Success'});
      
    }
    catch (ee) {
      e.returnValue =  await JSON.stringify({Status : false, Message:ee.toString()});
    }
  
  });
  ////Company And System Details////

  return win;

  })

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
