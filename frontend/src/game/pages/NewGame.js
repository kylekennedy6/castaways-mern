import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './NewGame.css';

const LONG = '7 Days';
const MEDIUM = '3 Days';
const SHORT = '1 Day';

const PRODUCTIVE = 'Productive';
const SOCIAL = 'Social';
const HYBRID = 'Hybrid';

const NewGame = () => {
  const [formState, inputHandler] = useForm(
    {
      nickname: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const [gameLength, setGameLength] = useState(MEDIUM);
  const gameLengthChangeHandler = event => {
    setGameLength(event.target.value);
  };

  const [playStyle, setPlayStyle] = useState(MEDIUM);
  const playStyleChangeHandler = event => {
    setPlayStyle(event.target.value);
  };

  const findGameSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="new-game-form" onSubmit={findGameSubmitHandler}>
      <Input
        id="nickname"
        element="input"
        type="text"
        label="Nickname"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid nickname."
        onInput={inputHandler}
      />
      <div className="form-control">
        <label>Game Length:</label>
        <select value={gameLength} onChange={gameLengthChangeHandler}>
          <option value={SHORT}>{SHORT}</option>
          <option value={MEDIUM}>{MEDIUM}</option>
          <option value={LONG}>{LONG}</option>
        </select>
      </div>
      <div className="form-control">
        <label>Play Style:</label>
        <select value={playStyle} onChange={playStyleChangeHandler}>
          <option value={PRODUCTIVE}>{PRODUCTIVE}</option>
          <option value={SOCIAL}>{SOCIAL}</option>
          <option value={HYBRID}>{HYBRID}</option>
        </select>
      </div>
      <Button type="submit" disabled={!formState.isValid}>
        Find Game
      </Button>
    </form>
  );
};

export default NewGame;
