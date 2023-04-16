import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sanitize } from "sanitizer";

import { UserModel } from "../../models/user/user.model";
import { MaterialModel } from "../../models/lab/material/material.model";
import { DownloadMaterialModel } from "../../models/lab/downloadMaterial/downloadMaterial.model";


const {
  OK,
  FORBIDDEN,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = StatusCodes;

interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

export const UploadMaterial = {
  upload: (request: IGetUserAuthInfoRequest | any, response: Response) => {
    const user = request.user;
    const { materialInfo } = request.body;
    if (!materialInfo) {
      return response
        .status(BAD_REQUEST)
        .json({ message: "Required field(s) missing." });
    } else {
      if (!user) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to proceed." });
      } else {
        UserModel.findOne(
          { username: user.username },
          (err: any, userInDB: any) => {
            if (err) {
              return response
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: "An error occurred.Please try again." });
            } else if (!userInDB) {
              return response
                .status(UNAUTHORIZED)
                .json({ message: "Unauthorized. Kindly login to proceed." });
            } else {
              if (userInDB.role !== "admin") {
                return response.status(UNAUTHORIZED).json({
                  message:
                    "You are not authorized to carry out this operation.",
                });
              } else {
                const newMaterial = new MaterialModel({
                  name: sanitize(materialInfo.name),
                  description: sanitize(materialInfo.description),
                  machineName: sanitize(materialInfo.machineName),
                  storageDetails: materialInfo.storageDetails,
                });
                newMaterial.save((err: any) => {
                  if (err) {
                    return response.status(INTERNAL_SERVER_ERROR).json({
                      message: "An error occurred. Please try again.",
                    });
                  } else {
                    return response.status(CREATED).json({
                      message:
                        "Material has been added successfully. Please proceed to conversion page.",
                    });
                  }
                });
              }
            }
          }
        );
      }
    }
  },

  uploadDownloadableMaterial: (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    const user = request.user;
    if (!user) {
      return response
        .status(UNAUTHORIZED)
        .json({ message: "Unauthorized. Kindly login to continue." });
    } else {
      UserModel.findOne(
        { username: user.username },
        (err: any, userInDB: any) => {
          if (err) {
            return response
              .status(INTERNAL_SERVER_ERROR)
              .json({ message: "An error occurred. Please try again later." });
          } else if (!userInDB) {
            return response
              .status(UNAUTHORIZED)
              .json({ message: "Unauthorized. Kindly login to continue." });
          }
          if (userInDB.role !== "admin") {
            return response.status(FORBIDDEN).json({
              message:
                "Forbidden. You do not have the permission to carry out this operation.",
            });
          }
          const { name, details, description } = request.body;
          if (!name || !details || !description) {
            return response
              .status(BAD_REQUEST)
              .json({ message: "Required field(s) missing." });
          }
          const fileurl = `http://localhost:8081/uploads/${request.file.filename}`;
          const newDownloadableMaterial = new DownloadMaterialModel({
            name: sanitize(name),
            description: sanitize(description),
            file: fileurl,
            storageDetails: details,
          });
          newDownloadableMaterial.save((err: any) => {
            if (err) {
              return response.status(INTERNAL_SERVER_ERROR).json({
                message: "An error occurred. Please try again.",
              });
            } else {
              return response.status(CREATED).json({
                message: "Material has been added succesfully.",
              });
            }
          });
        }
      );
    }
  },
  getDownloadableMaterial: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    try {
      const user = request.user;

      if (!user) {
        return response.status(UNAUTHORIZED).json({
          message: "Unauthorized. Kindly login to continue.",
        });
      }

      const userInDB = await UserModel.findOne({ username: user.username });

      if (!userInDB) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
      }

      if (userInDB.role !== "admin") {
        return response.status(UNAUTHORIZED).json({
          message: "You are not authorized to carry out this operation.",
        });
      }

      const materials = await DownloadMaterialModel.find();
      return response.status(OK).json(materials);
    } catch (error) {}
  },
  deleteDownloadableMaterial: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    try {
      const user = request.user;

      if (!user) {
        return response.status(UNAUTHORIZED).json({
          message: "Unauthorized. Kindly login to continue.",
        });
      }

      const userInDB = await UserModel.findOne({ username: user.username });

      if (!userInDB) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
      }
      const { id } = request.body;
      const material = await DownloadMaterialModel.findOne({ _id: id });

      if (!material) {
        return response.status(NOT_FOUND).json({message: 'materials not found'})
      }
      material?.deleteOne();

      return response.status(200).json({ message: "material deleted" });
    } catch (error) {
      if (error) {
        return response
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error occurred. Please try again." });
      }
    }
  },
  updateDownloadableMaterial: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    try {
       const user = request.user;

       if (!user) {
         return response.status(UNAUTHORIZED).json({
           message: "Unauthorized. Kindly login to continue.",
         });
       }

       const userInDB = await UserModel.findOne({ username: user.username });

       if (!userInDB) {
         return response
           .status(UNAUTHORIZED)
           .json({ message: "Unauthorized. Kindly login to continue." });
       }
    
      
      const { id, name, description, storageDetails, fileUrl } = request.body;
         if (!name || !storageDetails|| !description || !fileUrl) {
           return response
             .status(BAD_REQUEST)
             .json({ message: "Required field(s) missing." });
         }
    
      const material:any = await DownloadMaterialModel.findOne({ _id: id });
    if (!material) {
        return response.status(NOT_FOUND).json({message: 'materials not found'})
      }
         if (fileUrl) {
           material.file = fileUrl;
         } else {
           material.file = `http://localhost:8081/uploads/${request.file.filename}`;
         }
      material.name = sanitize(name)
      material.storageDetails = sanitize(storageDetails)
      material.description = sanitize(description)
material.save()
      return      response.status(OK).json({message: "material updated"})
    } catch (error) {
      if (error) {
        return response
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error occurred. Please try again." });
      }
    }
  },
};
