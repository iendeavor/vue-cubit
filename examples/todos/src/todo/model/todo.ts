export class Todo {
  readonly id: number;
  readonly completed: boolean;
  readonly title: string;

  constructor({
    id,
    completed,
    title,
  }: {
    id: number;
    completed: boolean;
    title: string;
  }) {
    this.id = id;
    this.completed = completed;
    this.title = title;
  }

  copyWith({ completed, title }: { completed?: boolean; title?: string }) {
    return new Todo({
      id: this.id,
      completed: completed ?? this.completed,
      title: title ?? this.title,
    });
  }

  static fromJson(json: string): Todo {
    const object = JSON.parse(json);
    return new Todo({
      id: object["id"],
      completed: object["completed"],
      title: object["title"],
    });
  }

  static toJson(instance: Todo): string {
    return JSON.stringify({
      id: instance.id,
      completed: instance.completed,
      title: instance.title,
    });
  }
}
