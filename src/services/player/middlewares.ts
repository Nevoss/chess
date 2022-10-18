import { Middleware } from "redux";
import { RootState } from "../../store";
import { actions, selectors } from "./index";
import { actions as commonActions } from "../common/index";
import { actions as gameActions, selectors as gameSelectors } from "../game/index";

export const togglePieceSelectionMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (!actions.togglePieceSelection.match(action)) {
      return;
    }

    const state = getState();

    if (selectors.selectSelectedPieceId(state) === action.payload) {
      dispatch(actions.removeSelection());

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

    const state = getState();

    const piece = selectors.selectSelectedPiece(state);

    if (!piece) {
      dispatch(
        commonActions.error({
          actionType: action.type,
          message: "You can't move a piece that is not selected",
        })
      );

      return;
    }

    const isPlayerTurn = gameSelectors.selectTurn(state) === selectors.selectColor(state);

    if (!isPlayerTurn) {
      dispatch(
        commonActions.error({
          actionType: action.type,
          message: "You can't move a piece when it's not your turn",
        })
      );

      return;
    }

    const isPlayerPiece = piece.color === selectors.selectColor(state);

    if (!isPlayerPiece) {
      dispatch(
        commonActions.error({
          actionType: action.type,
          message: "You can't move a piece that is not yours",
        })
      );

      return;
    }

    dispatch(gameActions.movePiece(piece.id, action.payload));
    dispatch(actions.removeSelection());
  };
