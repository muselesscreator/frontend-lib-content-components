import React from 'react';
import * as textEditorHooks from '../../hooks';
import * as module from './hooks';

export const { navigateCallback } = textEditorHooks;

export const hooks = {
  isEditing: () => {
    const [isEditing, setIsEditing] = React.useState(false);
    return {
      isEditing,
      startEditing: () => setIsEditing(true),
      stopEditing: () => setIsEditing(false),
    };
  },
  localTitle: ({
    setBlockTitle,
    stopEditing,
    returnTitle,
  }) => {
    const [localTitle, setLocalTitle] = React.useState(returnTitle);
    return {
      updateTitle: () => {
        setBlockTitle(localTitle);
        stopEditing();
      },
      handleChange: (e) => setLocalTitle(e.target.value),
      localTitle,
    };
  },
  handleKeyDown: ({ editorRef }) => (e) => {
    if (editorRef && (e.key === 'Tab' || e.key === 'Enter')) {
      e.preventDefault();
      editorRef.current.focus();
    }
  },
};

/* eslint-disable import/prefer-default-export */
export const localTitleHooks = ({
  editorRef,
  setBlockTitle,
  returnTitle,
}) => {
  const { isEditing, startEditing, stopEditing } = module.hooks.isEditing();
  const { localTitle, handleChange, updateTitle } = module.hooks.localTitle({
    setBlockTitle,
    stopEditing,
    returnTitle,
  });
  return {
    isEditing,
    startEditing,
    stopEditing,

    localTitle,
    updateTitle,
    handleChange,

    inputRef: React.createRef(),
    handleKeyDown: module.hooks.handleKeyDown({ editorRef }),
  };
};
