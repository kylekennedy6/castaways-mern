import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import Input from '../../../shared/components/FormElements/Input';
import Message from '../Message/Message';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import moment from 'moment';

import './MessageList.css';

const MY_USER_ID = 'apple';

const MessageList = props => {
  const auth = useContext(AuthContext);
  const gameId = useParams().gameId;
  const newConversationMode =
    window.location.href.split('private-chats')[1] === '/new';
  const [messages, setMessages] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let options;
  let contestantId;
  if (props.contestants) {
    options = props.contestants.filter(c => c.user !== auth.userId);
    contestantId = props.contestants.find(c => c.user === auth.userId).id;
  }
  const [formState, inputHandler] = useForm(
    {
      message: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  const history = useHistory();

  const keyPressHandler = event => {
    if (event.key === 'Enter') {
      messageSendHandler(event);
    }
  };
  const messageSendHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/conversations',
        'POST',
        JSON.stringify({
          "message": formState.inputs.message.value,
          "recipients": selectedValues.map(v => v._id),
          "contestantId": contestantId,
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      );
      history.push(`/${gameId}/private-chats/`);
    } catch (err) {}
  };

  function onSelectHandler(selectedList, selectedValue) {
    setSelectedValues([...selectedValues, selectedValue]);
  }

  function onRemoveHandler(selectedList, removedItem) {
    const removed = [...selectedValues].filter(
      value => value.id !== removedItem.id
    );
    setSelectedValues(removed);
  }

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    let tempMessages;
    if (newConversationMode) {
      tempMessages = [];
    } else {
      tempMessages = [
        {
          id: 1,
          author: 'apple',
          message:
            'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime(),
        },
        {
          id: 2,
          author: 'orange',
          message:
            'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime(),
        },
        {
          id: 3,
          author: 'orange',
          message:
            'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime(),
        },
        {
          id: 4,
          author: 'apple',
          message:
            'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime(),
        },
        {
          id: 5,
          author: 'apple',
          message:
            'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime(),
        },
        {
          id: 6,
          author: 'apple',
          message:
            'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime(),
        },
        {
          id: 7,
          author: 'orange',
          message:
            'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime(),
        },
        {
          id: 8,
          author: 'orange',
          message:
            'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime(),
        },
        {
          id: 9,
          author: 'apple',
          message:
            'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime(),
        },
        {
          id: 10,
          author: 'orange',
          message:
            'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime(),
        },
      ];
    }
    setMessages([...messages, ...tempMessages]);
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      {!isLoading && newConversationMode && options && (
        <Multiselect
          placeholder="To: "
          options={options}
          selectedValues={[]}
          onSelect={onSelectHandler}
          onRemove={onRemoveHandler}
          displayValue="nickname"
        />
      )}
      {!newConversationMode && (
        <div className="toolbar">
          <div className="left-items">
            <h1 className="toolbar-title">Conversation</h1>
          </div>
        </div>
      )}
      <div className="message-list-container">{renderMessages()}</div>
      <form
        className="compose-form"
        onKeyPress={keyPressHandler}
        onSubmit={messageSendHandler}
      >
        <Input
          id="message"
          element="input"
          placeholder="Type a message..."
          type="text"
          validators={[]}
          errorText="Cannot send phone numbers"
          onInput={inputHandler}
        />
      </form>
    </div>
  );
};

export default MessageList;
