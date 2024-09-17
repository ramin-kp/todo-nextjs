import connectToDB from "@/config/db";
import model from "@/models/user";
import { comparePassword, generateToken } from "@/utils/auth";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectToDB();
    const { identifier, password } = req.body;
    if (
      !identifier.trim() ||
      identifier.length < 3 ||
      !password.trim() ||
      password.length < 8
    ) {
      return res
        .status(422)
        .json({ message: "اطلاعات وارد شده صحیح نمی باشد" });
    }

    const user = await model.findOne(
      {
        $or: [{ username: identifier }, { email: identifier }],
      },
      "-__v"
    );

    if (!user) {
      return res
        .status(422)
        .json({ message: "نام کاربری یا رمز عبور وارد شده صحیح نمی‌باشد" });
    }
    const verifiedPassword = await comparePassword(password, user.password);

    if (!verifiedPassword) {
      return res
        .status(422)
        .json({ message: "نام کاربری یا رمز عبور وارد شده صحیح نمی‌باشد" });
    }
    const generatedToken = generateToken({ email: user.email });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("Token", generatedToken, {
          httpOnly: true,
          path: "/",
          maxAge: 24 * 60 * 60,
        })
      )
      .status(200)
      .json({ message: "با موفقیت وارد حساب کاربری خود شدید" });
  } catch (error) {
    return res.status(500).json({ message: "مشکلی سمت سرور پیش آمده", error });
  }
}
