import { JSONSchemaType } from "ajv";

import { ISignUp } from "./SignUp";

export const userSchema: JSONSchemaType<ISignUp> = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
  },

  required: ["email", "firstName", "lastName"],
  additionalProperties: false,
};
