import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import AJV from "ajv";

import { userSchema, ISignUp } from "./types/SignUp";

export const app: Application = express();

app.use(helmet());

app.use(express.json());

app.use(cors({ origin: "your client url" }));

app.post("/signup", async (request: Request, response: Response) => {
  try {
    const signUpRequestBody: ISignUp = request.body;

    const ajv = new AJV();

    const validateSignUpRequestBody = ajv.compile(userSchema);

    const isSignUpRequestBodyValid =
      validateSignUpRequestBody(signUpRequestBody);

    if (!isSignUpRequestBodyValid) {
      return response.status(400).json({
        isSuccess: false,
        message: validateSignUpRequestBody.errors,
      });
    }

    return response.status(200).json({
      isSuccess: true,
      message: "Successfully created user",
    });
  } catch (error) {
    return response.status(500).json({
      isSuccess: false,
      message: "Internal server error",
    });
  }
});
