import { Middleware } from "redux";
import { RootState } from "../../store";
import { selectors, actions } from "./index";
import { actions as commonActions } from "../common/index";
import { isPositionInsidePositionsCollection } from "../../core/game/position";

export const movePiecesMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (!actions.movePiece.match(action)) {
      return;
    }

    const state = getState();

    if (
      !isPositionInsidePositionsCollection(
        action.payload.position,
        selectors.selectPieceOptionalMovesById(state, action.payload.id)
      )
    ) {
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

    if (!selectors.selectPieceById(state, action.payload.id).hasMoved) {
      dispatch(actions.markPieceAsMoved(action.payload.id));
    }

    dispatch(actions.toggleTurn());
  };
