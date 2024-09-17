import connectToDB from "@/config/db";
import todosModel from "@/models/todo";
import usersModel from "@/models/user";
import { verifyToken } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      connectToDB();
      const { title, body, date, priority, isComplete } = req.body;
      if (
        !title.trim() ||
        title.length < 3 ||
        title.length > 25 ||
        !body.trim() ||
        body.length < 3 ||
        body.length > 25 ||
        !date.trim() ||
        !date.length ||
        !priority.trim() ||
        !priority.length ||
        !typeof isComplete === Boolean
      ) {
        return res
          .status(422)
          .json({ message: "اطلاعات وارد شده صحیح نمی‌باشد" });
      }
      const { Token } = req.cookies;
      const verifiedToken = verifyToken(Token);
      if (!Token && !verifiedToken) {
        return res
          .status(401)
          .json({ message: "شما دسترسی لازم به منبع مورد نظر را ندارید" });
      }
      const userData = await usersModel.findOne(
        { email: verifiedToken.email },
        "_id"
      );
      if (!userData) {
        return res
          .status(404)
          .json({ message: "کاربری با این ایمیل  یافت نشد" });
      }
      await todosModel.create({
        title,
        body,
        date,
        priority,
        isComplete,
        user: userData._id,
      });

      await res.status(201).json({ message: "تودو با موفقیت ثبت شد" });
      console.log("userData", userData);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "مشکلی سمت سرور رخ داده است", error });
    }
  } else if (req.method === "GET") {
    try {
      connectToDB();
      const { Token } = req.cookies;
      const verifiedToken = verifyToken(Token);
      if (!Token && !verifiedToken) {
        return res
          .status(401)
          .json({ message: "شما دسترسی لازم به منبع مورد نظر را ندارید" });
      }
      const userData = await usersModel.findOne({ email: verifiedToken.email });

      if (!userData) {
        return res
          .status(404)
          .json({ message: "کاربری با این ایمیل  یافت نشد" });
      }

      const userTodos = await todosModel.find({ user: userData._id });
      return res.status(200).json({ data: userTodos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "مشکلی سمت سرور رخ داده است", error });
    }
  }
}
