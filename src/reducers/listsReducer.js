import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 6;

const initialState = [
  {
    title: "list 1",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "the static list and static card",
      },
      {
        id: `card-${1}`,
        text: "this is the second card ",
      },
    ],
  },
  {
    title: "list 2",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "this is my first reducer",
      },
      {
        id: `card-${3}`,
        text: "this is the second reducer ",
      },
      {
        id: `card-${4}`,
        text: "this is the 3rd reducer",
      },
      {
        id: `card-${5}`,
        text: "Anything after this is dynamic",
      },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;
      console.log("action received", action);
      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return newState;
    }
    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
      } = action.payload;
      const newState = [...state];

      // dragging lists around
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }
      if (droppableIdStart === droppableIdEnd) {
        // same list dropping
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      // other list dropping
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.id);

        const card = listStart.cards.splice(droppableIndexStart, 1);

        const listEnd = state.find((list) => droppableIdEnd === list.id);

        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;

    default:
      return state;
  }
};

export default listsReducer;
