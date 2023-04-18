import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sanitize } from "sanitizer";
import crypto from "crypto";
import { UserModel } from "../../models/user/user.model";
import { LabModel } from "../../models/lab/lab.model";
import { UnitModel } from "../../models/lab/details/unit/unit.model";
import { TaskModel } from "../../models/lab/details/task/task.model";

interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

interface ITask {
  question: string;
  answer: string;
}

const {
  OK,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = StatusCodes;

export const CreateLab = {
  createLab: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    const user = request.user;

    try {
      if (!user) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
      }

      const userInDB: any = await UserModel.findOne({
        username: user.username,
      });
      if (userInDB.role !== "admin") {
        return response.status(UNAUTHORIZED).json({
          message: "You are not authorized to perform this operation.",
        });
      }
      const { name, description, tags, path, category } = request.body;
      console.log(request.body);

      if (!name || !description || !tags || !path || !category) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing" });
      }
      const tagsList = tags.split(",").map(function (value: string) {
        return value.trim();
      });

      if (!request.file) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing." });
      }
      const fileurl = `http://localhost:8081/uploads/${request.file.filename}`;
      //create lab
      const newLab = new LabModel({
        ID: sanitize(name.replace(/\s+/g, "-").toLowerCase()),
        name: sanitize(name),
        description: sanitize(description),
        category: sanitize(category),
        tags: tagsList,
        // machineInfo: machineInfo,
        path: path,
        labImage: fileurl,
      });
      newLab.save();
      return response.status(OK).json({
        message: `Lab added successfully with id: ${newLab.ID}`,
      });
    } catch (error) {
      console.log(error);
      return response
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  },

  editLab: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    const user = request.user;
    if (!user) {
      return response.status(UNAUTHORIZED).json({
        message: "Unauthorized. Kindly login to continue.",
      });
    }

    try {
      const userInDB = await UserModel.findOne({
        username: sanitize(user.username),
      });
      if (!userInDB) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
      }
      if (userInDB.role !== "admin") {
        return response.status(FORBIDDEN).json({
          message: "You are not authorized to carry out this operation.",
        });
      }
      // const { labInfo } = request.body;
      console.log(request.body);

      const { name, description, tags, path, category, labID, imageUrl } =
        request.body;
      if (!name || !description || !tags || !path || !category || !labID) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing" });
      }
      const tagsList = tags.split(",").map(function (value: string) {
        return value.trim();
      });

      const labInDB = await LabModel.findOne({ ID: sanitize(labID) });
      if (!labInDB) {
        return response.status(NOT_FOUND).json({
          message: "Unable to find a matching lab with the given ID.",
        });
      }

      labInDB.id = sanitize(name.replace(/\s+/g, "-").toLowerCase());
      labInDB.name = sanitize(name);
      labInDB.description = sanitize(description);
      labInDB.category = sanitize(category);
      labInDB.tags = tagsList;
      labInDB.path = sanitize(path);

      if (imageUrl) {
        labInDB.labImage = imageUrl;
      } else {
        labInDB.labImage = `http://localhost:8081/uploads/${request.file.filename}`;
      }
      labInDB.save();

      return response.status(200).json({ message: "lab updated" });
    } catch (error) {
      console.log(error);

      return response.status(INTERNAL_SERVER_ERROR).json({
        message: "An error occured. Please try again.",
      });
    }
  },

  deleteLab: (request: IGetUserAuthInfoRequest | any, response: Response) => {
    const user = request.user;
    if (!user) {
      return response
        .status(UNAUTHORIZED)
        .json({ message: "Unauthorized. Kindly login to continue." });
    } else {
      UserModel.findOne(
        { username: sanitize(user.username) },
        (err: any, userInDB: any) => {
          if (err) {
            return response
              .status(INTERNAL_SERVER_ERROR)
              .json({ message: "An error occurred. Please try again." });
          } else if (!userInDB) {
            return response
              .status(UNAUTHORIZED)
              .json({ message: "Unauthorized. Kindly login to continue." });
          } else {
            if (userInDB.role !== "admin") {
              return response.status(FORBIDDEN).json({
                message: "You are not authorized to perform this operation.",
              });
            } else {
              const { labId } = request.body;
              console.log(labId);

              if (!labId) {
                return response.status(BAD_REQUEST).json({
                  message: "Required field(s) missing",
                });
              } else {
                LabModel.findOne(
                  { ID: sanitize(labId) },
                  (err: any, labInDB: any) => {
                    if (err) {
                      return response.status(INTERNAL_SERVER_ERROR).json({
                        message: "An error occurred. Please try again.",
                      });
                    } else if (!labInDB) {
                      return response.status(NOT_FOUND).json({
                        message:
                          "Unable to find a matching lab with the specified ID.",
                      });
                    } else {
                      labInDB.deleteOne((err: any) => {
                        if (err) {
                          return response.status(INTERNAL_SERVER_ERROR).json({
                            message: "An error occurred. Please try again.",
                          });
                        } else {
                          return response.status(OK).json({
                            message: "Lab deleted successfully.",
                          });
                        }
                      });
                    }
                  }
                );
              }
            }
          }
        }
      );
    }
  },

  createUnit: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    const user = request.user;

    try {
      if (!user) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
      }
      const uuid = crypto.randomUUID();
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

      const { labID } = request.params;
      const { heading, description, tasks } = request.body;

      if (!heading || !description || !tasks) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing." });
      }

      if (!labID) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing. " });
      }
      const lab = await LabModel.findOne({ id: sanitize(labID) });

      if (!lab) {
        return response
          .status(NOT_FOUND)
          .json({ message: "Lab ID not found." });
      }
      // unitInfo.tasks = unitInfo.tasks || [];
      const newUnit = new UnitModel({
        heading: sanitize(heading),
        description: sanitize(description),
        unitID: uuid,
      });
      tasks.map((task: any) => {
        console.log(task);

        const newTask = new TaskModel({
          question: task.question,
          answer: task.answer,
          // isAnswerRequired: task.isAnswerRequired,
          // isCaseSensitive: task.isCaseSensitive,
        });
        newTask.save();
        newUnit.tasks.push(newTask._id);
      });
      setTimeout(() => {
        newUnit.save();

        lab.details.push(newUnit._id);
        lab.save();

        return response.status(OK).json({
          message: "Unit added successfully",
        });
      }, 1000);
    } catch (error) {
      if (error) {
        return response
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error occurred. Please try again." });
      }
    }
  },

  editUnit: async (request: IGetUserAuthInfoRequest | any, response: any) => {
    const user = request.user;
    try {
      if (!user) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
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
      const { id, description, title } = request.body;
      if (!id || !description || !title) {
        return response.status(BAD_REQUEST).json({
          message: "Required field(s) missing.",
        });
      }

      const unitInDB: any = await UnitModel.findOne({ _id: sanitize(id) });
      if (!unitInDB) {
        return response.status(NOT_FOUND).json({
          message: "Unable to find a section with the specified ID.",
        });
      }
      unitInDB.heading = sanitize(title);
      unitInDB.description = sanitize(description);
      unitInDB.save();
      return response.status(OK).json({
        message: "Update successful.",
      });
    } catch (error) {
      if (error) {
        return response
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error occurred. Please try again." });
      }
    }
  },

  deleteUnit: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    const user = request.user;
    try {
      if (!user) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
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

      const { unitID } = request.body;
      const unitInDB: any = await UnitModel.findOne({ _id: sanitize(unitID) });
      if (!unitInDB) {
        return response.status(NOT_FOUND).json({
          message: "Unable to find a section with the specified ID.",
        });
      }
      if (!unitID) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing." });
      }
      unitInDB.deleteOne();
      return response.status(OK).json({
        message: "Unit deleted successfully.",
      });
    } catch (error) {
      if (error) {
        return response
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error occurred. Please try again." });
      }
    }
  },

  createTask: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    const user = request.user;
    console.log(request.body);
    try {
      if (!user) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
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
      const { unitID } = request.params;
      const { question, answer } = request.body;

      if (!unitID) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing." });
      }
      const unit = await UnitModel.findOne({ _id: sanitize(unitID) });
      if (!unit) {
        return response.status(NOT_FOUND).json({ message: "Unit not found." });
      }

      const newTask = new TaskModel({
        question: sanitize(question),
        answer: sanitize(answer),
        // isAnswerRequired: taskInfo.isAnswerRequired,
        // isCaseSensitive: taskInfo.isCaseSensitive,
      });

      newTask.save();
      unit.tasks.push(newTask._id);
      unit.save();
      return response.status(OK).json({
        message: "Task added successfully.",
      });
    } catch (error) {
      if (error) {
        return response
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error occurred. Please try again." });
      }
    }
  },

  editTask: async (
    request: IGetUserAuthInfoRequest | any,
    response: Response
  ) => {
    const user = request.user;
    try {
      if (!user) {
        return response
          .status(UNAUTHORIZED)
          .json({ message: "Unauthorized. Kindly login to continue." });
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

      const { question, _id, answer } = request.body;
      if (!question || !_id || !answer) {
        return response
          .status(BAD_REQUEST)
          .json({ message: "Required field(s) missing. " });
      }
      const task: any = await TaskModel.findOne({ _id });
      if (!task) {
        return response.status(NOT_FOUND).json({ message: "task not found." });
      }

      task.answer = sanitize(answer);
      task.question = sanitize(question);
      task.save();
      return response.status(200).json({ message: "task updated" });
    } catch (error) {
      if (error) {
        return response
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error occurred. Please try again." });
      }
    }
  },

  deleteTask: (request: IGetUserAuthInfoRequest | any, response: Response) => {
    const user = request.user;
    if (!user) {
      return response.status(UNAUTHORIZED).json({
        message: "Unauthorized. Kindly login to continue.",
      });
    } else {
      UserModel.findOne(
        { username: sanitize(user.username) },
        (err: any, userInDB: any) => {
          if (err) {
            return response.status(INTERNAL_SERVER_ERROR).json({
              message: "An error occurred. Please try again.",
            });
          } else if (!userInDB) {
            return response.status(UNAUTHORIZED).json({
              message: "Unauthorized. Kindly login to continue.",
            });
          } else {
            if (userInDB.role !== "admin") {
              return response.status(FORBIDDEN).json({
                message: "You are not authorized to perform this operation.",
              });
            } else {
              const { taskID } = request.body;
              if (!taskID) {
                return response.status(BAD_REQUEST).json({
                  message: "Required field(s) missing.",
                });
              } else {
                TaskModel.findOne(
                  { _id: sanitize(taskID) },
                  (err: any, taskInDB: any) => {
                    if (err) {
                      return response.status(INTERNAL_SERVER_ERROR).json({
                        message: "An error occurred. Please try again.",
                      });
                    } else if (!taskInDB) {
                      return response.status(NOT_FOUND).json({
                        message:
                          "Unable to find a matching task with the specified ID.",
                      });
                    } else {
                      taskInDB.deleteOne((err: any) => {
                        if (err) {
                          return response.status(INTERNAL_SERVER_ERROR).json({
                            message: "An error occurred. Please try again.",
                          });
                        } else {
                          return response.status(OK).json({
                            message: "Task deleted successfully",
                          });
                        }
                      });
                    }
                  }
                );
              }
            }
          }
        }
      );
    }
  },

  getUnits: async (
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
      // const {unitNumber} = request.body
      // const units = await UnitModel.find().populate('tasks').exec()
      const units = await UnitModel.find();
      return response.status(OK).json(units);
    } catch (error) {
      console.log(error);
    }
  },

  getSingleUnit: async (
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
      const { id } = request.params;
      const unit = await UnitModel.findOne({ _id: id })
        .populate("tasks")
        .exec();

      return response.status(OK).json(unit);
    } catch (error) {}
  },
  getTask: async (
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

      const { id } = request.params;
      const task = await TaskModel.findOne({ _id: id });
      if (!task) {
        return response.status(NOT_FOUND).json({ message: "task not found" });
      }

      return response.status(200).json(task);
    } catch (error) {}
  },
};
