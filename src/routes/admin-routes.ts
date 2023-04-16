import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from "http-status-codes";
import upload, { uploadFileFilter} from "../shared/uploads";
import * as jwt from "jsonwebtoken";

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();


const router = Router();

const { BAD_REQUEST, UNAUTHORIZED } = StatusCodes;
const accessSecret: any = process.env.ACCESS_SECRET;

export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

// Import controllers
import { CreateLab } from "../controllers/admin/createLab";
import { UploadMaterial } from "../controllers/admin/uploadMaterial";
import { GetMachine } from "../controllers/admin/getMachineInfo";
import { CreatePreSignedURL } from "../controllers/admin/createUploadURL";
import { createAdmin } from "../controllers/admin/createAdmin";

// Create admin routes

router.post(
  "/create-new-lab",
  verifyToken,
upload.single('labImage'),
  CreateLab.createLab
);



router.post(
  "/create-admin",
  multipartMiddleware,
  createAdmin.create
);


router.post("/edit-lab", verifyToken, upload.single('labImage'), CreateLab.editLab);

router.post(
  "/delete-lab",
  verifyToken,
  multipartMiddleware,
  CreateLab.deleteLab
);

router.get('/getunits', verifyToken, CreateLab.getUnits)
router.get('/unit/:id', verifyToken, CreateLab.getSingleUnit)
router.post(
  "/add-unit-to-lab/:labID",
  verifyToken,
  multipartMiddleware,
  CreateLab.createUnit
); 

router.post("/edit-unit", verifyToken, multipartMiddleware, CreateLab.editUnit);

router.post(
  "/delete-unit",
  verifyToken,
  multipartMiddleware,
  CreateLab.deleteUnit
);

router.post(
  "/add-task-to-unit/:unitID",
  verifyToken,
  multipartMiddleware,
  CreateLab.createTask
);
router.get('/get-task/:id', verifyToken, CreateLab.getTask)

router.post("/edit-task", verifyToken, multipartMiddleware, CreateLab.editTask);

router.post(
  "/delete-task",
  verifyToken,
  multipartMiddleware,
  CreateLab.deleteTask
);

router.post(
  "/add-material-info",
  verifyToken,
  multipartMiddleware,
  UploadMaterial.upload
);
router.post('/delete-material', verifyToken, UploadMaterial.deleteDownloadableMaterial)
router.post('/update-material', verifyToken, uploadFileFilter.single('file-material'),  UploadMaterial.updateDownloadableMaterial)
router.post(
  "/add-downloadable-material",
  verifyToken,
uploadFileFilter.single('file-material'),
  UploadMaterial.uploadDownloadableMaterial
);

router.get('/materials', verifyToken, UploadMaterial.getDownloadableMaterial)

router.post(
  "/get-machine-info",
  verifyToken,
  multipartMiddleware,
  GetMachine.info
);

router.post(
  "/queue-machine", 
  verifyToken,
  multipartMiddleware,
  GetMachine.create
);

router.get("/get-signed-url", verifyToken, CreatePreSignedURL.generate);

// router.post("/verify-upload", verifyToken, UploadMaterial.verifyUpload);

// catch-all route
router.all("**", (_: Request, response: Response) => {
  return response
    .status(BAD_REQUEST)
    .json({ message: "You should not be here now" });
});

// Export default
export default router;

function verifyToken(
  req: IGetUserAuthInfoRequest | any,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1] || req.headers.authorization;


  
  if (!token || token == null) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized. Kindly login to proceed." });
  } else {
    jwt.verify(token, accessSecret, (err: any, user: any) => {
      if (err) {
        console.log(err)
        return res.status(UNAUTHORIZED).json({ message: err.message });
      } else {
        req.user = user;
        next();
      }
    });
  }
}
