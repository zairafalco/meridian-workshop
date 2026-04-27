---
name: out-of-office
description: Instructions and automation guidelines for handling out-of-office scenarios in the workspace.
---

# Out of Office Skill

This skill provides guidance for creating out-of-office messages, status notes, and handoff summaries. It supports:

- multiple languages (English / Italian)
- choice of tone (formal / informal)
- optional inclusion of a shared calendar link

## Purpose

Use this skill when a developer or team member needs to:

- document why work is paused
- capture current context for handoff
- provide a brief status summary before leaving the session
- generate an out-of-office message in the requested language and tone

## Usage Patterns

### Language support

Provide the message in either:

- English
- Italian

Example instructions:

- `Write an out-of-office email in English.`
- `Write an out-of-office message in Italian.`

### Tone support

Support both:

- Formal tone: polite, professional, and complete
- Informal tone: friendly, concise, and casual

Example instructions:

- `Use a formal tone.`
- `Use an informal tone.`

### Shared calendar link

If a shared calendar link is available, include it in the message as an optional reference.

Example instructions:

- `Include a link to the shared calendar: https://calendar.example.com/team`
- `Add a calendar link if available.`

## Template

Use this template structure when generating messages:

- Greeting
- Out-of-office dates
- Return date
- Colleague coverage / contact person
- Calendar link (optional)
- Closing line

## Example outputs

### English, formal

```
Subject: Out of Office: May 5–May 12

Hello,

I will be out of the office from May 5 through May 12 and will return on May 13.
During my absence, please contact Sara Rossi for urgent matters.

Sara Rossi
Email: sara.rossi@example.com
Phone: +39 123 456 7890

You may also refer to the shared calendar for availability details:
https://calendar.example.com/team

Thank you,
[Your Name]
```

### English, informal

```
Subject: Out of Office: May 5–May 12

Hi,

I’ll be away from May 5 to May 12 and back on May 13.
If you need anything while I’m out, please reach out to Sara Rossi.

Sara Rossi
Email: sara.rossi@example.com
Phone: +39 123 456 7890

You can also check the shared calendar here:
https://calendar.example.com/team

Thanks,
[Your Name]
```

### Italian, formal

```
Oggetto: Assenza dall’ufficio: 5–12 maggio

Buongiorno,

Sarò fuori ufficio dal 5 maggio al 12 maggio e tornerò il 13 maggio.
Durante la mia assenza, per favore contattate Sara Rossi per questioni urgenti.

Sara Rossi
Email: sara.rossi@example.com
Telefono: +39 123 456 7890

Potete anche consultare il calendario condiviso per i dettagli sulla disponibilità:
https://calendar.example.com/team

Grazie,
[Il tuo nome]
```

### Italian, informal

```
Oggetto: Fuori ufficio: 5–12 maggio

Ciao,

Sarò via dal 5 al 12 maggio e rientrerò il 13 maggio.
Se c’è bisogno, contatta Sara Rossi.

Sara Rossi
Email: sara.rossi@example.com
Telefono: +39 123 456 7890

Dai un’occhiata anche al calendario condiviso:
https://calendar.example.com/team

Grazie,
[Il tuo nome]
```

## Notes

- Keep the date range and return date clear.
- Always name the backup contact and their preferred contact method.
- Add the calendar link only when explicitly requested.
