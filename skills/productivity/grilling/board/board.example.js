// Shape of board.js. Overwrite the whole file each round. Field values below are illustrative.
window.BOARD = {
  project: "account-management",
  topic: "Partner invite links",
  round: 3,
  // One sentence: what is being built and why. Stays the same across rounds unless the goal changes.
  goal: "Let partners invite teammates by link, so support stops creating accounts by hand.",
  // Two or three sentences for someone who forgot this session: what just got settled, and why this question is next.
  whereWeAre:
    "You chose single-use links last round, so each link now belongs to one invited person. That raises the next question: how long a link stays valid.",
  // The one decision being asked now. Mirrors the chat message, with more room to explain.
  question: {
    title: "How long should an invite link stay valid?",
    why: "This decides how often partners have to re-send invites, and how long a forwarded link stays dangerous.",
    ask: "Should links expire after 7 days?",
    example:
      "Example: a partner invites Lan on Monday. Lan is on leave until the following Wednesday. With 7 days, Lan's link has expired and the partner must re-send it.",
    // Optional Mermaid source. Include it when the choice involves a flow, a structure, or a before and after.
    diagram: "flowchart LR\n  A[Partner sends link] --> B{Opened within 7 days?}\n  B -->|Yes| C[Account created]\n  B -->|No| D[Link expired, partner re-sends]",
    options: [
      { label: "7 days", summary: "Covers normal delays, limits exposure.", example: "Most invites work. Long leave needs a re-send.", recommended: true },
      { label: "24 hours", summary: "Safest, more re-sends.", example: "An invite sent on Friday evening is dead by Monday." },
      { label: "Never", summary: "No re-sends, forwarded links stay live forever.", example: "A link in an old email thread still works next year." },
    ],
    recommendation: "7 days. It keeps re-sends rare and still closes old links.",
  },
  // Every decision in the design tree. This is the session's full state, and draws the decision map.
  // status: "settled" | "current" | "open". parent: the id of the decision this one hangs off.
  decisions: [
    { id: "who", title: "Who can invite?", status: "settled", answer: "Partner admins only.", why: "Keeps invites accountable to one role." },
    { id: "link", parent: "who", title: "Single-use or shared link?", status: "settled", answer: "Single-use.", why: "Each link maps to one person, so access can be revoked per person." },
    { id: "expiry", parent: "link", title: "Link expiry", status: "current", why: "Asked now." },
    { id: "resend", parent: "expiry", title: "Who can re-send an expired link?", status: "open", why: "Depends on how often links expire." },
    { id: "audit", parent: "who", title: "Do we log invites for audit?", status: "open", why: "Needed if partners ask who invited whom." },
  ],
  // Optional. Any term a reader could have forgotten, in plain words.
  terms: [{ term: "Single-use link", meaning: "A link that stops working after one person signs up with it." }],
};
