import connectToDB from "@/config/db";
import model from "@/models/todo";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    connectToDB();

    const todoDetails =await model.findOne({ _id: req.query.id });
    return res.json({data:todoDetails})
  }
}
