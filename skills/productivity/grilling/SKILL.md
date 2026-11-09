---
name: grilling
description: Interview the user about a plan, decision, or idea one decision at a time, with a temporary Markdown board to come back to. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
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

<The question.>

| Option | Pros | Cons | Example |
| --- | --- | --- | --- |
| **<A. option>** (recommended) | <what it gets right> | <what it costs> | <what the result looks like> |
| **<B. option>** | <what it gets right> | <what it costs> | <what the result looks like> |

➡️ **<A. option>**: <why it beats the others, in one or two sentences, naming the con you accept>

🗺️ <path to the board file>
```

Word each question so "yes" accepts your recommended answer and settles exactly one decision, leaving every other decision in the tree open. The chat message must be answerable on its own; the board adds depth. When the user comes back unsure where things stand, resend the current round more simply, with a new example.

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent with a fresh context window to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask another frontier question now. The _decisions_ are the user's: put each to them and wait.

## Board

The **board** is a temporary Markdown file holding the session's full state outside the chat, so the user can re-enter at a glance and you can resume after a compaction or in a new session.

The board lives at `<OS temp dir>/grill-boards/<project>-<topic>.md`, using short slugs. If it already exists, read it and resume from that state.

Before sending each round, update the board in this shape:

````markdown
# <topic> (<project>), round <n>

**Goal:** <what is being built and why, in one sentence>

**Where we are:** <what just got settled, and why this question is next>

## Decide now

### <question title>

<Why it matters, the question, and a concrete example.>

<A Mermaid diagram, whenever the choice involves a flow, a structure, or a before and after.>

| Option | Pros | Cons | Example |
| --- | --- | --- | --- |

**Recommendation:** <the pick, and why it beats the others>

**Evidence:** <numbers, test results, and known risks, when there are any>

## Decision map

```mermaid
flowchart LR
  who["Who can invite?"]:::settled --> link["Single-use or shared link?"]:::settled
  link --> expiry["Link expiry"]:::current
  who --> audit["Do we log invites?"]:::open
  classDef settled fill:#16794c,stroke:#16794c,color:#fff
  classDef current fill:#b45309,stroke:#b45309,color:#fff
  classDef open fill:#6b7280,stroke:#6b7280,color:#fff
```

## Settled

| Decision | Answer | Why |
| --- | --- | --- |

## Still to decide

| Decision | Why it matters |
| --- | --- |

## Words used here

| Term | Meaning |
| --- | --- |
````

In a batch round, repeat the `###` part under "Decide now" for each question. The decision map and the tables hold every decision in the design tree. List any technical term a reader could have forgotten under "Words used here".

## Finishing

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

Once they confirm, post every settled decision as a table in the chat, then delete the board file.
