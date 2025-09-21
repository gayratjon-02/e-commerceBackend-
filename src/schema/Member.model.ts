import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/types/enums/member.enum";

// Schema hosil qilishni ikkita usuli mavjud
// 1. Schema first & 2. Code first
// biz burak applicationimizdda 1. Schema first
// usulidan foydalanamiz

const memberSchema = new Schema({
  memberType: {
    type: String,
    enum: MemberType,
    default: MemberType.USER,
  },

  memberStatus: {
    type: String,
    enum: MemberStatus,
    default: MemberStatus.ACTIVE,
  },

  memberNick: {
    type: String,
    index: { unique: true, sparse: true },
    required: true,
  },

  memberPhone: {
    type: String,
    index: { unique: true, sparse: true },
    required: true,
  },

  memberPassword: {
    type: String,
    select: false,
    required: true,
  },

  memberAddress: {
    type: String,
  },

  memberDesc: {
    type: String,
  },

  memberImage: {
    type: String,
  },

  memberPoints: {
    type: Number,
    default: 0,
  },


}, {timestamps: true}); //  {timestamps: true} --  bu orqali biz databaseda  createdAt , updatedAt malumotlarini qoyib beradi


export default mongoose.model("Member", memberSchema)
