# Survey Builder

This library provides a basic survey builder for Angular applications. It allows administrators to add questions and preview the resulting form in real time.

## Features

- Add questions with various types (text, long text, radio, checkbox, dropdown, date, file, video)
- Mark questions as required or optional
- Add options for radio, checkbox and dropdown questions
- Reorder questions using move up/down controls
- Live preview of the generated form
- Draft persistence using `localStorage`

The library provides the standalone `SurveyBuilderComponent` which can be used as follows:

```ts
import { SurveyBuilderComponent } from '@avs2001/survey-builder';
```

In your template:
```html
<lib-survey-builder></lib-survey-builder>
```

This is a minimal implementation aimed at demonstrating the survey builder interface. It can be extended to support additional features such as drag-and-drop, advanced validation rules and role-based access.
