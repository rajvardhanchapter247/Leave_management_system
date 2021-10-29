import { SettingModel, UserModel, LeaveRequestModel } from '../../models';

import { Message, Constant } from '../../common';
import { CheckValidation, ValidationFormatter } from '../../utils';
import { Types } from 'mongoose';
import constant from '../../common/constant';

/**
 ---------------------------
         DASHBOARD
 ---------------------------
 */

/**
 * @api {get} dashboard/  Dashboard details
 * @apiName settingView
 * @apiGroup Setting
 * @apiPermission admin
 * @apiDescription To fetch a Setting details
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *    message:"Setting details fetched successfully",
 *    responseCode: 200
 *    data: result
 *    success: true
 * }
 * @apiErrorExample {json} List error

 *    HTTP/1.1 500 Internal Server Error
 */
const userAndLeaveCount = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments({
      isDeleted: false,
    });
    const totalEmployees = await UserModel.countDocuments({
      isDeleted: false,
      status: 'Active',
      role: 'Employee',
    });
    const totalAdmin = await UserModel.countDocuments({
      role: 'Admin',
      status: 'Active',
      isDeleted: false,
    });
    const pendingLeaves = await LeaveRequestModel.countDocuments({
      status: 'Pending',
    });
    const approvedLeaves = await LeaveRequestModel.countDocuments({
      status: 'Approved',
    });
    const disapprovedLeaves = await LeaveRequestModel.countDocuments({
      status: 'Disapproved',
    });

    const paidLeaves = constant.paidLeaves;
    const data = {
      totalUsers,
      totalEmployees,
      totalAdmin,
      pendingLeaves,
      approvedLeaves,
      disapprovedLeaves,
      paidLeaves,
    };
    return res.status(200).json({
      success: true,
      message: Message.ListFetchSuccess.replace(
        ':item',
        'User and Leave Count'
      ),
      error: error.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Message.UnexpectedError,
      error: error.message,
    });
  }
};

export default {
  userAndLeaveCount,
};
