import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("Gemini key:", process.env.GEMINI_API_KEY);
 const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const symptomChecker = async (req, res) => {
  try {
    const { symptoms } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(`
A patient reports these symptoms:

${symptoms}

Give:
1. Possible diseases
2. Recommended doctor specialization
3. Recommended action
Keep response short.
`);

    res.status(200).json({
      success: true,
      response: result.response.text(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};