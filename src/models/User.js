const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    displayName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    fields: {
      description: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      profileImageUrl: {
        type: String,
      },
      posts: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Post",
        },
      ],
      subscribers: [
        {
          type: mongoose.Types.ObjectId,
        },
      ],
      verifiedType: {
        type: String,
        enum: ["admin", "publisher", "user"],
        default: "user",
      },
      blockedUser: [
        {
          type: mongoose.Types.ObjectId,
          default: null,
        },
      ],
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    telNo: {
      type: String,
    },
    showActivityStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "fields.createdAt",
    },
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
