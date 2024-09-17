import connectToDB from "@/config/db";
import usersModel from "@/models/user";
import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  const { method } = req;
  if (method !== "POST") {
    return false;
  } else {
    try {
      connectToDB();
      const { firstName, lastName, username, email, password } = req.body;
      if (
        !firstName.trim() ||
        firstName.length < 3 ||
        firstName.length > 25 ||
        !lastName.trim() ||
        lastName.length < 3 ||
        lastName.length > 25 ||
        !username.trim() ||
        username.length < 3 ||
        username.length > 25 ||
        !email.trim() ||
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
        !email.length ||
        !password.trim() ||
        password.length < 8
      ) {
        return res
          .status(422)
          .json({ message: "اطلاعات وارد شده صحیح نمی باشد" });
      }

      const isUserExist = await usersModel.findOne({
        $or: [{ email }, { username }],
      });

      if (isUserExist) {
        return res
          .status(422)
          .json({ message: "ایمیل یا نام کاربری وارد شده تکراری است" });
      }

      const users = await usersModel.find({});

      const hashedPassword = await hashPassword(password);

      await usersModel.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role: users.length > 0 ? "USER" : "ADMIN",
      });
      const generatedToken = generateToken({ email });
      res
        .setHeader(
          "Set-Cookie",
          serialize("Token", generatedToken, {
            httpOnly: true,
            path: "/",
            maxAge: 24 * 60 * 60,
          })
        )
        .status(201)
        .json({ message: "ثبت نام شما با موفقیت انجام شد" });
    } catch (error) {
      console.log("error=>", error);
      return res
        .status(500)
        .json({ message: "مشکلی سمت سرور ایجاد شده است", error });
    }
  }
};

export default handler;
