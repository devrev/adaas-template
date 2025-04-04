import { AirdropEvent, EventType, spawn } from '@devrev/ts-adaas';

// TODO: If needed, you can replace this with state interface that will keep
// track of the loading progress.
export interface LoaderState {}

// TODO: Replace with your initial state that will be passed to the worker.
// This state will be used as a starting point for the loading process.
export const initialLoaderState: LoaderState = {};

function getWorkerPerLoadingPhase(event: AirdropEvent) {
  let path;
  switch (event.payload.event_type) {
    case EventType.StartLoadingData:
    case EventType.ContinueLoadingData:
      path = __dirname + '/workers/load-data';
      break;
    case EventType.StartLoadingAttachments:
    case EventType.ContinueLoadingAttachments:
      path = __dirname + '/workers/load-attachments';
      break;
  }
  return path;
}

const run = async (events: AirdropEvent[]) => {
  for (const event of events) {
    const file = getWorkerPerLoadingPhase(event);
    await spawn<LoaderState>({
      event,
      initialState: initialLoaderState,
      workerPath: file,
    });
  }
};

export default run;
