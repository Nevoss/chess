import { createAction } from "@reduxjs/toolkit";

export const error = createAction(
  "common/error",
  ({ actionType, message }: { actionType: string; message: string }) => ({
    payload: { actionType, message },
  })
);
