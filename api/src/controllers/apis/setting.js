import jwt from 'jsonwebtoken';
import { SettingModel, UserModel } from '../../models';

import { Message } from '../../common';

import { Types } from 'mongoose';

const settingView = async (req, res) => {
  try {
    const result = await SettingModel.find({});
    return res.status(200).json({
      success: true,
      message: Message.ViewSuccess.replace(':item', 'Setting'),
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

const updateSetting = async (req, res) => {
  try {
    const {
      params: { id },
      body,
      currentUser,
    } = req;
    const {
      websiteUrl,
      youtubeUrl,
      linkedinUrl,
      twitterUrl,
      orgName,
      email = [],
    } = body;
    let { removeEmail = [] } = body;
    removeEmail = removeEmail.filter((item) => !email.includes(item));
    if (currentUser.role !== 'Admin') {
      return res.status(400).json({
        message: Message.notPermitted.replace(':item', 'Setting'),
        success: false,
      });
    }
    const setting = await SettingModel.findOne({ _id: id }, { _id: 1 });
    if (!setting) {
      return res.status(404).json({
        message: Message.NotFound.replace(':item', 'Data'),
        success: false,
      });
    }
    const data = {
      websiteUrl,
      youtubeUrl,
      linkedinUrl,
      twitterUrl,
      orgName,

      modifiedBy: currentUser.userId,
    };
    const result = await SettingModel.updateOne(
      { _id: id },
      {
        $set: data,
        $addToSet: {
          email,
        },
      },
      { runValidators: true } // For run enum mongoose validation.
    );
    const removeEmailData = await SettingModel.updateOne(
      { _id: id },
      {
        $pull: { email: { $in: removeEmail } },
      }
    );
    return res.status(200).json({
      success: true,
      message: Message.UpdateSuccess.replace(':item', 'Setting'),
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
export default {
  settingView,

  updateSetting,
};
