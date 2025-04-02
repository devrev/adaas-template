import { AirdropEvent, EventType, spawn } from '@devrev/ts-adaas';

// TODO: Replace with your state interface that will keep track of the
// extraction progress. For example, the page number, the number of items
// processed, if the extraction is completed, etc.
export interface ExtractorState {
  todos: { completed: boolean };
  users: { completed: boolean };
  attachments: { completed: boolean };
}

// TODO: Replace with your initial state that will be passed to the worker.
// This state will be used as a starting point for the extraction process.
export const initialState: ExtractorState = {
  todos: { completed: false },
  users: { completed: false },
  attachments: { completed: false },
};

// TODO (rado): Check if this can be moved to some shared/ folder.
function getWorkerPerExtractionPhase(event: AirdropEvent) {
  let path;
  switch (event.payload.event_type) {
    case EventType.ExtractionExternalSyncUnitsStart:
      path = __dirname + '/workers/external-sync-units-extraction';
      break;
    case EventType.ExtractionMetadataStart:
      path = __dirname + '/workers/metadata-extraction';
      break;
    case EventType.ExtractionDataStart:
    case EventType.ExtractionDataContinue:
      path = __dirname + '/workers/data-extraction';
      break;
    case EventType.ExtractionAttachmentsStart:
    case EventType.ExtractionAttachmentsContinue:
      path = __dirname + '/workers/attachments-extraction';
      break;
  }
  return path;
}

const run = async (events: AirdropEvent[]) => {
  for (const event of events) {
    const file = getWorkerPerExtractionPhase(event);
    await spawn<ExtractorState>({
      event,
      initialState,
      workerPath: file,

      // TODO: If needed you can pass additional options to the spawn function.
      // For example timeout of the lambda, batch size, etc.
      // options: {},
    });
  }
};

export default run;
