import { LibraryEntry } from "./library-data";
import { stripLatexDelimiters } from "./symbols";

export interface LibraryDetailContent {
  explanation: string;
  examples: string[];
  problems: string[];
}

const TYPE_LABELS: Record<LibraryEntry["type"], string> = {
  axiom: "Axiom",
  definition: "Definition",
  lemma: "Lemma",
  proposition: "Proposition",
  theorem: "Theorem",
  law: "Law",
  corollary: "Corollary",
};

const TYPE_GUIDANCE: Record<LibraryEntry["type"], string> = {
  axiom:
    "You usually treat it as a starting principle and build later arguments from it.",
  definition:
    "In proofs, definitions tell you exactly what you have to prove or check when a concept appears.",
  lemma:
    "A lemma is a supporting result that is often used to make a larger proof cleaner.",
  proposition:
    "A proposition is a reusable result that is important, even if it is not presented as a headline theorem.",
  theorem:
    "A theorem is a major result you can cite once its hypotheses have been verified.",
  law:
    "A law is a standard identity or rule that helps you rewrite expressions in a reliable way.",
  corollary:
    "A corollary is a conclusion that follows quickly from an earlier theorem or lemma.",
};

const BRANCH_GUIDANCE: Partial<Record<string, string>> = {
  "Set Theory / Logic":
    "For set and logic results, it often helps to test the statement by tracking what it means for an arbitrary element to belong to each side.",
  "Real Analysis":
    "In analysis, always pay close attention to hypotheses like continuity, boundedness, compactness, and convergence.",
  "Abstract Algebra":
    "In algebra, the most common move is to check the operation, structure, and hypotheses before citing the result.",
  "Linear Algebra":
    "In linear algebra, examples with vectors, matrices, and linear maps are often the fastest way to see what the statement is really saying.",
  Topology:
    "In topology, it helps to translate each statement into the language of open sets, neighborhoods, continuity, or compactness.",
  "Number Theory":
    "In number theory, you usually want to rewrite the statement in terms of divisibility, congruences, or prime factorizations.",
  Combinatorics:
    "In combinatorics, try to think in terms of counting the same object in two ways or building a clean bijection.",
  Probability:
    "In probability, check the event structure carefully and identify what is being conditioned on or averaged over.",
  "Complex Analysis":
    "In complex analysis, it helps to track analyticity, contours, and singularities before applying the result.",
  "Differential Equations":
    "In differential equations, pay attention to what assumptions are made on coefficients, regularity, or initial conditions.",
};

const DETAIL_OVERRIDES: Partial<Record<string, LibraryDetailContent>> = {
  "ra-3": {
    explanation:
      "The Triangle Inequality says the direct distance between two points is never larger than taking a detour through a third point. In plain language, adding two quantities cannot create an absolute value larger than the sum of their separate absolute values.",
    examples: [
      "For real numbers, it gives |3 + (-5)| <= |3| + |-5|, so 2 <= 8.",
      "In a proof, you might use it to bound |(a_n - L) + (b_n - M)| by |a_n - L| + |b_n - M| when proving a limit-of-a-sum result.",
      "A useful variant is $|x+y+z| \\leq |x| + |y| + |z|$, which follows by applying the inequality twice.",
    ],
    problems: [
      "Show that $|7 + (-10)| \\leq |7| + |-10|$.",
      "Suppose $|x-2| < 0.1$ and $|y-5| < 0.2$. Write an inequality that bounds $|(x+y)-7|$ using the Triangle Inequality.",
    ],
  },
  "nt-6": {
    explanation:
      "The Infinitude of Primes says the prime numbers never run out. No matter how many primes you list, there is always another one not already on your list.",
    examples: [
      "Euclid's classic proof multiplies a finite list of primes and adds 1 to produce a number not divisible by any prime on the list.",
      "If someone claimed 2, 3, 5, 7, and 11 were all the primes, the theorem tells you that claim must be false.",
      "A standard proof starts with a finite list $p_1, \\dots, p_n$ and studies the number $p_1p_2\\cdots p_n + 1$.",
    ],
    problems: [
      "Form the Euclid-style number from the list 2, 3, 5 and explain why it leads to a contradiction.",
      "Why does multiplying a finite list of primes and adding 1 guarantee that the new number is not divisible by any prime already on the list?",
    ],
  },
  "comb-6": {
    explanation:
      "The Pigeonhole Principle says that if you try to place more objects than boxes into those boxes, then at least one box must contain more than one object.",
    examples: [
      "If 13 people are in a room, at least two of them were born in the same month.",
      "If 6 socks are placed into 5 drawers, some drawer must contain at least 2 socks.",
      "If 10 integers are chosen from the set $\\{1,2,3,4,5,6,7,8,9\\}$, then at least one integer must be chosen more than once.",
    ],
    problems: [
      "Show that among 9 people, at least two must have the same last-digit birthday date.",
      "A teacher places 17 students into 4 discussion groups. What must be true about at least one group, and why?",
    ],
  },
};

function normalizeStatement(statement: string): string {
  return statement.replace(/\s+/g, " ").trim();
}

function baseExamples(entry: LibraryEntry): string[] {
  const cleanName = entry.name.replace(/\s+\(Definition\)$/u, "");

  if (entry.type === "definition") {
    return [
      `Use ${cleanName} when you want to unpack exactly what must be shown. In many proofs, the next step is to restate the definition in simpler language and check each condition one by one.`,
      `A typical example is: before proving something is ${cleanName.toLowerCase()}, first rewrite the term into its defining properties and verify those properties directly.`,
      `Another common exercise is to compare two objects and check exactly which condition in the definition succeeds or fails.`,
    ];
  }

  return [
    `A typical use of ${cleanName} is to verify its hypotheses first, then cite it to justify the conclusion instead of re-proving that result from scratch.`,
    `When studying or writing proofs, try asking: "What assumptions do I need before I am allowed to use ${cleanName}?" That question usually tells you whether it applies.`,
    `Another good example is to test a borderline case and decide whether the hypotheses are strong enough to let you apply the result.`,
  ];
}

function baseProblems(entry: LibraryEntry): string[] {
  const cleanName = entry.name.replace(/\s+\(Definition\)$/u, "");

  if (entry.type === "definition") {
    return [
      `Write the statement in your own words, then list the exact conditions you would need to check in order to prove an example satisfies it.`,
      `Give one object that does satisfy ${cleanName.toLowerCase()} and one that does not, and explain which part of the definition makes the difference.`,
    ];
  }

  return [
    `State the hypotheses and describe a simple situation in which all of them are satisfied.`,
    `Create a short proof outline where ${cleanName} is the main result you invoke. What must you verify before you can apply it?`,
  ];
}

export function formatLibraryType(type: LibraryEntry["type"]): string {
  return TYPE_LABELS[type];
}

export function getLibraryDetail(entry: LibraryEntry): LibraryDetailContent {
  const override = DETAIL_OVERRIDES[entry.id];
  if (override) {
    return override;
  }

  const plainStatement = normalizeStatement(entry.statement);
  const plainNotes = entry.notes ? stripLatexDelimiters(entry.notes) : "";
  const branchHint = BRANCH_GUIDANCE[entry.branch];
  const explanation = [
    `${entry.name} is a ${TYPE_LABELS[entry.type].toLowerCase()} from ${entry.branch}.`,
    `In plain language, it says: ${plainStatement}`,
    TYPE_GUIDANCE[entry.type],
    branchHint,
    plainNotes ? `Helpful note: ${plainNotes}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    explanation,
    examples: baseExamples(entry),
    problems: baseProblems(entry),
  };
}
