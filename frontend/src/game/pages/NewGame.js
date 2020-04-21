import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './NewGame.css';

const LONG = '7 Days';
const MEDIUM = '3 Days';
const SHORT = '1 Day';

const PRODUCTIVE = 'Productive';
const SOCIAL = 'Social';
const HYBRID = 'Hybrid';

const NewGame = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      nickname: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const [duration, setDuration] = useState(MEDIUM);
  const durationChangeHandler = event => {
    setDuration(event.target.value);
  };

  const [strategy, setStrategy] = useState(HYBRID);
  const strategyChangeHandler = event => {
    setStrategy(event.target.value);
  };

  const history = useHistory();

  const findGameSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/games/find-game/',
        'POST',
        JSON.stringify({
          "nickname": formState.inputs.nickname.value,
          "duration": duration,
          "strategy": strategy,
          "userId": auth.userId
        }), {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        });
        history.push('/');
    } catch (err) {}
  };


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    <form className="new-game-form" onSubmit={findGameSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
      <Input
        id="nickname"
        element="input"
        type="text"
        label="Nickname"
        placeholder="This is what other players will call you."
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid nickname."
        onInput={inputHandler}
      />
      <div className="form-control">
        <label>Game Length:</label>
        <select value={duration} onChange={durationChangeHandler}>
          <option value={SHORT}>{SHORT}</option>
          <option value={MEDIUM}>{MEDIUM}</option>
          <option value={LONG}>{LONG}</option>
        </select>
      </div>
      <div className="form-control">
        <label>Play Style:</label>
        <select value={strategy} onChange={strategyChangeHandler}>
          <option value={PRODUCTIVE}>{PRODUCTIVE}</option>
          <option value={SOCIAL}>{SOCIAL}</option>
          <option value={HYBRID}>{HYBRID}</option>
        </select>
      </div>
      <Button type="submit" disabled={!formState.isValid}>
        Find Game
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewGame;
