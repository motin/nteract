import { getJSON } from '../api';

import { launchKernel } from '../api/kernel';

export function exit() {
  return {
    type: 'EXIT',
  };
}

export function killKernel() {
  return {
    type: 'KILL_KERNEL',
  };
}

export function newKernel(kernelSpecName) {
  return (subject) => {
    launchKernel(kernelSpecName)
      .then(kc => {
        const { channels, connectionFile, spawn } = kc;
        subject.next({
          type: 'NEW_KERNEL',
          channels,
          connectionFile,
          spawn,
        });
      })
      .catch((err) => console.error(err));
  };
}

export function readJSON(filePath) {
  return (subject) => {
    getJSON(filePath)
      .then((data) => {
        subject.next({
          type: 'READ_JSON',
          data,
        });
        newKernel(data.metadata.kernelspec.name)(subject);
      });
  };
}

export function setSelected(indexes, additive) {
  return {
    type: 'SET_SELECTED',
    indexes,
    additive,
  };
}

export function updateCellSource(index, source) {
  return {
    type: 'UPDATE_CELL_SOURCE',
    index,
    source,
  };
}

export function updateCellOutputs(index, outputs) {
  return {
    type: 'UPDATE_CELL_OUTPUTS',
    index,
    outputs,
  };
}

export function updateCellExecutionCount(index, count) {
  return {
    type: 'UPDATE_CELL_EXECUTION_COUNT',
    index,
    count,
  };
}
