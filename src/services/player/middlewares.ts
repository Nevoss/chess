import { Middleware } from "redux";
import { RootState } from "../../store";
import { selectCanSelectPiece } from "./selectors";
import { actions } from "./index";
import { actions as commonActions } from "../common/index";

export const validateSelectPiece: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (!actions.selectPiece.match(action)) {
      return;
    }

    if (!selectCanSelectPiece(getState(), action.payload)) {
      dispatch(
        commonActions.error({
          actionType: action.type,
          message: "You can't select a piece that is not yours",
        })
      );

      return;
    }

    dispatch(actions.setSelectedPieceId(action.payload));
  };
