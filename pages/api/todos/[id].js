import connectToDB from "@/config/db";
import model from "@/models/todo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return false;
  } else if (req.method === "GET") {
    try {
      connectToDB();
      const todoDetails = await model.findOne({ _id: req.query.id });
      return res.json({ data: todoDetails });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "مشکلی سمت سرور رخ داده است", error });
    }
  } else if (req.method === "PATCH") {
    try {
      connectToDB();
      const { isComplete } = req.body;
      if (typeof isComplete !== "boolean") {
        res.status(422).json({ message: "اطلاعات وارد شده صحیح نمی باشد" });
      }
      await model.findOneAndUpdate({ _id: req.query.id }, { isComplete });

      return res.json({ message: "تودو شما با موفقیت آپدیت شد" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "مشکلی سمت سرور رخ داده است", error });
    }
  }
}
