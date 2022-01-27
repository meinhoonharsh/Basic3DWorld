import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {IdleState, RunState, WalkState, DanceState} from './States.js';

class FiniteStateMachine {
    constructor() {
      this._states = {};
      this._currentState = null;
    }
  
    _AddState(name, type) {
      this._states[name] = type;
    }
  
    SetState(name) {
      const prevState = this._currentState;
  
      if (prevState) {
        if (prevState.Name == name) {
          return;
        }
        prevState.Exit();
      }
  
      const state = new this._states[name](this);
  
      this._currentState = state;
      state.Enter(prevState);
    }
  
    Update(timeElapsed, input) {
      if (this._currentState) {
        this._currentState.Update(timeElapsed, input);
      }
    }
  }
  
  class CharacterFSM extends FiniteStateMachine {
    constructor(proxy) {
      super();
      this._proxy = proxy;
      this._Init();
    }
  
    _Init() {
      this._AddState("idle", IdleState);
      this._AddState("walk", WalkState);
      this._AddState("run", RunState);
      this._AddState("dance", DanceState);
    }
  }
  
  export default CharacterFSM;