import jwt from 'jsonwebtoken';
import { UserModel } from '../../models';

import { Message } from '../../common';
import {
  generatePassword,
  generateSalt,
  encryptPassword,
  comparePassword,
  Email,
  AvailableTemplates,
  ValidationFormatter,
  CheckValidation,
} from '../../utils';
import { Types } from 'mongoose';

const login = async (req, res) => {
  const errors = CheckValidation(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false,
    });
  }
  try {
    const { email, password } = req.body;

    let userCheck = await UserModel.findOne({
      email: email.trim().toLowerCase(),
      isDeleted: false,
    });
    if (!userCheck) {
      return res.status(404).json({
        success: false,
        message: Message.NotFound.replace(':item', 'User'),
      });
    }
    if (userCheck.status === 'Inactive') {
      return res.status(400).json({
        success: false,
        message: Message.AccountDeactivated,
      });
    }
    if (!comparePassword(password, userCheck.password)) {
      return res.status(400).json({
        success: false,
        message: Message.PasswordNotMatched,
      });
    }
    let token;
    if (userCheck) {
      token = jwt.sign(
        {
          userId: userCheck._id,
          email,
          role: userCheck.role,
          reportingPerson: userCheck.reportingPerson,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '5d',
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: Message.LoginSuccess,
      data: userCheck,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};
/**
 * Create a record
 * @param { req, res }
 * @returns JsonResponse
 */
const addUser = async (req, res) => {
  try {
    const { body, currentUser } = req;
    const {
      firstName,
      lastName,
      middleName,
      email,
      role,
      department,
      reportingPerson,
      gender,
      designation,
    } = body;
    const users = await UserModel.findOne({
      email: email.trim().toLowerCase(),
      role,
      isDeleted: false,
    });
    if (users) {
      return res.status(400).json({
        code: 400,
        message: Message.AlreadyExist.replace(':item', 'User'),
        success: false,
      });
    }
    const salt = generateSalt();
    let password = generatePassword();
    let encryptedPassword = encryptPassword(password, salt);
    // let y = comparePassword(pass, x);
    const data = {
      firstName,
      lastName,
      middleName,
      email: email.trim().toLowerCase(),
      role,
      reportingPerson,
      gender,
      designation,
      department,
      password: encryptedPassword,
      createdBy: currentUser.userId,
    };
    const userData = new UserModel(data);
    const result = await userData.save();
    try {
      const emailSend = new Email();
      await emailSend.setTemplate(AvailableTemplates.EMPLOYEE_REGISTRATION, {
        fullName: `${userData.firstName} ${userData.lastName} `,
        email,
        password,
      });
      await emailSend.sendEmail(userData.email);
    } catch (error) {
      return res.status(201).json({
        message: error.message,
        isAdded: true,
      });
    }
    return res.status(200).json({
      success: true,
      message: Message.AddSuccess.replace(':item', 'User'),
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { body } = req;
    const { email } = body;
    const users = await UserModel.findOne({
      email: email.trim().toLowerCase(),
      isDeleted: false,
    });
    if (!users) {
      return res.status(400).json({
        message: Message.NotFound.replace(':item', 'Email'),
        success: false,
      });
    }
    const salt = generateSalt();
    let password = generatePassword();
    let encryptedPassword = encryptPassword(password, salt);
    // let y = comparePassword(pass, x);
    await UserModel.updateOne(
      { _id: users._id },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    try {
      const emailSend = new Email();
      await emailSend.setTemplate(AvailableTemplates.FORGOT_PASSWORD, {
        fullName: `${users.firstName} ${users.lastName} `,
        email,
        password,
      });
      await emailSend.sendEmail(users.email);
    } catch (error) {
      return res.status(201).json({
        message: error.message,
        isAdded: true,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'A Mail send to you, Please check Your Email',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};

/**
 * Get only single record
 * @param { req, res }
 * @returns JsonResponse
 */
const userList = async (req, res, next) => {
  try {
    const { query } = req;

    const limit = query.limit ? parseInt(query.limit, 10) : 10;
    const page = query.page ? parseInt(query.page, 10) : 1;
    const skip = (page - 1) * limit;
    const { search, gender, status, fromDate, toDate } = query;

    let dateCondition = {};
    if (fromDate != null && toDate != null) {
      dateCondition = {
        $gte: new Date(
          new Date(fromDate).setUTCHours(
            parseInt('00', 10, '00', 10, '00', 10, '000', 10)
          )
        ),
        $lte: new Date(new Date(toDate).setUTCHours(23, 59, 59, 999)),
      };
    }

    let condition = { isDeleted: false };
    if (search) {
      condition = {
        ...condition,
        $or: [
          {
            firstName: {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
          {
            fullName: {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
          {
            lastName: {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
          {
            email: {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
          {
            department: {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
        ],
      };
    }

    if (gender) {
      condition = {
        ...condition,
        gender,
      };
    }
    if (status) {
      condition = {
        ...condition,
        status,
      };
    }

    if (fromDate && toDate) {
      condition = {
        ...condition,
        createdAt: dateCondition,
      };
    }

    const data = await UserModel.aggregate([
      {
        $addFields: {
          fullName: {
            $concat: [
              '$firstName',
              ' ',
              { $ifNull: ['$middleName', ''] },
              ' ',
              '$lastName',
            ],
          },
        },
      },

      {
        $match: condition,
      },

      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalRecords = await UserModel.aggregate([
      {
        $addFields: {
          fullName: {
            $concat: [
              '$firstName',
              ' ',
              { $ifNull: ['$middleName', ''] },
              ' ',
              '$lastName',
            ],
          },
        },
      },

      {
        $match: condition,
      },

      {
        $count: 'count',
      },
    ]);

    return res.status(200).json({
      success: true,
      message: Message.ListFetchSuccess.replace(':item', 'User'),
      data,
      totalRecords:
        totalRecords && totalRecords.length ? totalRecords[0].count : 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,

      error: error.message,
    });
  }
};

const userView = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    console.log(id);
    let condition = { isDeleted: false, _id: Types.ObjectId(id) };
    const data = await UserModel.aggregate([
      {
        $match: condition,
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              '$firstName',
              ' ',
              { $ifNull: ['$middleName', ''] },
              ' ',
              '$lastName',
            ],
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: Message.ViewSuccess.replace(':item', 'User'),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,

      error: error.message,
    });
  }
};

const reportingPerson = async (req, res) => {
  try {
    let condition = { isDeleted: false, status: 'Active' };
    const data = await UserModel.aggregate([
      {
        $match: condition,
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              '$firstName',
              ' ',
              { $ifNull: ['$middleName', ''] },
              ' ',
              '$lastName',
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          label: '$fullName',
          value: '$_id',
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: Message.ListFetchSuccess.replace(':item', 'Reporting Person'),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,

      error: error.message,
    });
  }
};
/**
 * update a record
 * @param { req, res }
 * @returns JsonResponse
 */
const updateUser = async (req, res) => {
  try {
    const {
      params: { id },
      body,
      currentUser,
    } = req;
    const {
      firstName,
      lastName,
      middleName,
      role,
      department,
      reportingPerson,
      gender,
    } = body;
    const user = await UserModel.findOne({ _id: id }, { _id: 1 });
    if (!user) {
      return res.status(404).json({
        message: Message.NotFound.replace(':item', 'User'),
        success: false,
      });
    }
    const data = {
      firstName,
      lastName,
      middleName,
      role,
      gender,
      department,
      modifiedBy: currentUser.userId,
    };
    const result = await UserModel.updateOne(
      { _id: id },
      {
        $set: data,
        $addToSet: {
          reportingPerson,
        },
      },
      { runValidators: true } // For run enum mongoose validation.
    );
    // const userData = new UserModel(data);
    // const result = await userData.updateOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: Message.UpdateSuccess.replace(':item', 'User'),
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { body, currentUser } = req;
    const {
      firstName,
      lastName,
      middleName,
      role,
      department,
      reportingPerson,
      gender,
    } = body;
    const user = await UserModel.findOne(
      { _id: currentUser.userId },
      { _id: 1 }
    );
    if (!user) {
      return res.status(404).json({
        message: Message.NotFound.replace(':item', 'User'),
        success: false,
      });
    }
    const data = {
      firstName,
      lastName,
      middleName,
      role,

      gender,
      department,
      modifiedBy: currentUser.userId,
    };
    const result = await UserModel.updateOne(
      { _id: currentUser.userId },
      {
        $set: data,
        $addToSet: {
          reportingPerson,
        },
      },
      { runValidators: true } // For run enum mongoose validation.
    );

    return res.status(200).json({
      success: true,
      message: Message.UpdateSuccess.replace(':item', 'Profile'),
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};

const me = async (req, res) => {
  try {
    const { currentUser } = req;

    const data = await UserModel.findOne({ _id: currentUser.userId });
    if (!data) {
      return res.status(404).json({
        message: Message.NotFound.replace(':item', 'User'),
      });
    }

    return res.status(200).json({
      success: true,
      message: Message.ViewSuccess.replace(':item', 'Profile'),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const {
      params: { id },
      body: { status },
      currentUser,
    } = req;

    const userData = await UserModel.findOne({ _id: id }, { _id: 1 });
    if (!userData) {
      return res.status(404).json({
        message: Message.NotFound.replace(':item', 'User'),
      });
    }
    const data = await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          status,
          modifiedBy: currentUser.userId,
        },
      },
      { runValidators: true } // For run enum mongoose validation.
    );

    return res.status(200).json({
      success: true,
      message: Message.UpdateStatusSuccess.replace(':item', 'User'),
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,

      error: error.message,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const {
      body: { oldPassword, newPassword },
      currentUser,
    } = req;
    const user = await UserModel.findOne({
      _id: currentUser.userId,
    });
    if (!comparePassword(oldPassword, user.password)) {
      return res.status(400).json({
        success: false,
        message: Message.PasswordNotMatched,
      });
    }
    const salt = generateSalt();
    let password = encryptPassword(newPassword, salt);

    const result = await UserModel.updateOne(
      {
        _id: currentUser.userId,
      },
      {
        $set: {
          password,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: Message.PasswordChanged,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};

const userDelete = async (req, res) => {
  try {
    const {
      params: { id },
      currentUser,
    } = req;
    const result = await UserModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          isDeleted: true,
          modifiedBy: currentUser.userId,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: Message.DeleteSuccess.replace(':item', 'User'),
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,

      error: error,
    });
  }
};

/**
 * Export as a single common js module
 */
export default {
  login,
  me,
  addUser,
  userList,
  userView,
  userDelete,
  changePassword,
  updateUser,
  reportingPerson,
  updateProfile,
  updateUserStatus,
  forgotPassword,
};
