---
name: grilling
description: Interview the user about a plan, decision, or idea one decision at a time, with a live board to come back to. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

Interview the user until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Hold two stances for the whole session:

- **Thinking partner.** Assume the plan has good reasons, and stand on the user's side of the table. You are looking for what is still undecided and how to make it better. Be exhaustive about coverage and warm in tone.
- **Returning reader.** The user juggles several projects and comes back to this chat having forgotten it. Write every round as a **cold read**: it makes sense with no memory of earlier rounds. Use the user's own words, and define any other term where you use it.

## Rounds

The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Each round, ask **one** frontier question, the one whose answer unblocks the most, then wait for the user's answer. Put several frontier questions in one round only when the user asks for a batch: number them, and repeat the ❓ through ➡️ part of the format for each. A question whose answer depends on another question still open in this round belongs to a _later_ round.

Format a round like so:

```
📍 **<topic>**: <what we are deciding overall, in one sentence>. <What the last answer settled, in one sentence>. <n> settled, <m> open.

❓ **<question title>**

<Why it matters: what the answer changes in the result, in plain words.>

<The question, with its options. Give each option a concrete example of what the result looks like.>

➡️ <your recommended answer, with one reason>

🗺️ <path to the board's index.html>
```

Word each question so "yes" accepts your recommended answer and settles exactly one decision, leaving every other decision in the tree open. The chat message must be answerable on its own; the board adds depth. When the user comes back unsure where things stand, resend the current round more simply, with a new example.

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent with a fresh context window to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask another frontier question now. The _decisions_ are the user's: put each to them and wait.

## Board

The **board** is a temporary live page holding the session's full state outside the chat, so the user can re-enter at a glance and you can resume after a compaction or in a new session.

Before the first round, set up `<OS temp dir>/grill-boards/<project>-<topic>/`, using short slugs:

- If the folder already exists, read its `board.js` and resume from that state.
- Otherwise copy [`board/index.html`](board/index.html) into it, then open that copy with the platform's default opener (`start ""`, `open`, or `xdg-open`).

Before sending each round, overwrite `board.js` in that folder. Its shape is in [`board/board.example.js`](board/board.example.js). The open page picks up the change within two seconds, so only `board.js` ever changes.

Fill `board.js` for a cold read: `decisions` holds every decision in the design tree with its status, and `whereWeAre` explains why this question is next. `questions` holds one entry per question in this round. Give a question a `diagram` whenever the choice involves a flow, a structure, or a before and after. Keep its `recommendation` to the pick and one reason, and put numbers, test results, and known risks in its `evidence`. List any technical term a reader could have forgotten in `terms`.

## Finishing

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

Once they confirm, post every settled decision as a table in the chat, then delete the board's folder. The open tab will say the session has ended.
