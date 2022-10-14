import { Middleware } from "redux";
import { RootState } from "../../store";
import { selectors, actions } from "./index";
import { actions as commonActions } from "../common/index";

export const movePiecesMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (!actions.movePiece.match(action)) {
      return;
    }

    const state = getState();

    if (!selectors.selectIsOptionalMoveForPieceId(state, action.payload)) {
      dispatch(
        commonActions.error({
          actionType: action.type,
          message: "You can't move a piece to this position",
        })
      );
    }

    const opponentPiece = selectors.selectPieceByPosition(state, action.payload.position);

    if (opponentPiece) {
      dispatch(actions.removePiecePosition(opponentPiece.id));
    }

    dispatch(actions.updatePiecePosition(action.payload));
  };
