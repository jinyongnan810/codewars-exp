// https://www.codewars.com/kata/54acc128329e634e9a000362/train/javascript

const CLOSED: State = { type: "CLOSED", actions: {} };
const LISTEN: State = { type: "LISTEN", actions: {} };
const SYN_SENT: State = { type: "SYN_SENT", actions: {} };
const SYN_RCVD: State = { type: "SYN_RCVD", actions: {} };
const ESTABLISHED: State = { type: "ESTABLISHED", actions: {} };
const CLOSE_WAIT: State = { type: "CLOSE_WAIT", actions: {} };
const LAST_ACK: State = { type: "LAST_ACK", actions: {} };
const FIN_WAIT_1: State = { type: "FIN_WAIT_1", actions: {} };
const FIN_WAIT_2: State = { type: "FIN_WAIT_2", actions: {} };
const CLOSING: State = { type: "CLOSING", actions: {} };
const TIME_WAIT: State = { type: "TIME_WAIT", actions: {} };
/*
CLOSED: APP_PASSIVE_OPEN -> LISTEN
CLOSED: APP_ACTIVE_OPEN  -> SYN_SENT
LISTEN: RCV_SYN          -> SYN_RCVD
LISTEN: APP_SEND         -> SYN_SENT
LISTEN: APP_CLOSE        -> CLOSED
SYN_RCVD: APP_CLOSE      -> FIN_WAIT_1
SYN_RCVD: RCV_ACK        -> ESTABLISHED
SYN_SENT: RCV_SYN        -> SYN_RCVD
SYN_SENT: RCV_SYN_ACK    -> ESTABLISHED
SYN_SENT: APP_CLOSE      -> CLOSED
ESTABLISHED: APP_CLOSE   -> FIN_WAIT_1
ESTABLISHED: RCV_FIN     -> CLOSE_WAIT
FIN_WAIT_1: RCV_FIN      -> CLOSING
FIN_WAIT_1: RCV_FIN_ACK  -> TIME_WAIT
FIN_WAIT_1: RCV_ACK      -> FIN_WAIT_2
CLOSING: RCV_ACK         -> TIME_WAIT
FIN_WAIT_2: RCV_FIN      -> TIME_WAIT
TIME_WAIT: APP_TIMEOUT   -> CLOSED
CLOSE_WAIT: APP_CLOSE    -> LAST_ACK
LAST_ACK: RCV_ACK        -> CLOSED
*/
CLOSED.actions["APP_PASSIVE_OPEN"] = LISTEN;
CLOSED.actions["APP_ACTIVE_OPEN"] = SYN_SENT;
LISTEN.actions["RCV_SYN"] = SYN_RCVD;
LISTEN.actions["APP_SEND"] = SYN_SENT;
LISTEN.actions["APP_CLOSE"] = CLOSED;
SYN_RCVD.actions["APP_CLOSE"] = FIN_WAIT_1;
SYN_RCVD.actions["RCV_ACK"] = ESTABLISHED;
SYN_SENT.actions["RCV_SYN"] = SYN_RCVD;
SYN_SENT.actions["RCV_SYN_ACK"] = ESTABLISHED;
SYN_SENT.actions["APP_CLOSE"] = CLOSED;
ESTABLISHED.actions["APP_CLOSE"] = FIN_WAIT_1;
ESTABLISHED.actions["RCV_FIN"] = CLOSE_WAIT;
FIN_WAIT_1.actions["RCV_FIN"] = CLOSING;
FIN_WAIT_1.actions["RCV_FIN_ACK"] = TIME_WAIT;
FIN_WAIT_1.actions["RCV_ACK"] = FIN_WAIT_2;
CLOSING.actions["RCV_ACK"] = TIME_WAIT;
FIN_WAIT_2.actions["RCV_FIN"] = TIME_WAIT;
TIME_WAIT.actions["APP_TIMEOUT"] = CLOSED;
CLOSE_WAIT.actions["APP_CLOSE"] = LAST_ACK;
LAST_ACK.actions["RCV_ACK"] = CLOSED;

type Actions =
  | "APP_PASSIVE_OPEN"
  | "APP_ACTIVE_OPEN"
  | "APP_SEND"
  | "APP_CLOSE"
  | "APP_TIMEOUT"
  | "RCV_SYN"
  | "RCV_ACK"
  | "RCV_SYN_ACK"
  | "RCV_FIN"
  | "RCV_FIN_ACK";
type StateTypes =
  | "CLOSED"
  | "LISTEN"
  | "SYN_SENT"
  | "SYN_RCVD"
  | "ESTABLISHED"
  | "CLOSE_WAIT"
  | "LAST_ACK"
  | "FIN_WAIT_1"
  | "FIN_WAIT_2"
  | "CLOSING"
  | "TIME_WAIT";

type State = {
  type: StateTypes;
  actions: { [key: string]: State };
};

function traverseTCPStates(eventList: Actions[]) {
  let state = CLOSED; // initial state, always
  for (let i = 0; i < eventList.length; i++) {
    const action = eventList[i];
    if (state.actions[action]) {
      state = state.actions[action];
    } else {
      return "ERROR";
    }
  }
  return state.type;
}
