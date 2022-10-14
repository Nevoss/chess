import { Middleware } from "redux";
import { RootState } from "../../store";
import { actions, selectors } from "./index";
import { actions as commonActions } from "../common/index";
import { actions as gameActions } from "../game/index";

export const selectPieceMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (!actions.selectPiece.match(action)) {
      return;
    }

    if (!selectors.selectCanSelectPiece(getState(), action.payload)) {
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

export const moveSelectedPieceMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (!actions.moveSelectedPiece.match(action)) {
      return;
    }

    const piece = selectors.selectSelectedPiece(getState());

    if (!piece) {
      dispatch(
        commonActions.error({
          actionType: action.type,
          message: "You can't move a piece that is not selected",
        })
      );

      return;
    }

    dispatch(gameActions.movePiece(piece.id, action.payload));
  };
