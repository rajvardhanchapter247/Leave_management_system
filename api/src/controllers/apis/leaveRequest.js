import { UserModel, LeaveRequestModel, SettingModel } from '../../models';

import { Message, Constant } from '../../common';
import { Email, AvailableTemplates } from '../../utils';
import { Types } from 'mongoose';

/**
 * Create a record
 * @param { req, res }
 * @returns JsonResponse
 */
const addLeaveRequest = async (req, res) => {
  try {
    const { body, currentUser } = req;
    const { datesToRequest, reason, leaveType } = body;

    const user = await UserModel.findOne({
      _id: currentUser.userId,
      isDeleted: false,
      status: 'Active',
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: Message.AccountDeactivated,
        success: false,
      });
    }
    const data = {
      datesToRequest,
      reason,
      // leaveType,
      userId: currentUser.userId,
      createdBy: currentUser.userId,
    };

    const leaveRequestData = new LeaveRequestModel(data);
    const result = await leaveRequestData.save();
    try {
      const reportingPerson = await UserModel.find(
        {
          _id: { $in: currentUser.reportingPerson },
          isDeleted: false,
          status: 'Active',
        },
        { email: 1, _id: 0 }
      );
      let reportingPersonEmail = [];
      for (const iterator of reportingPerson) {
        await reportingPersonEmail.push(iterator.email.toString());
      }

      const setting = await SettingModel.find({});
      let hrEmail = setting[0].email;
      console.log('hrEmail', hrEmail);
      const emailSend = new Email();
      await emailSend.setCC(reportingPersonEmail);
      await emailSend.setTemplate(AvailableTemplates.LEAVE_REQUEST, {
        name: `${user.firstName} ${user.lastName} `,
        reason,
        datesToRequest,
      });
      await emailSend.sendEmail(hrEmail);
    } catch (error) {
      return res.status(201).json({
        message: error.message,
        isAdded: true,
      });
    }
    return res.status(200).json({
      success: true,
      message: Message.AddSuccess.replace(':item', 'Leave Request'),
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

/**
 * Get only single record
 * @param { req, res }
 * @returns JsonResponse
 */
const leaveRequestList = async (req, res, next) => {
  try {
    const { query } = req;

    const limit = query.limit ? parseInt(query.limit, 10) : 10;
    const page = query.page ? parseInt(query.page, 10) : 1;
    const skip = (page - 1) * limit;
    const { search, status, fromDate, toDate } = query;

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
            'user.firstName': {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
          {
            fullName: {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
          {
            'user.lastName': {
              $regex: new RegExp(search.trim(), 'i'),
            },
          },
        ],
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

    const data = await LeaveRequestModel.aggregate([
      {
        $lookup: {
          from: 'users',
          as: 'user',
          foreignField: '_id',
          localField: 'userId',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              '$user.firstName',
              ' ',
              { $ifNull: ['$user.middleName', ''] },
              ' ',
              '$user.lastName',
            ],
          },
        },
      },

      {
        $match: condition,
      },
      {
        $project: {
          _id: 1,
          datesToRequest: 1,
          reason: 1,
          status: 1,
          fullName: 1,
        },
      },
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalRecords = await LeaveRequestModel.aggregate([
      {
        $lookup: {
          from: 'users',
          as: 'user',
          foreignField: '_id',
          localField: 'userId',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              '$user.firstName',
              ' ',
              { $ifNull: ['$user.middleName', ''] },
              ' ',
              '$user.lastName',
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
      message: Message.ListFetchSuccess.replace(':item', 'Leave Request'),
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

const leaveRequestView = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    let condition = { _id: Types.ObjectId(id) };
    const data = await LeaveRequestModel.aggregate([
      {
        $lookup: {
          from: 'users',
          as: 'user',
          foreignField: '_id',
          localField: 'userId',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              '$user.firstName',
              ' ',
              { $ifNull: ['$user.middleName', ''] },
              ' ',
              '$user.lastName',
            ],
          },
        },
      },

      {
        $match: condition,
      },
      {
        $project: {
          _id: 1,
          datesToRequest: 1,
          reason: 1,
          status: 1,
          fullName: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: Message.ViewSuccess.replace(':item', 'Leave Request'),
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

const leaveRequestByUser = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    let condition = { userId: Types.ObjectId(id) };
    const data = await LeaveRequestModel.aggregate([
      {
        $lookup: {
          from: 'users',
          as: 'user',
          foreignField: '_id',
          localField: 'userId',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              '$user.firstName',
              ' ',
              { $ifNull: ['$user.middleName', ''] },
              ' ',
              '$user.lastName',
            ],
          },
        },
      },

      {
        $match: condition,
      },
      {
        $project: {
          _id: 1,
          datesToRequest: 1,
          reason: 1,
          status: 1,
          fullName: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: Message.ListFetchSuccess.replace(':item', 'Leave Request'),
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
const myLeaveRequest = async (req, res) => {
  try {
    const { currentUser } = req;

    let condition = { userId: Types.ObjectId(currentUser.userId) };
    const data = await LeaveRequestModel.aggregate([
      {
        $lookup: {
          from: 'users',
          as: 'user',
          foreignField: '_id',
          localField: 'userId',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              '$user.firstName',
              ' ',
              { $ifNull: ['$user.middleName', ''] },
              ' ',
              '$user.lastName',
            ],
          },
        },
      },

      {
        $match: condition,
      },
      {
        $project: {
          _id: 1,
          datesToRequest: 1,
          reason: 1,
          status: 1,
          fullName: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: Message.ListFetchSuccess.replace(':item', 'Leave Request'),
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

const updateLeaveStatus = async (req, res) => {
  try {
    const {
      params: { id },
      body: { status },
      currentUser,
    } = req;

    if (currentUser.role === 'Employee') {
      return res.status(400).json({
        message: Message.notPermitted.replace(':item', 'Leave Status'),
        success: false,
      });
    }
    const data = await LeaveRequestModel.updateOne(
      { _id: id },
      {
        $set: {
          status,
          modifiedBy: currentUser.userId,
        },
      },
      { runValidators: true } // For run enum mongoose validation.
    );

    try {
      const leaveRequestData = await LeaveRequestModel.findOne({ _id: id });
      const userData = await UserModel.findOne({
        _id: leaveRequestData.userId,
      });
      const reportingPerson = await UserModel.find(
        {
          _id: { $in: userData.reportingPerson },
          isDeleted: false,
          status: 'Active',
        },
        { email: 1, _id: 0 }
      );
      let reportingPersonEmail = [];
      for (const iterator of reportingPerson) {
        await reportingPersonEmail.push(iterator.email.toString());
      }

      const emailSend = new Email();
      await emailSend.setCC(reportingPersonEmail);

      await emailSend.setTemplate(AvailableTemplates.LEAVE_STATUS, {
        name: `${userData.firstName} ${userData.lastName} `,
        status,
        reason: leaveRequestData.reason,
        datesToRequest: leaveRequestData.datesToRequest,
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
      message: Message.UpdateSuccess.replace(':item', 'Leave Request status'),
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

/**
 * Export as a single common js module
 */
export default {
  addLeaveRequest,
  leaveRequestList,
  leaveRequestView,
  updateLeaveStatus,
  leaveRequestByUser,
  myLeaveRequest,
};
