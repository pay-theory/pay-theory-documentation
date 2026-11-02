# Voice

Every sentence this repo publishes goes through these rules: guide prose, admonitions, table descriptions, changelog entries, and operation example names and descriptions. The reader is an engineer integrating Pay Theory who wants to get unblocked.

Write the way a knowledgeable teammate talks. Plain words, short sentences, the fact first.

## The reader and the register

- Address the reader as "you". Present tense, active voice: "Pass your calculated fee", not "The fee should be passed".
- Lead with the actionable point, then explain. Keep paragraphs to two or three sentences.
- Explain the why when behavior is surprising. State the rule and the reason together.
- Back every claim about a request or response with a code block or an example.
- Describe API behavior the same way whether the request comes from the SDK or the API ("when you submit the request"). Call out SDK-vs-API differences only when they really differ.

## Terminology

- "Pay Theory", two words. "PayTheory" only inside code or URLs.
- "payment method token", not "payment token".
- "SDK", "API Key", "ID" capitalized as shown.
- Field, argument, function and operation names in backticks: `fee_mode`, `transact`, `createTransaction`.
- One name per thing. Pick "payor" or "customer" for a given concept and repeat it.

## Patterns to cut

Scan every draft for these, rewrite, then ask "what makes this read as machine-written?" and fix what's left.

**Content**
1. Puffery: "pivotal", "testament to", "evolving landscape", "seamless", "robust". State what happens.
2. Superficial -ing tails: "…, ensuring a smooth checkout", "…, highlighting flexibility". Delete them or turn them into a real fact.
3. Promotional words: "powerful", "cutting-edge", "effortless". Use neutral descriptions.
4. Vague attribution: "many partners find". Name the source or delete it.

**Language**
5. AI vocabulary: additionally, crucial, delve, enhance, fostering, leverage, utilize, facilitate, showcase, underscore, robust. Use the plain word: also, important, look at, improve, use, help, show.
6. Fancy "is": "serves as", "acts as", "boasts", "features". Say "is" or "has".
7. "Not just X, but Y" framing. State the point directly.
8. Forced groups of three. Use the real number of items.
9. Synonym cycling. Repeat the one name.
10. False ranges: "from cards to ACH to cash". List the items.

**Style**
11. No em dashes. End the sentence or use a comma. Don't swap in parentheses or en dashes as dash substitutes.
12. Colons only before a list or an example, not as a mid-sentence connector.
13. Semicolons: split into two sentences.
14. Bold sparingly: a term on first definition, or a bold lead-in that ends in a period and is followed by new detail. Not "**Performance:** Performance improved…".
15. Sentence case for headings, admonition titles and example names: "Custom fee rules", not "Custom Fee Rules". This applies to new and edited text. Leave untouched pages as they are.
16. No decorative emoji in headings or bullets. Straight quotes, not curly ones.

**Filler**
17. "In order to" → "to". "Due to the fact that" → "because". "It is important to note that" → delete.
18. Hedging stacks: "could potentially" → "may".
19. Generic closers: "Now you're ready to accept payments!" End on the last useful fact.
20. Chatbot phrases: "Simply", "Just", "Of course", "Great!". Delete.

**Jargon**
21. Abstract metaphor nouns: surface (as in "API surface"), primitive, vector, substrate, paradigm, north star, flywheel. Use the concrete word: "the API", "a function", "a way".

**Plain speech**
22. Say what it does, not how it feels. "Fees are calculated automatically" → "`createTransaction` adds the service fee from the merchant's fee matrix". If a sentence can't be restated as an instruction, a fact or a number, cut it. If it could appear unchanged in another company's docs, it says nothing about Pay Theory.
23. One idea per sentence. Split anything the reader has to parse twice.
24. Active voice with a named actor: "Pay Theory validates the card", not "the card is validated". Passive is fine only when the actor is unknown or irrelevant.
25. Cut adverbs or pick a stronger verb. "Significantly faster" → the number.
26. The plain word wins: use, help, many, if, start, end.

## Names and descriptions

Short labels (example names, sidebar labels, table descriptions) follow the same rules with extra pressure on length:

- A name says the action or the problem in a few words: "Get a barcode", "Invalid card number", "Merchant key not allowed".
- A description adds one fact the name doesn't give. If it only restates the name, replace it with that missing fact (a filter used, a field to watch, a limit).
- Write "ID", not "id".
