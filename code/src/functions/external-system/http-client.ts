import {
  AirdropEvent,
  ExternalSystemAttachmentStreamingResponse,
  ExternalSystemItem,
  ExternalSystemItemLoadingParams,
  ExternalSystemItemLoadingResponse,
} from '@devrev/ts-adaas';

export class HttpClient {
  private apiEndpoint: string;
  private apiToken: string;

  constructor(event: AirdropEvent) {
    // TODO: Replace with your API endpoint which will be used to make API calls
    // to the external system.
    this.apiEndpoint = 'https://dummy-api.com';

    // TODO: Replace with your API token which will be used to authenticate API
    // calls to the external system. This is passed through the event payload.
    this.apiToken = event.payload.connection_data.key;
  }

  async getTodoLists(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: '1',
          name: 'Todo List',
          description: 'This is a todo list project',
          item_count: 2,
          item_type: 'todos',
        },
      ]);
    });
  }

  async getTodos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 'todo-1',
          created_date: '1999-12-25T01:00:03+01:00',
          modified_date: '1999-12-25T01:00:03+01:00',
          body: '<p>This is Todo 1</p>',
          creator: 'user-1',
          owner: 'user-1',
          title: 'Todo 1',
        },
        {
          id: 'todo-2',
          created_date: '1999-12-27T15:31:34+01:00',
          modified_date: '2002-04-09T01:55:31+02:00',
          body: '<p>This is Todo 2</p>',
          creator: 'user-2',
          owner: 'user-2',
          title: 'Todo 2',
        },
      ]);
    });
  }

  async getUsers(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 'user-1',
          created_date: '1999-12-25T01:00:03+01:00',
          modified_date: '1999-12-25T01:00:03+01:00',
          email: 'johndoe@test.com',
          name: 'John Doe',
        },
        {
          id: 'user-2',
          created_date: '1999-12-27T15:31:34+01:00',
          modified_date: '2002-04-09T01:55:31+02:00',
          email: 'janedoe@test.com',
          name: 'Jane Doe',
        },
      ]);
    });
  }

  async getAttachments(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          url: 'https://app.devrev.ai/favicon.ico',
          id: 'attachment-1',
          file_name: 'favicon1.ico',
          author_id: 'user-1',
          parent_id: 'todo-1',
        },
        {
          url: 'https://app.devrev.ai/favicon.ico',
          id: 'attachment-2',
          file_name: 'favicon2.ico',
          author_id: 'user-2',
          parent_id: 'todo-2',
        },
      ]);
    });
  }

  async createTodo(todo: any): Promise<any> {
    return { error: 'Could not create todo in external system.' };
  }

  async updateTodo(todo: any): Promise<any> {
    return { error: 'Could not update todo in external system.' };
  }

  async createAttachment(attachment: any): Promise<any> {
    return { error: 'Could not create attachment in external system.' };
  }
}
